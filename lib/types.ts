export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export type SubjectId =
  | 'physics'
  | 'urdu'
  | 'math'
  | 'english'
  | 'cs'
  | 'islamiat'
  | 'tarjuma'
  | 'biology'
  | 'chemistry'
  | 'physics-9'
  | 'math-9'
  | 'urdu-9'
  | 'tarjuma-9'
  | 'english-9'
  | 'islamiat-9'
  | 'chemistry-9'
  | 'cs-9'
  | 'biology-9'
  | 'math-10'
  | 'physics-10'
  | 'chemistry-10';

export interface ChapterData {
  chapterNumber: number;
  chapterTitle: string;
  totalQuestions: number;
  questions: Question[];
  subject?: SubjectId;
  grade?: '9' | '10' | '11';
}

export interface ChapterMeta {
  chapterNumber: number;
  title: string;
  slug: string;
  totalQuestions: number;
  fileName: string;
  subject?: SubjectId;
  grade?: '9' | '10' | '11';
}

export interface QuizResult {
  chapterSlug: string;
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  completedAt: string;
  answers: Record<number, string>;
}
