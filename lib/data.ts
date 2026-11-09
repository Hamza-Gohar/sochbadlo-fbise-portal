import fs from 'fs';
import path from 'path';
import { ChapterData, ChapterMeta } from './types';

const PHYSICS_DIR = path.join(process.cwd(), 'data', 'physics-11');
const URDU_DIR = path.join(process.cwd(), 'data', 'urdu-11');
const MATH_DIR = path.join(process.cwd(), 'data', 'math-11');
const ENGLISH_DIR = path.join(process.cwd(), 'data', 'english-11');
const CS_DIR = path.join(process.cwd(), 'data', 'cs-11');
const ISLAMIAT_DIR = path.join(process.cwd(), 'data', 'islamiat-11');
const TARJUMA_DIR = path.join(process.cwd(), 'data', 'tarjuma-11');

export function getChaptersIndex(
  subject: 'physics' | 'urdu' | 'math' | 'english' | 'cs' | 'islamiat' | 'tarjuma' = 'physics'
): ChapterMeta[] {
  try {
    let dir = PHYSICS_DIR;
    if (subject === 'urdu') dir = URDU_DIR;
    else if (subject === 'math') dir = MATH_DIR;
    else if (subject === 'english') dir = ENGLISH_DIR;
    else if (subject === 'cs') dir = CS_DIR;
    else if (subject === 'islamiat') dir = ISLAMIAT_DIR;
    else if (subject === 'tarjuma') dir = TARJUMA_DIR;

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
    ...getChaptersIndex('islamiat'),
    ...getChaptersIndex('tarjuma'),
  ];
}

export function getAllSlugs(): string[] {
  return getAllChapters().map((c) => c.slug);
}

export function getChapterBySlug(
  slug: string
): (ChapterData & { slug: string; subject: 'physics' | 'urdu' | 'math' | 'english' | 'cs' | 'islamiat' | 'tarjuma' }) | null {
  try {
    let targetDir = PHYSICS_DIR;
    let subject: 'physics' | 'urdu' | 'math' | 'english' | 'cs' | 'islamiat' | 'tarjuma' = 'physics';

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
    } else if (slug.startsWith('islamiat')) {
      targetDir = ISLAMIAT_DIR;
      subject = 'islamiat';
    } else if (slug.startsWith('tarjuma')) {
      targetDir = TARJUMA_DIR;
      subject = 'tarjuma';
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

    // Fallback search across all seven directories
    const dirMap: Array<[string, 'physics' | 'urdu' | 'math' | 'english' | 'cs' | 'islamiat' | 'tarjuma']> = [
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
