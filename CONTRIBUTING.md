# 🤝 Guia de Contribuição - Band App

Obrigado por considerar contribuir para o Band App! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Features](#sugerindo-features)

## 📜 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, você deve manter um ambiente respeitoso e profissional.

### Nossas Promessas

- Ser respeitoso com diferentes pontos de vista
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros

## 🎯 Como Posso Contribuir?

### Reportando Bugs

Antes de criar um bug report:
- Verifique se o bug já não foi reportado
- Colete informações sobre o bug
- Tente reproduzir o problema

**Template de Bug Report:**
```markdown
**Descrição do Bug**
Uma descrição clara do que é o bug.

**Como Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [ex: macOS 14.0]
- Browser: [ex: Chrome 120]
- Versão: [ex: 1.0.0]
```

### Sugerindo Features

**Template de Feature Request:**
```markdown
**A feature está relacionada a um problema?**
Uma descrição clara do problema. Ex: Eu sempre fico frustrado quando [...]

**Descreva a solução que você gostaria**
Uma descrição clara do que você quer que aconteça.

**Descreva alternativas consideradas**
Outras soluções ou features que você considerou.

**Contexto adicional**
Qualquer outro contexto ou screenshots sobre a feature.
```

## 🔄 Processo de Desenvolvimento

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/Band.git
cd Band

# Adicione o repositório original como upstream
git remote add upstream https://github.com/original/Band.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 3. Faça suas Alterações

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Faça suas alterações
# Teste suas alterações
```

### 4. Commit suas Alterações

```bash
# Adicione os arquivos modificados
git add .

# Commit com mensagem descritiva
git commit -m "feat: adiciona nova funcionalidade X"
```

### 5. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nome-da-feature

# Crie um Pull Request no GitHub
```

## 💻 Padrões de Código

### JavaScript/React

#### Nomenclatura

```javascript
// PascalCase para componentes
const MyComponent = () => { }

// camelCase para funções e variáveis
const myFunction = () => { }
const myVariable = 'value'

// UPPER_CASE para constantes
const API_URL = 'https://api.example.com'
```

#### Estrutura de Componentes

```javascript
import React, { useState, useEffect } from 'react';
import './MyComponent.css';

/**
 * Descrição do componente
 * @param {Object} props - Props do componente
 */
const MyComponent = ({ prop1, prop2 }) => {
    // 1. Hooks
    const [state, setState] = useState(null);
    
    // 2. Effects
    useEffect(() => {
        // effect logic
    }, []);
    
    // 3. Handlers
    const handleClick = () => {
        // handler logic
    };
    
    // 4. Render
    return (
        <div className="my-component">
            {/* JSX */}
        </div>
    );
};

export default MyComponent;
```

#### Boas Práticas

- ✅ Use componentes funcionais com hooks
- ✅ Extraia lógica complexa para custom hooks
- ✅ Use PropTypes ou TypeScript para validação
- ✅ Mantenha componentes pequenos e focados
- ✅ Use destructuring para props
- ✅ Evite inline functions em JSX (quando possível)
- ✅ Use memo para otimização quando necessário

### CSS

#### Nomenclatura BEM

```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card__title--large { }
```

#### Organização

```css
/* 1. Layout */
.component {
    display: flex;
    position: relative;
}

/* 2. Box Model */
.component {
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
}

/* 3. Typography */
.component {
    font-size: 1rem;
    line-height: 1.5;
    color: var(--text-color);
}

/* 4. Visual */
.component {
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
}

/* 5. Animation */
.component {
    transition: all 0.3s ease;
}
```

#### Boas Práticas

- ✅ Use variáveis CSS para cores e valores reutilizáveis
- ✅ Mobile-first approach
- ✅ Use rem/em ao invés de px
- ✅ Evite !important
- ✅ Agrupe media queries no final do arquivo

### Estrutura de Arquivos

```
src/
├── components/
│   ├── MyComponent/
│   │   ├── MyComponent.jsx
│   │   ├── MyComponent.css
│   │   └── index.js (re-export)
│   └── index.js (barrel export)
├── pages/
│   └── [similar structure]
├── utils/
│   └── [helper functions]
└── config/
    └── [configuration files]
```

## 📝 Commits

### Conventional Commits

Use o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Adiciona testes
- `chore`: Manutenção

#### Exemplos

```bash
feat(auth): adiciona login com Google
fix(navbar): corrige menu mobile
docs(readme): atualiza instruções de instalação
style(button): ajusta espaçamento
refactor(api): simplifica chamadas ao Firebase
test(login): adiciona testes de autenticação
chore(deps): atualiza dependências
```

## 🔍 Pull Requests

### Checklist

Antes de submeter um PR, certifique-se de:

- [ ] O código segue os padrões do projeto
- [ ] Todos os testes passam
- [ ] Não há warnings do ESLint
- [ ] O build funciona (`npm run build`)
- [ ] A documentação foi atualizada (se necessário)
- [ ] Commits seguem o padrão Conventional Commits
- [ ] A branch está atualizada com main

### Template de PR

```markdown
## Descrição
Descrição clara das mudanças.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Passo 3

## Screenshots (se aplicável)
Adicione screenshots das mudanças visuais.

## Checklist
- [ ] Código segue os padrões
- [ ] Testes passam
- [ ] Build funciona
- [ ] Documentação atualizada
```

## 🧪 Testes

### Executando Testes

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:coverage

# Testes e2e
npm run test:e2e
```

### Escrevendo Testes

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    it('should render correctly', () => {
        render(<MyComponent />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
    
    it('should handle click', () => {
        const handleClick = jest.fn();
        render(<MyComponent onClick={handleClick} />);
        
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });
});
```

## 📚 Recursos

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)

## ❓ Dúvidas?

Se tiver dúvidas:
1. Verifique a documentação existente
2. Procure em issues fechadas
3. Abra uma nova issue com a tag `question`

## 🙏 Agradecimentos

Obrigado por contribuir para o Band App! Sua ajuda é muito apreciada.

---

**Última atualização:** Dezembro 2024
