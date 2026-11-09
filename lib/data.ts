import fs from 'fs';
import path from 'path';
import { ChapterData, ChapterMeta } from './types';

const PHYSICS_DIR = path.join(process.cwd(), 'data', 'physics-11');
const URDU_DIR = path.join(process.cwd(), 'data', 'urdu-11');

export function getChaptersIndex(subject: 'physics' | 'urdu' = 'physics'): ChapterMeta[] {
  try {
    const dir = subject === 'urdu' ? URDU_DIR : PHYSICS_DIR;
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
  return [...getChaptersIndex('physics'), ...getChaptersIndex('urdu')];
}

export function getAllSlugs(): string[] {
  return getAllChapters().map((c) => c.slug);
}

export function getChapterBySlug(
  slug: string
): (ChapterData & { slug: string; subject: 'physics' | 'urdu' }) | null {
  try {
    const isUrdu = slug.startsWith('urdu');
    const targetDir = isUrdu ? URDU_DIR : PHYSICS_DIR;
    const fileName = slug.endsWith('.json') ? slug : `${slug}.json`;
    const filePath = path.join(targetDir, fileName);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data: ChapterData = JSON.parse(content);
      return {
        ...data,
        slug,
        subject: isUrdu ? 'urdu' : 'physics',
      };
    }

    // Fallback search across both directories
    for (const dir of [URDU_DIR, PHYSICS_DIR]) {
      const altPath = path.join(dir, fileName);
      if (fs.existsSync(altPath)) {
        const content = fs.readFileSync(altPath, 'utf-8');
        const data: ChapterData = JSON.parse(content);
        return {
          ...data,
          slug,
          subject: dir === URDU_DIR ? 'urdu' : 'physics',
        };
      }
    }
  } catch (err) {
    console.error(`Error reading ${slug}:`, err);
  }
  return null;
}
