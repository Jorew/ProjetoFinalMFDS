# ProjetoFinalMFDS

Aplicação simples de tarefas para checkpoint 3 (DevOps): build automático, testes, e publicação de imagem Docker.

**Objetivo**: Finalização do pipeline e entrega contínua.

**Entregas obrigatórias**:
- Publicação da imagem Docker (GitHub Container Registry - GHCR)
- Pipeline completo (build, test, push)
- README final
- Aplicação funcional em container

**Demonstração (o que mostrar)**:
- Build automatizado via GitHub Actions
- Imagem publicada no GHCR
- Aplicação rodando via container Docker

Badge da pipeline (Actions):

![CI/CD](https://github.com/Jorew/ProjetoFinalMFDS/actions/workflows/cd.yml/badge.svg?branch=main)

Como rodar localmente:

1) Instalar dependências:

```bash
npm ci
```

2) Rodar localmente (modo CLI):

```bash
npm start
# ou
node src/app.js
```

3) Adicionar uma tarefa (exemplo):

```bash
node src/app.js adicionar "Minha tarefa de teste"
```

Construir e rodar em container local:

```bash
# Build da imagem local
docker build -t projetofinalmfds:local .

# Rodar container (expondo nothing, app é CLI; exemplos de execução abaixo)
docker run --rm -v "$PWD/dados":/app/dados projetofinalmfds:local node src/app.js
```

Publicação automática (via CI/CD):

- O workflow `.github/workflows/cd.yml` realiza build, testes e publica a imagem no GitHub Container Registry (GHCR) com as tags `latest` e `SHA` quando houver push.
- Para visualizar a imagem publicada, verifique: `ghcr.io/Jorew/projetofinalmfds`

Testes:

```bash
npm test
```

Arquivos principais:

- src/app.js
- dados/tarefas.json
- Dockerfile
- .github/workflows/cd.yml

