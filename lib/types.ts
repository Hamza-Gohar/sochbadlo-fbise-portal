export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    [key: string]: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  answer?: string;
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
  | 'chemistry-10'
  | 'cs-10'
  | 'biology-10'
  | 'english-10'
  | 'pakstudies-10'
  | 'urdu-10'
  | 'tarjuma-10'
  | 'english-12'
  | 'urdu-12'
  | 'pakstudies-12'
  | 'tarjuma-12'
  | 'physics-12'
  | 'math-12'
  | 'cs-12'
  | 'biology-12'
  | 'chemistry-12';

export interface ChapterData {
  chapterNumber: number;
  chapterTitle: string;
  totalQuestions: number;
  questions: Question[];
  subject?: SubjectId;
  grade?: '9' | '10' | '11' | '12';
}

export interface ChapterMeta {
  chapterNumber: number;
  title: string;
  slug: string;
  totalQuestions: number;
  fileName: string;
  subject?: SubjectId;
  grade?: '9' | '10' | '11' | '12';
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
