// TabsBar — barra de abas de navegação
export function TabsBar({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="tabs" role="tablist">
      {tabs.map((t) => (
        <div
          key={t.key}
          className={`tab${activeTab === t.key ? ' active' : ''}`}
          role="tab"
          aria-selected={activeTab === t.key}
          onClick={() => onTabChange(t.key)}
        >
          {t.label}
        </div>
      ))}
    </nav>
  );
}
