# 🚀 Pipeline CI/CD - Documentação Visual

## Fluxo da Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                     GitHub Event Trigger                         │
│         (Push em main, feature/**, ou Pull Request)              │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ✅ CI (Build & Test)          ✅ CD (Docker Push)
    Roda sempre                   Roda após CI bem-sucedido
         │                               │
         ▼                               │
    ┌─────────────────────┐             │
    │ ubuntu-latest       │             │
    │ Node 18             │             │
    │ npm ci              │             │
    │ npm run build       │             │
    │ npm test            │             │
    └──────────┬──────────┘             │
               │                        │
         ✅ Sucesso? ──────────┐        │
               │               │        │
               │         if: github.event_name == 'push'
               │               │        │
               │               ▼        │
               │         ┌─────────────────────┐
               │         │ ubuntu-latest       │
               └────────►│ Docker Setup        │
                         │ Login GHCR          │
                         │ Build & Push Image  │
                         └──────────┬──────────┘
                                    │
                          ✅ Docker Image Pushed
                             ghcr.io/$owner/$repo:latest
                             ghcr.io/$owner/$repo:$sha
```

## Workflows Configurados

### 1. **CI/CD Workflow** (`cd.yml`)

**Triggers:**
- ✅ `push` em `main`
- ✅ `push` em `feature/**` (incluindo `feature/ci-tests`)
- ✅ `pull_request` para `main`

**Job 1: Build and Test**
```yaml
- Checkout do código
- Setup Node.js 18
- npm ci (install dependencies)
- npm run build
- npm test
```

**Job 2: Build and Push Docker**
```yaml
Condição: Apenas em eventos de push
Dependências: Aguarda build-and-test com sucesso

Passos:
1. Checkout
2. Setup QEMU (para multi-arch)
3. Setup Docker Buildx
4. Login GHCR com GITHUB_TOKEN
5. Build & Push imagem Docker com tags:
   - ghcr.io/Jorew/projetofinalmfds:latest
   - ghcr.io/Jorew/projetofinalmfds:{commit_sha}
```

### 2. **CI Workflow** (`ci.yml`)

**Triggers:**
- ✅ `push` em `main`
- ✅ `pull_request` para `main`

**Job: Build and Test**
- Mesmo que o primeiro job do CD workflow

---

## Status Atual

📊 **Última Execução:** Codespaces Prebuilds
- Status: ✅ Sucesso
- Branch: `main`
- Tempo: 20m37s

## Como Usar

### Disparar CI Pipeline localmente:
```bash
# Push na branch feature/ci-tests vai disparar a pipeline
git push origin feature/ci-tests
```

### Ver status das pipelines:
```bash
gh run list --all
gh run view {run-id}
```

### Ver workflows disponíveis:
```bash
gh workflow list
```

---

## Artefatos Gerados

✅ **Build Artifacts:**
- Aplicação testada e validada
- npm dependencies instaladas e verificadas

✅ **Docker Image (GHCR):**
- `ghcr.io/Jorew/projetofinalmfds:latest` - Latest build
- `ghcr.io/Jorew/projetofinalmfds:{sha}` - Versão específica por commit

## Como Visualizar

1. **GitHub Actions Page:** https://github.com/Jorew/ProjetoFinalMFDS/actions
2. **Container Registry:** https://github.com/Jorew/ProjetoFinalMFDS/pkgs/container/projetofinalmfds
3. **CI Workflow:** https://github.com/Jorew/ProjetoFinalMFDS/actions/workflows/ci.yml
4. **CD Workflow:** https://github.com/Jorew/ProjetoFinalMFDS/actions/workflows/cd.yml

---

## Próximas Execuções

Quando você fizer `git push origin feature/ci-tests`:
1. GitHub disparará automaticamente o workflow CD
2. Build e testes serão executados
3. Se tudo passar ✅, a imagem Docker será construída e enviada para GHCR
4. Você poderá ver o progresso em: https://github.com/Jorew/ProjetoFinalMFDS/actions
