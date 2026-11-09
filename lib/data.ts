import fs from 'fs';
import path from 'path';
import { ChapterData, ChapterMeta } from './types';

const PHYSICS_DIR = path.join(process.cwd(), 'data', 'physics-11');
const URDU_DIR = path.join(process.cwd(), 'data', 'urdu-11');
const MATH_DIR = path.join(process.cwd(), 'data', 'math-11');
const ENGLISH_DIR = path.join(process.cwd(), 'data', 'english-11');
const CS_DIR = path.join(process.cwd(), 'data', 'cs-11');

export function getChaptersIndex(
  subject: 'physics' | 'urdu' | 'math' | 'english' | 'cs' = 'physics'
): ChapterMeta[] {
  try {
    let dir = PHYSICS_DIR;
    if (subject === 'urdu') dir = URDU_DIR;
    else if (subject === 'math') dir = MATH_DIR;
    else if (subject === 'english') dir = ENGLISH_DIR;
    else if (subject === 'cs') dir = CS_DIR;

    const indexPath = path.join(dir, 'chapters-index.json');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      const list: ChapterMeta[] = JSON.parse(content);
      return list.map((item) => ({ ...item, subject }));
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
  ];
}

export function getAllSlugs(): string[] {
  return getAllChapters().map((c) => c.slug);
}

export function getChapterBySlug(
  slug: string
): (ChapterData & { slug: string; subject: 'physics' | 'urdu' | 'math' | 'english' | 'cs' }) | null {
  try {
    let targetDir = PHYSICS_DIR;
    let subject: 'physics' | 'urdu' | 'math' | 'english' | 'cs' = 'physics';

    if (slug.startsWith('urdu')) {
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

    // Fallback search across all five directories
    const dirMap: Array<[string, 'physics' | 'urdu' | 'math' | 'english' | 'cs']> = [
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
