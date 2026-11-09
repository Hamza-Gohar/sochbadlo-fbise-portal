import fs from 'fs';
import path from 'path';
import { ChapterData, ChapterMeta } from './types';

const DATA_DIR = path.join(process.cwd(), 'data', 'physics-11');

export function getChaptersIndex(): ChapterMeta[] {
  try {
    const indexPath = path.join(DATA_DIR, 'chapters-index.json');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading chapters-index.json:', err);
  }
  return [];
}

export function getChapterBySlug(slug: string): ChapterData | null {
  try {
    const fileName = slug === 'past-papers' ? 'past-papers.json' : `${slug}.json`;
    const filePath = path.join(DATA_DIR, fileName);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${slug}:`, err);
  }
  return null;
}
