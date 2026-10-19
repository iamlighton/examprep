import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Check, 
  Bookmark, 
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { EHE_FLASHCARDS } from '../data/flashcards';
import { EHE_MODULES } from '../data/modules';
import { ModuleId } from '../types';

export const FlashcardDeck: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleId | 'all'>('all');
  const [cards, setCards] = useState(EHE_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Filter cards
  const filteredCards = selectedModule === 'all'
    ? cards
    : cards.filter(c => c.moduleId === selectedModule);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const handleToggleMastered = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds(prev => {
      const copy = new Set(prev);
      if (copy.has(cardId)) {
        copy.delete(cardId);
      } else {
        copy.add(cardId);
      }
      return copy;
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Flashcards & Key Concepts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quick-recall flashcards covering high-yield definitions, attack mechanics, and defenses
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedModule}
            onChange={(e) => {
              setSelectedModule(e.target.value as ModuleId | 'all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Modules ({EHE_FLASHCARDS.length} cards)</option>
            {EHE_MODULES.map(m => (
              <option key={m.id} value={m.id}>
                Mod {m.number}: {m.shortTitle}
              </option>
            ))}
          </select>

          <button
            onClick={handleShuffle}
            title="Shuffle Cards"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 hover:text-indigo-600 dark:text-slate-300 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-sm text-slate-500">No flashcards found for this module.</p>
        </div>
      ) : (
        <>
          {/* Card Counter & Mastered Badge */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {masteredIds.size} Mastered
              </span>
            </div>
          </div>

          {/* Interactive Card */}
          <div
            onClick={handleFlip}
            className="min-h-[320px] sm:min-h-[360px] bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex flex-col justify-between select-none relative group"
          >
            {/* Top Card Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                  {currentCard.topic}
                </span>
                <span className="text-xs text-slate-400">
                  {currentCard.moduleTitle.split(':')[0]}
                </span>
              </div>

              <button
                onClick={(e) => handleToggleMastered(currentCard.id, e)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  masteredIds.has(currentCard.id)
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                {masteredIds.has(currentCard.id) ? 'Mastered' : 'Mark Mastered'}
              </button>
            </div>

            {/* Center Content: Front vs Back */}
            <div className="py-6 sm:py-8 my-auto text-center">
              {!isFlipped ? (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Question / Scenario Term
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed max-w-xl mx-auto">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 text-left max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block text-center">
                    Answer & Concept Breakdown
                  </span>
                  <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {currentCard.back}
                  </div>
                  {currentCard.keyNote && (
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 text-center">
                      💡 {currentCard.keyNote}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Flip Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Click card to see question' : 'Click card to reveal answer'}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleFlip}
              className="px-5 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 transition-colors"
            >
              Flip Card
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
