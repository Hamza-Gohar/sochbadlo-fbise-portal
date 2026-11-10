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

  const isGrade12 =
    chapter.subject === 'chemistry-12' ||
    slug.startsWith('chemistry-12') ||
    chapter.subject === 'cs-12' ||
    slug.startsWith('cs-12') ||
    chapter.subject === 'biology-12' ||
    slug.startsWith('biology-12') ||
    chapter.subject === 'physics-12' ||
    slug.startsWith('physics-12') ||
    chapter.subject === 'english-12' ||
    slug.startsWith('english-12') ||
    chapter.subject === 'urdu-12' ||
    slug.startsWith('urdu-12') ||
    chapter.subject === 'pakstudies-12' ||
    slug.startsWith('pakstudies-12') ||
    chapter.subject === 'tarjuma-12' ||
    slug.startsWith('tarjuma-12') ||
    chapter.subject === 'math-12' ||
    slug.startsWith('math-12');
  const isGrade10 =
    chapter.subject === 'pakstudies-10' ||
    slug.startsWith('pakstudies-10') ||
    chapter.subject === 'urdu-10' ||
    slug.startsWith('urdu-10') ||
    chapter.subject === 'tarjuma-10' ||
    slug.startsWith('tarjuma-10') ||
    chapter.subject === 'english-10' ||
    slug.startsWith('english-10') ||
    chapter.subject === 'biology-10' ||
    slug.startsWith('biology-10') ||
    chapter.subject === 'math-10' ||
    slug.startsWith('math-10') ||
    chapter.subject === 'physics-10' ||
    slug.startsWith('physics-10') ||
    chapter.subject === 'chemistry-10' ||
    slug.startsWith('chemistry-10') ||
    chapter.subject === 'cs-10' ||
    slug.startsWith('cs-10');
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
  if (chapter.subject === 'chemistry-12' || slug.startsWith('chemistry-12')) subjectName = 'Chemistry (کیمسٹری)';
  else if (chapter.subject === 'cs-12' || slug.startsWith('cs-12')) subjectName = 'Computer Science (کمپیوٹر سائنس)';
  else if (chapter.subject === 'biology-12' || slug.startsWith('biology-12')) subjectName = 'Biology (حیاتیات)';
  else if (chapter.subject === 'physics-12' || slug.startsWith('physics-12')) subjectName = 'Physics (فزکس)';
  else if (chapter.subject === 'math-12' || slug.startsWith('math-12')) subjectName = 'Mathematics (ریاضی)';
  else if (chapter.subject === 'english-12' || slug.startsWith('english-12')) subjectName = 'English Compulsory';
  else if (chapter.subject === 'urdu-12' || slug.startsWith('urdu-12')) subjectName = 'Urdu Compulsory (اردو لازمی)';
  else if (chapter.subject === 'pakstudies-12' || slug.startsWith('pakstudies-12')) subjectName = 'Pakistan Studies (مطالعہ پاکستان)';
  else if (chapter.subject === 'tarjuma-12' || slug.startsWith('tarjuma-12')) subjectName = 'Tarjuma-tul-Quran (ترجمۃ القرآن المجید)';
  else if (chapter.subject === 'pakstudies-10' || slug.startsWith('pakstudies-10')) subjectName = 'Pakistan Studies (مطالعہ پاکستان)';
  else if (chapter.subject === 'urdu-10' || slug.startsWith('urdu-10')) subjectName = 'Urdu Compulsory (اردو لازمی)';
  else if (chapter.subject === 'tarjuma-10' || slug.startsWith('tarjuma-10')) subjectName = 'Tarjuma-tul-Quran (ترجمۃ القرآن المجید)';
  else if (chapter.subject === 'english-10' || slug.startsWith('english-10')) subjectName = 'English Compulsory (انگریزی لازمی)';
  else if (chapter.subject === 'biology-10' || slug.startsWith('biology-10')) subjectName = 'Biology (حیاتیات)';
  else if (chapter.subject === 'cs-10' || slug.startsWith('cs-10')) subjectName = 'Computer Science (کمپیوٹر سائنس)';
  else if (chapter.subject === 'chemistry-10' || slug.startsWith('chemistry-10')) subjectName = 'Chemistry (کیمسٹری)';
  else if (chapter.subject === 'physics-10' || slug.startsWith('physics-10')) subjectName = 'Physics (فزکس)';
  else if (chapter.subject === 'math-10' || slug.startsWith('math-10')) subjectName = 'Mathematics (ریاضی)';
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

  const classLabel = isGrade12 ? 'Class 12 (HSSC-II)' : isGrade10 ? 'Class 10 (SSC-II)' : isGrade9 ? 'Class 9 (SSC-I)' : 'Class 11 (HSSC-I)';

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
