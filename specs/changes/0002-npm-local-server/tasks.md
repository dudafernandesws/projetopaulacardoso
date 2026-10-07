---
spec: "0002-npm-local-server"
status: verified
updated_at: "2026-10-03"
---

# Tarefas — Servidor local por npm

## Legenda

- `[ ]` pendente
- `[-]` em andamento
- `[x]` concluída
- `[!]` bloqueada

## Tarefas

- [x] **T01 — Criar scripts npm**
  - Requisitos: RF-01, RF-02, RF-04, RNF-01
  - Critérios: CA-01, CA-03, CA-05, CA-06
  - Dependências: nenhuma
  - Conclusão: `package.json` criado sem dependências.

- [x] **T02 — Criar servidor local seguro**
  - Requisitos: RF-01, RF-02, RF-03, RNF-02, RNF-03
  - Critérios: CA-01 a CA-04
  - Dependências: T01
  - Conclusão: servidor Node serve somente o diretório público na interface local.

- [x] **T03 — Atualizar documentação e compatibilidade**
  - Requisitos: RF-01 a RF-04
  - Critérios: CA-01 a CA-05
  - Dependências: T01, T02
  - Conclusão: READMEs e Makefile apontam para npm.

- [x] **T04 — Registrar versão**
  - Requisitos: RF-04
  - Critérios: CA-05
  - Dependências: T01 a T03
  - Conclusão: spec, plano, tarefas e manifesto criados.

## Verificação final

- [x] Todos os requisitos possuem tarefa concluída.
- [x] Todos os critérios de aceite foram comprovados.
- [x] `npm run check` passou.
- [x] Teste local foi realizado com `npm run dev`.
- [x] Spec e plano refletem o comportamento implementado.
- [x] Manifesto da versão foi atualizado quando aplicável.

## Evidências

| Data | Comando ou cenário | Resultado |
|---|---|---|
| 2026-10-03 | `npm run check` | JavaScript e estrutura SDD válidos |
| 2026-10-03 | `npm run dev` + HTTP local | Site e CRM responderam HTTP 200; POST respondeu 405 |
| 2026-10-03 | `npm run dev -- --port 8080` | Porta alternativa respondeu HTTP 200 |
