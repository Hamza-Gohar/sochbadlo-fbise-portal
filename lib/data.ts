import fs from 'fs';
import path from 'path';
import { ChapterData, ChapterMeta, SubjectId } from './types';

const PHYSICS_DIR = path.join(process.cwd(), 'data', 'physics-11');
const URDU_DIR = path.join(process.cwd(), 'data', 'urdu-11');
const MATH_DIR = path.join(process.cwd(), 'data', 'math-11');
const ENGLISH_DIR = path.join(process.cwd(), 'data', 'english-11');
const CS_DIR = path.join(process.cwd(), 'data', 'cs-11');
const ISLAMIAT_DIR = path.join(process.cwd(), 'data', 'islamiat-11');
const TARJUMA_DIR = path.join(process.cwd(), 'data', 'tarjuma-11');
const BIOLOGY_DIR = path.join(process.cwd(), 'data', 'biology-11');
const CHEMISTRY_DIR = path.join(process.cwd(), 'data', 'chemistry-11');
const PHYSICS_9_DIR = path.join(process.cwd(), 'data', 'physics-9');
const MATH_9_DIR = path.join(process.cwd(), 'data', 'math-9');
const URDU_9_DIR = path.join(process.cwd(), 'data', 'urdu-9');
const TARJUMA_9_DIR = path.join(process.cwd(), 'data', 'tarjuma-9');
const ENGLISH_9_DIR = path.join(process.cwd(), 'data', 'english-9');
const ISLAMIAT_9_DIR = path.join(process.cwd(), 'data', 'islamiat-9');
const CHEMISTRY_9_DIR = path.join(process.cwd(), 'data', 'chemistry-9');
const CS_9_DIR = path.join(process.cwd(), 'data', 'cs-9');
const BIOLOGY_9_DIR = path.join(process.cwd(), 'data', 'biology-9');
const MATH_10_DIR = path.join(process.cwd(), 'data', 'math-10');
const PHYSICS_10_DIR = path.join(process.cwd(), 'data', 'physics-10');
const CHEMISTRY_10_DIR = path.join(process.cwd(), 'data', 'chemistry-10');
const CS_10_DIR = path.join(process.cwd(), 'data', 'cs-10');
const BIOLOGY_10_DIR = path.join(process.cwd(), 'data', 'biology-10');
const ENGLISH_10_DIR = path.join(process.cwd(), 'data', 'english-10');
const PAKSTUDIES_10_DIR = path.join(process.cwd(), 'data', 'pakstudies-10');
const URDU_10_DIR = path.join(process.cwd(), 'data', 'urdu-10');
const TARJUMA_10_DIR = path.join(process.cwd(), 'data', 'tarjuma-10');
const ENGLISH_12_DIR = path.join(process.cwd(), 'data', 'english-12');
const URDU_12_DIR = path.join(process.cwd(), 'data', 'urdu-12');
const PAKSTUDIES_12_DIR = path.join(process.cwd(), 'data', 'pakstudies-12');
const TARJUMA_12_DIR = path.join(process.cwd(), 'data', 'tarjuma-12');
const PHYSICS_12_DIR = path.join(process.cwd(), 'data', 'physics-12');

export function getChaptersIndex(
  subject: SubjectId = 'physics'
): ChapterMeta[] {
  try {
    let dir = PHYSICS_DIR;
    if (subject === 'urdu') dir = URDU_DIR;
    else if (subject === 'math') dir = MATH_DIR;
    else if (subject === 'english') dir = ENGLISH_DIR;
    else if (subject === 'cs') dir = CS_DIR;
    else if (subject === 'islamiat') dir = ISLAMIAT_DIR;
    else if (subject === 'tarjuma') dir = TARJUMA_DIR;
    else if (subject === 'biology') dir = BIOLOGY_DIR;
    else if (subject === 'chemistry') dir = CHEMISTRY_DIR;
    else if (subject === 'physics-9') dir = PHYSICS_9_DIR;
    else if (subject === 'math-9') dir = MATH_9_DIR;
    else if (subject === 'urdu-9') dir = URDU_9_DIR;
    else if (subject === 'tarjuma-9') dir = TARJUMA_9_DIR;
    else if (subject === 'english-9') dir = ENGLISH_9_DIR;
    else if (subject === 'islamiat-9') dir = ISLAMIAT_9_DIR;
    else if (subject === 'chemistry-9') dir = CHEMISTRY_9_DIR;
    else if (subject === 'cs-9') dir = CS_9_DIR;
    else if (subject === 'biology-9') dir = BIOLOGY_9_DIR;
    else if (subject === 'math-10') dir = MATH_10_DIR;
    else if (subject === 'physics-10') dir = PHYSICS_10_DIR;
    else if (subject === 'chemistry-10') dir = CHEMISTRY_10_DIR;
    else if (subject === 'cs-10') dir = CS_10_DIR;
    else if (subject === 'biology-10') dir = BIOLOGY_10_DIR;
    else if (subject === 'english-10') dir = ENGLISH_10_DIR;
    else if (subject === 'pakstudies-10') dir = PAKSTUDIES_10_DIR;
    else if (subject === 'urdu-10') dir = URDU_10_DIR;
    else if (subject === 'tarjuma-10') dir = TARJUMA_10_DIR;
    else if (subject === 'english-12') dir = ENGLISH_12_DIR;
    else if (subject === 'urdu-12') dir = URDU_12_DIR;
    else if (subject === 'pakstudies-12') dir = PAKSTUDIES_12_DIR;
    else if (subject === 'tarjuma-12') dir = TARJUMA_12_DIR;
    else if (subject === 'physics-12') dir = PHYSICS_12_DIR;

    const indexPath = path.join(dir, 'chapters-index.json');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      const list: ChapterMeta[] = JSON.parse(content);
      const grade =
        subject === 'english-12' ||
        subject === 'urdu-12' ||
        subject === 'pakstudies-12' ||
        subject === 'tarjuma-12' ||
        subject === 'physics-12'
          ? '12'
          : subject === 'math-10' ||
            subject === 'physics-10' ||
            subject === 'chemistry-10' ||
            subject === 'cs-10' ||
            subject === 'biology-10' ||
            subject === 'english-10' ||
            subject === 'pakstudies-10' ||
            subject === 'urdu-10' ||
            subject === 'tarjuma-10'
          ? '10'
          : subject === 'physics-9' ||
            subject === 'math-9' ||
            subject === 'urdu-9' ||
            subject === 'tarjuma-9' ||
            subject === 'english-9' ||
            subject === 'islamiat-9' ||
            subject === 'chemistry-9' ||
            subject === 'cs-9' ||
            subject === 'biology-9'
          ? '9'
          : '11';
      return list.map((item) => ({ ...item, subject, grade: item.grade || grade }));
    }
  } catch (err) {
    console.error(`Error reading ${subject} chapters-index.json:`, err);
  }
  return [];
}

export function getAllChapters(): ChapterMeta[] {
  return [
    ...getChaptersIndex('physics'),
    ...getChaptersIndex('urdu'),
    ...getChaptersIndex('math'),
    ...getChaptersIndex('english'),
    ...getChaptersIndex('cs'),
    ...getChaptersIndex('islamiat'),
    ...getChaptersIndex('tarjuma'),
    ...getChaptersIndex('biology'),
    ...getChaptersIndex('chemistry'),
    ...getChaptersIndex('physics-9'),
    ...getChaptersIndex('math-9'),
    ...getChaptersIndex('urdu-9'),
    ...getChaptersIndex('tarjuma-9'),
    ...getChaptersIndex('english-9'),
    ...getChaptersIndex('islamiat-9'),
    ...getChaptersIndex('chemistry-9'),
    ...getChaptersIndex('cs-9'),
    ...getChaptersIndex('biology-9'),
    ...getChaptersIndex('math-10'),
    ...getChaptersIndex('physics-10'),
    ...getChaptersIndex('chemistry-10'),
    ...getChaptersIndex('cs-10'),
    ...getChaptersIndex('biology-10'),
    ...getChaptersIndex('english-10'),
    ...getChaptersIndex('pakstudies-10'),
    ...getChaptersIndex('urdu-10'),
    ...getChaptersIndex('tarjuma-10'),
    ...getChaptersIndex('english-12'),
    ...getChaptersIndex('urdu-12'),
    ...getChaptersIndex('pakstudies-12'),
    ...getChaptersIndex('tarjuma-12'),
    ...getChaptersIndex('physics-12'),
  ];
}

export function getAllSlugs(): string[] {
  return getAllChapters().map((c) => c.slug);
}

export function getChapterBySlug(
  slug: string
): (ChapterData & { slug: string; subject: SubjectId }) | null {
  try {
    let targetDir = PHYSICS_DIR;
    let subject: SubjectId = 'physics';

    if (slug.startsWith('physics-12')) {
      targetDir = PHYSICS_12_DIR;
      subject = 'physics-12';
    } else if (slug.startsWith('english-12')) {
      targetDir = ENGLISH_12_DIR;
      subject = 'english-12';
    } else if (slug.startsWith('urdu-12')) {
      targetDir = URDU_12_DIR;
      subject = 'urdu-12';
    } else if (slug.startsWith('pakstudies-12')) {
      targetDir = PAKSTUDIES_12_DIR;
      subject = 'pakstudies-12';
    } else if (slug.startsWith('tarjuma-12')) {
      targetDir = TARJUMA_12_DIR;
      subject = 'tarjuma-12';
    } else if (slug.startsWith('pakstudies-10')) {
      targetDir = PAKSTUDIES_10_DIR;
      subject = 'pakstudies-10';
    } else if (slug.startsWith('urdu-10')) {
      targetDir = URDU_10_DIR;
      subject = 'urdu-10';
    } else if (slug.startsWith('tarjuma-10')) {
      targetDir = TARJUMA_10_DIR;
      subject = 'tarjuma-10';
    } else if (slug.startsWith('english-10')) {
      targetDir = ENGLISH_10_DIR;
      subject = 'english-10';
    } else if (slug.startsWith('biology-10')) {
      targetDir = BIOLOGY_10_DIR;
      subject = 'biology-10';
    } else if (slug.startsWith('cs-10')) {
      targetDir = CS_10_DIR;
      subject = 'cs-10';
    } else if (slug.startsWith('chemistry-10')) {
      targetDir = CHEMISTRY_10_DIR;
      subject = 'chemistry-10';
    } else if (slug.startsWith('physics-10')) {
      targetDir = PHYSICS_10_DIR;
      subject = 'physics-10';
    } else if (slug.startsWith('physics-9')) {
      targetDir = PHYSICS_9_DIR;
      subject = 'physics-9';
    } else if (slug.startsWith('math-9')) {
      targetDir = MATH_9_DIR;
      subject = 'math-9';
    } else if (slug.startsWith('urdu-9')) {
      targetDir = URDU_9_DIR;
      subject = 'urdu-9';
    } else if (slug.startsWith('tarjuma-9')) {
      targetDir = TARJUMA_9_DIR;
      subject = 'tarjuma-9';
    } else if (slug.startsWith('english-9')) {
      targetDir = ENGLISH_9_DIR;
      subject = 'english-9';
    } else if (slug.startsWith('islamiat-9')) {
      targetDir = ISLAMIAT_9_DIR;
      subject = 'islamiat-9';
    } else if (slug.startsWith('chemistry-9')) {
      targetDir = CHEMISTRY_9_DIR;
      subject = 'chemistry-9';
    } else if (slug.startsWith('cs-9')) {
      targetDir = CS_9_DIR;
      subject = 'cs-9';
    } else if (slug.startsWith('biology-9')) {
      targetDir = BIOLOGY_9_DIR;
      subject = 'biology-9';
    } else if (slug.startsWith('math-10')) {
      targetDir = MATH_10_DIR;
      subject = 'math-10';
    } else if (slug.startsWith('urdu')) {
      targetDir = URDU_DIR;
      subject = 'urdu';
    } else if (slug.startsWith('math')) {
      targetDir = MATH_DIR;
      subject = 'math';
    } else if (slug.startsWith('english')) {
      targetDir = ENGLISH_DIR;
      subject = 'english';
    } else if (slug.startsWith('cs')) {
      targetDir = CS_DIR;
      subject = 'cs';
    } else if (slug.startsWith('islamiat')) {
      targetDir = ISLAMIAT_DIR;
      subject = 'islamiat';
    } else if (slug.startsWith('tarjuma')) {
      targetDir = TARJUMA_DIR;
      subject = 'tarjuma';
    } else if (slug.startsWith('biology')) {
      targetDir = BIOLOGY_DIR;
      subject = 'biology';
    } else if (slug.startsWith('chemistry')) {
      targetDir = CHEMISTRY_DIR;
      subject = 'chemistry';
    }

    const fileName = slug.endsWith('.json') ? slug : `${slug}.json`;
    const filePath = path.join(targetDir, fileName);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data: ChapterData = JSON.parse(content);
      return {
        ...data,
        slug,
        subject,
      };
    }

    // Fallback search across all directories
    const dirMap: Array<[string, SubjectId]> = [
      [PHYSICS_12_DIR, 'physics-12'],
      [ENGLISH_12_DIR, 'english-12'],
      [URDU_12_DIR, 'urdu-12'],
      [PAKSTUDIES_12_DIR, 'pakstudies-12'],
      [TARJUMA_12_DIR, 'tarjuma-12'],
      [PAKSTUDIES_10_DIR, 'pakstudies-10'],
      [URDU_10_DIR, 'urdu-10'],
      [TARJUMA_10_DIR, 'tarjuma-10'],
      [ENGLISH_10_DIR, 'english-10'],
      [BIOLOGY_10_DIR, 'biology-10'],
      [CS_10_DIR, 'cs-10'],
      [CHEMISTRY_10_DIR, 'chemistry-10'],
      [PHYSICS_10_DIR, 'physics-10'],
      [MATH_10_DIR, 'math-10'],
      [BIOLOGY_9_DIR, 'biology-9'],
      [CS_9_DIR, 'cs-9'],
      [CHEMISTRY_9_DIR, 'chemistry-9'],
      [ISLAMIAT_9_DIR, 'islamiat-9'],
      [ENGLISH_9_DIR, 'english-9'],
      [TARJUMA_9_DIR, 'tarjuma-9'],
      [URDU_9_DIR, 'urdu-9'],
      [MATH_9_DIR, 'math-9'],
      [PHYSICS_9_DIR, 'physics-9'],
      [BIOLOGY_DIR, 'biology'],
      [CHEMISTRY_DIR, 'chemistry'],
      [ISLAMIAT_DIR, 'islamiat'],
      [TARJUMA_DIR, 'tarjuma'],
      [CS_DIR, 'cs'],
      [ENGLISH_DIR, 'english'],
      [MATH_DIR, 'math'],
      [URDU_DIR, 'urdu'],
      [PHYSICS_DIR, 'physics'],
    ];

    for (const [dir, sub] of dirMap) {
      const altPath = path.join(dir, fileName);
      if (fs.existsSync(altPath)) {
        const content = fs.readFileSync(altPath, 'utf-8');
        const data: ChapterData = JSON.parse(content);
        return {
          ...data,
          slug,
          subject: sub,
        };
      }
    }
  } catch (err) {
    console.error(`Error reading ${slug}:`, err);
  }
  return null;
}
