// Topbar — barra superior com título, controles de fonte e botões de ação
export function Topbar({ meta, fontScale, onSave, onLoad, onReset, onFontChange }) {
  return (
    <header className="topbar">
      <div>
        <h1>📋 Painel de Avaliação — Simulação Scrum</h1>
        <div className="sub">
          {meta.turma && <span>{meta.turma}</span>}
          {meta.turma && meta.data && ' · '}
          {meta.data && <span>{meta.data}</span>}
        </div>
      </div>

      <div className="topbar-actions">
        {/* Controle de tamanho de fonte */}
        <div className="fontctrl">
          <button onClick={() => onFontChange(-1)} title="Diminuir fonte">A−</button>
          <span className="lbl">{fontScale}px</span>
          <button onClick={() => onFontChange(0)} title="Fonte padrão">A</button>
          <button onClick={() => onFontChange(+1)} title="Aumentar fonte">A+</button>
        </div>

        <button className="btn btn-save" onClick={onSave}>
          💾 Salvar dados
        </button>
        <button className="btn btn-load" onClick={onLoad}>
          📂 Carregar dados
        </button>
        <button className="btn btn-reset" onClick={onReset}>
          🔄 Novo
        </button>
      </div>
    </header>
  );
}
