import { ExamAttempt, Question, AppSettings } from '../types';
import { EHE_QUESTIONS } from '../data/questions';

const ATTEMPTS_KEY = 'ehe_exam_attempts_v1';
const BOOKMARKS_KEY = 'ehe_bookmarked_questions_v1';
const CUSTOM_QUESTIONS_KEY = 'ehe_custom_questions_v1';
const SETTINGS_KEY = 'ehe_app_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  mockExamQuestionCount: 20, // default practice mock size, configurable up to 75
  mockExamDurationMinutes: 45, // default timer
  passingScorePercentage: 70, // EC-Council standard
  shuffleQuestions: true,
  shuffleOptions: true,
  darkMode: false
};

export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
}

export function getStoredAttempts(): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAttempt(attempt: ExamAttempt): void {
  try {
    const attempts = getStoredAttempts();
    attempts.unshift(attempt); // latest first
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error('Failed to save attempt', e);
  }
}

export function deleteAttempt(id: string): void {
  try {
    const attempts = getStoredAttempts().filter(a => a.id !== id);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error('Failed to delete attempt', e);
  }
}

export function clearAllAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch (e) {
    console.error('Failed to clear attempts', e);
  }
}

export function getBookmarkedQuestionIds(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function toggleBookmarkQuestion(questionId: string): boolean {
  try {
    const current = getBookmarkedQuestionIds();
    let updated: string[];
    let isBookmarked = false;
    if (current.includes(questionId)) {
      updated = current.filter(id => id !== questionId);
      isBookmarked = false;
    } else {
      updated = [...current, questionId];
      isBookmarked = true;
    }
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return isBookmarked;
  } catch {
    return false;
  }
}

export function getCustomQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomQuestion(question: Question): void {
  try {
    const questions = getCustomQuestions();
    questions.push(question);
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save custom question', e);
  }
}

export function getAllQuestions(): Question[] {
  return [...EHE_QUESTIONS, ...getCustomQuestions()];
}

export function getMissedQuestionIds(): string[] {
  const attempts = getStoredAttempts();
  const missedSet = new Set<string>();

  for (const attempt of attempts) {
    const allQ = getAllQuestions();
    const qMap = new Map(allQ.map(q => [q.id, q]));

    for (const qId of attempt.questionIds) {
      const q = attempt.questions?.find(item => item.id === qId) || qMap.get(qId);
      if (!q) continue;
      const userAns = attempt.userAnswers[qId] || [];
      const correct = q.correctAnswers;
      const isCorrect =
        userAns.length === correct.length &&
        userAns.every(val => correct.includes(val));
      if (!isCorrect) {
        missedSet.add(qId);
      }
    }
  }

  return Array.from(missedSet);
}

// Export / Import data for local backup
export function exportUserDataAsJSON(): string {
  const data = {
    exportDate: new Date().toISOString(),
    attempts: getStoredAttempts(),
    bookmarks: getBookmarkedQuestionIds(),
    customQuestions: getCustomQuestions(),
    settings: getStoredSettings()
  };
  return JSON.stringify(data, null, 2);
}

export function importUserDataFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.attempts && Array.isArray(parsed.attempts)) {
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(parsed.attempts));
    }
    if (parsed.bookmarks && Array.isArray(parsed.bookmarks)) {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(parsed.bookmarks));
    }
    if (parsed.customQuestions && Array.isArray(parsed.customQuestions)) {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(parsed.customQuestions));
    }
    if (parsed.settings && typeof parsed.settings === 'object') {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(parsed.settings));
    }
    return true;
  } catch (e) {
    console.error('Failed to import data', e);
    return false;
  }
}
