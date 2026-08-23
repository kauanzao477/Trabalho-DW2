import { useEffect, useRef } from 'react';
import { STORAGE_KEY } from '../data/constants';

/**
 * Hook que salva automaticamente o estado no localStorage
 * sempre que ele mudar. Usa um debounce de 800ms para não
 * gravar a cada tecla digitada.
 *
 * @param {object} state - o estado atual do painel
 */
export function useAutoSave(state) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Cancela o timer anterior se o estado mudar antes de ele disparar
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // localStorage pode estar cheio ou bloqueado — falha silenciosa
      }
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state]);
}

/** Carrega o estado salvo do localStorage, ou retorna null */
export function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Remove o estado salvo do localStorage */
export function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}
