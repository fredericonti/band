# 🏗️ Arquitetura do Projeto - Band App

Este documento descreve a arquitetura e estrutura técnica do Band App.

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Landing    │  │    Login     │  │   Register   │  │
│  │     Page     │  │     Page     │  │     Page     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Find Bands  │  │ Find Artists │  │ Find Venues  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │Band Profile  │  │Public Profile│                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  SERVIÇOS EXTERNOS                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Firebase   │  │ Google Maps  │  │   EmailJS    │  │
│  │  Auth + DB   │  │     API      │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐                                       │
│  │   Google     │                                       │
│  │  Analytics   │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

## 🗂️ Estrutura de Diretórios

### `/src/components`
Componentes reutilizáveis da aplicação.

#### `Navbar.jsx`
- Barra de navegação principal
- Responsiva (mobile/desktop)
- Links para principais seções

#### `PageTransition.jsx`
- Wrapper para animações de transição
- Usa Framer Motion
- Fade in/out entre páginas

#### `BookingSheet.jsx`
- Bottom sheet para solicitação de orçamento
- Opções de contato: Email, WhatsApp, SMS
- Integração com EmailJS

#### `BottomSheet.jsx`
- Componente genérico de bottom sheet
- Animações suaves
- Backdrop com blur

#### `VenueCalendar.jsx`
- Calendário visual para casas de show
- Grid mensal com shows e vagas
- Criação de "Open Slots"
- Gerenciamento de aplicações

#### `ArtistOpportunities.jsx`
- Feed de oportunidades para artistas
- Filtros por gênero e orçamento
- Sistema de aplicação
- Notificações de convites

### `/src/pages`
Páginas principais da aplicação.

#### `LandingPage.jsx`
- Página inicial
- Hero section
- CTAs principais
- Seções informativas

#### `Login.jsx`
- Login para bandas
- Autenticação Google
- Autenticação Email (OTP)
- Redirecionamento pós-login

#### `UserRegister.jsx`
- Cadastro de estabelecimentos
- Formulário multi-step
- Validação de dados
- Integração com Firebase

#### `BandRegister.jsx`
- Cadastro de bandas (não usado atualmente)
- Dados da banda
- Repertório
- Redes sociais

#### `BandProfile.jsx`
- Perfil privado da banda
- Edição de informações
- Gerenciamento de repertório
- Visualização de solicitações

#### `BandPublicProfile.jsx`
- Perfil público da banda
- Visualização de repertório
- Links para redes sociais
- Botão de solicitação de orçamento

#### `FindBands.jsx`
- Busca de bandas para estabelecimentos
- Filtros por gênero e localização
- Grid de resultados
- Integração com Google Maps

#### `FindArtists.jsx`
- Busca de artistas para casas de show
- Filtros avançados
- Visualização de disponibilidade
- Convite direto

#### `FindVenues.jsx`
- Busca de casas de show
- Visualização de vagas abertas
- Filtros por localização e gênero
- Sistema de aplicação

### `/src/config`
Arquivos de configuração.

#### `firebase.js`
```javascript
// Inicialização do Firebase
// Exports: auth, db, googleProvider, signInWithGoogle
```

#### `analytics.js`
```javascript
// Configuração do Google Analytics 4
// Exports: initGA, logPageView, logEvent
```

#### `googleMaps.js`
```javascript
// Configuração do Google Maps API
// Exports: loadGoogleMaps, geocodeAddress
```

### `/src/utils`
Funções utilitárias.

#### `database.js`
```javascript
// Funções de banco de dados
// CRUD operations para Firestore
// Exports: saveBand, getBands, updateBand, etc.
```

## 🔄 Fluxo de Dados

### Autenticação
```
User → Login Page → Firebase Auth → Success → Redirect to Profile
                                   → Error → Show Error Message
```

### Cadastro de Banda
```
User → Login → Complete Profile → Save to Firestore → Redirect to Profile
```

### Solicitação de Orçamento
```
User → Find Bands → Select Band → Click "Solicitar" → Choose Contact Method
    → Email: Send via EmailJS
    → WhatsApp: Open WhatsApp with pre-filled message
    → SMS: Open SMS with pre-filled message
```

### Sistema de Matching (Venues)
```
Venue → Create Open Slot → Save to Firestore
Artist → View Opportunities → Apply to Slot
Venue → Review Applications → Select Artist → Confirm Show
```

## 🎨 Design System

### Cores
```css
--primary: #FF6B35;
--secondary: #004E89;
--accent: #F7B801;
--dark: #1A1A2E;
--light: #F5F5F5;
```

### Tipografia
```css
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Breakpoints
```css
--mobile: 768px;
--tablet: 1024px;
--desktop: 1440px;
```

### Espaçamento
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 2rem;
--spacing-xl: 4rem;
```

## 🗄️ Modelo de Dados

### Band
```javascript
{
  id: string,
  name: string,
  genre: string,
  members: number,
  location: {
    city: string,
    state: string,
    coordinates: { lat: number, lng: number }
  },
  repertoire: [
    { title: string, artist: string }
  ],
  socials: {
    instagram: string,
    youtube: string,
    spotify: string
  },
  userId: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Venue
```javascript
{
  id: string,
  name: string,
  type: string, // 'bar', 'club', 'venue'
  location: {
    address: string,
    city: string,
    state: string,
    coordinates: { lat: number, lng: number }
  },
  openSlots: [
    {
      id: string,
      date: timestamp,
      genre: string,
      budget: number,
      time: string,
      notes: string,
      status: 'open' | 'filled',
      applications: [
        {
          artistId: string,
          appliedAt: timestamp,
          status: 'pending' | 'accepted' | 'rejected'
        }
      ]
    }
  ],
  userId: string,
  createdAt: timestamp
}
```

### User
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  userType: 'band' | 'venue' | 'establishment',
  createdAt: timestamp,
  lastLogin: timestamp
}
```

## 🔐 Segurança

### Regras do Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bands collection
    match /bands/{bandId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
    
    // Venues collection
    match /venues/{venueId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }
  }
}
```

## 🚀 Performance

### Otimizações Implementadas
- ✅ Code splitting com React.lazy
- ✅ Lazy loading de imagens
- ✅ Memoização de componentes
- ✅ Debounce em buscas
- ✅ Paginação de resultados
- ✅ Cache de dados do Firebase
- ✅ Compressão de assets (Vite)
- ✅ Tree shaking automático

### Métricas Alvo
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

## 📱 Responsividade

### Estratégia Mobile-First
1. Design inicial para mobile (320px+)
2. Breakpoints progressivos
3. Touch-friendly (botões > 44px)
4. Navegação adaptativa

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🧪 Testes (Futuro)

### Estrutura Sugerida
```
tests/
├── unit/
│   ├── components/
│   └── utils/
├── integration/
│   └── pages/
└── e2e/
    └── flows/
```

### Ferramentas Recomendadas
- Jest + React Testing Library (unit/integration)
- Cypress ou Playwright (e2e)
- MSW (mock de APIs)

## 🔄 CI/CD (Futuro)

### Pipeline Sugerido
```yaml
1. Lint (ESLint)
2. Type Check (se usar TypeScript)
3. Unit Tests
4. Build
5. E2E Tests
6. Deploy to Staging
7. Deploy to Production (manual approval)
```

## 📊 Analytics

### Eventos Rastreados
- Page views
- Button clicks (CTAs)
- Form submissions
- Authentication events
- Booking requests
- Search queries

## 🔮 Roadmap Técnico

### Curto Prazo
- [ ] Migrar para TypeScript
- [ ] Adicionar testes unitários
- [ ] Implementar cache de dados
- [ ] Otimizar bundle size

### Médio Prazo
- [ ] PWA (Progressive Web App)
- [ ] Notificações push
- [ ] Offline support
- [ ] Server-side rendering (SSR)

### Longo Prazo
- [ ] App mobile nativo (React Native)
- [ ] Backend próprio (Node.js)
- [ ] Sistema de pagamentos
- [ ] Chat em tempo real

---

**Última atualização:** Dezembro 2024
