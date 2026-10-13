import { useEffect, useState, useSyncExternalStore } from 'react';

const systemTheme = () => matchMedia('(prefers-color-scheme: dark)').matches;
const subscribe = callback => {
  const media = matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

export default function useTheme() {
  const [preference, setPreference] = useState(() => {
    try {
      const saved = localStorage.getItem('jdbf-theme');
      return ['light', 'dark'].includes(saved) ? saved : null;
    } catch { return null; }
  });
  const systemDark = useSyncExternalStore(subscribe, systemTheme, () => false);
  const theme = preference || (systemDark ? 'dark' : 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#141713' : '#fafbf9');
    try { if (preference) localStorage.setItem('jdbf-theme', preference); } catch { /* The visible theme still works. */ }
  }, [theme, preference]);
  return [theme, () => setPreference(theme === 'light' ? 'dark' : 'light')];
}
