# Dockerfile para AnimeSelf
FROM node:18-alpine

# Configurar ambiente
ENV NODE_ENV=production
ENV PORT=3001

# Criar diretório do app
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Instalar dependências
RUN npm install --production --ignore-scripts

# Copiar código fonte
COPY backend ./backend
COPY frontend ./frontend

# Build do frontend
RUN cd frontend && npm install && npm run build

# Copiar configuração
COPY .env.example backend/.env

# Expor porta
EXPOSE 3001

# Iniciar aplicação
CMD ["node", "backend/dist/index.js"]
