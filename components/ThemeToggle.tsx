'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export default function ThemeToggle({ compact = false, className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Determine initial state
    const saved = localStorage.getItem('fbise_theme_mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(initialIsDark);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: 'light' | 'dark' }>;
      if (customEvent.detail?.mode) {
        setIsDark(customEvent.detail.mode === 'dark');
      }
    };

    window.addEventListener('fbise-theme-changed', handleThemeChange);
    return () => window.removeEventListener('fbise-theme-changed', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    const nextMode = nextDark ? 'dark' : 'light';

    setIsDark(nextDark);
    try {
      localStorage.setItem('fbise_theme_mode', nextMode);
      if (nextDark) {
        document.documentElement.setAttribute('data-mode', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.setAttribute('data-mode', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new CustomEvent('fbise-theme-changed', { detail: { mode: nextMode } }));
    } catch {
      // LocalStorage error fallback
    }
  };

  if (!mounted) {
    // Render placeholder to avoid layout shift while mounting
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex items-center justify-center border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] text-[var(--color-muted)] font-mono text-xs transition-colors ${
          compact ? 'p-2 min-h-[38px] min-w-[38px]' : 'px-3 py-1.5 min-h-[44px] gap-2'
        } ${className}`}
        disabled
      >
        <span className="w-4 h-4 opacity-0" />
        {!compact && <span className="text-xs">Theme</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`inline-flex items-center justify-center border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-ink)] font-mono text-xs transition-colors active:scale-95 ${
        compact ? 'p-2 min-h-[38px] min-w-[38px]' : 'px-3 py-1.5 min-h-[44px] gap-2'
      } ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          {!compact && <span className="text-xs font-medium font-sans">Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[var(--color-ink)] shrink-0" />
          {!compact && <span className="text-xs font-medium font-sans">Dark Mode</span>}
        </>
      )}
    </button>
  );
}
