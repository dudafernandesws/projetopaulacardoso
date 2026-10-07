---
spec: "0003-portfolio-trabalhos-reais"
status: verified
updated_at: "2026-10-03"
---

# Tarefas — Portfólio com trabalhos reais

## Legenda

- `[ ]` pendente
- `[-]` em andamento
- `[x]` concluída
- `[!]` bloqueada

## Tarefas

- [x] **T01 — Preparar variantes públicas**
  - Requisitos: RNF-01
  - Critérios: CA-05
  - Dependências: nenhuma
  - Conclusão: 20 variantes JPEG dimensionadas e sem metadados em `site/web/assets`.

- [x] **T02 — Atualizar destaque e curadoria**
  - Requisitos: RF-01, RF-02, RF-04, RNF-02, RNF-03
  - Critérios: CA-01, CA-02, CA-04, CA-06, CA-07
  - Dependências: T01
  - Conclusão: destaque e nove fotografias reais possuem textos alternativos e dimensões explícitas.

- [x] **T03 — Criar composição responsiva**
  - Requisitos: RF-03, RNF-03
  - Critérios: CA-03, CA-07
  - Dependências: T02
  - Conclusão: grid editorial sem overflow verificado em 375 px, 768 px e 1440 px.

- [x] **T04 — Verificar e registrar versão**
  - Requisitos: RF-01 a RF-04, RNF-01 a RNF-03
  - Critérios: CA-01 a CA-07
  - Dependências: T01 a T03
  - Conclusão: checks, preview local, HTML compartilhável e manifesto `v0.2.0` concluídos.

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
| 2026-10-03 | Preview em 375 px, 768 px e 1440 px | Sem overflow; destaque e grid preservam proporções |
| 2026-10-03 | Console do navegador | Nenhum erro ou aviso |
| 2026-10-03 | Inspeção dos assets | 20 variantes, 3,6 MB no total e sem EXIF |
| 2026-10-03 | `python3 ferramentas/create_public_assets.py` | Entrega pública autônoma sincronizada |
