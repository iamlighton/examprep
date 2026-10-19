import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Award, 
  Clock, 
  Target, 
  ChevronDown, 
  ChevronUp,
  Bookmark,
  Share2,
  Flag,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamAttempt, Question, ModuleId } from '../types';
import { EHE_MODULES } from '../data/modules';
import { toggleBookmarkQuestion, getBookmarkedQuestionIds } from '../utils/storage';

interface ExamResultsProps {
  attempt: ExamAttempt;
  allQuestions: Question[];
  onRetakeFull: () => void;
  onRetakeMissed: () => void;
  onBackToDashboard: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  attempt,
  allQuestions,
  onRetakeFull,
  onRetakeMissed,
  onBackToDashboard
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarkedQuestionIds());
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  // Fire celebratory confetti if passed
  useEffect(() => {
    if (attempt.passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [attempt.passed]);

  const questionsMap = new Map(allQuestions.map(q => [q.id, q]));
  const examQuestions = (attempt.questions && attempt.questions.length > 0)
    ? attempt.questions
    : (attempt.questionIds.map(id => questionsMap.get(id)).filter(Boolean) as Question[]);

  const handleToggleBookmark = (qId: string) => {
    toggleBookmarkQuestion(qId);
    setBookmarkedIds(getBookmarkedQuestionIds());
  };

  const toggleExplanation = (qId: string) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const filteredQuestions = examQuestions.filter(q => {
    const userSelected = attempt.userAnswers[q.id] || [];
    const isCorrect =
      userSelected.length === q.correctAnswers.length &&
      userSelected.every(ans => q.correctAnswers.includes(ans));

    if (filter === 'incorrect') {
      return !isCorrect;
    }
    if (filter === 'flagged') {
      return attempt.flaggedQuestionIds.includes(q.id);
    }
    return true;
  });

  const incorrectCount = attempt.totalQuestions - attempt.correctCount;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back button */}
      <button
        onClick={onBackToDashboard}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Main Score Result Card */}
      <div className={`border rounded-2xl p-6 sm:p-8 shadow-sm transition-colors ${
        attempt.passed
          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
          : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              {attempt.passed ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passing Grade Achieved
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Additional Practice Recommended
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {attempt.passed ? 'Congratulations! You Passed' : 'Keep Pushing! Almost There'}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              {attempt.passed
                ? 'Your score meets the EC-Council Ethical Hacking Essentials minimum passing requirement (70%). Great job reviewing the scenarios!'
                : `You scored ${attempt.scorePercentage}%. The official passing requirement is 70%. Review your missed questions below and retake the test to master these concepts.`}
            </p>
          </div>

          {/* Big Score Ring / Box */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shrink-0 shadow-xs">
            <div className="text-center">
              <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                attempt.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {attempt.scorePercentage}%
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {attempt.correctCount} / {attempt.totalQuestions} Correct
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-500">Time Taken</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Missed Questions</span>
            <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-0.5">
              {incorrectCount}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Flagged for Review</span>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {attempt.flaggedQuestionIds.length}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          {incorrectCount > 0 && (
            <button
              onClick={onRetakeMissed}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Only Missed ({incorrectCount})
            </button>
          )}

          <button
            onClick={onRetakeFull}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Entire Exam
          </button>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Module Breakdown Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Performance by EHE Module
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(attempt.moduleBreakdown).map(([modId, data]) => {
            const modInfo = EHE_MODULES.find(m => m.id === modId);
            const isPassing = data.percentage >= 70;

            return (
              <div key={modId} className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {modInfo?.shortTitle || modId}
                  </span>
                  <span className={`text-xs font-bold ${
                    isPassing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {data.percentage}% ({data.correct}/{data.total})
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isPassing ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review Section with Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Detailed Question Review
            </h3>
            <p className="text-xs text-slate-500">
              Analyze correct choices and explanations for each question
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({examQuestions.length})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'incorrect'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Incorrect ({incorrectCount})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'flagged'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Flagged ({attempt.flaggedQuestionIds.length})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, qIndex) => {
            const userSelected = attempt.userAnswers[q.id] || [];
            const isCorrect =
              userSelected.length === q.correctAnswers.length &&
              userSelected.every(ans => q.correctAnswers.includes(ans));
            const isBookmarked = bookmarkedIds.includes(q.id);
            const isFlagged = attempt.flaggedQuestionIds.includes(q.id);
            const isExpanded = expandedExplanations[q.id] !== false; // expanded by default

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 sm:p-6 shadow-xs transition-colors ${
                  isCorrect
                    ? 'border-slate-200/90 dark:border-slate-800'
                    : 'border-rose-200 dark:border-rose-900/60'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Question {qIndex + 1}
                    </span>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                      {q.moduleTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isFlagged && (
                      <span className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                        <Flag className="w-3 h-3 fill-amber-500" /> Flagged
                      </span>
                    )}

                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Scenario */}
                {q.scenario && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] block mb-1">
                      Scenario
                    </span>
                    {q.scenario}
                  </div>
                )}

                {/* Question Statement */}
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white my-3">
                  {q.questionText}
                </h4>

                {/* Technical Code Snippet */}
                {q.codeSnippet && (
                  <div className="bg-slate-900 text-slate-100 rounded-lg p-3 my-3 text-xs font-mono overflow-x-auto">
                    <pre>{q.codeSnippet}</pre>
                  </div>
                )}

                {/* Options List with status */}
                <div className="space-y-2 my-4">
                  {q.options.map((optText, optIdx) => {
                    const isSelected = userSelected.includes(optIdx);
                    const isCorrectOption = q.correctAnswers.includes(optIdx);
                    const optionLetter = String.fromCharCode(65 + optIdx);

                    let cardClass = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                    let badgeClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600';

                    if (isCorrectOption) {
                      cardClass = 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 font-medium';
                      badgeClass = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isCorrectOption) {
                      cardClass = 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 line-through';
                      badgeClass = 'bg-rose-600 text-white';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`border rounded-xl p-3 flex items-center justify-between gap-3 text-xs sm:text-sm ${cardClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${badgeClass}`}>
                            {optionLetter}
                          </span>
                          <span>{optText}</span>
                        </div>

                        <div>
                          {isCorrectOption && (
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer
                            </span>
                          )}
                          {isSelected && !isCorrectOption && (
                            <span className="text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Your Choice
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="flex items-center justify-between w-full text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline py-1"
                  >
                    <span>Explanation & Courseware Notes</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 border border-slate-200/60 dark:border-slate-700/60">
                      <p className="leading-relaxed">{q.explanation}</p>
                      {q.keyTakeaway && (
                        <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 pt-1">
                          Key Exam Rule: {q.keyTakeaway}
                        </div>
                      )}
                      {q.pageRef && (
                        <div className="text-[11px] text-slate-400">
                          Courseware Reference: {q.pageRef}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
