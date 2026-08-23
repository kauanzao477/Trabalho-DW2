# Painel de Avaliação — Simulação Scrum Competitiva

Sistema web de avaliação para a dinâmica de Simulação Scrum Competitiva, desenvolvido em React + Vite como parte do trabalho da disciplina de Desenvolvimento Web 2.

## 📋 Descrição

O painel permite ao professor registrar e calcular notas dos alunos distribuídos em papéis do Scrum (Scrum Master, Product Owner, Developer, Owner/Stakeholder e Compradores), com abas para:

- **Configuração** — nome das empresas, times e pesos da nota final
- **Alunos** — atribuição de papéis e equipes
- **Escalação** — visão visual das equipes por empresa
- **Scrum Master** — avaliação por sprint/empresa
- **Owner** — comunicação, negociação e alinhamento
- **Product Owner** — requisitos, testes e reuniões
- **Developers** — qualidade, processo e colaboração
- **Compradores (Papel)** — desempenho dos compradores como avaliadores
- **Compradores (Produto)** — ficha de avaliação do produto por sprint
- **Corrupção & Sabotagem** — pontos automáticos dos mecanismos especiais
- **Resultado Final** — nota ponderada automática por empresa

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (vem junto com o Node.js)

### Instalação

```bash
# Clone o repositório (ou baixe o ZIP e extraia)
git clone https://github.com/kauanzao477/Trabalho-DW2.git
cd Trabalho-DW2

# Instale as dependências
npm install
```

### Rodando em modo de desenvolvimento

```bash
npm run dev
```

O sistema abrirá automaticamente no navegador em `http://localhost:5173`.

### Build de produção (apenas se necessário)

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/` (não incluída no repositório).

## 💾 Salvamento de dados

- **Salvar manualmente**: clique no botão **"Salvar dados"** na barra superior — gera e baixa um arquivo `.json` com todo o estado atual.
- **Salvamento automático**: o sistema salva automaticamente no `localStorage` do navegador a cada alteração relevante. Ao reabrir a página, os dados são restaurados.
- **Carregar arquivo**: o botão **"Carregar dados"** restaura um `.json` gerado anteriormente.

## 🗂️ Estrutura do projeto

```
Trabalho-DW2/
├── public/
│   └── images/          # Imagens das empresas e compradores (originais)
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
│   │   └── constants.js  # Constantes e dados iniciais
│   ├── hooks/
│   │   └── useAutoSave.js # Hook de auto-save no localStorage
│   ├── utils/
│   │   └── scoring.js    # Funções de cálculo de notas
│   ├── App.jsx           # Componente raiz e gerenciamento de estado
│   ├── main.jsx          # Entry point React
│   └── index.css         # Estilos globais
├── .gitignore
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

## 👥 Integrantes do grupo

| Nome | GitHub |
|------|--------|
| *(preencha aqui)* | |
| *(preencha aqui)* | |
| *(preencha aqui)* | |

## 🛠️ Tecnologias utilizadas

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- CSS Vanilla (sem frameworks)
- [SheetJS (xlsx)](https://sheetjs.com/) — leitura de arquivos Excel
