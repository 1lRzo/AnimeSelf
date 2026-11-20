# AnimeSelf

## 🎬 Sobre o Projeto

AnimeSelf é um aplicativo web que permite reformular histórias de anime para incluir você e seus amigos como protagonistas. Você pode:

- Pesquisar qualquer anime (inclusive +18)
- Adicionar múltiplos protagonistas personalizados
- Escolher entre diferentes modos de história:
  - **Original**: Mantém a história fiel ao anime, apenas adicionando os novos personagens
  - **Comédia**: Transforma a história em uma comédia
  - **+18**: Inclui cenas adultas e explícitas com atos detalhados
- Alternar entre modelos de IA (mimo-v2.6-flash:free e deepseek-v4.1-flash:free)

## ⚠️ Aviso Importante

Este site **NÃO** é adequado para menores de 18 anos. Ao usar o AnimeSelf, você declara que tem mais de 18 anos e aceita que todo o conteúdo gerado é fictício.

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave de API da Mistral (opcional para testar localmente)

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd AnimeSelf
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o backend:
```bash
cd backend
cp .env.example .env
# Edite o .env com sua chave da Mistral API
```

4. Inicie o backend:
```bash
npm run dev
```

5. Em outro terminal, inicie o frontend:
```bash
cd ../frontend
npm run dev
```

6. Acesse http://localhost:3000 no seu navegador

## 📁 Estrutura do Projeto

```
AnimeSelf/
├── frontend/          # React + TypeScript
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   ├── hooks/      # Hooks personalizados
│   │   ├── types/      # Tipos TypeScript
│   │   └── ...
│   └── package.json
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── routes/     # Rotas da API
│   │   ├── services/   # Serviços (Mistral, Jikan)
│   │   └── ...
│   └── package.json
└── README.md
```

## 🎯 Funcionalidades

### Frontend
- Pesquisa de animes com filtro por rating
- Seleção de anime
- Adição/remoção de protagonistas
- Escolha de modo de história
- Seleção de modelo de IA
- Visualização da história gerada
- Aviso de conteúdo adulto

### Backend
- API REST com Express
- Integração com Jikan API (pesquisa de animes)
- Integração com Mistral AI SDK
- Geração de histórias com diferentes modos
- Suporte a múltiplos modelos

## 🔧 Tecnologias

### Frontend
- React 18
- TypeScript
- Vite
- CSS Puro (sem frameworks)

### Backend
- Node.js
- Express
- @mistralai/mistralai (SDK oficial)
- Axios (para requisições HTTP)
- CORS

### APIs Externas
- [Jikan API](https://jikan.moe/) - Dados de animes
- [Mistral AI](https://mistral.ai/) - Geração de histórias

## 📝 Tipos de Conteúdo

O AnimeSelf acessa **todos** os animes disponíveis na Jikan API, incluindo:
- G - Todas as idades
- PG - Crianças
- PG-13 - Adolescentes
- R - 17+
- R18 - Adultos
- Rx - Hentai

## 🎭 Modos de História

### Original
Mantém a essência do anime original, apenas adicionando seus amigos como personagens.

### Comédia
Transforma a história em uma comédia com situações engraçadas e diálogos cômicos.

### +18
Reescreve a história com cenas adultas e explícitas. Quando ativado, a história é dividida em atos com descrições detalhadas.

## ⚡ Modelos Disponíveis

- `mimo-v2.6-flash:free` - Modelo rápido e eficiente
- `deepseek-v4.1-flash:free` - Modelo alternativo

## 🔒 Segurança

- Aviso de conteúdo adulto na tela inicial
- Filtro por rating na pesquisa
- Nenhum dado pessoal é armazenado
- Todas as requisições são feitas pelo cliente

## 📄 Licença

MIT

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📬 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.
