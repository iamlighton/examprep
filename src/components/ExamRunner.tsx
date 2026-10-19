import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Pause, 
  Play, 
  HelpCircle,
  Eye,
  EyeOff,
  Strikethrough,
  Grid
} from 'lucide-react';
import { Question, ExamAttempt, ModuleId } from '../types';

interface ExamRunnerProps {
  questions: Question[];
  title: string;
  mode: 'full_mock' | 'module_drill' | 'missed_drill' | 'custom_drill';
  moduleId?: ModuleId;
  totalDurationMinutes: number;
  onFinishExam: (attempt: ExamAttempt) => void;
  onExitExam: () => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  questions,
  title,
  mode,
  moduleId,
  totalDurationMinutes,
  onFinishExam,
  onExitExam
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number[]>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [struckOptions, setStruckOptions] = useState<Record<string, number[]>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(totalDurationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [instantReveal, setInstantReveal] = useState<Record<string, boolean>>({});

  const currentQuestion = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Format time
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle selection
  const handleSelectOption = (index: number) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;

    if (currentQuestion.isMultiSelect) {
      const current = userAnswers[qId] || [];
      const updated = current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index];
      setUserAnswers(prev => ({ ...prev, [qId]: updated }));
    } else {
      setUserAnswers(prev => ({ ...prev, [qId]: [index] }));
    }
  };

  // Toggle Strikethrough
  const handleToggleStrike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    const current = struckOptions[qId] || [];
    const updated = current.includes(index)
      ? current.filter(i => i !== index)
      : [...current, index];
    setStruckOptions(prev => ({ ...prev, [qId]: updated }));
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedIds(prev => {
      const copy = new Set(prev);
      if (copy.has(currentQuestion.id)) {
        copy.delete(currentQuestion.id);
      } else {
        copy.add(currentQuestion.id);
      }
      return copy;
    });
  };

  // Compute final score and return attempt
  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    const moduleBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};

    for (const q of questions) {
      // module tally
      if (!moduleBreakdown[q.moduleId]) {
        moduleBreakdown[q.moduleId] = { total: 0, correct: 0, percentage: 0 };
      }
      moduleBreakdown[q.moduleId].total += 1;

      const userSelected = userAnswers[q.id] || [];
      const correctAnswers = q.correctAnswers;
      const isCorrect =
        userSelected.length === correctAnswers.length &&
        userSelected.every(ans => correctAnswers.includes(ans));

      if (isCorrect) {
        correctCount += 1;
        moduleBreakdown[q.moduleId].correct += 1;
      }
    }

    // compute module percentages
    Object.keys(moduleBreakdown).forEach(mId => {
      const m = moduleBreakdown[mId];
      m.percentage = Math.round((m.correct / m.total) * 100);
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const passed = scorePercentage >= 70;
    const timeSpentSeconds = totalDurationMinutes * 60 - timeRemainingSeconds;

    const attempt: ExamAttempt = {
      id: 'att-' + Date.now(),
      timestamp: Date.now(),
      mode,
      title,
      moduleId,
      totalQuestions: questions.length,
      correctCount,
      scorePercentage,
      passed,
      timeSpentSeconds,
      totalTimeAllowedSeconds: totalDurationMinutes * 60,
      questionIds: questions.map(q => q.id),
      questions: questions,
      userAnswers,
      flaggedQuestionIds: Array.from(flaggedIds),
      moduleBreakdown
    };

    onFinishExam(attempt);
  }, [questions, userAnswers, flaggedIds, mode, title, moduleId, totalDurationMinutes, timeRemainingSeconds, onFinishExam]);

  const answeredCount = Object.keys(userAnswers).filter(
    id => userAnswers[id] && userAnswers[id].length > 0
  ).length;

  const isFlagged = currentQuestion ? flaggedIds.has(currentQuestion.id) : false;
  const currentStruck = currentQuestion ? (struckOptions[currentQuestion.id] || []) : [];
  const currentUserAns = currentQuestion ? (userAnswers[currentQuestion.id] || []) : [];
  const isRevealed = currentQuestion ? instantReveal[currentQuestion.id] : false;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Top Test Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {mode === 'full_mock' ? 'Full Mock Simulation' : 'Practice Drill'}
              </span>
              <span className="text-xs text-slate-500">
                Passing: 70%
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {title}
            </h2>
          </div>

          {/* Timer & Controls */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-sm font-semibold transition-colors ${
              timeRemainingSeconds <= 300 
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300' 
                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}>
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            <button
              onClick={() => setIsPaused(prev => !prev)}
              title={isPaused ? "Resume Exam" : "Pause Exam"}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowNavigator(prev => !prev)}
              className={`p-2.5 rounded-xl border text-sm font-medium flex items-center gap-1.5 transition-colors ${
                showNavigator
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Question Navigator"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Grid</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500 whitespace-nowrap">
            {answeredCount} of {questions.length} answered ({questions.length - answeredCount} remaining)
          </div>
        </div>
      </div>

      {/* Paused Overlay */}
      {isPaused && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 text-center space-y-3 mb-6">
          <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200">
            Exam Paused
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-300 max-w-md mx-auto">
            The exam timer is stopped. Take a breath, review your notes, or resume whenever you are ready.
          </p>
          <button
            onClick={() => setIsPaused(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors"
          >
            <Play className="w-4 h-4 fill-white" />
            Resume Test
          </button>
        </div>
      )}

      {/* Question Navigator Grid Drawer */}
      {showNavigator && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 mb-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Question Navigator ({questions.length} Questions)
            </h4>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Answered
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" /> Unanswered
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Flagged
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-2">
            {questions.map((q, idx) => {
              const isAns = (userAnswers[q.id] || []).length > 0;
              const isFlg = flaggedIds.has(q.id);
              const isCurrent = idx === currentIndex;

              let style = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
              if (isAns) {
                style = 'bg-indigo-600 text-white font-semibold';
              }
              if (isCurrent) {
                style += ' ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowNavigator(false);
                  }}
                  className={`h-9 rounded-lg text-xs font-medium relative flex items-center justify-center transition-all ${style}`}
                >
                  {idx + 1}
                  {isFlg && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Module / Subtopic Badges & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                {currentQuestion.moduleTitle}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                {currentQuestion.subTopic}
              </span>
            </div>

            <button
              onClick={handleToggleFlag}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isFlagged
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
            </button>
          </div>

          {/* Scenario Box (if scenario exists) */}
          {currentQuestion.scenario && (
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                Scenario Background
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                {currentQuestion.scenario}
              </p>
            </div>
          )}

          {/* Main Question Statement */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.questionText}
            </h3>
            {currentQuestion.isMultiSelect && (
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                (Multiple Choice: Select all options that apply)
              </p>
            )}
          </div>

          {/* Code or Technical Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-xs sm:text-sm font-mono border border-slate-800">
              <pre>{currentQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* Answer Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((optionText, optIdx) => {
              const isSelected = currentUserAns.includes(optIdx);
              const isStruck = currentStruck.includes(optIdx);
              const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

              let borderStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700';
              let bgStyle = 'bg-white dark:bg-slate-900';

              if (isSelected) {
                borderStyle = 'border-indigo-600 dark:border-indigo-500 ring-1 ring-indigo-600 dark:ring-indigo-500';
                bgStyle = 'bg-indigo-50/50 dark:bg-indigo-950/40';
              }

              if (isStruck) {
                bgStyle = 'bg-slate-50/70 dark:bg-slate-900/40 opacity-50';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`border rounded-xl p-3.5 sm:p-4 flex items-start justify-between gap-3 cursor-pointer transition-all select-none ${borderStyle} ${bgStyle}`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Option Badge */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {optionLetter}
                    </div>

                    <span className={`text-sm sm:text-base leading-relaxed ${
                      isStruck 
                        ? 'line-through text-slate-400 dark:text-slate-500' 
                        : isSelected 
                          ? 'text-slate-900 dark:text-white font-medium' 
                          : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {optionText}
                    </span>
                  </div>

                  {/* Strikethrough Elimination Tool */}
                  <button
                    onClick={(e) => handleToggleStrike(optIdx, e)}
                    title={isStruck ? "Restore option" : "Strike through (eliminate)"}
                    className={`p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 ${
                      isStruck ? 'text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    <Strikethrough className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Drill Mode: Instant Feedback Explanation Box */}
          {mode !== 'full_mock' && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              {!isRevealed ? (
                <button
                  onClick={() => setInstantReveal(prev => ({ ...prev, [currentQuestion.id]: true }))}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Show Explanation & Answer (Drill Mode)
                </button>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Correct Answer: {currentQuestion.correctAnswers.map(idx => String.fromCharCode(65 + idx)).join(', ')}
                    </span>
                    <button
                      onClick={() => setInstantReveal(prev => ({ ...prev, [currentQuestion.id]: false }))}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Hide
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.keyTakeaway && (
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
                      Key Takeaway: {currentQuestion.keyTakeaway}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bottom Bar: Prev / Next / Submit */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentIndex === 0
                  ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Finish Exam
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ready to Submit Your Exam?
            </h3>
            
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Total Questions</span>
                <span className="font-semibold text-slate-900 dark:text-white">{questions.length}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Answered</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Unanswered</span>
                <span className={`font-semibold ${
                  questions.length - answeredCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                }`}>
                  {questions.length - answeredCount}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Flagged for Review</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{flaggedIds.size}</span>
              </div>
            </div>

            {questions.length - answeredCount > 0 && (
              <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
                Warning: You have {questions.length - answeredCount} unanswered questions. Unanswered questions will be scored as incorrect.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Back to Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmit();
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
              >
                Confirm & Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
