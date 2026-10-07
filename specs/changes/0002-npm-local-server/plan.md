---
spec: "0002-npm-local-server"
status: verified
updated_at: "2026-10-03"
---

# Plano técnico — Servidor local por npm

## Resumo da abordagem

Criar `package.json` sem dependências e um servidor HTTP com módulos nativos do Node.js. Manter `make dev` apenas como atalho compatível.

## Componentes afetados

| Componente | Mudança | Responsabilidade preservada |
|---|---|---|
| `package.json` | Scripts npm | Entrada padronizada para desenvolvimento |
| `ferramentas/serve-local.mjs` | Servidor HTTP local | Servir somente `site/web` |
| documentação | Novos comandos | Orientar execução e validação |
| specs | Mudança e versão | Preservar rastreabilidade SDD |

## Fluxo de dados e interfaces

O npm executa o script Node. O servidor resolve a URL somente dentro de `site/web`, determina o tipo do arquivo e responde GET ou HEAD sem cache.

## Implementação

1. Criar `package.json` sem dependências.
2. Criar servidor local com Node.js nativo.
3. Fazer `make dev` delegar ao comando npm.
4. Atualizar instruções.
5. Registrar a mudança e a versão.

## Segurança e privacidade

- Bind em `127.0.0.1`.
- Bloqueio de caminhos fora de `site/web`.
- Métodos diferentes de GET e HEAD recebem 405.
- Uso exclusivo para desenvolvimento.

## Testes e evidências

| Critério | Tipo de teste | Comando ou evidência |
|---|---|---|
| CA-01, CA-02 | Integração | HTTP HEAD local retorna 200 |
| CA-03, CA-04 | Manual | Saída do servidor e porta alternativa |
| CA-05 | Verificação | `npm run check` |
| CA-06 | Estrutural | `package.json` sem `dependencies` |

## Publicação e rollback

- Publicação: incluir script, pacote, documentação e specs.
- Monitoramento: não se aplica.
- Rollback: retornar às instruções anteriores e remover os dois arquivos executáveis.

## Verificação local

```bash
npm run check
npm run dev
```
