import { SnSelect, ScoreSelect, ObsInput, sprintLabel } from './shared/FormInputs';

export function POTab({ state, onUpdate }) {
  const rows = state.po;

  function updateRow(index, field, value) {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onUpdate({ po: next });
  }

  return (
    <div className="panel">
      <h2>Product Owner</h2>
      <p className="desc">Um Product Owner por time (2 times por empresa).</p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Time</th>
            <th>Requisitos<br />claros ao time?</th>
            <th>Acompanhou os<br />testes de perto?</th>
            <th>Reunião de<br />priorização ocorreu?</th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td><SnSelect value={r.requisitos} onChange={(v) => updateRow(i, 'requisitos', v)} /></td>
              <td><SnSelect value={r.testes} onChange={(v) => updateRow(i, 'testes', v)} /></td>
              <td><SnSelect value={r.reuniao} onChange={(v) => updateRow(i, 'reuniao', v)} /></td>
              <td><ScoreSelect value={r.nota} onChange={(v) => updateRow(i, 'nota', v)} /></td>
              <td><ObsInput value={r.obs} onChange={(v) => updateRow(i, 'obs', v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note note-teal">
        Critério-guia: o PO é avaliado pela clareza dos requisitos e pelo acompanhamento ativo da produção — não pela qualidade técnica do avião em si.
      </div>
    </div>
  );
}
