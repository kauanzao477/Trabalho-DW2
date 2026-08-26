import { SnSelect, ScoreSelect, ObsInput, sprintLabel } from './shared/FormInputs';

export function BuyerProfTab({ state, onUpdate }) {
  const rows = state.buyerProf;

  function updateRow(index, field, value) {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onUpdate({ buyerProf: next });
  }

  return (
    <div className="panel">
      <h2>Compradores — Desempenho no Papel</h2>
      <p className="desc">Avaliação do professor sobre como cada comprador exerceu seu papel.</p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Aplicou o checklist<br />de verificação?</th>
            <th>Decisões coerentes<br />com o papel?</th>
            <th>Feedback construtivo<br />nas Reviews?</th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.comprador}</td>
              <td><SnSelect value={r.checklist} onChange={(v) => updateRow(i, 'checklist', v)} /></td>
              <td><SnSelect value={r.decisoes} onChange={(v) => updateRow(i, 'decisoes', v)} /></td>
              <td><SnSelect value={r.feedback} onChange={(v) => updateRow(i, 'feedback', v)} /></td>
              <td><ScoreSelect value={r.nota} onChange={(v) => updateRow(i, 'nota', v)} /></td>
              <td><ObsInput value={r.obs} onChange={(v) => updateRow(i, 'obs', v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note note-orange">
        Critério-guia: avalie se o comprador aplicou o checklist a cada Sprint, se as decisões foram coerentes com o papel, e se o feedback nas Reviews foi útil.
      </div>
    </div>
  );
}
