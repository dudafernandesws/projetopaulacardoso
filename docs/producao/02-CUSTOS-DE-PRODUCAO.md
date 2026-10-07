# Custos de produção

## 1. Premissas

Estimativa preparada em **3 de outubro de 2026** para:

- uma instalação por cliente;
- um administrador;
- 100 leads novos por mês;
- baixo volume de e-mails técnicos;
- site e CRM, sem WhatsApp ou automações;
- contas contratadas diretamente pelo cliente.

Preços em dólar não incluem câmbio, IOF, tributos ou variação da operadora do cartão.

## 2. Cenário recomendado

| Serviço | Plano | Preço publicado | Uso no projeto |
|---|---|---:|---|
| Cloudflare Pages | Free | US$ 0/mês | Site, CRM, CDN, HTTPS e deploy |
| Supabase | Pro | A partir de US$ 25/mês | Banco, Auth, RLS, funções, logs e backup |
| Cloudflare Turnstile | Free | US$ 0/mês | Proteção do formulário e autenticação |
| Resend | Free | US$ 0/mês | Recuperação de senha e mensagens de autenticação |
| Sentry | Developer, opcional | US$ 0/mês no início | Erros técnicos sanitizados |
| Registro.br | Domínio `.br` | R$ 40/ano | Domínio do cliente |

**Total obrigatório recomendado:** US$ 25/mês + R$ 40/ano, antes de câmbio e tributos.

Não é necessário contratar servidor VPS, banco separado, armazenamento de arquivos ou API de WhatsApp para este MVP.

## 3. Justificativa por serviço

### Cloudflare Pages

O plano gratuito atende o frontend estático. A documentação informa 500 builds por mês no plano gratuito, até 20.000 arquivos e suporte a domínios personalizados. Sites puramente estáticos recebem requisições sem cobrança de função.

Fontes:

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Limites do Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/)
- [Preços do Cloudflare Pages](https://www.cloudflare.com/developer-platform/products/pages/)

Gatilho para plano pago: necessidade de suporte empresarial, mais builds simultâneos ou uso de Workers acima dos limites gratuitos. O projeto proposto usa Supabase Edge Functions, portanto não depende de Workers pagos.

### Supabase

O plano Pro começa em US$ 25/mês. Inclui o primeiro projeto, 8 GB de banco, 100.000 usuários ativos mensais, 250 GB de transferência, backup diário com retenção de sete dias e logs por sete dias.

O plano gratuito comporta o volume do MVP, mas pausa após uma semana sem atividade e não oferece backup automático. Ele serve para desenvolvimento ou demonstração, não para produção confiável.

Fonte: [Preços do Supabase](https://supabase.com/pricing)

Gatilhos de custo:

- projeto adicional pago;
- armazenamento acima de 8 GB;
- transferência acima da franquia;
- retenção de backup ponto a ponto, que é um adicional caro e desnecessário no MVP;
- domínio personalizado da API, que custa adicionalmente e não é necessário.

### Cloudflare Turnstile

O plano gratuito suporta até 20 widgets, dez hostnames por widget e desafios ilimitados. A Cloudflare declara que o plano gratuito atende a maioria das aplicações em produção.

Fonte: [Planos do Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/plans/)

### Resend

O plano gratuito oferece 3.000 e-mails por mês, limite de 100 e-mails por dia e até três domínios. O volume esperado de recuperação e autenticação é muito inferior a esse limite.

Fonte: [Preços do Resend](https://resend.com/pricing)

Gatilho para o plano Pro de US$ 20/mês: ultrapassar 100 mensagens por dia, precisar de mais domínios ou exigir capacidade operacional adicional. O MVP não deve enviar campanhas de marketing.

### Domínio `.br`

O valor normal de manutenção informado pelo Registro.br é R$ 40 por um ano e R$ 76 por dois anos.

Fonte: [Registro.br — processo de liberação e manutenção](https://registro.br/dominio/processo-de-liberacao/resultado/)

O domínio deve ficar no CPF ou CNPJ do cliente. A pessoa desenvolvedora recebe apenas acesso técnico.

### Sentry

O monitoramento é opcional, mas recomendado. O plano Developer gratuito atende o início. A configuração deve remover nome, e-mail, notas, tokens e conteúdo de formulários antes do envio.

Fontes:

- [Sentry Error Monitoring](https://sentry.io/product/error-monitoring/)
- [Referência ao plano Developer gratuito](https://sentry.io/astro-assets/resources/resource-files/DebuggingMicroservicesandDistributedSystems.pdf)

## 4. Cenários de custo

### Desenvolvimento e demonstração

| Item | Custo |
|---|---:|
| Cloudflare Pages Free | US$ 0 |
| Supabase Free | US$ 0 |
| Turnstile Free | US$ 0 |
| Resend Free | US$ 0 |
| Domínio opcional | R$ 40/ano |

Este cenário não é aprovado para produção porque o banco gratuito pode pausar e não possui backup automático.

### Produção recomendada

| Item | Custo |
|---|---:|
| Supabase Pro | US$ 25/mês |
| Outros serviços iniciais | US$ 0/mês |
| Domínio `.br` | R$ 40/ano |

### Reserva operacional

Recomenda-se apresentar ao cliente um orçamento de infraestrutura com:

- custo contratado: US$ 25/mês + domínio;
- reserva de 20% para câmbio e tributos;
- revisão anual dos preços;
- aprovação prévia antes de ativar qualquer adicional pago.

## 5. Custos não incluídos

- desenvolvimento e implantação;
- manutenção corretiva após a garantia contratual;
- atendimento operacional;
- conta de e-mail empresarial do cliente;
- campanhas de e-mail;
- integração com WhatsApp;
- relatórios avançados;
- migração de grandes bases;
- suporte empresarial com SLA;
- assessoria jurídica ou elaboração final de documentos LGPD.

## 6. Controle financeiro

- Ativar limite de gastos do Supabase.
- Configurar alertas de consumo em 50%, 75% e 90%, quando disponíveis.
- Não permitir upgrade automático sem autorização do cliente.
- Registrar titular, plano, renovação, moeda e responsável por cada conta.
- Revisar faturas nos três primeiros meses e depois trimestralmente.
- Manter cartão e dados de cobrança sob controle do cliente.
