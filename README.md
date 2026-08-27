# Painel de Avaliação — Simulação Scrum Competitiva

Sistema web feito em React + Vite pra facilitar a avaliação da dinâmica de Simulação Scrum Competitiva na disciplina de Desenvolvimento Web 2.

## O que faz

O professor acessa o painel e registra as notas dos alunos conforme os papéis do Scrum — Scrum Master, Product Owner, Developer, Owner/Stakeholder e Compradores. Tem uma aba pra cada coisa:

- **Configuração** — nome das empresas, times e pesos da nota final
- **Alunos** — atribuição de papéis e equipes
- **Escalação** — visão geral das equipes por empresa
- **Scrum Master** — avaliação por sprint/empresa
- **Owner** — comunicação, negociação e alinhamento
- **Product Owner** — requisitos, testes e reuniões
- **Developers** — qualidade, processo e colaboração
- **Compradores (Papel)** — desempenho dos compradores como avaliadores
- **Compradores (Produto)** — ficha de avaliação do produto por sprint
- **Corrupção & Sabotagem** — pontos dos mecanismos especiais da dinâmica
- **Resultado Final** — nota ponderada calculada automaticamente por empresa

## Como rodar

Precisa ter [Node.js](https://nodejs.org/) 18+ instalado.

```bash
git clone https://github.com/kauanzao477/Trabalho-DW2.git
cd Trabalho-DW2
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Salvamento de dados

- **Salvar manualmente**: botão **"Salvar dados"** na barra superior — baixa um `.json` com o estado atual
- **Auto-save**: salva no `localStorage` automaticamente a cada alteração; ao reabrir a página os dados voltam
- **Carregar arquivo**: botão **"Carregar dados"** restaura um `.json` salvo anteriormente

## Estrutura do projeto

```
Trabalho-DW2/
├── public/
│   └── images/          # Imagens das empresas e compradores
├── src/
│   ├── components/      # Componentes React por aba
│   │   ├── Topbar.jsx
│   │   ├── TabsBar.jsx
│   │   ├── SetupTab.jsx
│   │   ├── AlunosTab.jsx
│   │   ├── EscalacaoTab.jsx
│   │   ├── SMTab.jsx
│   │   ├── OwnerTab.jsx
│   │   ├── POTab.jsx
│   │   ├── DevTab.jsx
│   │   ├── BuyerProfTab.jsx
│   │   ├── BuyerProductTab.jsx
│   │   ├── CorrupSabTab.jsx
│   │   └── ResultTab.jsx
│   ├── data/
│   │   └── constants.js
│   ├── hooks/
│   │   └── useAutoSave.js
│   ├── utils/
│   │   └── scoring.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Tecnologias

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- CSS Vanilla
- [SheetJS (xlsx)](https://sheetjs.com/)
