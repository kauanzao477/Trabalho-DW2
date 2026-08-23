// =====================================================================
// Componentes de input reutilizáveis para as tabelas de avaliação
// =====================================================================

/** Select Sim/Não */
export function SnSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="S">Sim</option>
      <option value="N">Não</option>
    </select>
  );
}

/** Select de nota de 1 a 5 */
export function ScoreSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      {[1, 2, 3, 4, 5].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
}

/** Select de decisão do comprador: Aceitou / Ignorou / Denunciou */
export function DecisaoSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="A">Aceitou</option>
      <option value="I">Ignorou</option>
      <option value="D">Denunciou</option>
    </select>
  );
}

/** Input de observação/texto livre */
export function ObsInput({ value, onChange, placeholder }) {
  return (
    <input
      className="obs-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || ''}
    />
  );
}

/**
 * Retorna o rótulo de sprint para a linha i de uma tabela,
 * evitando repetir o mesmo sprint em linhas consecutivas.
 */
export function sprintLabel(rows, i, key = 'sprint') {
  if (i === 0) return `Sprint ${rows[i].sprint}`;
  return rows[i][key] !== rows[i - 1][key] ? `Sprint ${rows[i].sprint}` : '';
}
