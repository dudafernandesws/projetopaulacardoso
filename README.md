# Projeto PaulaFoto

Projeto demonstrativo de presença digital e gestão comercial para a fotógrafa Paula Cardoso.

## Onde começar

1. Abra `docs/01-VISAO-DO-PRODUTO.md` para entender a ideia.
2. Abra `docs/02-ESTRUTURA-DO-PROJETO.md` para localizar cada arquivo.
3. Abra `entregas/paula-cardoso-publica.html` para visualizar a página sem ferramentas administrativas.
4. Use `site/web/index.html` quando precisar alterar o código da página.
5. Use `site/web/admin.html` para testar o CRM administrativo.
6. Consulte `docs/producao/README.md` antes de usar dados reais ou contratar a infraestrutura.
7. Use `specs/README.md` para planejar e acompanhar novas mudanças com SDD.
8. Siga `docs/05-PUBLICAR-NO-GITHUB-PAGES.md` para publicar o site.

## Pastas principais

- `docs`: planejamento, roteiro e proposta comercial.
- `site/web`: arquivos usados pela página e pelo CRM.
- `entregas`: versões HTML prontas para abrir ou compartilhar.
- `imagens/originais-hd`: fotografias originais locais, sem otimização para web e ignoradas pelo Git.
- `imagens/previews`: capturas usadas durante a criação.
- `ferramentas`: scripts que geram as versões HTML.
- `dados`: configurações e edições locais.
- `arquivo`: versões antigas mantidas apenas como histórico.
- `docs/producao`: arquitetura, custos, segurança, LGPD e checklist para publicação.
- `specs`: especificações, planos, tarefas e manifestos de versões.
- `.github/workflows`: automação que publica `site/web` no GitHub Pages.

## Rodar localmente

```bash
npm run dev
```

- Site: `http://localhost:4173/`
- CRM demonstrativo: `http://localhost:4173/admin.html`

## Acessar o CRM demonstrativo

1. Inicie o projeto com `npm run dev`.
2. Abra `http://localhost:4173/admin.html` no navegador.
3. O protótipo não solicita usuário ou e-mail.
4. Digite a senha de demonstração: `PAULA2026`.

O CRM atual serve somente para demonstração. A senha está no código do navegador, os dados são fictícios e as alterações não são persistidas após recarregar a página. Não use dados pessoais ou comerciais reais. Antes da publicação em produção, substitua esse acesso por autenticação real conforme `docs/producao/README.md`.

Valide código e specs antes de entregar:

```bash
npm run check
```

Não é necessário executar `npm install`: o servidor local usa somente recursos nativos do Node.js.

## Publicar no GitHub Pages

O projeto publica automaticamente a pasta `site/web` após cada `git push` para a branch `main`.

Tutorial completo: [`docs/05-PUBLICAR-NO-GITHUB-PAGES.md`](docs/05-PUBLICAR-NO-GITHUB-PAGES.md).

Endereço esperado: `https://dudafernandesws.github.io/projetopaulacardoso/`.

## Regra importante sobre as fotos

Não altere as imagens de `imagens/originais-hd`. Essa pasta é local e não será enviada ao GitHub. Crie cópias otimizadas e autorizadas em `site/web/assets` antes de usá-las no site público.
