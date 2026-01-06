# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-01-05

### 🎨 Estilo e UX

- **Padronização Visual**: Harmonização de todos os botões primários com o estilo editorial brutalista da Home, incluindo novos estados de hover e transições.
- **Busca de Artistas**: Layout simplificado para uma grade editorial limpa, removendo distrações e focando na descoberta.
- **Fluxos de Navegação**: Atualização abrangente da experiência de cadastro de estabelecimentos e fluxo de login.
- **Componentes**: Implementação de SideSheets modernos para Login e filtros, proporcionando uma experiência de app nativo.
- **Masonry Grid**: Novo sistema de visualização de artistas e estabelecimentos usando layout masonry.
- **Responsividade**: Melhorias universais na visualização mobile e áreas de toque.
- **Micro-interações**: Ajuste na sensibilidade e "snap" do cursor personalizado para maior precisão.

### 🔧 Refatoração

- Migração de modais clássicos para SideSheets e BottomSheets contextuais.
- Otimização do sistema de animações entre páginas.

---

## [1.0.0] - 2024-12-09

### 🎉 Lançamento Inicial

#### ✨ Adicionado

**Autenticação e Usuários**
- Sistema de autenticação completo com Firebase
- Login com Google para bandas
- Login com Email e OTP (código de 4 dígitos)
- Cadastro de estabelecimentos
- Perfis de usuário (bandas, estabelecimentos, casas de show)

**Para Bandas/Artistas**
- Cadastro completo de bandas com informações detalhadas
- Perfil público com repertório e redes sociais
- Perfil privado para gerenciamento
- Sistema de recebimento de solicitações
- Feed de oportunidades abertas (Open Calls)
- Sistema de aplicação para vagas em casas de show
- Notificações de convites diretos

**Para Estabelecimentos**
- Busca avançada de bandas por gênero e localização
- Visualização de perfis públicos das bandas
- Sistema de solicitação de orçamento
- Múltiplos métodos de contato (Email, WhatsApp, SMS)
- Integração com Google Maps para localização

**Para Casas de Show**
- Calendário visual com shows confirmados e vagas abertas
- Criação de "Open Slots" (vagas abertas) com detalhes completos
- Busca ativa de artistas por gênero e disponibilidade
- Gerenciamento de aplicações recebidas
- Sistema de matching entre artistas e vagas
- Fluxo de negociação simplificado

**Interface e UX**
- Design responsivo para mobile e desktop
- Transições suaves entre páginas com Framer Motion
- Interface moderna com estética Brutalist Editorial
- Navegação intuitiva
- Bottom sheets para ações contextuais
- Animações e micro-interações

**Integrações**
- Firebase Authentication (Google e Email)
- Firebase Firestore Database
- Google Maps API para localização
- EmailJS para envio de emails
- Google Analytics 4 para rastreamento
- WhatsApp e SMS para contato direto

**Infraestrutura**
- Build otimizado com Vite
- Code splitting automático
- Lazy loading de componentes
- Cache de assets
- SEO básico implementado

#### 📚 Documentação
- README.md completo em português
- Guia de Deploy (DEPLOY.md)
- Documentação de Arquitetura (ARCHITECTURE.md)
- Guia de Contribuição (CONTRIBUTING.md)
- Template de variáveis de ambiente (.env.example)
- Configurações para Vercel, Netlify e Firebase Hosting

#### 🛠 Configuração
- ESLint configurado
- Vite configurado
- Firebase configurado
- Google Maps configurado
- Google Analytics configurado

### 🔧 Tecnologias Utilizadas

- **Frontend:** React 18.2.0
- **Routing:** React Router DOM 6.22.3
- **Animações:** Framer Motion 12.23.24
- **Ícones:** Lucide React 0.363.0
- **Backend:** Firebase 12.6.0
- **Email:** EmailJS 4.4.1
- **Maps:** Google Maps API 2.0.2
- **Analytics:** React GA4 2.1.0
- **Build Tool:** Vite 7.2.4

### 📝 Notas

Este é o lançamento inicial do Band App, uma plataforma completa para conectar músicos, bandas e estabelecimentos. O projeto está pronto para produção e pode ser deployado em Vercel, Netlify ou Firebase Hosting.

### 🔮 Próximos Passos

- Implementar testes automatizados
- Adicionar TypeScript
- Implementar PWA
- Adicionar notificações push
- Sistema de pagamentos integrado
- Chat em tempo real
- App mobile nativo

---

## [Unreleased]

### 🚧 Em Desenvolvimento

- Sistema de reviews e avaliações
- Calendário sincronizado com Google Calendar
- Exportação de contratos
- Dashboard de analytics para bandas

---

**Legenda:**
- ✨ Adicionado: Novas features
- 🔧 Modificado: Mudanças em features existentes
- 🐛 Corrigido: Bug fixes
- 🗑️ Removido: Features removidas
- 🔒 Segurança: Correções de segurança
- 📚 Documentação: Mudanças na documentação
- 🎨 Estilo: Mudanças que não afetam o código
- ⚡ Performance: Melhorias de performance
- ♻️ Refatoração: Refatoração de código
