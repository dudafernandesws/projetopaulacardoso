# Estrutura do projeto

## Mapa

```text
Projeto PaulaFoto/
├── .github/
│   └── workflows/
│       └── publicar-github-pages.yml
├── Makefile
├── package.json
├── README.md
├── docs/
│   ├── 01-VISAO-DO-PRODUTO.md
│   ├── 02-ESTRUTURA-DO-PROJETO.md
│   ├── 03-ROTEIRO-DEMONSTRACAO.md
│   ├── 04-PROPOSTA-COMERCIAL.md
│   ├── 05-PUBLICAR-NO-GITHUB-PAGES.md
│   └── producao/
├── site/
│   └── web/
│       ├── index.html
│       ├── galeria.html
│       ├── sobre-mim.html
│       ├── admin.html
│       ├── style.css
│       ├── public.js
│       ├── gallery.js
│       ├── gallery-data.js
│       ├── app.js
│       ├── editor.js
│       ├── saved-edits.js
│       └── assets/
├── entregas/
│   ├── paula-cardoso-publica.html
│   ├── paula-cardoso-editavel.html
│   └── paula-cardoso-apresentacao.html
├── imagens/
│   ├── originais-hd/
│   └── previews/
├── ferramentas/
│   ├── build-editable.py
│   ├── check_specs.py
│   ├── create_public_assets.py
│   ├── prepare-gallery.mjs
│   └── serve-local.mjs
├── specs/
└── arquivo/
    └── apresentacao-completa-legada.html
```

## Função de cada área

### `docs`

Contém tudo que foi planejado para o produto. Estes arquivos podem ser lidos sem abrir o código.

### `.github/workflows`

Contém a automação que valida e publica `site/web` no GitHub Pages após cada envio para a branch `main`.

### `site/web`

Contém o site em desenvolvimento. `index.html` é a página pública. `admin.html` é a demonstração separada do CRM. A pasta `assets` contém imagens preparadas para carregamento rápido.

### `entregas`

Contém arquivos HTML completos, gerados para visualização e apresentação. Eles não devem ser editados manualmente porque podem ser recriados pelas ferramentas.

### `imagens/originais-hd`

Contém as fotos originais adicionadas ao projeto. Esses arquivos são a fonte de maior qualidade, devem ser preservados localmente e são ignorados pelo Git.

### `imagens/previews`

Contém capturas de tela produzidas durante o desenvolvimento.

### `ferramentas`

Contém os scripts usados para gerar os arquivos da pasta `entregas`.

### `dados`

Contém configurações locais e conteúdo salvo pelo editor.

### `arquivo`

Contém versões antigas mantidas como referência. Elas não representam a entrega atual.

### `specs`

Contém especificações, planos, tarefas e registros das versões do projeto.

## Arquivos para uso diário

- Ler planejamento: `docs/01-VISAO-DO-PRODUTO.md`.
- Abrir página pronta: `entregas/paula-cardoso-publica.html`.
- Editar página: `site/web/index.html`, `site/web/style.css` e `site/web/public.js`.
- Editar CRM: `site/web/admin.html` e `site/web/app.js`.
- Substituir fotos do site: `site/web/assets`.
- Guardar novas fotos originais: `imagens/originais-hd`.
- Publicar no GitHub Pages: `docs/05-PUBLICAR-NO-GITHUB-PAGES.md`.
