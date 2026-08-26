import { useState, useRef } from 'react';
import { Topbar } from './components/Topbar';
import { TabsBar } from './components/TabsBar';
import { SetupTab } from './components/SetupTab';
import { AlunosTab } from './components/AlunosTab';
import { EscalacaoTab } from './components/EscalacaoTab';
import { SMTab } from './components/SMTab';
import { OwnerTab } from './components/OwnerTab';
import { POTab } from './components/POTab';
import { DevTab } from './components/DevTab';
import { BuyerProfTab } from './components/BuyerProfTab';
import { BuyerProductTab } from './components/BuyerProductTab';
import { CorrupSabTab } from './components/CorrupSabTab';
import { ResultTab } from './components/ResultTab';
import { useAutoSave, loadSavedState, clearSavedState } from './hooks/useAutoSave';
import { buildInitialData, STORAGE_KEY } from './data/constants';

const TABS = [
  { key: 'setup',        label: '⚙️ Configuração' },
  { key: 'alunos',       label: '👥 Alunos' },
  { key: 'escalacao',    label: '🗂️ Escalação' },
  { key: 'sm',           label: '🟢 Scrum Master' },
  { key: 'owner',        label: '🔵 Owner' },
  { key: 'po',           label: '🟡 Product Owner' },
  { key: 'dev',          label: '🟣 Developers' },
  { key: 'buyerProf',    label: '🟠 Compradores (Papel)' },
  { key: 'buyerProduct', label: '🔴 Compradores (Produto)' },
  { key: 'corrupsab',    label: '☠️ Corrupção & Sabotagem' },
  { key: 'result',       label: '🏆 Resultado Final' },
];

function initState() {
  const saved = loadSavedState();
  return saved || buildInitialData();
}

export default function App() {
  const [state, setState] = useState(initState);
  const [activeTab, setActiveTab] = useState('setup');
  const fileInputRef = useRef(null);

  useAutoSave(state);

  const fontScale = state.meta?.fontScale ?? 16;

  function onUpdate(patch) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function handleFontChange(delta) {
    if (delta === 0) {
      onUpdate({ meta: { ...state.meta, fontScale: 16 } });
    } else {
      const next = Math.max(12, Math.min(24, fontScale + delta));
      onUpdate({ meta: { ...state.meta, fontScale: next } });
    }
  }

  function handleSave() {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const turma = state.meta?.turma || 'scrum';
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `painel_scrum_${turma}_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleLoad() {
    fileInputRef.current?.click();
  }

  function handleFileLoad(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const loaded = JSON.parse(ev.target.result);
        setState(loaded);
      } catch {
        alert('Arquivo inválido ou corrompido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleReset() {
    if (!confirm('Isso apaga todos os dados e começa um novo painel. Tem certeza?')) return;
    clearSavedState();
    setState(buildInitialData());
    setActiveTab('setup');
  }

  function renderTab() {
    switch (activeTab) {
      case 'setup':        return <SetupTab state={state} onUpdate={onUpdate} />;
      case 'alunos':       return <AlunosTab state={state} onUpdate={onUpdate} />;
      case 'escalacao':    return <EscalacaoTab state={state} />;
      case 'sm':           return <SMTab state={state} onUpdate={onUpdate} />;
      case 'owner':        return <OwnerTab state={state} onUpdate={onUpdate} />;
      case 'po':           return <POTab state={state} onUpdate={onUpdate} />;
      case 'dev':          return <DevTab state={state} onUpdate={onUpdate} />;
      case 'buyerProf':    return <BuyerProfTab state={state} onUpdate={onUpdate} />;
      case 'buyerProduct': return <BuyerProductTab state={state} onUpdate={onUpdate} />;
      case 'corrupsab':    return <CorrupSabTab state={state} onUpdate={onUpdate} />;
      case 'result':       return <ResultTab state={state} />;
      default:             return null;
    }
  }

  return (
    <div style={{ fontSize: `${fontScale}px` }}>
      <Topbar
        meta={state.meta}
        fontScale={fontScale}
        onSave={handleSave}
        onLoad={handleLoad}
        onReset={handleReset}
        onFontChange={handleFontChange}
      />
      <TabsBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="content">
        {renderTab()}
      </main>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileLoad}
      />
    </div>
  );
}
