# v0.1.1

- Status: verified
- Data planejada: 2026-10-03
- Data publicada: não publicada
- Commit ou tag: não definido

## Objetivo da versão

Disponibilizar execução e validação local pelos comandos npm, sem instalar dependências.

## Mudanças incluídas

| Spec | Título | Estado | Evidência |
|---|---|---|---|
| [`0002-npm-local-server`](../../changes/0002-npm-local-server/spec.md) | Servidor local por npm | verified | `npm run check` e HTTP local |

## Compatibilidade e migrações

- `make dev` continua disponível como atalho.
- Nenhuma migração de dados.
- Nenhuma mudança no site ou CRM.
- Requer Node.js 18 ou superior.

## Verificação

- [x] Spec está `verified`.
- [x] `npm run check` passou.
- [x] Site e CRM responderam HTTP 200.
- [x] Rollback foi definido.

## Notas da versão

O comando principal passa a ser `npm run dev`. Não é necessário executar `npm install`.
