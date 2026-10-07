# Desenvolvimento orientado por especificações

Este diretório organiza mudanças do PaulaFoto com Spec-Driven Development (SDD). Cada alteração começa pelo comportamento esperado, segue para implementação e termina com evidências de verificação.

## Estrutura

```text
specs/
├── README.md
├── templates/
│   ├── spec-template.md
│   ├── plan-template.md
│   ├── tasks-template.md
│   └── release-template.md
├── changes/
│   └── 0001-nome-da-mudanca/
│       ├── spec.md
│       ├── plan.md       # obrigatório quando as regras abaixo exigirem
│       └── tasks.md
└── versions/
    ├── README.md
    └── v0.1.0/
        └── README.md
```

## Fluxo de trabalho

1. Criar o próximo diretório sequencial em `specs/changes/`, no formato `NNNN-nome-curto`.
2. Copiar `templates/spec-template.md` para `spec.md` e preencher decisões e critérios de aceite.
3. Criar `plan.md` quando a mudança exigir planejamento técnico.
4. Copiar `templates/tasks-template.md` para `tasks.md` e dividir a execução em tarefas verificáveis.
5. Aprovar a spec antes de alterar comportamento da aplicação.
6. Implementar uma tarefa por vez e registrar seu estado.
7. Executar `npm run check` e os testes específicos da mudança.
8. Atualizar a spec se a decisão mudar. Não deixar o código divergir silenciosamente.
9. Marcar a mudança como `verified` somente com os critérios de aceite comprovados.
10. Incluir a mudança no manifesto da próxima versão em `specs/versions/`.

## Quando o plano é obrigatório

Criar `plan.md` quando ocorrer qualquer condição:

- alteração em mais de dois componentes ou arquivos de responsabilidade diferente;
- mudança de banco, API, autenticação, segurança, LGPD ou infraestrutura;
- migração de dados ou compatibilidade com comportamento existente;
- nova dependência ou serviço externo;
- risco de indisponibilidade, perda de dados ou rollback difícil.

O plano é opcional para correção simples de texto, troca isolada de imagem ou ajuste visual pequeno sem efeito em dados ou interfaces.

## Estados de uma mudança

```text
draft -> approved -> in_progress -> implemented -> verified -> released
```

- `draft`: proposta ainda aberta a decisões.
- `approved`: objetivo, escopo e aceite confirmados.
- `in_progress`: implementação iniciada.
- `implemented`: tarefas concluídas, aguardando verificação.
- `verified`: critérios comprovados.
- `released`: incluída em uma versão publicada.
- `superseded`: substituída por outra spec, que deve ser referenciada.

## Identificação e versionamento

- Mudanças usam sequência de quatro dígitos: `0001`, `0002`, `0003`.
- O identificador nunca é reutilizado.
- Versões usam SemVer: `vMAJOR.MINOR.PATCH`.
- `MAJOR`: mudança incompatível ou transformação estrutural grande.
- `MINOR`: nova funcionalidade compatível.
- `PATCH`: correção compatível, conteúdo ou ajuste visual pequeno.
- Specs não são movidas após uma versão. O manifesto da versão aponta para elas.
- Alterações posteriores recebem uma nova spec; o histórico antigo permanece imutável.

## Regras de qualidade

- Cada requisito deve ter pelo menos um critério de aceite.
- Cada tarefa deve indicar qual requisito atende.
- Critérios descrevem resultado observável, não detalhe de implementação.
- Decisões desconhecidas ficam em “Questões abertas” e impedem o estado `approved`.
- Dados reais nunca entram em exemplos, testes ou specs.
- Mudanças de segurança seguem também `docs/producao/`.
- Uma spec não aprovada não autoriza mudança funcional.

## Rodar o projeto localmente

Pré-requisitos: Node.js 18 ou superior. Python 3 é necessário somente para validar as specs.

```bash
npm run dev
```

Acessos:

- Site: `http://localhost:4173/`
- CRM demonstrativo: `http://localhost:4173/admin.html`

Use outra porta quando necessário:

```bash
npm run dev -- --port 8080
```

O servidor não recompila arquivos. Salve a alteração e atualize o navegador.

## Validar antes de entregar

```bash
npm run check
```

Esse comando verifica a sintaxe JavaScript atual e a estrutura mínima das specs. Não é necessário executar `npm install`. Cada mudança pode acrescentar comandos de teste em seu `plan.md` e `tasks.md`.

## Como pedir uma mudança

Uma solicitação pode ser curta:

> Crie uma spec para melhorar a seção de serviços. Quero incluir duração, quantidade de fotos e chamada para orçamento.

O fluxo esperado será:

1. localizar a próxima numeração;
2. criar `spec.md` e, quando necessário, `plan.md`;
3. criar `tasks.md`;
4. esclarecer somente decisões que mudem o resultado;
5. implementar após aprovação;
6. iniciar `npm run dev` para revisão local;
7. registrar evidências e preparar a versão.
