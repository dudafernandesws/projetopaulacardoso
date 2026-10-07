---
spec: "0001-sdd-workflow"
status: verified
updated_at: "2026-10-03"
---

# Tarefas — Estrutura SDD e execução local

## Legenda

- `[ ]` pendente
- `[-]` em andamento
- `[x]` concluída
- `[!]` bloqueada

## Tarefas

- [x] **T01 — Criar convenções e templates SDD**
  - Requisitos: RF-01, RF-02
  - Critérios: CA-01, CA-02
  - Dependências: nenhuma
  - Conclusão: templates e exemplo preenchido existem em `specs/`.

- [x] **T02 — Criar controle de versões**
  - Requisitos: RF-03
  - Critérios: CA-03
  - Dependências: T01
  - Conclusão: versão inicial possui manifesto próprio.

- [x] **T03 — Criar execução local**
  - Requisitos: RF-04, RNF-01
  - Critérios: CA-04
  - Dependências: nenhuma
  - Conclusão: `make dev` serve `site/web` na porta configurável.

- [x] **T04 — Criar validação automatizada**
  - Requisitos: RF-05, RNF-02, RNF-03
  - Critérios: CA-05
  - Dependências: T01, T02
  - Conclusão: `make check` valida JavaScript e specs sem dependência Python externa.

- [x] **T05 — Documentar o uso**
  - Requisitos: RF-01 a RF-05
  - Critérios: CA-01 a CA-05
  - Dependências: T01 a T04
  - Conclusão: README principal e `specs/README.md` orientam o fluxo.

## Verificação final

- [x] Todos os requisitos possuem tarefa concluída.
- [x] Todos os critérios de aceite foram comprovados.
- [x] `make check` passou.
- [x] Teste local foi realizado com `make dev`.
- [x] Spec e plano refletem o comportamento implementado.
- [x] Manifesto da versão foi atualizado quando aplicável.

## Evidências

| Data | Comando ou cenário | Resultado |
|---|---|---|
| 2026-10-03 | `make check` | JavaScript e estrutura SDD válidos |
| 2026-10-03 | `make dev` + HTTP local | Site e CRM respondem localmente |
