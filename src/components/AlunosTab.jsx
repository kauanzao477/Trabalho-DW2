import { useState } from 'react';
import * as XLSX from 'xlsx';
import { PAPEIS, TIMES, SEED_NAMES, ROLE_COLORS } from '../data/constants';

export function AlunosTab({ state, onUpdate }) {
  const [search, setSearch] = useState('');
  const { alunos, meta } = state;
  const empresas = [meta.empresaA, meta.empresaB];

  // Contadores de vagas preenchidas por empresa
  const counts = {};
  empresas.forEach((e) => {
    counts[e] = {
      'Scrum Master': 0,
      'Owner/Stakeholder': 0,
      'Product Owner-Caça': 0,
      'Product Owner-Transporte': 0,
      'Developer-Caça': 0,
      'Developer-Transporte': 0,
    };
  });
  const buyerCounts = { 'Comprador - Governo': 0, 'Comprador - Militar': 0, 'Comprador - Setor Privado': 0 };

  alunos.forEach((a) => {
    if (a.papel === 'Comprador - Governo' || a.papel === 'Comprador - Militar' || a.papel === 'Comprador - Setor Privado') {
      buyerCounts[a.papel]++;
    } else if (a.papel === 'Scrum Master' || a.papel === 'Owner/Stakeholder') {
      if (counts[a.empresa]) counts[a.empresa][a.papel]++;
    } else if ((a.papel === 'Product Owner' || a.papel === 'Developer') && a.time) {
      if (counts[a.empresa]) counts[a.empresa][`${a.papel}-${a.time}`]++;
    }
  });

  const naoAtribuidos = alunos.filter((a) => !a.papel).length;

  // Atualiza um campo de um aluno específico
  function updateAluno(index, field, value) {
    const next = alunos.map((a, i) => {
      if (i !== index) return a;
      const updated = { ...a, [field]: value };
      // Limpa empresa/time se o papel mudou para um que não precisa
      if (field === 'papel') {
        const needsEmpresa = ['Scrum Master', 'Owner/Stakeholder', 'Product Owner', 'Developer'].includes(value);
        const needsTime = ['Product Owner', 'Developer'].includes(value);
        if (!needsEmpresa) { updated.empresa = ''; updated.time = ''; }
        if (!needsTime) updated.time = '';
      }
      return updated;
    });
    onUpdate({ alunos: next });
  }

  function handleImportXlsx(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const wb = XLSX.read(ev.target.result, { type: 'array' });
        const names = [];
        wb.SheetNames.forEach((sn) => {
          const ws = wb.Sheets[sn];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          rows.forEach((row) => {
            row.forEach((cell) => {
              if (typeof cell === 'string' && cell.trim().split(' ').length >= 2 && cell.trim().length > 5 && !/\d/.test(cell)) {
                names.push(cell.trim());
              }
            });
          });
        });
        const unique = [...new Set(names)];
        if (unique.length === 0) { alert('Não encontrei nomes reconhecíveis nesse arquivo.'); return; }
        if (!confirm(`Encontrei ${unique.length} nomes. Isso substitui a lista atual (as atribuições serão perdidas). Continuar?`)) return;
        onUpdate({ alunos: unique.map((nome, i) => ({ id: i + 1, nome, empresa: '', time: '', papel: '' })) });
      } catch {
        alert('Não foi possível ler este arquivo Excel.');
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  }

  const filtered = search
    ? alunos.filter((a) => a.nome.toLowerCase().includes(search.toLowerCase()))
    : alunos;

  return (
    <div className="panel">
      <h2>Alunos</h2>
      <p className="desc">Atribua cada aluno a um papel e equipe. A turma não escolhe o lado — a atribuição é feita aqui pelo professor.</p>

      <div className="roster-search">
        <input
          type="text"
          placeholder="Buscar aluno por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="roster-table">
        <thead>
          <tr>
            <th style={{ width: '2.5rem' }}>#</th>
            <th style={{ width: '16rem' }}>Nome</th>
            <th>Papel</th>
            <th>Empresa</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a, _) => {
            // Precisamos do índice original no array completo
            const origIndex = alunos.indexOf(a);
            const needsEmpresa = ['Scrum Master', 'Owner/Stakeholder', 'Product Owner', 'Developer'].includes(a.papel);
            const needsTime = ['Product Owner', 'Developer'].includes(a.papel);
            return (
              <tr key={a.id} data-aluno-id={a.id}>
                <td>{a.id}</td>
                <td style={{ textAlign: 'left' }}>{a.nome}</td>
                <td>
                  <select value={a.papel} onChange={(e) => updateAluno(origIndex, 'papel', e.target.value)}>
                    {PAPEIS.map((p) => (
                      <option key={p} value={p}>{p === '' ? '— não atribuído —' : p}</option>
                    ))}
                  </select>
                </td>
                <td>
                  {needsEmpresa && (
                    <select value={a.empresa} onChange={(e) => updateAluno(origIndex, 'empresa', e.target.value)}>
                      <option value="">—</option>
                      {empresas.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  )}
                </td>
                <td>
                  {needsTime && (
                    <select value={a.time} onChange={(e) => updateAluno(origIndex, 'time', e.target.value)}>
                      <option value="">—</option>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={`note ${naoAtribuidos > 0 ? 'note-orange' : 'note-green'}`} style={{ marginTop: '1rem' }}>
        {naoAtribuidos} de {alunos.length} alunos ainda sem papel atribuído.
      </div>

      {/* Resumo de vagas */}
      <h2 style={{ marginTop: '1.6rem' }}>Resumo de Vagas Preenchidas</h2>
      <div className="grid2">
        {empresas.map((e) => (
          <div className="mini-card" key={e}>
            <h3>{e}</h3>
            <div className="mini-row"><label>Scrum Master</label><span className="pts">{counts[e]['Scrum Master']} / 1</span></div>
            <div className="mini-row"><label>Owner/Stakeholder</label><span className="pts">{counts[e]['Owner/Stakeholder']} / 1</span></div>
            <div className="mini-row"><label>PO — {state.teamNames[e]?.Caça}</label><span className="pts">{counts[e]['Product Owner-Caça']} / 1</span></div>
            <div className="mini-row"><label>PO — {state.teamNames[e]?.Transporte}</label><span className="pts">{counts[e]['Product Owner-Transporte']} / 1</span></div>
            <div className="mini-row"><label>Devs — {state.teamNames[e]?.Caça}</label><span className="pts">{counts[e]['Developer-Caça']} / 4</span></div>
            <div className="mini-row"><label>Devs — {state.teamNames[e]?.Transporte}</label><span className="pts">{counts[e]['Developer-Transporte']} / 5</span></div>
          </div>
        ))}
      </div>

      <div className="mini-card" style={{ marginTop: '1rem' }}>
        <h3>Compradores</h3>
        <div className="mini-row"><label>Governo</label><span className="pts">{buyerCounts['Comprador - Governo']} / 1</span></div>
        <div className="mini-row"><label>Militar</label><span className="pts">{buyerCounts['Comprador - Militar']} / 1</span></div>
        <div className="mini-row"><label>Setor Privado</label><span className="pts">{buyerCounts['Comprador - Setor Privado']} / 1</span></div>
      </div>

      {/* Importar nova lista */}
      <h2 style={{ marginTop: '1.6rem' }}>Importar Lista de Alunos</h2>
      <p className="desc">Substitui a lista atual por uma nova, a partir de um arquivo Excel (.xlsx). Use apenas se for reaproveitar este painel para outra turma.</p>
      <input type="file" id="importAlunosFile" accept=".xlsx,.xls" onChange={handleImportXlsx} />
    </div>
  );
}
