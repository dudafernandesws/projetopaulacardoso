# v0.2.0

- Status: verified
- Data planejada: 2026-10-03
- Data publicada: não publicada
- Commit ou tag: não definido

## Objetivo da versão

Apresentar trabalhos reais da Paula em uma experiência editorial responsiva e otimizada.

## Mudanças incluídas

| Spec | Título | Estado | Evidência |
|---|---|---|---|
| [`0003-portfolio-trabalhos-reais`](../../changes/0003-portfolio-trabalhos-reais/spec.md) | Portfólio com trabalhos reais | verified | `npm run check` e preview responsivo local |

## Compatibilidade e migrações

- Nenhuma migração de dados.
- Formulário e CRM mantêm o comportamento anterior.
- Navegadores recebem variantes JPEG responsivas.
- Os originais permanecem intactos em `imagens/originais-hd`.

## Verificação

- [x] Spec está `verified`.
- [x] `npm run check` passou.
- [x] Layout foi revisado em 375 px, 768 px e 1440 px.
- [x] Console do navegador não apresentou erros.
- [x] Rollback foi definido.

## Notas da versão

O destaque e a galeria passam a usar dez composições de trabalhos reais. Vinte variantes públicas totalizam 3,6 MB e não contêm metadados EXIF.
