export function SetupTab({ state, onUpdate }) {
  const { meta, weights, teamNames } = state;

  const weightLabels = {
    sm: 'Scrum Master',
    owner: 'Owner',
    po: 'Product Owner',
    dev: 'Developers',
    buyer: 'Avaliação dos Compradores',
  };

  function handleRenameEmpresa(which, novoNome) {
    const oldVal = which === 'A' ? meta.empresaA : meta.empresaB;
    if (!novoNome || novoNome === oldVal) return;

    const rename = (v) => (v === oldVal ? novoNome : v);

    const patch = {
      meta: { ...meta, [which === 'A' ? 'empresaA' : 'empresaB']: novoNome },
      sm: state.sm.map((r) => ({ ...r, empresa: rename(r.empresa) })),
      owner: state.owner.map((r) => ({ ...r, empresa: rename(r.empresa) })),
      po: state.po.map((r) => ({ ...r, empresa: rename(r.empresa) })),
      dev: state.dev.map((r) => ({ ...r, empresa: rename(r.empresa) })),
      buyerProduct: state.buyerProduct.map((r) => ({ ...r, empresa: rename(r.empresa) })),
      alunos: state.alunos.map((a) => ({ ...a, empresa: rename(a.empresa) })),
      corrupcao: { ...state.corrupcao, empresaCorruptora: rename(state.corrupcao.empresaCorruptora) },
      sabotagem: { ...state.sabotagem, empresaSabotador: rename(state.sabotagem.empresaSabotador) },
      teamNames: Object.fromEntries(
        Object.entries(teamNames).map(([k, v]) => [k === oldVal ? novoNome : k, v])
      ),
    };

    onUpdate(patch);
  }

  return (
    <div className="panel">
      <h2>Configuração</h2>
      <p className="desc">
        Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.
      </p>

      {/* Turma e data */}
      <div className="fields-row">
        <div className="field">
          <label>Turma</label>
          <input
            type="text"
            value={meta.turma}
            onChange={(e) => onUpdate({ meta: { ...meta, turma: e.target.value } })}
          />
        </div>
        <div className="field">
          <label>Data</label>
          <input
            type="text"
            value={meta.data}
            onChange={(e) => onUpdate({ meta: { ...meta, data: e.target.value } })}
          />
        </div>
      </div>

      {/* Empresa A */}
      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa A</label>
          <input
            type="text"
            defaultValue={meta.empresaA}
            onBlur={(e) => handleRenameEmpresa('A', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Caça — Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA]?.Caça ?? ''}
            onChange={(e) =>
              onUpdate({
                teamNames: {
                  ...teamNames,
                  [meta.empresaA]: { ...teamNames[meta.empresaA], Caça: e.target.value },
                },
              })
            }
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA]?.Transporte ?? ''}
            onChange={(e) =>
              onUpdate({
                teamNames: {
                  ...teamNames,
                  [meta.empresaA]: { ...teamNames[meta.empresaA], Transporte: e.target.value },
                },
              })
            }
          />
        </div>
      </div>

      {/* Empresa B */}
      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa B</label>
          <input
            type="text"
            defaultValue={meta.empresaB}
            onBlur={(e) => handleRenameEmpresa('B', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Caça — Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB]?.Caça ?? ''}
            onChange={(e) =>
              onUpdate({
                teamNames: {
                  ...teamNames,
                  [meta.empresaB]: { ...teamNames[meta.empresaB], Caça: e.target.value },
                },
              })
            }
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB]?.Transporte ?? ''}
            onChange={(e) =>
              onUpdate({
                teamNames: {
                  ...teamNames,
                  [meta.empresaB]: { ...teamNames[meta.empresaB], Transporte: e.target.value },
                },
              })
            }
          />
        </div>
      </div>

      <div className="note note-dark">
        Dica: os nomes de empresa já vêm pré-preenchidos (Maverick Aviation e SkyForge Ind. Aeronáutica). Pode
        alterar se quiser.
      </div>

      {/* Pesos da nota final */}
      <h2 style={{ marginTop: '1.6rem' }}>Pesos da Nota Final</h2>
      <p className="desc">Ajuste o peso de cada papel no cálculo da nota final da empresa (aba "Resultado Final").</p>
      <div className="weights-panel">
        {Object.keys(weights).map((k) => (
          <div className="weight-field" key={k}>
            <label>{weightLabels[k]}</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={weights[k]}
              onChange={(e) =>
                onUpdate({ weights: { ...weights, [k]: parseFloat(e.target.value) || 0 } })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
