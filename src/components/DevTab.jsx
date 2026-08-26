import { SnSelect, ScoreSelect, ObsInput, sprintLabel } from './shared/FormInputs';

export function DevTab({ state, onUpdate }) {
  const rows = state.dev;

  function updateRow(index, field, value) {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onUpdate({ dev: next });
  }

  return (
    <div className="panel">
      <h2>Developers</h2>
      <p className="desc">
        Avaliação por time — com muitos alunos em produção, a qualidade do produto é o principal indicador de entendimento do processo pelo grupo.
      </p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Time</th>
            <th>Qualidade do<br />produto (1-5)</th>
            <th>Seguiu o<br />processo?</th>
            <th>Colaboração<br />do time (1-5)</th>
            <th>Nota Time (1-5)</th>
            <th>Destaque individual (opcional)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td><ScoreSelect value={r.qualidade} onChange={(v) => updateRow(i, 'qualidade', v)} /></td>
              <td><SnSelect value={r.processo} onChange={(v) => updateRow(i, 'processo', v)} /></td>
              <td><ScoreSelect value={r.colaboracao} onChange={(v) => updateRow(i, 'colaboracao', v)} /></td>
              <td><ScoreSelect value={r.notaTime} onChange={(v) => updateRow(i, 'notaTime', v)} /></td>
              <td><ObsInput value={r.destaque} onChange={(v) => updateRow(i, 'destaque', v)} placeholder="nome (se houver)" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note note-green">
        Reserve a coluna de destaque individual apenas para casos que realmente chamem atenção, positiva ou negativamente.
      </div>
    </div>
  );
}
