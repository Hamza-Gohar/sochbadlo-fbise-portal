import React from 'react';
import { notFound } from 'next/navigation';
import { getChapterBySlug, getAllChapters } from '../../../lib/data';
import QuizEngine from '../../../components/QuizEngine';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: 'Chapter Not Found | SochBadlo Prep',
    };
  }

  let subjectName = 'Physics';
  if (chapter.subject === 'urdu') subjectName = 'Urdu';
  else if (chapter.subject === 'math') subjectName = 'Mathematics';
  else if (chapter.subject === 'english') subjectName = 'English';
  else if (chapter.subject === 'cs') subjectName = 'Computer Science';

  return {
    title: `${chapter.chapterTitle} | Class 11 ${subjectName} MCQs | SochBadlo Prep`,
    description: `Practice and timed test for FBISE Class 11th ${subjectName} ${chapter.chapterTitle} with ${chapter.totalQuestions} verified MCQs.`,
  };
}

export default async function ChapterTestPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { mode } = await searchParams;

  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const initialMode = mode === 'exam' ? 'exam' : 'practice';

  return <QuizEngine chapter={chapter} slug={slug} initialMode={initialMode} />;
}
