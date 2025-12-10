# 🚀 Guia de Deploy - Band App

Este guia fornece instruções detalhadas para fazer o deploy da aplicação Band App em diferentes plataformas.

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de:

- [ ] Todas as configurações estão corretas (Firebase, Google Maps, Analytics)
- [ ] O build local funciona sem erros (`npm run build`)
- [ ] Todas as variáveis de ambiente estão documentadas
- [ ] Os testes passam (se aplicável)

## 🌐 Opções de Deploy

### 1. Vercel (Recomendado) ⭐

**Vantagens:**
- Deploy automático via Git
- HTTPS gratuito
- CDN global
- Fácil configuração
- Domínio gratuito (.vercel.app)

**Passos:**

1. **Instale o Vercel CLI**
```bash
npm install -g vercel
```

2. **Faça login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Para produção**
```bash
vercel --prod
```

**Configuração (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Variáveis de Ambiente:**
- Configure no painel Vercel: Settings → Environment Variables
- Adicione todas as chaves de API necessárias

---

### 2. Netlify

**Vantagens:**
- Interface amigável
- Deploy contínuo
- Formulários e funções serverless
- HTTPS gratuito

**Passos:**

1. **Instale o Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Faça login**
```bash
netlify login
```

3. **Inicialize**
```bash
netlify init
```

4. **Deploy**
```bash
netlify deploy --prod
```

**Configuração (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. Firebase Hosting

**Vantagens:**
- Integração nativa com Firebase
- CDN global do Google
- HTTPS automático
- Fácil rollback

**Passos:**

1. **Instale o Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Faça login**
```bash
firebase login
```

3. **Inicialize o projeto**
```bash
firebase init hosting
```

Configurações:
- Public directory: `dist`
- Configure as a single-page app: `Yes`
- Set up automatic builds: `No` (ou Yes se quiser CI/CD)

4. **Build e Deploy**
```bash
npm run build
firebase deploy --only hosting
```

**Configuração (firebase.json):**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

### 4. GitHub Pages

**Vantagens:**
- Gratuito para repositórios públicos
- Integração com GitHub
- Simples para projetos pequenos

**Passos:**

1. **Instale gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Adicione scripts no package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Configure o base no vite.config.js**
```javascript
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ...
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Configure no GitHub**
- Settings → Pages → Source: gh-pages branch

---

## 🔧 Configurações Importantes

### Variáveis de Ambiente

Crie um arquivo `.env.example` com todas as variáveis necessárias:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your_maps_key

# Google Analytics
VITE_GA_MEASUREMENT_ID=your_ga_id

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Atualize os arquivos de configuração

**src/config/firebase.js:**
```javascript
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

---

## ✅ Checklist Pré-Deploy

- [ ] Build local funciona: `npm run build`
- [ ] Preview local funciona: `npm run preview`
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Firebase configurado corretamente
- [ ] Google Maps API ativa e com billing
- [ ] Google Analytics configurado
- [ ] EmailJS configurado
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL/HTTPS ativo
- [ ] Redirects configurados para SPA
- [ ] Performance otimizada (Lighthouse score)
- [ ] SEO básico implementado
- [ ] Favicon e meta tags configurados

---

## 🔍 Verificação Pós-Deploy

Após o deploy, verifique:

1. **Funcionalidade**
   - [ ] Todas as páginas carregam
   - [ ] Navegação funciona
   - [ ] Autenticação funciona
   - [ ] Formulários funcionam
   - [ ] Mapas carregam

2. **Performance**
   - [ ] Lighthouse score > 90
   - [ ] Tempo de carregamento < 3s
   - [ ] Imagens otimizadas

3. **SEO**
   - [ ] Meta tags presentes
   - [ ] Open Graph configurado
   - [ ] Sitemap gerado (opcional)

4. **Analytics**
   - [ ] Google Analytics rastreando
   - [ ] Eventos sendo registrados

---

## 🐛 Troubleshooting

### Erro: "Failed to load module"
- Verifique se todas as dependências estão instaladas
- Limpe o cache: `rm -rf node_modules dist && npm install`

### Erro: "Firebase not initialized"
- Verifique as variáveis de ambiente
- Confirme que o Firebase está configurado corretamente

### Erro: "Google Maps API error"
- Verifique se a API está ativa
- Confirme que há billing ativo
- Verifique as restrições da chave

### Página em branco após deploy
- Verifique o console do navegador
- Confirme que os redirects estão configurados
- Verifique o `base` no vite.config.js

---

## 📊 Monitoramento

### Google Analytics
- Acesse: https://analytics.google.com
- Monitore: Usuários, sessões, conversões

### Firebase Console
- Acesse: https://console.firebase.google.com
- Monitore: Autenticações, uso do Firestore

### Vercel/Netlify Analytics
- Monitore: Performance, erros, uso de banda

---

## 🔄 Atualizações

### Deploy de atualizações

1. **Faça as alterações no código**
2. **Teste localmente**
```bash
npm run dev
npm run build
npm run preview
```

3. **Commit e push**
```bash
git add .
git commit -m "Descrição da atualização"
git push
```

4. **Deploy**
- Vercel/Netlify: Deploy automático via Git
- Firebase: `firebase deploy`
- Manual: `vercel --prod` ou `netlify deploy --prod`

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique a documentação da plataforma
2. Consulte os logs de build
3. Verifique o console do navegador
4. Entre em contato com o suporte da plataforma

---

**Última atualização:** Dezembro 2024
