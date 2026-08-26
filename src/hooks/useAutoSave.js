import { useEffect, useRef } from 'react';
import { STORAGE_KEY } from '../data/constants';

/**
 *
 * @param {object} state 
 */
export function useAutoSave(state) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
      }
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state]);
}

export function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}
