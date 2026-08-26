import { SnSelect, ScoreSelect, DecisaoSelect, ObsInput, sprintLabel } from './shared/FormInputs';

export function BuyerProductTab({ state, onUpdate }) {
  const rows = state.buyerProduct;

  function updateRow(index, field, value) {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onUpdate({ buyerProduct: next });
  }

  return (
    <div className="panel">
      <h2>Ficha do Comprador — Avaliação do Produto</h2>
      <p className="desc">
        Transcreva aqui os dados que cada comprador preencheu na ficha em papel, ao final de cada Sprint.
      </p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Empresa</th>
            <th>Produto</th>
            <th>Padrão<br />Técnico</th>
            <th>Padrão<br />Visual</th>
            <th>Prazo</th>
            <th>Com.<br />Owner (1-5)</th>
            <th>Sinal</th>
            <th>Decisão</th>
            <th>Nota (1-5)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.comprador}</td>
              <td>{r.empresa}</td>
              <td>{r.produto}</td>
              <td><SnSelect value={r.pt} onChange={(v) => updateRow(i, 'pt', v)} /></td>
              <td><SnSelect value={r.pv} onChange={(v) => updateRow(i, 'pv', v)} /></td>
              <td><SnSelect value={r.prazo} onChange={(v) => updateRow(i, 'prazo', v)} /></td>
              <td><ScoreSelect value={r.comOwner} onChange={(v) => updateRow(i, 'comOwner', v)} /></td>
              <td><SnSelect value={r.sinal} onChange={(v) => updateRow(i, 'sinal', v)} /></td>
              <td><DecisaoSelect value={r.decisao} onChange={(v) => updateRow(i, 'decisao', v)} /></td>
              <td><ScoreSelect value={r.nota} onChange={(v) => updateRow(i, 'nota', v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note note-orange">
        Militar só avalia Caça; Setor Privado só avalia Transporte; Governo avalia os dois. Linhas fora do papel do comprador podem ficar em branco.
      </div>
    </div>
  );
}
