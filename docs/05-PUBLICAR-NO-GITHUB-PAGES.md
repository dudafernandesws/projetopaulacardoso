# Tutorial: publicar o site no GitHub Pages

Este projeto já está preparado para publicar automaticamente a pasta `site/web` no GitHub Pages.

Endereço esperado do site:

```text
https://dudafernandesws.github.io/projetopaulacardoso/
```

## Antes de publicar

O GitHub Pages hospeda sites estáticos. Ele publica HTML, CSS, JavaScript e imagens, mas não executa servidor, banco de dados ou PHP.

Neste projeto:

- o site público funciona no GitHub Pages;
- a galeria e as páginas internas funcionam porque usam caminhos relativos;
- o formulário apenas salva a demonstração no navegador com `localStorage`;
- o formulário não envia mensagens, e-mails ou dados para Paula;
- o CRM em `admin.html` é demonstrativo e também ficará público;
- nenhuma senha, chave de API ou dado pessoal real deve ser colocado em `site/web`.

## Como a publicação funciona

O arquivo `.github/workflows/publicar-github-pages.yml` executa estas etapas quando há um envio para a branch `main`:

1. baixa os arquivos do repositório;
2. executa `npm run check`;
3. prepara a pasta `site/web`;
4. publica essa pasta no GitHub Pages.

As outras pastas organizam o trabalho, mas não fazem parte do site publicado.

## Primeira publicação

### 1. Teste o site no computador

No terminal, dentro da pasta do projeto, execute:

```bash
npm run dev
```

Abra estes endereços no navegador:

```text
http://localhost:4173/
http://localhost:4173/galeria.html
http://localhost:4173/sobre-mim.html
```

Use `Ctrl+C` no terminal para encerrar o servidor.

### 2. Valide o projeto

```bash
npm run check
```

Continue somente se o comando terminar sem erros.

### 3. Confira o que será enviado

```bash
git status
```

Revise principalmente arquivos removidos, fotos grandes e informações privadas.

### 4. Salve a organização no Git

```bash
git add .
git commit -m "chore: preparar publicação no GitHub Pages"
```

### 5. Envie para o GitHub

O remoto `origin` deste projeto já aponta para:

```text
https://github.com/dudafernandesws/projetopaulacardoso.git
```

Envie a branch `main`:

```bash
git push -u origin main
```

O GitHub pode abrir o navegador para autenticação. Entre na conta `dudafernandesws` e autorize o acesso.

### 6. Ative o GitHub Pages

No navegador:

1. abra `https://github.com/dudafernandesws/projetopaulacardoso`;
2. clique em **Settings**;
3. no menu lateral, clique em **Pages**;
4. em **Build and deployment**, escolha **GitHub Actions** em **Source**.

Se essa opção já estiver selecionada, não altere nada.

### 7. Acompanhe a publicação

1. abra a aba **Actions** do repositório;
2. clique no fluxo **Publicar no GitHub Pages**;
3. aguarde o indicador ficar verde;
4. abra o endereço mostrado na etapa de publicação.

A primeira publicação pode levar alguns minutos.

## Publicar alterações futuras

Depois de editar e testar o site, use:

```bash
npm run check
git status
git add .
git commit -m "feat: atualizar site"
git push
```

Cada `git push` para `main` inicia uma nova publicação automática.

## Estrutura usada na publicação

```text
Projeto PaulaFoto/
├── .github/workflows/                automação de publicação
├── docs/                             documentação e este tutorial
├── entregas/                         versões HTML para apresentação
├── ferramentas/                      scripts locais
├── imagens/originais-hd/             fotos originais
├── site/web/                         site publicado no GitHub Pages
│   ├── assets/                       imagens otimizadas
│   ├── index.html                    página inicial
│   ├── galeria.html                  galeria
│   ├── sobre-mim.html                apresentação da fotógrafa
│   ├── style.css                     estilos
│   └── *.js                          comportamento das páginas
├── specs/                            histórico técnico das mudanças
├── package.json                      comandos do projeto
└── README.md                         orientação inicial
```

## Problemas comuns

### O endereço mostra erro 404

- Confirme que o repositório recebeu a branch `main`.
- Confirme que **Settings > Pages > Source** está em **GitHub Actions**.
- Abra **Actions** e verifique se o fluxo terminou em verde.
- Aguarde alguns minutos e recarregue a página.

### As imagens não aparecem

O GitHub diferencia letras maiúsculas e minúsculas. `foto.JPG` e `foto.jpg` são nomes diferentes. Não altere somente a capitalização sem conferir os caminhos no HTML ou JavaScript.

### A publicação falha em `npm run check`

Execute o mesmo comando no computador:

```bash
npm run check
```

Corrija o primeiro erro mostrado, crie outro commit e execute `git push` novamente.

### A opção GitHub Pages não aparece

Confirme que você está em **Settings** do repositório correto e tem permissão de proprietária. Em contas gratuitas, mantenha o repositório público para usar o GitHub Pages.

### O formulário não entrega contatos

Isso é esperado na versão atual. O GitHub Pages não fornece processamento de formulários. Para receber contatos reais, será necessário integrar um serviço de formulário ou outro backend antes do uso comercial.

## Documentação oficial

- [Publicar com um fluxo personalizado do GitHub Actions](https://docs.github.com/pt/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Configurar a origem de publicação do GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
