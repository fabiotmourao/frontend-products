# Gerenciamento de Produtos - Frontend

Este é um projeto frontend desenvolvido com **Next.js**, **TypeScript**, **Tailwind CSS** e **Jest**. O objetivo é oferecer uma aplicação simples e funcional para gerenciamento de produtos, permitindo cadastro, listagem, ordenação, filtros e paginação.

## 🚀 Tecnologias utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [React Hot Toast](https://react-hot-toast.com/)

## 📦 Funcionalidades

### Funcionalidades obrigatórias:

- ✅ **Listar produtos** com nome, categoria, preço, descrição e imagem.
- ✅ **Cadastrar novo produto** com validações por campo e upload de imagem local.
- ✅ **Filtro por nome e faixa de preço**.
- ✅ **Ordenação** clicando nos cabeçalhos da tabela (por nome, categoria, preço, descrição).

### Extras implementados:

- ✅ **Paginação** com até 6 produtos por página.
- ✅ **Responsividade** para dispositivos móveis.
- ✅ **Fallback para imagem ausente** com placeholder.
- ✅ **Snapshot de tela** com Jest.

## 🧪 Testes

O projeto inclui **testes de snapshot** com Jest e React Testing Library.

### Rodar os testes:

```bash
npm run test
```

### Atualizar snapshot:

```bash
npm run test -- -u
```

## 💻 Como rodar o projeto localmente

```bash
# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` (ou `3001` se a porta já estiver em uso).

## 📝 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis como ProductDrawer, ProductImage
├── context/           # Contexto global para gerenciamento de produtos
├── pages/             # Páginas do Next.js
├── tests/             # Setup de testes (setupTests.ts)
├── __tests__/         # Testes unitários e snapshot
└── types/             # Tipagens personalizadas (ex: Product)
```

## 📁 Imagens

Imagens utilizadas devem estar em `/public/images/`. Uma imagem padrão chamada `default-placeholder.png` é usada como fallback.

## ✍️ Autor

Feito com 💙 por **Fábio Teixeira Mourão**