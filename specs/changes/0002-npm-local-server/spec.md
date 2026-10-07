---
id: "0002-npm-local-server"
title: "Servidor local por npm"
status: verified
version_target: "v0.1.1"
created_at: "2026-10-03"
updated_at: "2026-10-03"
owner: "Projeto PaulaFoto"
---

# Servidor local por npm

## Contexto

O comando `make dev` não funcionou no ambiente da usuária. Node.js e npm estão instalados, portanto o comando principal deve usar `npm run dev`.

## Objetivo

Permitir que o site e o CRM sejam iniciados localmente com `npm run dev`, sem instalação de dependências.

## Fora do escopo

- Adicionar Vite ou outro framework.
- Alterar o comportamento do site ou CRM.
- Abrir o navegador automaticamente.
- Usar o servidor local em produção.

## Usuários e cenário principal

- Usuário: responsável pelo projeto.
- Situação: revisar alterações locais no navegador.
- Resultado esperado: site disponível na porta 4173 após um único comando npm.

## Requisitos

### Funcionais

- **RF-01:** `npm run dev` deve servir `site/web` na porta 4173.
- **RF-02:** O comando deve aceitar outra porta com `-- --port <porta>`.
- **RF-03:** O terminal deve exibir as URLs do site e CRM.
- **RF-04:** `npm run check` deve validar JavaScript e specs.

### Não funcionais

- **RNF-01:** O servidor não deve exigir `npm install`.
- **RNF-02:** O servidor deve aceitar somente arquivos dentro de `site/web`.
- **RNF-03:** O servidor deve escutar apenas na interface local.

## Critérios de aceite

- **CA-01 / RF-01:** `npm run dev` inicia e `/` responde HTTP 200.
- **CA-02 / RF-01:** `/admin.html` responde HTTP 200.
- **CA-03 / RF-02:** `npm run dev -- --port 8080` seleciona a porta informada.
- **CA-04 / RF-03:** O terminal mostra as duas URLs e a instrução para encerrar.
- **CA-05 / RF-04:** `npm run check` termina com sucesso.
- **CA-06 / RNF-01:** Não existem dependências em `package.json`.

## Experiência e conteúdo

As mensagens do terminal devem estar em português. Alterações aparecem após salvar o arquivo e atualizar o navegador.

## Dados e interfaces

```text
npm run dev
npm run dev -- --port 8080
npm run check
npm run check:specs
```

## Segurança e privacidade

O servidor restringe caminhos a `site/web`, aceita somente GET e HEAD, desativa cache e escuta em `127.0.0.1`.

## Dependências e restrições

- Dependência: Node.js 18 ou superior.
- Python 3 permanece necessário para `npm run check:specs`.
- O servidor não oferece hot reload.

## Questões abertas

- Nenhuma.

## Histórico

| Data | Alteração | Autor |
|---|---|---|
| 2026-10-03 | Spec criada | Projeto PaulaFoto |
