---
spec: "0004-ajustes-orientacao-e-textos"
status: in_progress
updated_at: "2026-10-03"
---

# Plano técnico — Ajustes de orientação e textos do portfólio

## Resumo da abordagem

Aplicar molduras CSS 2:3 somente às três figuras indicadas, com posição focal por imagem. Remover a legenda no HTML e atualizar apenas ocorrências públicas do plural “Retratos”. Regenerar a entrega autônoma.

## Componentes afetados

| Componente | Mudança | Responsabilidade preservada |
|---|---|---|
| `site/web/index.html` | Legenda removida e textos ajustados | Estrutura inicial e SEO |
| `site/web/public.js` | Classes de enquadramento e textos ajustados | Conteúdo público |
| `site/web/style.css` | Moldura vertical e posições focais | Apresentação responsiva |
| `entregas/paula-cardoso-publica.html` | Entrega regenerada | Versão compartilhável |
| `specs` | Mudança e versão registradas | Rastreabilidade SDD |

## Fluxo de dados e interfaces

Não há alteração de dados ou interface. Os mesmos arquivos JPEG são exibidos dentro de molduras verticais controladas pelo CSS.

## Implementação

1. Adicionar moldura ao componente de imagem.
2. Marcar somente as três figuras solicitadas como verticais.
3. Ajustar o ponto focal de cada imagem.
4. Remover a legenda do destaque e substituir o plural “Retratos”.
5. Regenerar a entrega e verificar o preview.

## Segurança e privacidade

- Validação: não se aplica.
- Autorização: não se aplica.
- Dados pessoais: nenhuma mudança.
- Segredos: não se aplica.

## Testes e evidências

| Critério | Tipo de teste | Comando ou evidência |
|---|---|---|
| CA-01, CA-02 | Visual e estrutural | preview e proporções computadas |
| CA-03, CA-04 | Busca textual | `rg` em `index.html` e `public.js` |
| CA-05 | Verificação | `npm run check` e console do navegador |

## Publicação e rollback

- Publicação: incluir código, entrega autônoma e versão `v0.2.1`.
- Monitoramento: revisar as três composições em celular e desktop.
- Rollback: remover classes `portrait-crop`, restaurar legenda e textos anteriores.

## Verificação local

```bash
npm run check
npm run dev
```
