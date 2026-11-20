# 📋 Instruções para Configurar o AnimeSelf

## ⚠️ Problema com GitHub

Não consegui fazer push para o seu repositório devido a restrições de permissão. **Mas o código está pronto!** 

Siga os passos abaixo para configurar o projeto na sua máquina.

---

## 🚀 Passo a Passo

### 1️⃣ Clone o repositório vazio que você criou

```bash
git clone https://github.com/1lRzo/AnimeSelf.git
cd AnimeSelf
```

### 2️⃣ Copie todos os arquivos do projeto

Copie **todos os arquivos** da pasta `/workspace/AnimeSelf` para o seu repositório local.

**Arquivos a copiar:**
```
.
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config/
│       │   └── index.ts
│       ├── index.ts
│       ├── middleware/
│       │   └── errorHandler.ts
│       ├── routes/
│       │   ├── animeRoutes.ts
│       │   └── storyRoutes.ts
│       ├── services/
│       │   ├── jikanService.ts
│       │   └── mistralService.ts
│       └── types/
│           └── index.ts
└── frontend/
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    │   └── .gitkeep
    └── src/
        ├── main.tsx
        ├── vite-env.d.ts
        ├── index.css
        ├── types/
        │   └── index.ts
        ├── components/
        │   ├── AddProtagonistModal.tsx
        │   ├── AnimeSearch.tsx
        │   ├── ProtagonistList.tsx
        │   ├── StoryDisplay.tsx
        │   ├── StoryOptions.tsx
        │   └── WarningOverlay.tsx
        └── hooks/
            ├── useAnimeSearch.ts
            └── useStoryGeneration.ts
```

### 3️⃣ Instale as dependências

```bash
# No diretório raiz
npm install

# No frontend
cd frontend
npm install

# No backend
cd ../backend
npm install
```

### 4️⃣ Configure o .env

```bash
cd backend
cp .env.example .env
```

Edite o `.env` e adicione sua chave da Mistral API:
```
MISTRAL_API_KEY=sua_chave_aqui
PORT=3001
NODE_ENV=development
```

### 5️⃣ Inicie os servidores

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 6️⃣ Acesse o site

Abra no navegador: **http://localhost:3000**

---

## 📱 Suporte a Mobile

✅ **O site já está 100% responsivo!**

Testei e adicionei:
- Layout adaptativo para telas pequenas
- Media queries para mobile (480px e 768px)
- Toques maiores para botões
- Fontes legíveis em telas pequenas
- Navegação otimizada para touch

---

## 🎯 Funcionalidades

- ✅ Pesquisa de animes (todos, inclusive +18)
- ✅ Adição de múltiplos protagonistas
- ✅ Modos: Original, Comédia, +18 com atos
- ✅ Alternância entre modelos (mimo-v2.6-flash:free e deepseek-v4.1-flash:free)
- ✅ Aviso para menores de 18 anos
- ✅ Design minimalista e responsivo

---

## 🔧 Tecnologias

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express + @mistralai/mistralai
- **APIs:** Jikan (animes) + Mistral AI (geração)

---

## 💡 Dica

Se você não quer configurar localmente, pode usar o **GitHub Codespaces** ou **Vercel** para deploy.

---

**Precisa de ajuda?** Me avise se teve algum problema! 😊
