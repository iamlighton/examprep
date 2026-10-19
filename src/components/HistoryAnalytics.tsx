import React, { useRef } from 'react';
import { 
  BarChart3, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award,
  AlertCircle
} from 'lucide-react';
import { ExamAttempt } from '../types';
import { 
  exportUserDataAsJSON, 
  importUserDataFromJSON, 
  deleteAttempt, 
  clearAllAttempts 
} from '../utils/storage';

interface HistoryAnalyticsProps {
  attempts: ExamAttempt[];
  onReviewAttempt: (attempt: ExamAttempt) => void;
  onRefreshData: () => void;
}

export const HistoryAnalytics: React.FC<HistoryAnalyticsProps> = ({
  attempts,
  onReviewAttempt,
  onRefreshData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter(a => a.passed).length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  const highestScore = totalAttempts > 0 ? Math.max(...attempts.map(a => a.scorePercentage)) : 0;
  const totalSeconds = attempts.reduce((acc, a) => acc + a.timeSpentSeconds, 0);

  const handleExport = () => {
    const jsonStr = exportUserDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ehe-study-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importUserDataFromJSON(content);
        if (success) {
          alert('Study data successfully imported!');
          onRefreshData();
        } else {
          alert('Invalid backup file. Please provide a valid EHE JSON export.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this attempt record?')) {
      deleteAttempt(id);
      onRefreshData();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all attempt history? This cannot be undone.')) {
      clearAllAttempts();
      onRefreshData();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Hidden file input for backup restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Header and Backup Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Attempt History & Study Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your progress across multiple retakes and manage local backups on your PC
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Backup (.json)
          </button>

          <button
            onClick={handleImportClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Import Backup
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Total Exams Taken</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalAttempts}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Pass Rate (≥70%)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-3xl font-extrabold ${passRate >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
              {totalAttempts > 0 ? `${passRate}%` : '—'}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Highest Score</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {totalAttempts > 0 ? `${highestScore}%` : '—'}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Total Study Time</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {Math.round(totalSeconds / 60)}
            </span>
            <span className="text-xs text-slate-500">mins</span>
          </div>
        </div>
      </div>

      {/* Attempts Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Completed Exam Log
          </h3>
          {attempts.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
            >
              Clear Log
            </button>
          )}
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No completed exams yet. Take your first Full Mock Exam or Module Drill to see your results!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Exam Title</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Questions</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 text-slate-500">
                      {new Date(att.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 font-semibold text-slate-800 dark:text-slate-200">
                      {att.title}
                    </td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                      {att.scorePercentage}%
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        att.passed
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}>
                        {att.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {att.correctCount}/{att.totalQuestions}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {Math.round(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => onReviewAttempt(att)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-colors"
                      >
                        Review
                      </button>
                      <button
                        onClick={(e) => handleDelete(att.id, e)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete attempt"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
