# Produção do PaulaFoto

## Objetivo

Este diretório reúne o levantamento necessário para transformar o protótipo PaulaFoto em um MVP de produção com site público e CRM privado.

O escopo adotado considera:

- uma instalação isolada por cliente;
- um usuário administrador;
- aproximadamente 100 novos leads por mês;
- retenção de dados por 24 meses após a última atividade;
- site público, formulário de contato e CRM;
- WhatsApp e automações fora do MVP;
- contas de infraestrutura pertencentes ao cliente.

## Conclusão executiva

O projeto atual é uma demonstração funcional de interface. Ele não deve receber dados reais antes das adequações descritas neste diretório.

Os principais bloqueadores são:

1. A senha administrativa `PAULA2026` está no código entregue ao navegador.
2. O formulário grava dados pessoais apenas no `localStorage` do visitante e mostra uma confirmação que não corresponde a uma entrega real do lead.
3. O CRM trabalha com dados fictícios em memória e perde as alterações quando a página é recarregada.
4. Não existem autenticação no servidor, banco de dados, autorização, backup ou trilha de auditoria.
5. O editor restaura HTML do `localStorage`, o que cria risco de execução de conteúdo injetado.
6. Não existem proteção contra bots, limite de requisições ou cabeçalhos completos de segurança.
7. A origem de publicação está inconsistente no Git: o antigo `dist/` aparece removido e o novo `site/` ainda não está versionado.

## Arquitetura recomendada

- Cloudflare Pages para site e painel estáticos.
- Supabase Pro na região de São Paulo para Postgres, Auth, RLS, Edge Functions e backups.
- Cloudflare Turnstile no formulário público.
- Resend como SMTP dos e-mails de autenticação e recuperação de senha.
- Sentry, opcional no lançamento, para erros técnicos sem captura de dados pessoais.
- GitHub Actions para verificação e publicação controlada.

O custo recorrente recomendado por cliente começa em **US$ 25 por mês**, mais **R$ 40 por ano** para um domínio `.br`, câmbio e tributos. Consulte [02-CUSTOS-DE-PRODUCAO.md](./02-CUSTOS-DE-PRODUCAO.md).

## Ordem recomendada

1. Resolver o estado do repositório e definir fonte única de publicação.
2. Criar banco, autenticação, políticas RLS e função pública de captação.
3. Integrar o formulário e substituir os dados fictícios do CRM.
4. Implementar TOTP, recuperação de senha e encerramento de sessão.
5. Aplicar segurança, privacidade, retenção e observabilidade.
6. Executar testes e checklist de produção.

## Documentos

- [01-ARQUITETURA-E-INFRAESTRUTURA.md](./01-ARQUITETURA-E-INFRAESTRUTURA.md): arquitetura, dados, API, ambientes e operação.
- [02-CUSTOS-DE-PRODUCAO.md](./02-CUSTOS-DE-PRODUCAO.md): custos obrigatórios, opcionais e gatilhos de crescimento.
- [03-SEGURANCA-E-LGPD.md](./03-SEGURANCA-E-LGPD.md): riscos atuais e controles necessários.
- [04-PLANO-DE-ADEQUACAO.md](./04-PLANO-DE-ADEQUACAO.md): backlog priorizado e critérios de aceite.
- [05-CHECKLIST-GO-LIVE.md](./05-CHECKLIST-GO-LIVE.md): validações finais antes da publicação.

## Decisão de publicação

**Situação atual: NÃO APROVADO PARA PRODUÇÃO.**

A publicação com dados reais somente deve ocorrer quando todos os itens classificados como bloqueadores no plano de adequação estiverem concluídos e o checklist de go-live estiver aprovado.
