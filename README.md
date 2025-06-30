# 🚀 Dolado Chatbot

A Solução para transformar sua empresa em uma potência digital.

### 🌟 Recursos Principais

Este chatbot oferece uma experiência de usuário rica e interativa, focada na simplicidade e eficiência:

- Interface de Chat Responsiva: Design adaptável para uma excelente experiência em diversos dispositivos.
- Fluxo de Conversa Guiado: Interação baseada em seleção de opções, eliminando a necessidade de digitação, para um fluxo de conversa claro e objetivo.
- Exportação de Conversa: Funcionalidade para exportar o histórico completo do chat para o formato JSON.
- Alternância de Tema: Opções de tema claro e escuro para personalização da interface.
- Mensagens Intuitivas: Exibição clara de mensagens do bot e do usuário, incluindo avatares distintivos.
- Indicador de Digitação do Bot: Feedback visual quando o bot está processando ou preparando uma resposta.
- Rolagem Automática: O histórico do chat rola automaticamente para a mensagem mais recente, mantendo o usuário atualizado.

### 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas modernas:

- Next.js: Framework React para aplicações de produção, com SSR (Server-Side Rendering) e otimizações.

- React: Biblioteca JavaScript para construção de interfaces de usuário.

- TypeScript: Superset do JavaScript que adiciona tipagem estática para maior robustez do código.

- Tailwind CSS: Framework CSS utility-first para estilização rápida e responsiva.

- Shadcn UI: Coleção de componentes de UI reusáveis e acessíveis, construídos com Radix UI e Tailwind CSS.

- Zustand: Uma solução leve e flexível para gerenciamento de estado global.

- Framer Motion: Biblioteca para animações e interações fluidas no React.

- Lucide React: Biblioteca de ícones personalizáveis.

- ESLint: Ferramenta de linting para manter a qualidade e consistência do código.

### 🚀 Como Rodar o Projeto

**Pré-requisitos**

Antes de começar, certifique-se de ter o Node.js (versão recomendada: v20.12.2 e o npm (ou yarn/pnpm) instalados em sua máquina.

**Instalação**

1. Clone este repositório:

```bash
git clone https://github.com/Ryannnkl/job-frontend-developer.git
```

2. Navegue até o diretório do projeto:

```bash
cd job-frontend-developer
```

3. Instale as dependências:

```bash
npm install
```

4. Instale os drivers de navegador do Playwright (essencial para testes E2E):

```bash
npx playwright install
npx playwright install-deps # Para dependências de sistema no Linux
```

**Execução**
Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra seu navegador e acesse: http://localhost:3000

### 🧪 Testes

Este projeto conta com uma suíte abrangente de testes para garantir a qualidade e o bom funcionamento.

**Testes Unitários (Jest + Testing Library)**

Para rodar os testes unitários dos componentes e hooks:

```bash
npm run test:unit
```

**Testes End-to-End (Playwright)**
Para rodar os testes de ponta a ponta que simulam a interação do usuário no navegador:

> Certifique-se de que o servidor de desenvolvimento está rodando (npm run dev) em um terminal separado antes de executar os testes E2E.

```bash
npm run test:e2e
```

Para rodar os testes E2E com a interface de depuração do Playwright:

```bash
npm run test:e2e:ui
```

**Todos os Testes**
Para executar todos os testes (unitários e E2E) em sequência:

```bash
npm run test:all
```

**Estrutura das Branches**
Este repositório utiliza duas branches principais para organizar o desenvolvimento e o deploy:
- ``master``: Esta branch serve como a branch de integração e deploy para produção. Ela contém o código que é utilizado pela Vercel para realizar as builds de produção. Geralmente, esta branch recebe apenas commits de merge da branch de desenvolvimento, sem desenvolvimento direto.
- ``challenge/frontend-ryann``: Esta é a branch de desenvolvimento principal para este desafio. Todos os commits de desenvolvimento e implementações foram realizados nesta branch. Se você deseja acompanhar o histórico de desenvolvimento e os commits individuais sem os merges da master, recomendamos que você alterne para esta branch.

**Para visualizar o histórico de desenvolvimento sem os merges**:

```bash
git switch challenge/frontend-ryann
```
