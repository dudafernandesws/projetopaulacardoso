---
id: "0001-sdd-workflow"
title: "Estrutura SDD e execução local"
status: verified
version_target: "v0.1.0"
created_at: "2026-10-03"
updated_at: "2026-10-03"
owner: "Projeto PaulaFoto"
---

# Estrutura SDD e execução local

## Contexto

O projeto não possuía convenção para registrar requisitos, planos, tarefas e versões. A execução local também dependia de conhecer manualmente o diretório correto e o comando do servidor.

## Objetivo

Criar um fluxo SDD leve, versionado e validável, além de oferecer um comando único para executar o site localmente.

## Fora do escopo

- Alterar o comportamento visual ou funcional do site.
- Adicionar framework frontend ou dependências de runtime.
- Implementar a arquitetura de produção descrita em `docs/producao/`.
- Automatizar abertura do navegador.

## Usuários e cenário principal

- Usuário: responsável pelo produto ou agente de desenvolvimento.
- Situação: planejar, executar e revisar uma atualização do site.
- Resultado esperado: mudança rastreável por spec, tarefas e versão, com preview local por comando conhecido.

## Requisitos

### Funcionais

- **RF-01:** O projeto deve fornecer templates para spec, plano, tarefas e manifesto de versão.
- **RF-02:** Cada mudança deve usar identificador sequencial e diretório próprio.
- **RF-03:** O projeto deve manter manifestos de versões SemVer.
- **RF-04:** Um comando deve iniciar o site localmente na porta 4173 por padrão.
- **RF-05:** Um comando deve validar JavaScript e a estrutura mínima das specs.

### Não funcionais

- **RNF-01:** A execução local não deve exigir instalação de pacote do projeto.
- **RNF-02:** A validação SDD deve usar apenas a biblioteca padrão do Python.
- **RNF-03:** A estrutura deve permanecer legível sem ferramenta proprietária.

## Critérios de aceite

- **CA-01 / RF-01:** Existem templates preenchíveis para os quatro documentos definidos.
- **CA-02 / RF-02:** `specs/changes/0001-sdd-workflow/` demonstra a convenção completa.
- **CA-03 / RF-03:** `specs/versions/v0.1.0/README.md` registra a versão inicial.
- **CA-04 / RF-04:** `make dev` serve `site/web` em `http://localhost:4173`.
- **CA-05 / RF-05:** `make check` termina com sucesso no estado atual.

## Experiência e conteúdo

As instruções devem estar em português, com comandos copiáveis e URLs explícitas para o site e o CRM demonstrativo.

## Dados e interfaces

Novas interfaces de desenvolvimento:

```text
make dev [PORT=<porta>]
make check
make check-specs
```

Nenhuma interface pública da aplicação é alterada.

## Segurança e privacidade

O servidor local publica somente `site/web`. Ele deve ser usado para desenvolvimento na máquina local e não como servidor de produção.

## Dependências e restrições

- Dependências: Python 3, Node.js e `make`.
- Restrição: o servidor local exige atualização manual do navegador.

## Questões abertas

- Nenhuma.

## Histórico

| Data | Alteração | Autor |
|---|---|---|
| 2026-10-03 | Estrutura inicial criada | Projeto PaulaFoto |
