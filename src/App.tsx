import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ExamRunner } from './components/ExamRunner';
import { ExamResults } from './components/ExamResults';
import { ModuleDrillSelector } from './components/ModuleDrillSelector';
import { FlashcardDeck } from './components/FlashcardDeck';
import { HistoryAnalytics } from './components/HistoryAnalytics';
import { StudyNotesImporter } from './components/StudyNotesImporter';
import { SettingsModal } from './components/SettingsModal';
import { 
  Question, 
  ExamAttempt, 
  ModuleId, 
  AppSettings 
} from './types';
import { EHE_MODULES } from './data/modules';
import { 
  getAllQuestions, 
  getStoredAttempts, 
  saveAttempt, 
  getMissedQuestionIds,
  getStoredSettings,
  saveSettings
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'exam' | 'modules' | 'flashcards' | 'history' | 'importer'>('dashboard');
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings());
  const [attempts, setAttempts] = useState<ExamAttempt[]>(getStoredAttempts());
  const [allQuestions, setAllQuestions] = useState<Question[]>(getAllQuestions());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Active Exam state
  const [activeExam, setActiveExam] = useState<{
    questions: Question[];
    title: string;
    mode: 'full_mock' | 'module_drill' | 'missed_drill' | 'custom_drill';
    moduleId?: ModuleId;
    duration: number;
  } | null>(null);

  // Reviewing attempt state
  const [reviewAttempt, setReviewAttempt] = useState<ExamAttempt | null>(null);

  // Dark Mode effect
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleToggleDarkMode = () => {
    const updated = { ...settings, darkMode: !settings.darkMode };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const refreshStorageData = () => {
    setAttempts(getStoredAttempts());
    setAllQuestions(getAllQuestions());
  };

  // Helper to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Prepare questions (optionally shuffle options and adjust correct answers)
  const prepareExamQuestions = (rawQuestions: Question[]): Question[] => {
    return rawQuestions.map(q => {
      if (!settings.shuffleOptions) return q;

      // map original options with their indices
      const indexed = q.options.map((opt, idx) => ({
        text: opt,
        originalIndex: idx
      }));

      const shuffled = shuffleArray(indexed);
      const newCorrect = shuffled
        .map((item, newIdx) => (q.correctAnswers.includes(item.originalIndex) ? newIdx : -1))
        .filter(idx => idx !== -1);

      return {
        ...q,
        options: shuffled.map(s => s.text),
        correctAnswers: newCorrect
      };
    });
  };

  // Start Full Certification Mock Exam
  const handleStartMockExam = () => {
    let pool = [...allQuestions];
    if (settings.shuffleQuestions) {
      pool = shuffleArray(pool);
    }
    const selected = pool.slice(0, Math.min(settings.mockExamQuestionCount, pool.length));
    const prepared = prepareExamQuestions(selected);

    setActiveExam({
      questions: prepared,
      title: `EHE Full Mock Exam (${prepared.length} Questions)`,
      mode: 'full_mock',
      duration: settings.mockExamDurationMinutes
    });
    setReviewAttempt(null);
    setCurrentTab('exam');
  };

  // Start Module Drill
  const handleStartModuleDrill = (moduleId: ModuleId) => {
    const mod = EHE_MODULES.find(m => m.id === moduleId);
    let modQuestions = allQuestions.filter(q => q.moduleId === moduleId);
    if (modQuestions.length === 0) {
      alert('No questions currently available for this module.');
      return;
    }

    if (settings.shuffleQuestions) {
      modQuestions = shuffleArray(modQuestions);
    }
    const prepared = prepareExamQuestions(modQuestions);

    setActiveExam({
      questions: prepared,
      title: `Drill: ${mod?.title || moduleId}`,
      mode: 'module_drill',
      moduleId,
      duration: Math.max(15, prepared.length * 2) // ~2 mins per question
    });
    setReviewAttempt(null);
    setCurrentTab('exam');
  };

  // Start Missed Questions Drill
  const handleStartMissedDrill = () => {
    const missedIds = getMissedQuestionIds();
    const qMap = new Map(allQuestions.map(q => [q.id, q]));
    const missedQuestions = missedIds.map(id => qMap.get(id)).filter(Boolean) as Question[];

    if (missedQuestions.length === 0) {
      alert('Great job! You currently have zero missed questions.');
      return;
    }

    const shuffled = settings.shuffleQuestions ? shuffleArray(missedQuestions) : missedQuestions;
    const prepared = prepareExamQuestions(shuffled);

    setActiveExam({
      questions: prepared,
      title: `Missed Questions Retake (${prepared.length} Questions)`,
      mode: 'missed_drill',
      duration: Math.max(15, prepared.length * 2)
    });
    setReviewAttempt(null);
    setCurrentTab('exam');
  };

  // When Exam Finishes
  const handleFinishExam = (attempt: ExamAttempt) => {
    saveAttempt(attempt);
    refreshStorageData();
    setActiveExam(null);
    setReviewAttempt(attempt);
  };

  // Exit Exam prematurely
  const handleExitExam = () => {
    if (window.confirm('Are you sure you want to exit? Your progress in this session will not be saved.')) {
      setActiveExam(null);
      setCurrentTab('dashboard');
    }
  };

  // Retake Missed from Results view
  const handleRetakeMissedFromResults = () => {
    if (!reviewAttempt) return;
    const qMap = new Map(allQuestions.map(q => [q.id, q]));
    const missedList: Question[] = [];

    for (const qId of reviewAttempt.questionIds) {
      const q = reviewAttempt.questions?.find(item => item.id === qId) || qMap.get(qId);
      if (!q) continue;
      const userAns = reviewAttempt.userAnswers[qId] || [];
      const isCorrect =
        userAns.length === q.correctAnswers.length &&
        userAns.every(val => q.correctAnswers.includes(val));
      if (!isCorrect) {
        const canonicalQ = qMap.get(qId) || q;
        missedList.push(canonicalQ);
      }
    }

    if (missedList.length === 0) {
      alert('You answered all questions correctly in this exam!');
      return;
    }

    const prepared = prepareExamQuestions(shuffleArray(missedList));
    setActiveExam({
      questions: prepared,
      title: `Retake Missed: ${reviewAttempt.title}`,
      mode: 'missed_drill',
      duration: Math.max(10, prepared.length * 2)
    });
    setReviewAttempt(null);
    setCurrentTab('exam');
  };

  // Retake Full from Results view
  const handleRetakeFullFromResults = () => {
    if (!reviewAttempt) return;
    const qMap = new Map(allQuestions.map(q => [q.id, q]));
    const list = reviewAttempt.questionIds.map(id => qMap.get(id)).filter(Boolean) as Question[];
    const prepared = prepareExamQuestions(shuffleArray(list));

    setActiveExam({
      questions: prepared,
      title: reviewAttempt.title,
      mode: reviewAttempt.mode,
      moduleId: reviewAttempt.moduleId,
      duration: Math.round(reviewAttempt.totalTimeAllowedSeconds / 60) || settings.mockExamDurationMinutes
    });
    setReviewAttempt(null);
    setCurrentTab('exam');
  };

  const missedCount = getMissedQuestionIds().length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setReviewAttempt(null);
          setCurrentTab(tab);
        }}
        darkMode={settings.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isExamActive={activeExam !== null}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* If viewing Exam Results */}
        {reviewAttempt ? (
          <ExamResults
            attempt={reviewAttempt}
            allQuestions={allQuestions}
            onRetakeFull={handleRetakeFullFromResults}
            onRetakeMissed={handleRetakeMissedFromResults}
            onBackToDashboard={() => {
              setReviewAttempt(null);
              setCurrentTab('dashboard');
            }}
          />
        ) : activeExam ? (
          /* Active Exam Session */
          <ExamRunner
            questions={activeExam.questions}
            title={activeExam.title}
            mode={activeExam.mode}
            moduleId={activeExam.moduleId}
            totalDurationMinutes={activeExam.duration}
            onFinishExam={handleFinishExam}
            onExitExam={handleExitExam}
          />
        ) : (
          /* Main Navigation Tabs */
          <>
            {currentTab === 'dashboard' && (
              <Dashboard
                onStartMockExam={handleStartMockExam}
                onStartModuleDrill={handleStartModuleDrill}
                onStartMissedDrill={handleStartMissedDrill}
                onOpenFlashcards={() => setCurrentTab('flashcards')}
                onOpenModules={() => setCurrentTab('modules')}
                onOpenImporter={() => setCurrentTab('importer')}
                onReviewAttempt={(att) => setReviewAttempt(att)}
                attempts={attempts}
                missedCount={missedCount}
              />
            )}

            {currentTab === 'modules' && (
              <ModuleDrillSelector
                onStartDrill={handleStartModuleDrill}
                allQuestions={allQuestions}
              />
            )}

            {currentTab === 'flashcards' && (
              <FlashcardDeck />
            )}

            {currentTab === 'history' && (
              <HistoryAnalytics
                attempts={attempts}
                onReviewAttempt={(att) => setReviewAttempt(att)}
                onRefreshData={refreshStorageData}
              />
            )}

            {currentTab === 'importer' && (
              <StudyNotesImporter
                onQuestionAdded={refreshStorageData}
              />
            )}
          </>
        )}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  );
}
