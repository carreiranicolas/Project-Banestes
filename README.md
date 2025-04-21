
# 💸 Project Banestes

Este projeto foi desenvolvido como parte de um processo seletivo, com o objetivo de construir um **sistema bancário web** utilizando tecnologias modernas de frontend. A aplicação é capaz de **listar, filtrar, paginar e visualizar detalhes de clientes bancários**, bem como exibir informações relacionadas às suas contas e agências.

🔗 [Acesse a versão online do sistema](https://carreiranicolas.github.io/Project-Banestes/) <!-- substitua se o link de deploy for outro -->

---

## 🚀 Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) <!-- remova se não utilizou -->
- [Tailwind CSS](https://tailwindcss.com/) <!-- remova se não utilizou -->
- [PapaParse](https://www.papaparse.com/) - Parsing de CSV
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) - Testes de performance e acessibilidade

---

## 📋 Funcionalidades

- ✅ Listagem de clientes com dados resumidos
- ✅ Filtro por nome ou CPF/CNPJ
- ✅ Paginação com até 10 clientes por página
- ✅ Visualização detalhada de um cliente
- ✅ Exibição das contas bancárias e agência relacionadas
- ✅ Design responsivo e acessível
- ✅ Consumo de dados diretamente de uma planilha do Google em formato CSV
- ✅ Código limpo, organizado, com boas práticas de tipagem

---

## 🔗 Fontes de Dados

A aplicação consome os dados diretamente via HTTP a partir de planilhas públicas do Google Sheets:

- **Clientes**: [CSV](https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes)
- **Contas**: [CSV](https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas)
- **Agências**: [CSV](https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias)

---

## 🧩 Estrutura do Projeto

## 📦 Estrutura do Projeto

```bash
📂 src
├── 📁 components         # Componentes reutilizáveis (Card, Input, Pagination, etc.)
├── 📁 hooks              # Hooks customizados, como useDebounce
├── 📁 interfaces         # Interfaces TypeScript para clientes, contas e agências
├── 📁 pages              # Páginas principais (Home e Detalhes do Cliente)
├── 📁 services           # Funções para busca e parsing dos dados CSV via Fetch + PapaParse
├── 📁 utils              # Funções utilitárias, como formatação de CPF, moeda, etc.
├── App.tsx              # Componente principal com as rotas da aplicação
├── main.tsx             # Ponto de entrada da aplicação com ReactDOM

---

## 📦 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/carreiranicolas/Project-Banestes.git
cd Project-Banestes

# Instale as dependências
npm install

# Rode a aplicação
npm run dev
