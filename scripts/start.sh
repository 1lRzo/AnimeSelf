#!/bin/bash

echo "🚀 Iniciando AnimeSelf..."
echo ""

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+"
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm"
    exit 1
fi

echo "✅ Node.js e npm encontrados"
echo ""

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install --silent
cd ..

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install --silent
cd ..

echo ""
echo "✅ Todas as dependências instaladas"
echo ""

# Iniciar backend em segundo plano
echo "🏃 Iniciando backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Aguardar backend iniciar
sleep 5

# Iniciar frontend
echo "🏃 Iniciando frontend..."
cd frontend
npm run dev

# Quando o frontend fechar, matar o backend
kill $BACKEND_PID
