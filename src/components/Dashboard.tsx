import React from 'react';
import { 
  Play, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Flame,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  FileCheck2
} from 'lucide-react';
import { EHE_MODULES } from '../data/modules';
import { ExamAttempt, ModuleId } from '../types';

interface DashboardProps {
  onStartMockExam: () => void;
  onStartModuleDrill: (moduleId: ModuleId) => void;
  onStartMissedDrill: () => void;
  onOpenFlashcards: () => void;
  onOpenModules: () => void;
  onOpenImporter: () => void;
  onReviewAttempt: (attempt: ExamAttempt) => void;
  attempts: ExamAttempt[];
  missedCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartMockExam,
  onStartModuleDrill,
  onStartMissedDrill,
  onOpenFlashcards,
  onOpenModules,
  onOpenImporter,
  onReviewAttempt,
  attempts,
  missedCount
}) => {
  // Compute overall stats
  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter(a => a.passed).length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  
  const avgScore = totalAttempts > 0 
    ? Math.round(attempts.reduce((acc, a) => acc + a.scorePercentage, 0) / totalAttempts)
    : 0;

  const latestAttempt = attempts[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Exam Status Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              EC-Council Ethical Hacking Essentials (EHE / CEPS 5.0)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Certification Exam Readiness Hub
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Prepare with scenario-based practice questions covering all 12 modules, realistic 2-hour timed simulations, instant explanations, and unlimited retakes.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={onStartMockExam}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white" />
              Start Full Mock Exam
            </button>

            {missedCount > 0 && (
              <button
                onClick={onStartMissedDrill}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-semibold text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Missed ({missedCount})
              </button>
            )}
          </div>
        </div>

        {/* Readiness Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Passing Threshold</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">70%</span>
              <span className="text-xs text-slate-500">minimum</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Score</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-2xl font-bold ${
                avgScore >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
              }`}>
                {totalAttempts > 0 ? `${avgScore}%` : '—'}
              </span>
              {totalAttempts > 0 && (
                <span className="text-xs text-slate-500">
                  {avgScore >= 70 ? 'Passing' : 'Needs Work'}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Attempts</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalAttempts}</span>
              <span className="text-xs text-slate-500">completed</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Missed Pool</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{missedCount}</span>
              <span className="text-xs text-slate-500">to master</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Study Modes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={onOpenModules}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-xs"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Module-by-Module Drills
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Practice specific areas like Network Attacks, Web App Security, SQLi, or IoT/SCADA with instant feedback.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Browse 12 Modules</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={onOpenFlashcards}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-xs"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Terminology & Flashcards
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Quick-recall flashcards for Kill Chain steps, port numbers, attack definitions, and defensive countermeasures.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Study Flashcards</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={onOpenImporter}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-xs"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            PDF & Notes Importer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Drop your local EHE courseware PDF slides or paste lecture summaries to generate custom review cards offline.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Import Material</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* 12 Modules Curriculum Browser */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Official EHE Curriculum (12 Modules)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any domain below to begin a focused practice drill with detailed explanations
            </p>
          </div>
          <button 
            onClick={onOpenModules}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View Full Outline
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EHE_MODULES.map((mod) => (
            <div
              key={mod.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                    Module {mod.number.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {mod.subTopics.length} key topics
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {mod.shortTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                  {mod.subTopics[0]}
                </span>
                <button
                  onClick={() => onStartModuleDrill(mod.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Drill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attempts History */}
      {attempts.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recent Exam Attempts
            </h3>
            <span className="text-xs text-slate-500">
              Pass mark: 70%
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {attempts.slice(0, 3).map((att) => (
              <div key={att.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                    att.passed 
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  }`}>
                    {att.scorePercentage}%
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {att.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {new Date(att.timestamp).toLocaleDateString()} • {att.correctCount}/{att.totalQuestions} correct • {Math.round(att.timeSpentSeconds / 60)} mins
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    att.passed
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200'
                  }`}>
                    {att.passed ? 'PASSED' : 'FAILED'}
                  </span>
                  <button
                    onClick={() => onReviewAttempt(att)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1 font-medium"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
