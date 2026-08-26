import { computeEmpresaScore } from '../utils/scoring';

const COLORS = [
  'linear-gradient(135deg, #455F51, #324339)',
  'linear-gradient(135deg, #0989B1, #065E77)',
];

export function ResultTab({ state }) {
  const empresas = [state.meta.empresaA, state.meta.empresaB];

  return (
    <div className="panel">
      <h2>Resultado Final</h2>
      <p className="desc">
        Cálculo automático a partir das médias lançadas em cada aba, ajustado pelos pontos de corrupção/sabotagem.
        Use como referência — a decisão final da nota é sempre sua.
      </p>

      <div className="grid2">
        {empresas.map((empresa, idx) => {
          const score = computeEmpresaScore(state, empresa);
          return (
            <div className="dash-card" key={empresa} style={{ background: COLORS[idx] }}>
              <h3>{empresa}</h3>
              <div className="big">{score.final !== null ? score.final.toFixed(2) : '—'}</div>
              <div className="breakdown">
                {score.parts.map((p) => (
                  <div key={p.key}>
                    <span>{p.key}</span>
                    <span>{p.val !== null ? p.val.toFixed(2) : '—'}</span>
                  </div>
                ))}
                <div style={{ marginTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,.3)', paddingTop: '0.4rem' }}>
                  <span>Ajuste (corrupção/sabotagem)</span>
                  <span>{score.ajuste >= 0 ? '+' : ''}{score.ajuste.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="note note-orange" style={{ marginTop: '1.1rem' }}>
        A nota final é uma média ponderada das notas médias por papel (pesos configuráveis em "Configuração"), somada aos pontos fixos de corrupção/sabotagem. Ela não substitui seu julgamento.
      </div>
    </div>
  );
}
