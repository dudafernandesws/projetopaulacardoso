# Segurança e LGPD

## 1. Resultado da análise

O protótipo não apresenta indício de segredo de infraestrutura real no Git. Porém, contém uma senha demonstrativa exposta e não possui os controles necessários para tratar dados pessoais em produção.

Classificação:

| Severidade | Quantidade | Situação |
|---|---:|---|
| Crítica | 3 | Bloqueia produção |
| Alta | 6 | Deve ser corrigida antes do go-live |
| Média | 6 | Corrigir durante a adequação |
| Baixa | 3 | Melhoria recomendada |

## 2. Achados críticos

### SEC-01 — senha administrativa no navegador

**Evidência:** `site/web/admin.html:30` compara a senha com `PAULA2026`.

Qualquer pessoa que receba a página pode ler a senha pelo código-fonte ou pelas ferramentas do navegador. A proteção é apenas visual.

**Correção:** remover a verificação local e usar Supabase Auth com senha forte, TOTP obrigatório, cadastro público desativado e RLS exigindo `aal2`.

### SEC-02 — captação não entrega o lead

**Evidência:** `site/web/public.js:10-13` grava nome, e-mail e notas no `localStorage` do visitante e mostra mensagem de recebimento.

O administrador não recebe o lead. Os dados permanecem no dispositivo do visitante, podem ser vistos por outras pessoas que usem o mesmo navegador e podem desaparecer sem aviso.

**Correção:** enviar o formulário a uma Edge Function com validação, Turnstile e persistência no Postgres. Remover PII do `localStorage`.

### SEC-03 — CRM sem persistência ou autorização

**Evidência:** `site/web/app.js` inicializa uma lista fixa de pessoas fictícias e mantém alterações somente em memória.

Não existe banco, controle de acesso ou isolamento. O sistema perde alterações ao recarregar.

**Correção:** substituir a lista por consultas autenticadas ao Supabase e proteger todas as tabelas com RLS.

## 3. Achados altos

### SEC-04 — risco de XSS persistente no editor

**Evidência:** `site/web/editor.js` lê textos do `localStorage` e os aplica com `innerHTML`.

Conteúdo adulterado na mesma origem pode executar marcação ou comportamento não esperado.

**Correção:** não publicar o editor em produção. Se mantido para uso local, sanitizar HTML com política restrita e separar sua origem da aplicação real.

### SEC-05 — ausência de proteção contra abuso

O formulário não possui CAPTCHA, limite de requisição, validação no servidor ou limite de corpo.

**Correção:** Turnstile, rate limit, origem permitida, validação por esquema e resposta genérica.

O rate limit inicial será de dez tentativas por dez minutos por origem. A função armazenará somente um hash temporário da origem, com exclusão em até 24 horas.

### SEC-06 — ausência de políticas de banco

Não existe banco hoje. Uma integração direta sem RLS exporia os leads pela chave anônima.

**Correção:** ativar RLS antes de criar dados reais. Anônimo não terá acesso às tabelas. A função pública inserirá com segredo mantido no servidor.

### SEC-07 — ausência de cabeçalhos de segurança

Não existe `site/web/_headers`. O HTML administrativo também contém script inline, dificultando uma CSP estrita.

**Correção:** mover scripts inline para módulos e aplicar:

```text
Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self'; img-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

A CSP final deve ser validada contra os domínios exatos usados na instalação.

### SEC-08 — ausência de backup e restauração

Não existe armazenamento central ou cópia recuperável.

**Correção:** Supabase Pro com backup diário por sete dias, teste trimestral de restauração e documentação de responsabilidade.

### SEC-09 — ausência de gestão de sessão

Não existem logout real, expiração, revogação ou proteção de sessão.

**Correção:** usar Supabase Auth, configurar validade, revogar sessões no logout e nunca guardar token em logs.

## 4. Achados médios

### SEC-10 — repositório inconsistente para deploy

O Git mostra o antigo `dist/` removido, `.openai/hosting.json` alterado para `site/web` e o novo diretório ainda não rastreado. Um deploy pode publicar versão incompleta ou diferente da revisada.

**Correção:** escolher fonte única, revisar as mudanças existentes, gerar `dist/` por CI e impedir deploy com árvore de trabalho não versionada.

### SEC-11 — falta de trilha de auditoria

O histórico atual existe apenas no objeto em memória e pode ser alterado junto com o lead.

**Correção:** usar `lead_events` imutável, com ator e data, sem permitir edição direta.

### SEC-12 — ausência de ciclo de retenção

O navegador mantém dados até exclusão manual do armazenamento local.

**Correção:** retenção de 24 meses após a última atividade, exclusão manual e rotina automatizada.

### SEC-13 — metadados de imagens

Os JPEGs publicados contêm segmentos EXIF. O levantamento não identificou GPS, mas metadados desnecessários devem ser removidos.

**Correção:** gerar imagens públicas sem EXIF e preservar originais apenas fora do artefato publicado.

### SEC-14 — falta de monitoramento

Falhas do formulário podem passar despercebidas.

**Correção:** alerta para taxa de erro, falha de função e autenticação. Nunca enviar PII ao monitoramento.

### SEC-15 — ausência de testes automatizados

Os arquivos JavaScript passam na verificação sintática, mas não existem testes de autorização, integração ou navegador.

**Correção:** criar testes unitários, integração com banco, RLS e E2E.

## 5. Achados baixos

- Não existem `robots.txt`, `sitemap.xml` ou página `404.html`.
- Imagens PNG grandes permanecem no diretório servido, embora a página use versões JPEG.
- O código dinâmico concentrado em grandes strings HTML dificulta revisão e manutenção.

## 6. Controles LGPD

### Papéis

- Cliente: controlador dos dados dos leads.
- Fornecedores de infraestrutura: operadores ou suboperadores conforme contrato.
- Desenvolvedor: operador apenas quando mantém acesso aos dados para suporte autorizado.

Os papéis finais devem ser validados contratualmente. Este documento não substitui orientação jurídica.

### Dados coletados no MVP

| Dado | Finalidade |
|---|---|
| Nome | Identificar o interessado |
| E-mail | Responder à solicitação |
| Serviço desejado | Preparar atendimento e orçamento |
| Prazo pretendido | Priorizar o contato |
| Observações | Entender a solicitação |
| Histórico comercial | Acompanhar o relacionamento |

Não coletar telefone, documentos, data de nascimento, dados de pagamento ou informações sensíveis no MVP.

### Transparência

O formulário deve apresentar:

- finalidade do tratamento;
- link para aviso de privacidade;
- identificação e contato do controlador;
- prazo geral de retenção;
- canal para acesso, correção ou exclusão;
- aviso para não inserir dados sensíveis no campo aberto.

Não usar caixa de consentimento genérica como substituto para informar a finalidade. A base legal deve ser definida pelo controlador com orientação jurídica adequada.

### Direitos do titular

Criar procedimento para:

1. receber solicitação pelo canal publicado;
2. confirmar a identidade sem pedir dados excessivos;
3. localizar o lead pelo e-mail;
4. corrigir, informar ou excluir conforme solicitação válida;
5. registrar a conclusão sem manter o conteúdo pessoal apagado;
6. responder dentro do prazo aplicável.

### Incidentes

Procedimento mínimo:

1. interromper acesso indevido e preservar evidências técnicas;
2. rotacionar segredos e revogar sessões;
3. identificar dados, titulares, período e impacto;
4. informar o controlador imediatamente;
5. avaliar comunicação aos titulares e à ANPD;
6. corrigir a causa e documentar as ações.

## 7. Regras operacionais

- MFA obrigatório em todas as contas administrativas.
- Privilégio mínimo para desenvolvedor e fornecedores.
- Acesso de suporte com prazo definido e remoção após o serviço.
- Dados reais proibidos em desenvolvimento e homologação.
- Dumps e planilhas não podem ser enviados por canais pessoais.
- Backup não deve ser usado para consulta diária.
- Revisão de acessos trimestral e na saída de qualquer responsável.
