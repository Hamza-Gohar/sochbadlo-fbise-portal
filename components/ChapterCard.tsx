'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChapterMeta } from '../lib/types';
import { Play, Sparkles, CheckCircle } from 'lucide-react';

interface ChapterCardProps {
  chapter: ChapterMeta;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const [bestScore, setBestScore] = useState<{ score: number; total: number; percentage: number } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`score_${chapter.slug}`);
      if (stored) {
        setBestScore(JSON.parse(stored));
      }
    } catch {
      // Local storage not available
    }
  }, [chapter.slug]);

  const isPhysics9 = chapter.subject === 'physics-9' || chapter.slug.startsWith('physics-9');
  const isPhysics10 = chapter.subject === 'physics-10' || chapter.slug.startsWith('physics-10');
  const isMath9 = chapter.subject === 'math-9' || chapter.slug.startsWith('math-9');
  const isMath10 = chapter.subject === 'math-10' || chapter.slug.startsWith('math-10');
  const isUrdu9 = chapter.subject === 'urdu-9' || chapter.slug.startsWith('urdu-9');
  const isTarjuma9 = chapter.subject === 'tarjuma-9' || chapter.slug.startsWith('tarjuma-9');
  const isEnglish9 = chapter.subject === 'english-9' || chapter.slug.startsWith('english-9');
  const isIslamiat9 = chapter.subject === 'islamiat-9' || chapter.slug.startsWith('islamiat-9');
  const isChemistry9 = chapter.subject === 'chemistry-9' || chapter.slug.startsWith('chemistry-9');
  const isChemistry10 = chapter.subject === 'chemistry-10' || chapter.slug.startsWith('chemistry-10');
  const isCS9 = chapter.subject === 'cs-9' || chapter.slug.startsWith('cs-9');
  const isCS10 = chapter.subject === 'cs-10' || chapter.slug.startsWith('cs-10');
  const isBiology9 = chapter.subject === 'biology-9' || chapter.slug.startsWith('biology-9');
  const isBiology10 = chapter.subject === 'biology-10' || chapter.slug.startsWith('biology-10');
  const isEnglish10 = chapter.subject === 'english-10' || chapter.slug.startsWith('english-10');
  const isPakStudies10 = chapter.subject === 'pakstudies-10' || chapter.slug.startsWith('pakstudies-10');
  const isUrdu10 = chapter.subject === 'urdu-10' || chapter.slug.startsWith('urdu-10');
  const isTarjuma10 = chapter.subject === 'tarjuma-10' || chapter.slug.startsWith('tarjuma-10');
  const isEnglish12 = chapter.subject === 'english-12' || chapter.slug.startsWith('english-12');
  const isUrdu12 = chapter.subject === 'urdu-12' || chapter.slug.startsWith('urdu-12');
  const isPakStudies12 = chapter.subject === 'pakstudies-12' || chapter.slug.startsWith('pakstudies-12');
  const isTarjuma12 = chapter.subject === 'tarjuma-12' || chapter.slug.startsWith('tarjuma-12');
  const isPhysics12 = chapter.subject === 'physics-12' || chapter.slug.startsWith('physics-12');
  const isMath12 = chapter.subject === 'math-12' || chapter.slug.startsWith('math-12');
  const isCS12 = chapter.subject === 'cs-12' || chapter.slug.startsWith('cs-12');
  const isBiology12 = chapter.subject === 'biology-12' || chapter.slug.startsWith('biology-12');
  const isChemistry12 = chapter.subject === 'chemistry-12' || chapter.slug.startsWith('chemistry-12');
  const isUrdu = (chapter.subject === 'urdu' || chapter.slug.startsWith('urdu')) && !isUrdu9 && !isUrdu10 && !isUrdu12;
  const isMath = (chapter.subject === 'math' || chapter.slug.startsWith('math-unit-') || chapter.slug.startsWith('math-model-paper-')) && !isMath9 && !isMath10 && !isMath12;
  const isEnglish = (chapter.subject === 'english' || chapter.slug.startsWith('english')) && !isEnglish9 && !isEnglish10 && !isEnglish12;
  const isCS = (chapter.subject === 'cs' || chapter.slug.startsWith('cs')) && !isCS9 && !isCS10 && !isCS12;
  const isIslamiat = (chapter.subject === 'islamiat' || chapter.slug.startsWith('islamiat')) && !isIslamiat9;
  const isTarjuma = (chapter.subject === 'tarjuma' || chapter.slug.startsWith('tarjuma')) && !isTarjuma9 && !isTarjuma10 && !isTarjuma12;
  const isBiology = (chapter.subject === 'biology' || chapter.slug.startsWith('biology')) && !isBiology9 && !isBiology10 && !isBiology12;
  const isChemistry = (chapter.subject === 'chemistry' || chapter.slug.startsWith('chemistry')) && !isChemistry9 && !isChemistry10 && !isChemistry12;
  const isRtl = isUrdu || isIslamiat || isTarjuma || isUrdu9 || isTarjuma9 || isIslamiat9 || isUrdu10 || isTarjuma10 || isUrdu12 || isTarjuma12;

  const isPastPapers =
    chapter.slug === 'past-papers' ||
    chapter.slug === 'urdu-model-paper' ||
    chapter.slug.startsWith('chemistry-12-model-paper-') ||
    chapter.slug.startsWith('cs-12-model-paper-') ||
    chapter.slug.startsWith('biology-12-model-paper-') ||
    chapter.slug.startsWith('math-12-model-paper-') ||
    chapter.slug.startsWith('physics-12-model-paper-') ||
    chapter.slug.startsWith('english-12-model-paper-') ||
    chapter.slug.startsWith('urdu-12-model-paper-') ||
    chapter.slug.startsWith('pakstudies-12-model-paper-') ||
    chapter.slug.startsWith('tarjuma-12-model-paper-') ||
    chapter.slug.startsWith('pakstudies-10-model-paper-') ||
    chapter.slug.startsWith('urdu-10-model-paper-') ||
    chapter.slug.startsWith('tarjuma-10-model-paper-') ||
    chapter.slug.startsWith('english-10-model-paper-') ||
    chapter.slug.startsWith('biology-10-model-paper-') ||
    chapter.slug.startsWith('cs-10-model-paper-') ||
    chapter.slug.startsWith('chemistry-10-model-paper-') ||
    chapter.slug.startsWith('physics-10-model-paper-') ||
    chapter.slug.startsWith('math-10-model-paper-') ||
    chapter.slug.startsWith('physics-9-model-paper-') ||
    chapter.slug.startsWith('math-9-model-paper-') ||
    chapter.slug.startsWith('urdu-9-model-paper-') ||
    chapter.slug.startsWith('tarjuma-9-model-paper-') ||
    chapter.slug.startsWith('english-9-model-paper-') ||
    chapter.slug.startsWith('islamiat-9-model-paper-') ||
    chapter.slug.startsWith('chemistry-9-model-paper-') ||
    chapter.slug.startsWith('cs-9-model-paper-') ||
    chapter.slug.startsWith('biology-9-model-paper-') ||
    chapter.slug.startsWith('cs-model-paper-') ||
    chapter.slug.startsWith('islamiat-model-paper-') ||
    chapter.slug.startsWith('tarjuma-model-paper-') ||
    chapter.slug.startsWith('biology-model-paper-') ||
    chapter.slug.startsWith('chemistry-model-paper-');

  let tagLabel = `Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  if (chapter.slug.startsWith('chemistry-12-model-paper-')) tagLabel = `Class 12 Chem Simulator ${chapter.slug.split('-').pop()}`;
  else if (isChemistry12) tagLabel = `Class 12 · Chem Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('cs-12-model-paper-')) tagLabel = `Class 12 CS Simulator ${chapter.slug.split('-').pop()}`;
  else if (isCS12) tagLabel = `Class 12 · CS Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('biology-12-model-paper-')) tagLabel = `Class 12 Bio Simulator ${chapter.slug.split('-').pop()}`;
  else if (isBiology12) tagLabel = `Class 12 · Bio Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('math-12-model-paper-')) tagLabel = `Class 12 Math Simulator ${chapter.slug.split('-').pop()}`;
  else if (isMath12) tagLabel = `Class 12 · Math Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('physics-12-model-paper-')) tagLabel = `Class 12 Physics Simulator ${chapter.slug.split('-').pop()}`;
  else if (isPhysics12) tagLabel = `Class 12 · Physics Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('english-12-model-paper-')) tagLabel = `Class 12 English Simulator ${chapter.slug.split('-').pop()}`;
  else if (isEnglish12) tagLabel = `Class 12 · English Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('urdu-12-model-paper-')) tagLabel = `Class 12 Urdu Simulator ${chapter.slug.split('-').pop()}`;
  else if (isUrdu12) tagLabel = `Class 12 · Urdu Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('pakstudies-12-model-paper-')) tagLabel = `Class 12 PST Simulator ${chapter.slug.split('-').pop()}`;
  else if (isPakStudies12) tagLabel = `Class 12 · Pak Studies Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('tarjuma-12-model-paper-')) tagLabel = `Class 12 Tarjuma Simulator ${chapter.slug.split('-').pop()}`;
  else if (isTarjuma12) tagLabel = `Class 12 · Tarjuma Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('pakstudies-10-model-paper-')) tagLabel = `Class 10 PST Simulator ${chapter.slug.split('-').pop()}`;
  else if (isPakStudies10) tagLabel = `Class 10 · Pak Studies Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('urdu-10-model-paper-')) tagLabel = `Class 10 Urdu Simulator ${chapter.slug.split('-').pop()}`;
  else if (isUrdu10) tagLabel = `Class 10 · Urdu Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('tarjuma-10-model-paper-')) tagLabel = `Class 10 Tarjuma Simulator ${chapter.slug.split('-').pop()}`;
  else if (isTarjuma10) tagLabel = `Class 10 · Tarjuma Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('english-10-model-paper-')) tagLabel = `Class 10 English Simulator ${chapter.slug.split('-').pop()}`;
  else if (isEnglish10) tagLabel = `Class 10 · English Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('biology-10-model-paper-')) tagLabel = `Class 10 Biology Simulator ${chapter.slug.split('-').pop()}`;
  else if (isBiology10) tagLabel = `Class 10 · Bio Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('cs-10-model-paper-')) tagLabel = `Class 10 CS Simulator ${chapter.slug.split('-').pop()}`;
  else if (isCS10) tagLabel = `Class 10 · CS Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('chemistry-10-model-paper-')) tagLabel = `Class 10 Chemistry Simulator ${chapter.slug.split('-').pop()}`;
  else if (isChemistry10) tagLabel = `Class 10 · Chemistry Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('physics-10-model-paper-')) tagLabel = `Class 10 Physics Simulator ${chapter.slug.split('-').pop()}`;
  else if (isPhysics10) tagLabel = `Class 10 · Physics Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('math-10-model-paper-')) tagLabel = `Class 10 Math Simulator ${chapter.slug.split('-').pop()}`;
  else if (isMath10) tagLabel = `Class 10 · Math Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  if (chapter.slug === 'physics-9-model-paper-1') tagLabel = 'Class 9 Board Simulator 1';
  else if (chapter.slug === 'physics-9-model-paper-2') tagLabel = 'Class 9 Board Simulator 2';
  else if (isPhysics9) tagLabel = `Class 9 · Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug === 'math-9-model-paper-1') tagLabel = 'Class 9 Math Simulator 1';
  else if (chapter.slug === 'math-9-model-paper-2') tagLabel = 'Class 9 Math Simulator 2';
  else if (isMath9) tagLabel = `Class 9 · Math Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('urdu-9-model-paper-')) tagLabel = `Class 9 Urdu Simulator ${chapter.slug.split('-').pop()}`;
  else if (isUrdu9) tagLabel = `Class 9 · Urdu Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('tarjuma-9-model-paper-')) tagLabel = `Class 9 Tarjuma Simulator ${chapter.slug.split('-').pop()}`;
  else if (isTarjuma9) tagLabel = `Class 9 · Tarjuma Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('english-9-model-paper-')) tagLabel = `Class 9 English Simulator ${chapter.slug.split('-').pop()}`;
  else if (isEnglish9) tagLabel = `Class 9 · English Module ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('islamiat-9-model-paper-')) tagLabel = `Class 9 Islamiat Simulator ${chapter.slug.split('-').pop()}`;
  else if (isIslamiat9) tagLabel = `Class 9 · Islamiat Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('chemistry-9-model-paper-')) tagLabel = `Class 9 Chemistry Simulator ${chapter.slug.split('-').pop()}`;
  else if (isChemistry9) tagLabel = `Class 9 · Chemistry Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('cs-9-model-paper-')) tagLabel = `Class 9 CS Simulator ${chapter.slug.split('-').pop()}`;
  else if (isCS9) tagLabel = `Class 9 · CS Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug.startsWith('biology-9-model-paper-')) tagLabel = `Class 9 Biology Simulator ${chapter.slug.split('-').pop()}`;
  else if (isBiology9) tagLabel = `Class 9 · Bio Chapter ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (chapter.slug === 'past-papers') tagLabel = 'Board Simulator';
  else if (chapter.slug === 'urdu-model-paper') tagLabel = 'Urdu Full Board Simulator';
  else if (chapter.slug === 'urdu-ilm-e-bayan') tagLabel = 'Urdu Rhetoric (علم بیان)';
  else if (chapter.slug === 'urdu-ilm-e-badi') tagLabel = 'Urdu Figures (علم بدیع)';
  else if (chapter.slug.startsWith('math-model-paper-')) tagLabel = `Math Board Simulator ${chapter.chapterNumber}`;
  else if (chapter.slug.startsWith('english-model-paper-')) tagLabel = `English Board Simulator ${chapter.chapterNumber - 6}`;
  else if (chapter.slug.startsWith('cs-model-paper-')) tagLabel = `CS Board Simulator ${chapter.chapterNumber - 8}`;
  else if (chapter.slug.startsWith('islamiat-model-paper-')) tagLabel = `Islamiat Board Simulator ${chapter.chapterNumber - 5}`;
  else if (chapter.slug.startsWith('tarjuma-model-paper-')) tagLabel = `Tarjuma Board Simulator ${chapter.chapterNumber - 4}`;
  else if (chapter.slug.startsWith('biology-model-paper-')) tagLabel = `Biology Board Simulator ${chapter.slug.split('-').pop()}`;
  else if (chapter.slug.startsWith('chemistry-model-paper-')) tagLabel = `Chemistry Board Simulator ${chapter.slug.split('-').pop()}`;
  else if (isTarjuma) tagLabel = `Tarjuma Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isIslamiat) tagLabel = `Islamiat Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isBiology) tagLabel = `Bio Chapter ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isChemistry) tagLabel = `Chem Chapter ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isCS) tagLabel = `CS Chapter ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isEnglish) tagLabel = `English Module ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isMath) tagLabel = `Math Module ${chapter.chapterNumber.toString().padStart(2, '0')}`;
  else if (isUrdu) tagLabel = `Urdu Module ${chapter.chapterNumber.toString().padStart(2, '0')}`;

  let description = `Comprehensive conceptual questions, dimensional formulas, and numericals for ${chapter.title} aligned with textbook SLOs.`;
  if (chapter.slug.startsWith('chemistry-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual examination simulation. 17 MCQs, 25-minute timer with complete chemical reactions, mechanisms, and spectroscopic SLO rationales.`;
  } else if (isChemistry12) {
    description = `Official FBISE HSSC-II Class 12 Chemistry: ${chapter.title}. Core periodic trends, reaction mechanisms, organic syntheses, industrial processes, and comprehensive SLO justifications.`;
  } else if (chapter.slug.startsWith('cs-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual examination simulation. 15 MCQs, 20-minute timer with complete Python, data structures, and computational SLO rationales.`;
  } else if (isCS12) {
    description = `Official FBISE HSSC-II Class 12 Computer Science: ${chapter.title}. Core computational concepts, Python programming, database management, and emerging tech SLO justifications.`;
  } else if (chapter.slug.startsWith('biology-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual examination simulation. 17 MCQs, 25-minute timer with complete physiological, genetics, and biotechnology SLO rationales.`;
  } else if (isBiology12) {
    description = `Official FBISE HSSC-II Class 12 Biology: ${chapter.title}. Core biological concepts, physiology, genetics, biotechnology, ecology, and comprehensive SLO justifications.`;
  } else if (chapter.slug.startsWith('math-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual examination simulation. 20 MCQs, 25-minute timer with complete mathematical derivations, step-by-step calculus working, and geometric reasoning.`;
  } else if (isMath12) {
    description = `Official FBISE HSSC-II Class 12 Mathematics: ${chapter.title}. Core mathematical formulas, calculus theorems, coordinate geometry, vectors, and SLO justifications.`;
  } else if (chapter.slug.startsWith('physics-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual examination simulation. 17 MCQs, 25-minute timer with complete formula derivations, step-by-step numerical calculations, and physics justifications.`;
  } else if (isPhysics12) {
    description = `Official FBISE HSSC-II Class 12 Physics: ${chapter.title}. Core physical laws, conceptual principles, formula derivations, SI units, and comprehensive SLO justifications.`;
  } else if (chapter.slug.startsWith('english-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual examination simulation (Soch Badlo Prep). 20 MCQs, 25-minute timer with authentic literary and grammatical SLO rationales.`;
  } else if (isEnglish12) {
    description = `Official FBISE HSSC-II Class 12 English Compulsory: ${chapter.title}. Good-bye Mr. Chips, Book-II Modern Prose & Heroes, applied syntax, and SLO justifications.`;
  } else if (chapter.slug.startsWith('urdu-12-model-paper-')) {
    description = `وفاقی تعلیمی بورڈ (FBISE) لازمی اردو بارہویں جماعت سالانہ ماڈل امتحانی پرچہ نمبر ${chapter.slug.split('-').pop()}۔ 20 معروضی سوالات، 25 منٹ مع مستند ادبی تشریحات و اسناد۔`;
  } else if (isUrdu12) {
    description = `وفاقی تعلیمی بورڈ لازمی اردو جماعت بارہویں (HSSC-II): ${chapter.title} کے امتحانی معروضی سوالات مع ادبی و لغوی تشریحات۔`;
  } else if (chapter.slug.startsWith('pakstudies-12-model-paper-')) {
    description = `Official Federal Board Section A HSSC-II Class 12 annual exam simulator. 10 MCQs, 15-minute timer with bilingual (Urdu + English) justifications.`;
  } else if (isPakStudies12) {
    description = `Official FBISE HSSC-II Class 12 Pakistan Studies: ${chapter.title}. Core ideological, constitutional, economic, and diplomatic concepts with bilingual rationales.`;
  } else if (chapter.slug.startsWith('tarjuma-12-model-paper-')) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید جماعت بارہویں سیکشن اے سالانہ ماڈل پرچہ نمبر ${chapter.slug.split('-').pop()}۔ 10 معروضی سوالات (بزبان اردو و انگریزی)، 15 منٹ مع مستند قرآنی حوالہ جات۔`;
  } else if (isTarjuma12) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید جماعت بارہویں (HSSC-II): ${chapter.title} کے منتخب اور امتحانی کثیر الانتخابی سوالات (بزبان اردو و انگریزی)۔`;
  } else if (chapter.slug.startsWith('pakstudies-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Founder Muhammad Ahmad Khan & Lecturer Tayabah Rafaqat). 10 MCQs, 15-minute timer with bilingual (Urdu + English) justifications.`;
  } else if (isPakStudies10) {
    description = `Official FBISE SSC-II Class 10 Pakistan Studies: ${chapter.title}. Core historical, constitutional, and economic concepts with bilingual rationales.`;
  } else if (chapter.slug.startsWith('urdu-10-model-paper-')) {
    description = `وفاقی تعلیمی بورڈ (FBISE) جماعت دہم لازمی اردو سالانہ ماڈل امتحانی پرچہ نمبر ${chapter.slug.split('-').pop()} (لیکچرار نرجس ظہیر مع محمد احمد خان)۔ 15 معروضی سوالات، 20 منٹ مع مستند ادبی تشریحات۔`;
  } else if (isUrdu10) {
    description = `وفاقی تعلیمی بورڈ لازمی اردو جماعت دہم (SSC-II): ${chapter.title} کے بنیادی قواعد، معانی و مفاہیم اور امتحانی کثیر الانتخابی سوالات۔`;
  } else if (chapter.slug.startsWith('tarjuma-10-model-paper-')) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید جماعت دہم سیکشن اے سالانہ ماڈل پرچہ نمبر ${chapter.slug.split('-').pop()} (لیکچرار طیبہ رفاقت مع محمد احمد خان)۔ 10 معروضی سوالات (بزبان اردو و انگریزی)، 15 منٹ مع مستند قرآنی حوالہ جات۔`;
  } else if (isTarjuma10) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید جماعت دہم (SSC-II): ${chapter.title} کے اہم نکات، الفاظ و معانی اور امتحانی کثیر الانتخابی سوالات (بزبان اردو و انگریزی)۔`;
  } else if (chapter.slug.startsWith('english-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Soch Badlo By MAK). 15 MCQs, 20-minute timer with complete grammatical & literary justifications.`;
  } else if (isEnglish10) {
    description = `Official FBISE SSC-II Class 10 English Compulsory: ${chapter.title}. Core grammatical concepts, sentence structures, figures of speech, and SLO justifications.`;
  } else if (chapter.slug.startsWith('biology-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Lecturer Ma'am Rubina Ashraf & Soch Badlo By MAK). 12 MCQs, 15-minute timer with complete physiological and biological justifications.`;
  } else if (isBiology10) {
    description = `Official FBISE SSC-II Class 10 Biology: ${chapter.title}. Core biological concepts, organ physiology, genetics, biotechnology, and SLO justifications.`;
  } else if (chapter.slug.startsWith('cs-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Lecturer Sabahat Ul Hasan & Soch Badlo By MAK). 12 MCQs, 15-minute timer with complete algorithmic & C programming reasoning.`;
  } else if (isCS10) {
    description = `Official FBISE SSC-II Class 10 Computer Science: ${chapter.title}. Core computational concepts, system architectures, data analysis, and programming rationales.`;
  } else if (chapter.slug.startsWith('chemistry-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Soch Badlo By MAK). 12 MCQs, 15-minute timer with complete chemical step-by-step reasoning.`;
  } else if (isChemistry10) {
    description = `Official FBISE SSC-II Class 10 Chemistry: ${chapter.title}. Core chemical reactions, equilibrium constants, organic mechanisms, and SLO justifications.`;
  } else if (chapter.slug.startsWith('physics-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Soch Badlo By MAK). 12 MCQs, 20-minute timer with complete physics step-by-step reasoning.`;
  } else if (isPhysics10) {
    description = `Official FBISE SSC-II Class 10 Physics: ${chapter.title}. Core physical laws, conceptual numericals, formula derivations, and SLO justifications.`;
  } else if (chapter.slug.startsWith('math-10-model-paper-')) {
    description = `Official Federal Board Section A SSC-II Class 10 annual examination simulation (Lecturer Jazab / Nimra Abid / MAK). 15 MCQs, 20-minute timer with complete mathematical reasoning.`;
  } else if (isMath10) {
    description = `Official FBISE SSC-II Class 10 Mathematics: ${chapter.title}. Core theorems, algebraic manipulations, coordinate formulas, and problem-solving rationales.`;
  } else if (chapter.slug.startsWith('biology-9-model-paper-')) {
    description = `Official Federal Board Section A SSC-I annual examination simulation (Lecturer Rubina Ashraf). 12 MCQs, 20-minute timer with complete biological justifications.`;
  } else if (isBiology9) {
    description = `Official FBISE SSC-I Class 9 Biology: ${chapter.title}. Core conceptual questions, cellular processes, organ systems, and SLO justifications.`;
  } else if (chapter.slug.startsWith('cs-9-model-paper-')) {
    description = `Official Federal Board Section A SSC-I annual examination simulation (Lecturer Sabahat Ul Hasan). 12 MCQs, 20-minute timer with complete computer science justifications.`;
  } else if (isCS9) {
    description = `Official FBISE SSC-I Class 9 Computer Science: ${chapter.title}. Core conceptual questions, system architectures, algorithmic thinking, and SLO justifications.`;
  } else if (chapter.slug.startsWith('chemistry-9-model-paper-')) {
    description = `Official Federal Board Section A SSC-I annual examination simulation (Lecturer Ayesha Amjad). 12 MCQs, 20-minute timer with complete chemical justifications.`;
  } else if (isChemistry9) {
    description = `Official FBISE SSC-I Class 9 Chemistry: ${chapter.title}. Core conceptual questions, electronic structures, chemical bonding, and SLO justifications.`;
  } else if (chapter.slug.startsWith('english-9-model-paper-')) {
    description = `Official Federal Board Section A SSC-I annual examination simulation (Lecturer Adeela Naheed). 15 MCQs, 20-minute timer with complete grammatical reasoning.`;
  } else if (isEnglish9) {
    description = `Official FBISE SSC-I Class 9 English: ${chapter.title}. Core conceptual questions, grammar rules, literary devices, and SLO justifications.`;
  } else if (chapter.slug.startsWith('islamiat-9-model-paper-')) {
    description = `وفاقی تعلیمی بورڈ (FBISE) جماعت نہم لازمی اسلامیات سیکشن اے سالانہ ماڈل امتحانی پرچہ نمبر ${chapter.slug.split('-').pop()} (لیکچرار طیبہ رفاقت)۔ 20 معروضی سوالات مع تصدیق شدہ حل۔`;
  } else if (isIslamiat9) {
    description = `وفاقی تعلیمی بورڈ لازمی اسلامیات جماعت نہم (SSC-I): ${chapter.title} کے بنیادی ایمانی و اخلاقی احکام اور امتحانی کثیر الانتخابی سوالات۔`;
  } else if (chapter.slug.startsWith('urdu-9-model-paper-')) {
    description = `وفاقی تعلیمی بورڈ (FBISE) جماعت نہم لازمی اردو سیکشن اے سالانہ ماڈل امتحانی پرچہ نمبر ${chapter.slug.split('-').pop()} (لیکچرار نرجس ظہیر)۔ 15 معروضی سوالات مع تصدیق شدہ حل۔`;
  } else if (isUrdu9) {
    description = `وفاقی تعلیمی بورڈ لازمی اردو جماعت نہم (SSC-I): ${chapter.title} کے بنیادی قواعد، معانی و مفاہیم اور امتحانی کثیر الانتخابی سوالات۔`;
  } else if (chapter.slug.startsWith('tarjuma-9-model-paper-')) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید جماعت نہم سیکشن اے سالانہ ماڈل پرچہ نمبر ${chapter.slug.split('-').pop()} (لیکچرار طیبہ رفاقت)۔ 10 معروضی سوالات (بزبان اردو و انگریزی) مع مستند قرآنی حوالہ جات۔`;
  } else if (isTarjuma9) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید جماعت نہم (SSC-I): ${chapter.title} کے اہم نکات، الفاظ و معانی اور امتحانی کثیر الانتخابی سوالات۔`;
  } else if (chapter.slug === 'physics-9-model-paper-1') {
    description = 'Federal Board Section A SSC-I annual examination paper (Units 1-5). Official 12 MCQs, 15-minute exam simulation with complete step-by-step explanations.';
  } else if (chapter.slug === 'physics-9-model-paper-2') {
    description = 'Federal Board Section A SSC-I annual examination paper (Units 5-9). Official 12 MCQs, 15-minute exam simulation with complete step-by-step explanations.';
  } else if (isPhysics9) {
    description = `Official FBISE SSC-I Class 9 Physics: ${chapter.title}. Core conceptual questions, SI base/derived units, laws of motion, and problem-solving rationales.`;
  } else if (chapter.slug === 'math-9-model-paper-1') {
    description = 'Federal Board Section A SSC-I annual examination paper (Units 1-6). Official 15 MCQs, 20-minute exam simulation with complete step-by-step explanations.';
  } else if (chapter.slug === 'math-9-model-paper-2') {
    description = 'Federal Board Section A SSC-I annual examination paper (Units 6-11). Official 15 MCQs, 20-minute exam simulation with complete step-by-step explanations.';
  } else if (isMath9) {
    description = `Official FBISE SSC-I Class 9 Mathematics: ${chapter.title}. Core theorems, algebraic manipulations, coordinate formulas, and problem-solving rationales.`;
  } else if (chapter.slug === 'past-papers') {
    description = 'Official past board exam papers (FBISE 2010–2022). Comprehensive simulation matching the exact 17-mark section A pattern.';
  } else if (chapter.slug === 'urdu-model-paper') {
    description = 'مکمل نصاب پر مشتمل وفاقی بورڈ سالانہ ماڈل پیپر سمیلیٹر۔ 20 نمبروں پر مبنی جامع پرچہ مع مستند تشریحات۔';
  } else if (chapter.slug === 'urdu-ilm-e-bayan') {
    description = 'تشبیہ، استعارہ، مجازِ مرسل اور کنایہ کے بنیادی ارکان، مستند قواعد اور امتحانی اشعار پر مبنی 65 کثیر الانتخابی سوالات۔';
  } else if (chapter.slug === 'urdu-ilm-e-badi') {
    description = 'صنائعِ لفظی و معنوی: تضاد، تلمیح، حسنِ تعلیل، لف و نشر اور مراعاۃ النظیر کے 50 حل شدہ مشقی سوالات مع تفصیلی وضاحت۔';
  } else if (isUrdu) {
    description = `وفاقی بورڈ لازمی اردو سال اول: ${chapter.title} کے اہم سوالات، معانی، تراکیب اور شعری اصطلاحات کا ٹیسٹ۔`;
  } else if (chapter.slug === 'math-unit-1') {
    description = 'Complex numbers algebra, modulus, polar forms, matrix determinant shortcuts, and vector dot/cross product properties.';
  } else if (chapter.slug === 'math-unit-2') {
    description = 'Arithmetic & geometric sequences, sum to infinity, harmonic progressions, and quadratic equation roots & disc properties.';
  } else if (chapter.slug === 'math-unit-3') {
    description = 'Permutations (nPr), combinations (nCr), binomial theorem expansions, middle terms, and mathematical induction steps.';
  } else if (chapter.slug === 'math-unit-4') {
    description = 'Function domain/range, inverse functions, circular measure, radian/degree relations, and standard trigonometric identities.';
  } else if (chapter.slug === 'math-unit-5') {
    description = 'Addition/subtraction angle formulas, half/double angle identities, inverse trigonometric functions, and solution of triangles.';
  } else if (chapter.slug.startsWith('math-model-paper-')) {
    description = 'Official FBISE Class 11 Mathematics Section A annual board simulator with 20 MCQs and complete step-by-step mathematical reasoning.';
  } else if (isMath) {
    description = `Curated FBISE Class 11 Mathematics conceptual problems, formula applications, and computational shortcuts for ${chapter.title}.`;
  } else if (chapter.slug === 'english-unit-1') {
    description = 'Simple, compound, complex, and compound-complex sentence structure, optative mood, and conditional if-clauses (Types 0–3).';
  } else if (chapter.slug === 'english-unit-2') {
    description = 'Master noun phrases, appositive phrases, prepositional phrases, and subordinate clauses (noun, adjective, adverbial).';
  } else if (chapter.slug === 'english-unit-3') {
    description = 'Subject-verb agreement (concord), finite vs. non-finite verbs, gerunds, participles, infinitives, and tense sequence.';
  } else if (chapter.slug === 'english-unit-4') {
    description = 'Literary devices, poetic meter, imagery (tactile, olfactory, gustatory), metaphors, personification, irony, and synecdoche.';
  } else if (chapter.slug === 'english-unit-5') {
    description = 'Order of adjectives, emphatic vs. reflexive pronouns, subject complements, and punctuation mechanics (semicolon, hyphen).';
  } else if (chapter.slug === 'english-unit-6') {
    description = 'Transitional devices of contrast, addition, and result, idiomatic phrasal verbs, and contextual vocabulary analysis.';
  } else if (chapter.slug.startsWith('english-model-paper-')) {
    description = 'Official Federal Board Section A compulsory examination simulation with 20 marks and authentic syllabus SLO rationales.';
  } else if (isEnglish) {
    description = `Curated FBISE Class 11 English SLO questions, grammar rules, and reading comprehension mechanics for ${chapter.title}.`;
  } else if (chapter.slug === 'cs-chapter-1') {
    description = 'Data representation (binary, hex, ASCII), Boolean algebra, logic gates (AND, OR, NOT, NAND, NOR, XOR), and Von Neumann system fundamentals.';
  } else if (chapter.slug === 'cs-chapter-2') {
    description = 'Computational thinking (decomposition, abstraction, pattern recognition), algorithm tracing, flowcharts, linear search, and binary search analysis.';
  } else if (chapter.slug === 'cs-chapter-3') {
    description = 'Python syntax, variables, mutable vs. immutable types, operators, list comprehensions, conditionals, loops, and modular function design.';
  } else if (chapter.slug === 'cs-chapter-4') {
    description = 'Data management, relational databases, primary/foreign keys, SQL queries, statistical measures, data visualization, and big data.';
  } else if (chapter.slug === 'cs-chapter-5') {
    description = 'Artificial Intelligence, machine learning paradigms (supervised, unsupervised, RL), cloud service models (IaaS, PaaS, SaaS), and IoT architectures.';
  } else if (chapter.slug === 'cs-chapter-6') {
    description = 'Network topologies, OSI architecture, IP addressing, cybersecurity threats (phishing, DoS), firewalls, encryption, and cyber ethics.';
  } else if (chapter.slug === 'cs-chapter-7') {
    description = 'Data collection methodologies, surveys, interviews, simulation modeling, prototype testing, and statistical bias evaluation.';
  } else if (chapter.slug === 'cs-chapter-8') {
    description = 'Software Development Life Cycle (SDLC, Agile, Waterfall), prototyping, MVP design thinking, freelancing, and computing entrepreneurship.';
  } else if (chapter.slug.startsWith('cs-model-paper-')) {
    description = 'Official Federal Board Section A examination simulation with 17 marks, 20-minute timer, and authentic curriculum SLO rationales.';
  } else if (isCS) {
    description = `Curated FBISE Class 11 Computer Science SLO questions, conceptual problems, and technical justifications for ${chapter.title}.`;
  } else if (chapter.slug === 'islamiat-unit-1') {
    description = 'قرآن مجید اور حدیث نبوی کے بنیادی علوم، اقسامِ وحی، اعجازِ قرآن، تدوینِ قرآن اور اصولِ حدیث پر مبنی مستند سوالات۔';
  } else if (chapter.slug === 'islamiat-unit-2') {
    description = 'عقائدِ اسلام: توحید فی الذات و الصفات، رسالت، ختم نبوت، ملائکہ، کتب سماویہ اور عقیدہ آخرت کے بنیادی تقاضے۔';
  } else if (chapter.slug === 'islamiat-unit-3') {
    description = 'فلسفہ نماز و باجماعت ادائیگی، نظامِ زکوٰۃ و صدقات، روزے کے روحانی و معاشی فوائد اور حج و قربانی کی آفاقی اہمیت۔';
  } else if (chapter.slug === 'islamiat-unit-4') {
    description = 'سیرتِ نبوی ﷺ: مکی و مدنی ادوار، بطور مثالی سربراہ خاندان، سپہ سالار، حسن معاملات اور اسلامی معاشی اسوہ۔';
  } else if (chapter.slug === 'islamiat-unit-5') {
    description = 'اسلامی معاشرت، احترامِ انسانیت، خیر خواہی، حقوق العباد، اور اخلاقی رذائل (غیبت، کذب، حسد، تکبر) سے اجتناب۔';
  } else if (chapter.slug.startsWith('islamiat-model-paper-')) {
    description = 'وفاقی بورڈ (FBISE) کے جدید امتحانی معیار کے مطابق لازمی اسلامیات کا مکمل سالانہ معروضی پرچہ مع مستند تشریحات۔';
  } else if (isIslamiat) {
    description = `وفاقی بورڈ لازمی اسلامیات سال اول: ${chapter.title} کے اہم معروضی سوالات اور مستند حوالہ جات کا پرچہ۔`;
  } else if (chapter.slug === 'tarjuma-unit-1') {
    description = 'سورۃ البقرۃ: تعارف، مضامین، امتِ وسط، تحویلِ قبلہ، آیۃ الکرسی، احکامِ صوم و حج اور ربا کی حرمت پر مبنی سوالات۔';
  } else if (chapter.slug === 'tarjuma-unit-2') {
    description = 'سورۃ آل عمران: توحید، ردِ عقائدِ باطلہ، واقعہ مباہلہ، غزوہ احد کے اسباق، شہداء کی فضیلت اور اتحادِ امت کے قرآنی ارشادات۔';
  } else if (chapter.slug === 'tarjuma-unit-3') {
    description = 'سورۃ الانفال: احکامِ جہاد، مالِ غنیمت کی تقسیم، غزوہ بدر (یوم الفرقان)، نصرتِ الٰہی اور اسلامی جنگی اخلاقیات۔';
  } else if (chapter.slug === 'tarjuma-unit-4') {
    description = 'سورۃ التوبۃ: براءتِ مشرکین، غزوہ تبوک، منافقین کی سازشیں، مسجد ضرار کا خاتمہ اور زکوٰۃ کے آٹھ مصارف کی تفہیم۔';
  } else if (chapter.slug.startsWith('tarjuma-model-paper-')) {
    description = 'وفاقی بورڈ لازمی ترجمۃ القرآن سالانہ امتحان سمولیٹر۔ چاروں مقررہ سورتوں کے اہم نکات پر مشتمل دو لسانی معروضی پرچہ۔';
  } else if (isTarjuma) {
    description = `وفاقی بورڈ ترجمۃ القرآن المجید سال اول: ${chapter.title} کے منتخب اور امتحانی کثیر الانتخابی سوالات۔`;
  } else if (chapter.slug.startsWith('biology-model-paper-')) {
    description = 'Official Federal Board Section A examination simulation for Biology (17 questions, 20 minutes) with step-by-step scientific rationales.';
  } else if (isBiology) {
    description = `FBISE Class 11 Biology curriculum test for ${chapter.title}. Includes cell biology, molecular genetics, physiology, taxonomy, and comprehensive scientific rationales.`;
  } else if (chapter.slug.startsWith('chemistry-model-paper-')) {
    description = 'Official Federal Board Section A examination simulation for Chemistry (17 questions, 20 minutes) with stoichiometry & molecular justifications.';
  } else if (isChemistry) {
    description = `Curated FBISE Class 11 Chemistry question series for ${chapter.title} prepared by Lecturer Ayesha Amjad (Soch Badlo By MAK). Complete with formula steps and molecular justifications.`;
  }

  return (
    <article
      className={`relative border p-6 flex flex-col justify-between transition-all duration-200 ${
        isPastPapers
          ? 'border-emerald-800 bg-emerald-50/40 col-span-1 md:col-span-2 shadow-sm'
          : 'border-[var(--color-rule-2)] bg-[var(--color-paper)] hover:border-[var(--color-ink)]'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-rule)] mb-4">
          <span className="font-[family-name:var(--font-display)] text-xs font-bold tracking-widest uppercase text-[var(--color-muted)]">
            {tagLabel}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-2 py-0.5 text-[var(--color-ink)]">
              {chapter.totalQuestions} MCQs
            </span>
            {bestScore && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 border flex items-center gap-1 ${
                  bestScore.percentage >= 80
                    ? 'border-emerald-600 bg-emerald-100/60 text-emerald-900 font-bold'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                Best: {bestScore.percentage}%
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-[var(--color-ink)] leading-snug mb-3 ${
            isRtl ? 'text-right leading-relaxed font-serif' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {chapter.title}
        </h3>

        <p
          className={`text-xs text-[var(--color-muted)] leading-relaxed mb-6 font-[family-name:var(--font-body)] ${
            isRtl ? 'text-right' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[var(--color-rule)] flex flex-col sm:flex-row gap-2 font-[family-name:var(--font-display)]">
        <Link
          href={`/test/${chapter.slug}?mode=practice`}
          className="flex-1 text-center py-2 px-3 border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Practice Mode</span>
        </Link>
        <Link
          href={`/test/${chapter.slug}?mode=exam`}
          className="flex-1 text-center py-2 px-3 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Timed Exam</span>
        </Link>
      </div>
    </article>
  );
}
