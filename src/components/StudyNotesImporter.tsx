import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Check, 
  Plus, 
  BookOpen, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Question, ModuleId } from '../types';
import { EHE_MODULES } from '../data/modules';
import { saveCustomQuestion } from '../utils/storage';

interface StudyNotesImporterProps {
  onQuestionAdded: () => void;
}

export const StudyNotesImporter: React.FC<StudyNotesImporterProps> = ({
  onQuestionAdded
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedModule, setSelectedModule] = useState<ModuleId>('mod-01');
  const [fileName, setFileName] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [parsedItems, setParsedItems] = useState<{ concept: string; details: string }[]>([]);

  // Manual Question Creator State
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newScenario, setNewScenario] = useState('');
  const [newOptionA, setNewOptionA] = useState('');
  const [newOptionB, setNewOptionB] = useState('');
  const [newOptionC, setNewOptionC] = useState('');
  const [newOptionD, setNewOptionD] = useState('');
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');

  // Handle local text file or PDF drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined;
    if ('dataTransfer' in e) {
      e.preventDefault();
      file = e.dataTransfer.files[0];
    } else if (e.target.files) {
      file = e.target.files[0];
    }

    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setInputText(text.slice(0, 10000)); // preview
        extractConcepts(text);
        setStatusMessage(`Loaded "${file.name}" successfully! Extracted key study concepts below.`);
      }
    };

    // If text file
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.readAsText(file);
    } else {
      // For binary/PDF files in browser without external worker, read as text stream to parse ASCII slide blocks
      reader.readAsText(file);
    }
  };

  const extractConcepts = (text: string) => {
    // Simple high-yield concept extractor looking for definitions or bullet points
    const lines = text.split('\n').filter(l => l.trim().length > 10);
    const concepts: { concept: string; details: string }[] = [];

    for (let i = 0; i < Math.min(lines.length, 15); i++) {
      const line = lines[i].trim();
      if (line.includes(':') || line.includes('-') || line.startsWith('•')) {
        const parts = line.split(/[:\-–—]/);
        if (parts.length >= 2) {
          concepts.push({
            concept: parts[0].replace(/[•*#]/g, '').trim(),
            details: parts.slice(1).join(' ').trim()
          });
        }
      }
    }

    setParsedItems(concepts);
  };

  const handleSaveCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !newOptionA || !newOptionB || !newOptionC || !newOptionD) {
      alert('Please fill out all 4 options and the question prompt.');
      return;
    }

    const mod = EHE_MODULES.find(m => m.id === selectedModule);

    const customQ: Question = {
      id: 'custom-' + Date.now(),
      moduleId: selectedModule,
      moduleTitle: mod?.title || 'Custom Study Question',
      subTopic: mod?.subTopics[0] || 'User Slide Material',
      scenario: newScenario.trim() || undefined,
      questionText: newQuestionText.trim(),
      options: [newOptionA.trim(), newOptionB.trim(), newOptionC.trim(), newOptionD.trim()],
      correctAnswers: [correctOptionIndex],
      explanation: newExplanation.trim() || 'Custom question saved from user study notes.',
      difficulty: newScenario ? 'Scenario' : 'Fundamental'
    };

    saveCustomQuestion(customQ);
    onQuestionAdded();
    setStatusMessage('Custom question saved and added to your exam pool!');
    
    // Reset form
    setNewQuestionText('');
    setNewScenario('');
    setNewOptionA('');
    setNewOptionB('');
    setNewOptionC('');
    setNewOptionD('');
    setNewExplanation('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          PDF & Lecture Notes Study Importer
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Import your downloaded courseware slides (`EHE - Module 1.pdf`, etc.) or paste lecture notes to customize your exam bank.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4" />
          {statusMessage}
        </div>
      )}

      {/* Local Drag & Drop Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-8 text-center transition-colors cursor-pointer"
        onClick={() => document.getElementById('notes-file-input')?.click()}
      >
        <input
          id="notes-file-input"
          type="file"
          accept=".pdf,.txt,.md,.doc"
          onChange={handleFileDrop}
          className="hidden"
        />
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Drop your EHE Courseware PDF or notes here
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
          Click to browse or drag and drop your `EHE - Module 1.pdf` or lecture notes. Processes completely offline on your computer.
        </p>
        {fileName && (
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Selected: {fileName}
          </span>
        )}
      </div>

      {/* Extracted Concepts Preview */}
      {parsedItems.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Extracted Key Terms from {fileName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {parsedItems.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-0.5">
                  {item.concept}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Scenario / Question Creator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Add Custom Exam Question from Courseware
          </h3>
          <p className="text-xs text-slate-500">
            Add questions directly from your slides to test yourself during mock exams.
          </p>
        </div>

        <form onSubmit={handleSaveCustomQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value as ModuleId)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {EHE_MODULES.map(m => (
                <option key={m.id} value={m.id}>
                  Module {m.number}: {m.shortTitle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Scenario (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. A security analyst at a healthcare facility discovers unauthorized SMB traffic..."
              value={newScenario}
              onChange={(e) => setNewScenario(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Question Prompt *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Which regulatory standard mandates 72-hour breach notification?"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Option A {correctOptionIndex === 0 && <span className="text-emerald-500">(Correct)</span>}
              </label>
              <input
                type="text"
                required
                value={newOptionA}
                onChange={(e) => setNewOptionA(e.target.value)}
                placeholder="Option A text"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Option B {correctOptionIndex === 1 && <span className="text-emerald-500">(Correct)</span>}
              </label>
              <input
                type="text"
                required
                value={newOptionB}
                onChange={(e) => setNewOptionB(e.target.value)}
                placeholder="Option B text"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Option C {correctOptionIndex === 2 && <span className="text-emerald-500">(Correct)</span>}
              </label>
              <input
                type="text"
                required
                value={newOptionC}
                onChange={(e) => setNewOptionC(e.target.value)}
                placeholder="Option C text"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Option D {correctOptionIndex === 3 && <span className="text-emerald-500">(Correct)</span>}
              </label>
              <input
                type="text"
                required
                value={newOptionD}
                onChange={(e) => setNewOptionD(e.target.value)}
                placeholder="Option D text"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Which option is correct?
            </label>
            <div className="flex gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {['A', 'B', 'C', 'D'].map((letter, idx) => (
                <label key={letter} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="correct-option"
                    checked={correctOptionIndex === idx}
                    onChange={() => setCorrectOptionIndex(idx)}
                    className="accent-indigo-600"
                  />
                  <span>Option {letter}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Explanation & Key Takeaway
            </label>
            <textarea
              rows={2}
              placeholder="Explain why this answer is correct and why other choices are wrong..."
              value={newExplanation}
              onChange={(e) => setNewExplanation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              Save Question to Question Bank
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
