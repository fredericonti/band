# 🎸 Band App - Plataforma de Contratação de Bandas

Uma plataforma moderna e intuitiva que conecta músicos, bandas, estabelecimentos e casas de show, facilitando a contratação e agendamento de apresentações musicais.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

O **Band App** é uma plataforma completa que resolve o problema de conectar músicos e estabelecimentos de forma eficiente. A aplicação permite que:

- **Bandas e Artistas** criem perfis profissionais, cadastrem seu repertório e recebam solicitações de shows
- **Estabelecimentos** (bares, casas de show, eventos) encontrem e contratem artistas de forma rápida
- **Casas de Show** gerenciem calendários, criem vagas abertas e encontrem artistas para suas datas disponíveis

## ✨ Funcionalidades

### Para Artistas/Bandas
- ✅ Cadastro completo com informações da banda
- ✅ Autenticação via Google ou Email (com OTP)
- ✅ Perfil público com repertório e redes sociais
- ✅ Recebimento de solicitações de shows
- ✅ Feed de oportunidades abertas (Open Calls)
- ✅ Sistema de aplicação para vagas
- ✅ Notificações de convites diretos

### Para Estabelecimentos
- ✅ Busca avançada de bandas por gênero e localização
- ✅ Solicitação de orçamentos
- ✅ Contato direto via Email, WhatsApp ou SMS
- ✅ Visualização de perfis públicos das bandas

### Para Casas de Show
- ✅ Calendário visual com shows confirmados e vagas abertas
- ✅ Criação de "Open Slots" (vagas abertas) com detalhes
- ✅ Busca ativa de artistas por gênero e disponibilidade
- ✅ Gerenciamento de aplicações recebidas
- ✅ Sistema de matching entre artistas e vagas
- ✅ Fluxo de negociação simplificado

### Recursos Gerais
- ✅ Design responsivo (mobile e desktop)
- ✅ Transições suaves entre páginas
- ✅ Interface moderna com estética Brutalist Editorial
- ✅ Integração com Google Maps
- ✅ Analytics com Google Analytics 4
- ✅ Sistema de autenticação completo
- ✅ Banco de dados em tempo real (Firebase)

## 🛠 Tecnologias Utilizadas

### Frontend
- **React** 18.2.0 - Biblioteca JavaScript para construção de interfaces
- **React Router DOM** 6.22.3 - Gerenciamento de rotas
- **Framer Motion** 12.23.24 - Animações e transições
- **Lucide React** 0.363.0 - Ícones modernos

### Backend & Serviços
- **Firebase** 12.6.0 - Autenticação, Firestore Database
- **EmailJS** 4.4.1 - Envio de emails
- **Google Maps API** 2.0.2 - Integração de mapas
- **React GA4** 2.1.0 - Google Analytics

### Build & Dev Tools
- **Vite** 7.2.4 - Build tool e dev server
- **ESLint** - Linting e qualidade de código

## 📁 Estrutura do Projeto

```
Band/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Navbar.jsx       # Barra de navegação
│   │   ├── PageTransition.jsx # Transições de página
│   │   ├── BookingSheet.jsx # Sheet de solicitação de orçamento
│   │   ├── BottomSheet.jsx  # Bottom sheet genérico
│   │   ├── VenueCalendar.jsx # Calendário de casas de show
│   │   └── ArtistOpportunities.jsx # Feed de oportunidades
│   │
│   ├── pages/               # Páginas da aplicação
│   │   ├── LandingPage.jsx  # Página inicial
│   │   ├── Login.jsx        # Login de bandas
│   │   ├── UserRegister.jsx # Cadastro de estabelecimentos
│   │   ├── BandRegister.jsx # Cadastro de bandas (não usado)
│   │   ├── BandProfile.jsx  # Perfil privado da banda
│   │   ├── BandPublicProfile.jsx # Perfil público da banda
│   │   ├── FindBands.jsx    # Busca de bandas
│   │   ├── FindArtists.jsx  # Busca de artistas (para venues)
│   │   └── FindVenues.jsx   # Busca de casas de show
│   │
│   ├── config/              # Configurações
│   │   ├── firebase.js      # Configuração Firebase
│   │   ├── analytics.js     # Configuração Google Analytics
│   │   └── googleMaps.js    # Configuração Google Maps
│   │
│   ├── utils/               # Utilitários
│   │   └── database.js      # Funções de banco de dados
│   │
│   ├── models/              # Modelos de dados
│   │
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais
│
├── dist/                    # Build de produção
├── index.html               # HTML principal
├── package.json             # Dependências
├── vite.config.js           # Configuração Vite
└── README.md                # Este arquivo
```

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta Firebase
- Conta Google Cloud (para Maps API)
- Conta EmailJS

### Passos

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd Band
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente** (veja seção [Configuração](#configuração))

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## ⚙️ Configuração

### 1. Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Authentication** (Google e Email)
3. Crie um banco **Firestore Database**
4. Copie as credenciais do projeto
5. Edite o arquivo `src/config/firebase.js`:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJECT_ID.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJECT_ID.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};
```

### 2. Google Analytics

1. Crie uma propriedade GA4 no [Google Analytics](https://analytics.google.com/)
2. Copie o ID de Medição (formato: G-XXXXXXXXXX)
3. Edite o arquivo `src/config/analytics.js`:

```javascript
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

### 3. Google Maps API

1. Ative a API no [Google Cloud Console](https://console.cloud.google.com/)
2. Crie uma chave de API
3. Edite o arquivo `src/config/googleMaps.js`:

```javascript
const GOOGLE_MAPS_API_KEY = 'SUA_API_KEY_AQUI';
```

### 4. EmailJS

1. Crie uma conta no [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie templates de email
4. As credenciais são usadas diretamente nos componentes que enviam email

## 📖 Como Usar

### Para Estabelecimentos (Contratar Bandas)

1. Acesse a página inicial
2. Clique em "Encontrar Bandas"
3. Use os filtros para buscar por gênero e localização
4. Clique em uma banda para ver o perfil completo
5. Clique em "Solicitar Orçamento"
6. Escolha o método de contato (Email, WhatsApp ou SMS)

### Para Bandas (Cadastro e Perfil)

1. Clique em "Para Bandas" na página inicial
2. Faça login com Google ou Email
3. Complete seu perfil com:
   - Nome da banda
   - Gênero musical
   - Número de integrantes
   - Repertório (músicas)
   - Redes sociais
   - Localização
4. Seu perfil estará visível para estabelecimentos

### Para Casas de Show

1. Acesse a seção de Venues
2. Visualize o calendário com shows e vagas
3. Crie "Open Slots" para datas disponíveis
4. Busque artistas ativamente ou receba aplicações
5. Gerencie as aplicações recebidas
6. Confirme shows e negocie valores

## 🌐 Deploy

### Build de Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Opções de Deploy

#### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Configurações Importantes para Deploy

1. **Variáveis de Ambiente**: Configure todas as chaves de API no painel do serviço de hosting
2. **Redirects**: Configure redirects para SPA (todas as rotas → index.html)
3. **HTTPS**: Certifique-se de que o site está servido via HTTPS
4. **Domínio**: Configure um domínio personalizado se necessário

## 🎨 Design System

O projeto utiliza um design system baseado em **Brutalist Editorial** com:

- **Cores**: Paleta vibrante com gradientes
- **Tipografia**: Fontes modernas e legíveis
- **Espaçamento**: Sistema consistente de spacing
- **Animações**: Transições suaves com Framer Motion
- **Responsividade**: Mobile-first approach

## 🔒 Segurança

- Autenticação via Firebase Authentication
- Validação de dados no frontend e backend
- Proteção de rotas privadas
- Sanitização de inputs
- HTTPS obrigatório em produção

## 📊 Analytics

O projeto inclui rastreamento com Google Analytics 4:
- Visualizações de página
- Eventos personalizados
- Conversões
- Comportamento do usuário

## 🐛 Troubleshooting

### Erro ao iniciar o projeto
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro de autenticação Firebase
- Verifique se as credenciais estão corretas
- Confirme que Authentication está ativado no console

### Erro de Maps API
- Verifique se a API está ativada
- Confirme que a chave tem as permissões corretas
- Verifique se há billing ativo na conta Google Cloud

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é privado e proprietário.

## 👥 Autores

- **Fred Conti** - Desenvolvimento inicial

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através do repositório.

---

**Desenvolvido com ❤️ e 🎸**
