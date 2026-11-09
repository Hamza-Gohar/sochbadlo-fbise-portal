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

  const isGrade10 = chapter.subject === 'math-10' || slug.startsWith('math-10');
  const isGrade9 =
    chapter.subject === 'physics-9' ||
    slug.startsWith('physics-9') ||
    chapter.subject === 'math-9' ||
    slug.startsWith('math-9') ||
    chapter.subject === 'urdu-9' ||
    slug.startsWith('urdu-9') ||
    chapter.subject === 'tarjuma-9' ||
    slug.startsWith('tarjuma-9') ||
    chapter.subject === 'english-9' ||
    slug.startsWith('english-9') ||
    chapter.subject === 'islamiat-9' ||
    slug.startsWith('islamiat-9') ||
    chapter.subject === 'chemistry-9' ||
    slug.startsWith('chemistry-9') ||
    chapter.subject === 'cs-9' ||
    slug.startsWith('cs-9') ||
    chapter.subject === 'biology-9' ||
    slug.startsWith('biology-9');
  let subjectName = 'Physics';
  if (isGrade10) subjectName = 'Mathematics (ریاضی)';
  else if (chapter.subject === 'urdu-9' || slug.startsWith('urdu-9')) subjectName = 'Urdu Compulsory (اردو لازمی)';
  else if (chapter.subject === 'tarjuma-9' || slug.startsWith('tarjuma-9')) subjectName = 'Tarjuma-tul-Quran (ترجمۃ القرآن المجید)';
  else if (chapter.subject === 'english-9' || slug.startsWith('english-9')) subjectName = 'English Compulsory';
  else if (chapter.subject === 'islamiat-9' || slug.startsWith('islamiat-9')) subjectName = 'Islamiat Compulsory (اسلامیات لازمی)';
  else if (chapter.subject === 'chemistry-9' || slug.startsWith('chemistry-9')) subjectName = 'Chemistry (کیمسٹری)';
  else if (chapter.subject === 'cs-9' || slug.startsWith('cs-9')) subjectName = 'Computer Science';
  else if (chapter.subject === 'biology-9' || slug.startsWith('biology-9')) subjectName = 'Biology (حیاتیات)';
  else if (chapter.subject === 'urdu') subjectName = 'Urdu';
  else if (chapter.subject === 'math') subjectName = 'Mathematics';
  else if (chapter.subject === 'math-9' || slug.startsWith('math-9')) subjectName = 'Mathematics';
  else if (chapter.subject === 'english') subjectName = 'English';
  else if (chapter.subject === 'cs') subjectName = 'Computer Science';
  else if (chapter.subject === 'islamiat') subjectName = 'Islamiat Compulsory (اسلامیات لازمی)';
  else if (chapter.subject === 'tarjuma') subjectName = 'Tarjuma-tul-Quran (ترجمۃ القرآن المجید)';
  else if (chapter.subject === 'biology') subjectName = 'Biology (حیاتیات)';
  else if (chapter.subject === 'chemistry') subjectName = 'Chemistry (کیمسٹری)';
  else if (chapter.subject === 'physics-9' || slug.startsWith('physics-9')) subjectName = 'Physics';

  const classLabel = isGrade10 ? 'Class 10 (SSC-II)' : isGrade9 ? 'Class 9 (SSC-I)' : 'Class 11 (HSSC-I)';

  return {
    title: `${chapter.chapterTitle} | ${classLabel} ${subjectName} MCQs | SochBadlo Prep`,
    description: `Practice and timed test for FBISE ${classLabel} ${subjectName} ${chapter.chapterTitle} with ${chapter.totalQuestions} verified MCQs.`,
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
