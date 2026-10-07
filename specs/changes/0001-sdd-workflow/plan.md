---
spec: "0001-sdd-workflow"
status: verified
updated_at: "2026-10-03"
---

# Plano técnico — Estrutura SDD e execução local

## Resumo da abordagem

Adicionar documentação Markdown, validação Python sem dependências e um `Makefile`. A solução reutiliza o site estático existente e não introduz ferramenta de build.

## Componentes afetados

| Componente | Mudança | Responsabilidade preservada |
|---|---|---|
| `specs/` | Fluxo SDD, templates e versões | Documentar decisões e evidências |
| `ferramentas/check_specs.py` | Validação estrutural | Falhar cedo em estrutura incompleta |
| `Makefile` | Comandos locais | Servir e verificar o projeto |
| `README.md` | Entrada para o fluxo | Orientar novos trabalhos |

## Fluxo de dados e interfaces

`make dev` executa `python3 -m http.server`, com raiz em `site/web`. `make check` executa `node --check` nos três arquivos JavaScript e depois valida templates, mudanças e versões.

## Implementação

1. Criar diretórios e templates SDD.
2. Criar esta mudança como exemplo preenchido.
3. Registrar a versão inicial.
4. Criar validador sem dependências externas.
5. Criar comandos `make`.
6. Atualizar o README principal.

## Segurança e privacidade

- O servidor deve ficar ligado apenas durante desenvolvimento.
- Nenhum dado real deve ser usado no CRM demonstrativo.
- O validador não acessa rede nem altera arquivos.

## Testes e evidências

| Critério | Tipo de teste | Comando ou evidência |
|---|---|---|
| CA-01 a CA-03 | Estrutural | `make check-specs` |
| CA-04 | Integração local | `make dev` e requisição HTTP local |
| CA-05 | Verificação | `make check` |

## Publicação e rollback

- Publicação: incluir os novos arquivos no próximo commit.
- Monitoramento: não se aplica.
- Rollback: remover os arquivos adicionados e as referências do README.

## Verificação local

```bash
make check
make dev
```
