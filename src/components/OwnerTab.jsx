import { ScoreSelect, ObsInput, sprintLabel } from './shared/FormInputs';

export function OwnerTab({ state, onUpdate }) {
  const rows = state.owner;

  function updateRow(index, field, value) {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onUpdate({ owner: next });
  }

  return (
    <div className="panel">
      <h2>Stakeholder / Owner</h2>
      <p className="desc">
        Avaliação de comunicação e negociação — independente dos pontos de corrupção, registrados na aba "Corrupção &amp; Sabotagem".
      </p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Comunicação com<br />a equipe (1-5)</th>
            <th>Negociação com<br />compradores (1-5)</th>
            <th>Alinhamento com<br />SM/PO sobre qualidade (1-5)</th>
            <th>Nota Geral (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td><ScoreSelect value={r.comunicacao} onChange={(v) => updateRow(i, 'comunicacao', v)} /></td>
              <td><ScoreSelect value={r.negociacao} onChange={(v) => updateRow(i, 'negociacao', v)} /></td>
              <td><ScoreSelect value={r.alinhamento} onChange={(v) => updateRow(i, 'alinhamento', v)} /></td>
              <td><ScoreSelect value={r.notaGeral} onChange={(v) => updateRow(i, 'notaGeral', v)} /></td>
              <td><ObsInput value={r.obs} onChange={(v) => updateRow(i, 'obs', v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note note-blue">
        Esta nota avalia o desempenho no papel — não confunda com os pontos ganhos/perdidos no mecanismo de corrupção, calculados automaticamente na aba própria.
      </div>
    </div>
  );
}
