import { SnSelect, ScoreSelect, ObsInput, sprintLabel } from './shared/FormInputs';

export function SMTab({ state, onUpdate }) {
  const rows = state.sm;

  function updateRow(index, field, value) {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onUpdate({ sm: next });
  }

  return (
    <div className="panel">
      <h2>Scrum Master</h2>
      <p className="desc">Avaliação de processo — um Scrum Master por empresa, atendendo os dois times.</p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Conduziu os eventos<br />corretamente?</th>
            <th>Removeu<br />impedimentos?</th>
            <th>Ajudou o time a<br />melhorar entre Sprints?</th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td><SnSelect value={r.conduziu} onChange={(v) => updateRow(i, 'conduziu', v)} /></td>
              <td><SnSelect value={r.removeu} onChange={(v) => updateRow(i, 'removeu', v)} /></td>
              <td><SnSelect value={r.ajudou} onChange={(v) => updateRow(i, 'ajudou', v)} /></td>
              <td><ScoreSelect value={r.nota} onChange={(v) => updateRow(i, 'nota', v)} /></td>
              <td><ObsInput value={r.obs} onChange={(v) => updateRow(i, 'obs', v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note note-dark">
        Critério-guia: o SM não é avaliado por produzir, mas por garantir que o Scrum aconteça de verdade e por ajudar o time a evoluir de uma Sprint para a outra.
      </div>
    </div>
  );
}
