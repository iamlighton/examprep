import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  AlertTriangle, 
  KeyRound, 
  Users, 
  Network, 
  Globe, 
  Wifi, 
  Smartphone, 
  Cpu, 
  Cloud, 
  FileCheck,
  Play,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { EHE_MODULES } from '../data/modules';
import { ModuleId, Question } from '../types';

interface ModuleDrillSelectorProps {
  onStartDrill: (moduleId: ModuleId) => void;
  allQuestions: Question[];
}

// Icon mapper
const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    case 'Terminal': return <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    case 'KeyRound': return <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    case 'Users': return <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
    case 'Network': return <Network className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
    case 'Globe': return <Globe className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
    case 'Wifi': return <Wifi className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
    case 'Cloud': return <Cloud className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    case 'FileCheck': return <FileCheck className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
    default: return <BookOpen className="w-5 h-5 text-indigo-600" />;
  }
};

export const ModuleDrillSelector: React.FC<ModuleDrillSelectorProps> = ({
  onStartDrill,
  allQuestions
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Module-by-Module Practice Drills
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Master each domain individually with focused drills and instant answer breakdowns mapped to your courseware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EHE_MODULES.map((mod) => {
          const modQuestions = allQuestions.filter(q => q.moduleId === mod.id);

          return (
            <div
              key={mod.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {getModuleIcon(mod.iconName)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Module {mod.number.toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                        {mod.shortTitle}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {modQuestions.length} Questions
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {mod.description}
                </p>

                {/* Subtopic Highlights */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-1 border border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Topics Covered
                  </span>
                  {mod.subTopics.slice(0, 3).map((sub, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                      <span className="text-indigo-500 font-bold shrink-0">•</span>
                      <span className="line-clamp-1">{sub}</span>
                    </div>
                  ))}
                  {mod.subTopics.length > 3 && (
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      +{mod.subTopics.length - 3} more topics in this module
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                <button
                  onClick={() => onStartDrill(mod.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-white text-xs font-semibold transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Start Module Drill
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
