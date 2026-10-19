export type ModuleId =
  | 'mod-01'
  | 'mod-02'
  | 'mod-03'
  | 'mod-04'
  | 'mod-05'
  | 'mod-06'
  | 'mod-07'
  | 'mod-08'
  | 'mod-09'
  | 'mod-10'
  | 'mod-11'
  | 'mod-12';

export interface ModuleInfo {
  id: ModuleId;
  number: number;
  title: string;
  shortTitle: string;
  subTopics: string[];
  description: string;
  iconName: string;
}

export interface Question {
  id: string;
  moduleId: ModuleId;
  moduleTitle: string;
  subTopic: string;
  scenario?: string;
  questionText: string;
  options: string[];
  correctAnswers: number[]; // 0-based indices
  isMultiSelect?: boolean;
  explanation: string;
  keyTakeaway?: string;
  difficulty: 'Fundamental' | 'Intermediate' | 'Scenario';
  codeSnippet?: string;
  pageRef?: string;
}

export interface ExamAttempt {
  id: string;
  timestamp: number;
  mode: 'full_mock' | 'module_drill' | 'missed_drill' | 'custom_drill';
  title: string;
  moduleId?: ModuleId;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  totalTimeAllowedSeconds: number;
  questionIds: string[];
  questions?: Question[]; // Preserves exact option order and correct answer indices from the test session
  userAnswers: Record<string, number[]>; // questionId -> selected option indices
  flaggedQuestionIds: string[];
  moduleBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
}

export interface Flashcard {
  id: string;
  moduleId: ModuleId;
  moduleTitle: string;
  topic: string;
  front: string;
  back: string;
  keyNote?: string;
}

export interface AppSettings {
  mockExamQuestionCount: number;
  mockExamDurationMinutes: number;
  passingScorePercentage: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  darkMode: boolean;
}
