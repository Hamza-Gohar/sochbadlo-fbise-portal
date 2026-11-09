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

export interface ChapterData {
  chapterNumber: number;
  chapterTitle: string;
  totalQuestions: number;
  questions: Question[];
  subject?: 'physics' | 'urdu' | 'math';
}

export interface ChapterMeta {
  chapterNumber: number;
  title: string;
  slug: string;
  totalQuestions: number;
  fileName: string;
  subject?: 'physics' | 'urdu' | 'math';
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
