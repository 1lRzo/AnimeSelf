#!/bin/bash

# Script para fazer upload do AnimeSelf para o GitHub
# Execute este script na sua máquina após clonar o repositório vazio

set -e

echo "🚀 Iniciando upload do AnimeSelf para o GitHub..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "README.md" ]; then
    echo "❌ Execute este script no diretório do repositório AnimeSelf"
    exit 1
fi

# Verificar se o git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não encontrado. Instale o Git primeiro."
    exit 1
fi

# Verificar se o gh está instalado
if ! command -v gh &> /dev/null; then
    echo "⚠️  gh CLI não encontrado. Usando git..."
    USE_GH=false
else
    USE_GH=true
fi

echo "✅ Ferramentas verificadas"
echo ""

# Adicionar todos os arquivos
if git status | grep -q "nothing to commit"; then
    echo "ℹ️  Não há alterações para commitar"
else
    echo "📦 Adicionando arquivos..."
    git add -A
    git status --short
    echo ""
    
    # Fazer commit
    echo "💾 Fazendo commit..."
    git commit -m "feat: AnimeSelf app with Mistral SDK and mobile support"
    echo ""
fi

# Fazer push
if [ "$USE_GH" = true ]; then
    echo "🔄 Fazendo push com gh CLI..."
    gh repo push 1lRzo/AnimeSelf main || {
        echo "⚠️  Tentando com git..."
        git push -u origin main
    }
else
    echo "🔄 Fazendo push com git..."
    git push -u origin main
fi

echo ""
echo "✅ Upload concluído!"
echo ""
echo "Acesse: https://github.com/1lRzo/AnimeSelf"
