#!/bin/bash

# Script de Verificação do Deploy - Band App
# URL: https://band-vvet.onrender.com

echo "🔍 Verificando status do site..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

URL="https://band-vvet.onrender.com"

# Teste 1: Verificar se o site responde
echo "📡 Teste 1: Verificando conexão..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Site está ONLINE! (HTTP $HTTP_CODE)"
    echo ""
    echo "🎉 SUCESSO! Seu site está rodando em:"
    echo "   $URL"
    echo ""
elif [ "$HTTP_CODE" = "404" ]; then
    echo "❌ Site retorna 404 (Não encontrado)"
    echo ""
    echo "⚠️  PROBLEMA DETECTADO:"
    echo "   O Render não está encontrando os arquivos."
    echo ""
    echo "📋 AÇÕES NECESSÁRIAS:"
    echo "   1. Acesse: https://dashboard.render.com"
    echo "   2. Clique no site 'band-vvet'"
    echo "   3. Verifique se 'Publish Directory' está como: dist"
    echo "   4. Veja o arquivo docs/deploy/VERIFICACAO_DEPLOY.md para mais detalhes"
    echo ""
elif [ "$HTTP_CODE" = "503" ]; then
    echo "⏱️  Site está iniciando... (HTTP $HTTP_CODE)"
    echo ""
    echo "   O deploy pode estar em andamento."
    echo "   Aguarde 2-3 minutos e tente novamente."
    echo ""
else
    echo "⚠️  Status inesperado: HTTP $HTTP_CODE"
    echo ""
fi

# Teste 2: Verificar tempo de resposta
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏱️  Teste 2: Verificando tempo de resposta..."
TIME=$(curl -s -o /dev/null -w "%{time_total}" "$URL")
echo "   Tempo de resposta: ${TIME}s"
echo ""

# Teste 3: Verificar headers
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Teste 3: Informações do servidor..."
curl -s -I "$URL" | grep -E "(HTTP|Server|Content-Type|Cache-Control)" | while read line; do
    echo "   $line"
done
echo ""

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO:"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo "   Status: ✅ ONLINE"
    echo "   URL: $URL"
    echo "   Código HTTP: $HTTP_CODE"
    echo ""
    echo "   🎉 Tudo funcionando! Compartilhe o link com seu amigo!"
    echo ""
elif [ "$HTTP_CODE" = "404" ]; then
    echo "   Status: ❌ OFFLINE (404)"
    echo "   URL: $URL"
    echo "   Código HTTP: $HTTP_CODE"
    echo ""
    echo "   📖 Consulte: docs/deploy/VERIFICACAO_DEPLOY.md"
    echo "   🔧 Ação: Verifique a configuração no Dashboard do Render"
    echo ""
else
    echo "   Status: ⚠️  VERIFICAR"
    echo "   URL: $URL"
    echo "   Código HTTP: $HTTP_CODE"
    echo ""
    echo "   💡 Aguarde alguns minutos e execute novamente:"
    echo "      bash scripts/check-deploy.sh"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
