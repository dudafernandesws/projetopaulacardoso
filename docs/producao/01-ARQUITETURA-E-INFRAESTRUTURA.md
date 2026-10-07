# Arquitetura e infraestrutura

## 1. Estado atual

O sistema atual é composto por HTML, CSS e JavaScript sem backend.

```text
Visitante
   |
   v
index.html + public.js
   |
   +-- formulário --> localStorage do próprio visitante

Administrador
   |
   v
admin.html -- senha no JavaScript --> app.js
                                   --> dados fictícios em memória
```

Consequências:

- o lead não chega ao administrador;
- os dados não sobrevivem de forma confiável;
- abrir o CRM em outro navegador não recupera informações;
- qualquer pessoa consegue ler a senha no arquivo HTML;
- `noindex` evita indexação, mas não protege a rota administrativa;
- não existe separação real entre identificação, autenticação e autorização.

## 2. Arquitetura alvo

```text
                         +----------------------+
Visitante -------------->| Cloudflare Pages     |
                         | site e CRM estáticos |
                         +----------+-----------+
                                    |
                         formulário | Turnstile
                                    v
                         +----------------------+
                         | Supabase Edge        |
                         | Function create-lead |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
Administrador -- Auth -->| Supabase             |
senha + TOTP             | Postgres + RLS       |
                         | Auth + logs + backup |
                         +----------+-----------+
                                    |
                                    +--> Resend SMTP
```

### Componentes

| Componente | Responsabilidade | Dados sensíveis |
|---|---|---|
| Cloudflare Pages | Servir HTML, CSS, JavaScript e imagens | Não deve armazenar leads ou segredos |
| Cloudflare Turnstile | Reduzir submissões automatizadas | Token temporário de verificação |
| Supabase Edge Function | Validar o formulário e criar o lead | Dados enviados no formulário |
| Supabase Postgres | Persistir leads e histórico | Nome, e-mail, notas e informações comerciais |
| Supabase Auth | Login, sessão, senha, recuperação e TOTP | Credenciais e fatores de autenticação |
| Resend | Entregar e-mails de autenticação | Endereço do administrador |
| Sentry, opcional | Registrar falhas do frontend e da função | Deve receber dados sanitizados |

## 3. Organização da aplicação

Usar Vite para criar um build reproduzível e arquivos com hash. Não publicar arquivos editáveis, fontes de demonstração ou imagens originais.

Estrutura alvo sugerida:

```text
src/
├── public/
│   ├── main.js
│   └── contact-form.js
├── admin/
│   ├── auth.js
│   ├── crm.js
│   └── lead-dialog.js
├── shared/
│   ├── supabase.js
│   ├── validation.js
│   └── formatters.js
└── styles/
supabase/
├── migrations/
├── functions/create-lead/
└── seed.sql
tests/
public/
├── assets/
├── _headers
├── robots.txt
└── sitemap.xml
```

O diretório `dist/` deve ser gerado pelo build e não editado manualmente. `entregas/`, `arquivo/`, `imagens/originais-hd/` e ferramentas locais não entram na publicação.

## 4. Configuração e segredos

Variáveis públicas, incluídas no bundle:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_TURNSTILE_SITE_KEY
```

A chave anônima do Supabase pode estar no navegador, desde que todas as tabelas tenham RLS correta.

Segredos exclusivos do ambiente servidor:

```text
SUPABASE_SERVICE_ROLE_KEY
TURNSTILE_SECRET_KEY
RESEND_API_KEY
SENTRY_AUTH_TOKEN
```

Regras:

- nunca prefixar segredo com `VITE_`;
- nunca salvar `.env`, tokens ou dumps do banco no Git;
- manter `.env.example` somente com nomes e exemplos não funcionais;
- rotacionar imediatamente qualquer segredo exposto;
- armazenar segredos no Supabase e no provedor de CI/CD.

## 5. Modelo de dados

### `leads`

| Campo | Tipo | Regra |
|---|---|---|
| `id` | UUID | Chave primária gerada no servidor |
| `name` | texto | Obrigatório, 1 a 80 caracteres |
| `email` | texto | Obrigatório, normalizado, até 254 caracteres |
| `service` | texto controlado | Um dos serviços configurados |
| `timing` | texto controlado | Uma das opções do formulário |
| `notes` | texto | Opcional, até 1.000 caracteres na captação |
| `stage` | enum | `entrada`, `follow_up`, `negociacao`, `fechamento`, `pos_venda`, `nutricao` |
| `estimated_value_cents` | inteiro | Valor em centavos, maior ou igual a zero |
| `next_action` | texto | Opcional, até 180 caracteres |
| `follow_up_at` | timestamptz | Opcional |
| `nurture_reason` | texto controlado | Obrigatório apenas em nutrição |
| `stage_entered_at` | timestamptz | Atualizado quando a etapa muda |
| `last_activity_at` | timestamptz | Atualizado em toda ação relevante |
| `retention_expires_at` | timestamptz | `last_activity_at + 24 meses` |
| `created_at` | timestamptz | Gerado pelo banco |
| `updated_at` | timestamptz | Gerado por trigger |

### `lead_events`

| Campo | Tipo | Regra |
|---|---|---|
| `id` | UUID | Chave primária |
| `lead_id` | UUID | FK com exclusão em cascata |
| `actor_id` | UUID | Usuário autenticado ou nulo para captação pública |
| `event_type` | enum | criação, edição, mudança de etapa ou contato realizado |
| `from_stage` | enum | Opcional |
| `to_stage` | enum | Opcional |
| `description` | texto | Mensagem técnica curta e sanitizada |
| `created_at` | timestamptz | Gerado pelo banco |

Não armazenar senha, token, conteúdo de sessão, IP completo ou dados desnecessários no histórico.

### `submission_rate_limits`

Tabela técnica para limitar abuso sem guardar o endereço IP original:

| Campo | Tipo | Regra |
|---|---|---|
| `source_hash` | texto | SHA-256 do endereço de origem com segredo rotativo do servidor |
| `window_started_at` | timestamptz | Início da janela |
| `attempt_count` | inteiro | Número de tentativas na janela |
| `expires_at` | timestamptz | Exclusão automática em até 24 horas |

O limite inicial será de dez tentativas por dez minutos por origem. O valor deve ser configurável no servidor. Não registrar o endereço IP original.

## 6. API pública do formulário

### Requisição

```http
POST /functions/v1/create-lead
Content-Type: application/json
```

```json
{
  "name": "Maria da Silva",
  "email": "maria@example.com",
  "service": "Retrato pessoal",
  "timing": "Nos próximos 30 dias",
  "notes": "Quero registrar uma nova fase.",
  "turnstileToken": "token-temporario"
}
```

### Respostas

| Código | Uso |
|---|---|
| `201` | Lead criado; retorna apenas `{ "success": true }` |
| `400` | Dados inválidos ou opção não permitida |
| `403` | Origem ou Turnstile inválido |
| `429` | Limite de requisições excedido |
| `500` | Falha interna com mensagem pública genérica |

A função deve:

1. aceitar somente `POST` e origem autorizada;
2. ser publicada como endpoint público sem validação de JWT, pois o visitante não possui conta;
3. limitar o corpo a 16 KB;
4. verificar Turnstile no servidor;
5. aplicar dez tentativas por dez minutos por origem, usando somente hash temporário;
6. normalizar e validar todos os campos;
7. recusar propriedades desconhecidas;
8. inserir por chave de serviço mantida apenas no servidor;
9. não registrar nome, e-mail ou notas nos logs;
10. devolver a mesma mensagem pública para falhas internas.

## 7. Autenticação e autorização

- Cadastro público desativado.
- Administrador criado por convite controlado.
- Senha forte e TOTP obrigatórios.
- Política do banco exige usuário autenticado com `aal2`.
- Sessão expira após período configurado e é invalidada no logout.
- Recuperação de senha usa domínio verificado no Resend.
- Conta Supabase, GitHub e Cloudflare também usam MFA.
- Deve existir um procedimento de recuperação fora do dispositivo principal.

Políticas RLS esperadas:

- `anon`: nenhuma leitura, alteração ou exclusão nas tabelas do CRM;
- `authenticated` com `aal1`: nenhuma operação no CRM;
- `authenticated` com `aal2`: CRUD em `leads` e leitura do histórico;
- inserção pública: somente pela Edge Function;
- `lead_events`: inserção por função ou trigger controlada; atualização e exclusão diretas proibidas.

## 8. Retenção e exclusão

- Atualizar `retention_expires_at` a cada atividade válida.
- Executar uma rotina diária ou semanal para apagar leads vencidos.
- Excluir eventos relacionados por cascata.
- Permitir exclusão imediata pelo administrador após confirmação.
- Guardar somente um registro técnico sem PII contendo identificador irreversível, data, ator e motivo da exclusão.
- Não usar backup como arquivo operacional. Backups antigos expiram conforme a janela contratada.

## 9. Ambientes e entrega

### Desenvolvimento

- Supabase local por CLI ou projeto separado sem dados reais.
- Chaves próprias de teste.
- Turnstile com chaves de teste.

### Homologação

- URL de preview protegida ou sem dados pessoais.
- Banco separado de produção.
- Dados sintéticos.

### Produção

- Domínio do cliente.
- Supabase Pro na região `sa-east-1` (São Paulo).
- Backups diários e logs ativos.
- Deploy somente após CI aprovado.

## 10. Operação mínima

- Monitorar erro do formulário, falha de autenticação e falha de banco.
- Revisar mensalmente consumo, usuários e alertas.
- Testar recuperação de senha e restauração de backup trimestralmente.
- Atualizar dependências mensalmente ou imediatamente em vulnerabilidade crítica.
- Manter contato técnico e responsável do cliente registrados fora do código.

### Objetivos operacionais

| Indicador | Meta inicial |
|---|---|
| RPO | Até 24 horas, conforme frequência do backup diário |
| RTO | Até um dia útil para restauração manual |
| Resposta a incidente crítico | Início da análise em até quatro horas úteis |
| Revisão de acessos | Trimestral |

Cloudflare Free e Supabase Pro não fornecem ao MVP um SLA contratual completo de aplicação. Essas metas são objetivos operacionais, não garantia financeira de disponibilidade.

### DNS e e-mail

- Delegar DNS ao Cloudflare ou configurar os registros exigidos pelo Pages.
- Configurar SPF e DKIM fornecidos pelo Resend.
- Publicar DMARC inicialmente em modo de monitoramento e endurecer após validar a entrega.
- Desativar rastreamento de links nos e-mails de autenticação para não alterar URLs de recuperação.
