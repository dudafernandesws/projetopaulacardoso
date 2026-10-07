# Plano de adequação para produção

## Objetivo

Transformar o protótipo em um MVP com site público, captação persistente e CRM protegido. WhatsApp, automações, múltiplos usuários e SaaS multicliente ficam fora deste ciclo.

## Fase 0 — preparar o repositório

### P0.1 Resolver a fonte de publicação

- Revisar as alterações existentes sem apagar trabalho do usuário.
- Definir `src/` como fonte e `dist/` como saída gerada.
- Remover a dependência de arquivos HTML monolíticos para produção.
- Confirmar que `entregas/`, `arquivo/` e imagens originais não são publicados.

**Aceite:** clone limpo, instalação e build produzem exatamente o artefato publicado.

### P0.2 Criar ferramentas de qualidade

- Adicionar `package.json`, Vite, ESLint, Prettier em modo de verificação e framework de testes.
- Adicionar `.env.example` e regras de exclusão de segredos.
- Criar CI para lint, teste, build e verificação de segredos.

**Aceite:** CI falha em erro sintático, teste quebrado, segredo detectado ou build inválido.

## Fase 1 — bloqueadores de produção

### P1.1 Criar Supabase e migrações

- Criar projeto em São Paulo.
- Implementar `leads` e `lead_events` por migração versionada.
- Criar enums, índices, triggers de data e retenção.
- Criar dados sintéticos apenas em `seed.sql` de desenvolvimento.

**Aceite:** banco vazio pode ser recriado somente pelas migrações.

### P1.2 Implementar RLS

- Bloquear acesso anônimo às tabelas.
- Exigir usuário autenticado com `aal2` para operações do CRM.
- Proibir alteração e exclusão direta de eventos.
- Testar explicitamente tentativas sem sessão, com `aal1` e com `aal2`.

**Aceite:** nenhum dado do CRM é retornado fora da política autorizada.

### P1.3 Implementar captação pública

- Criar `create-lead` como Edge Function.
- Validar origem, método, corpo, tipos, tamanhos e valores permitidos.
- Verificar Turnstile no servidor.
- Aplicar dez tentativas por dez minutos por hash temporário de origem.
- Inserir lead e evento inicial em transação.
- Retornar resposta genérica sem PII.

**Aceite:** lead válido aparece no CRM; payload inválido, bot ou excesso recebe erro adequado.

### P1.4 Substituir autenticação demonstrativa

- Remover `PAULA2026` e o script inline de acesso.
- Implementar login, TOTP obrigatório, recuperação, logout e expiração.
- Desativar cadastro público.
- Proteger navegação e carregamento dos dados.

**Aceite:** conhecer a URL do painel não permite acesso; senha sem TOTP não libera o CRM.

### P1.5 Integrar o CRM ao banco

- Carregar leads reais por consulta autenticada.
- Implementar criação, edição, etapa, follow-up, contato realizado e exclusão.
- Persistir histórico imutável.
- Tratar carregamento, vazio, falha, sessão expirada e concorrência simples.

**Aceite:** operações persistem após recarregar, sair e entrar em outro dispositivo.

## Fase 2 — segurança e privacidade

### P2.1 Remover superfícies demonstrativas

- Excluir editor e `saved-edits.js` do build de produção.
- Não publicar páginas editáveis ou apresentações.
- Remover dados fictícios do bundle de produção.

### P2.2 Aplicar segurança de navegador

- Criar `_headers` com CSP e demais cabeçalhos.
- Remover scripts inline.
- Evitar `innerHTML` com dados variáveis; usar DOM seguro ou sanitização revisada.
- Validar URLs e impedir protocolos inesperados.

### P2.3 Implementar LGPD

- Adicionar aviso de privacidade e mensagem curta no formulário.
- Implementar exclusão manual.
- Implementar expiração após 24 meses da última atividade.
- Documentar procedimento para titular e incidente.

### P2.4 Preparar imagens e SEO técnico

- Remover EXIF das cópias públicas.
- Excluir PNGs não usados do artefato.
- Adicionar `robots.txt`, `sitemap.xml`, canonical, Open Graph e 404.

**Aceite da fase:** auditoria não encontra senha local, PII em armazenamento do navegador, XSS executável ou rota de banco sem RLS.

## Fase 3 — confiabilidade e operação

### P3.1 Backups

- Confirmar backup diário e retenção de sete dias.
- Registrar procedimento de restauração.
- Executar restauração controlada antes do go-live.

### P3.2 Monitoramento

- Registrar erros do frontend e função sem PII.
- Criar alertas de falha do formulário e autenticação.
- Criar verificação simples de disponibilidade da página e da função.

### P3.3 Deploy

- Produção somente pela branch definida e CI aprovado.
- Preview sem dados reais.
- Rollback documentado para versão anterior do frontend.
- Migrações com backup e plano reversível quando alterarem dados existentes.

## Fase 4 — testes e aceite

- Executar testes unitários, integração, RLS e E2E.
- Verificar Chrome, Safari e Firefox atuais.
- Verificar celular de 360 px e desktop.
- Executar Lighthouse e teste de acessibilidade por teclado.
- Realizar revisão manual de segurança.
- Aprovar [05-CHECKLIST-GO-LIVE.md](./05-CHECKLIST-GO-LIVE.md).

## Priorização

| Prioridade | Itens | Publicação permitida? |
|---|---|---|
| Bloqueador | Fases 0 e 1 | Não antes da conclusão |
| Obrigatória | Fase 2 | Não antes da conclusão |
| Operacional | Fase 3 | Não antes da conclusão |
| Aceite | Fase 4 | Somente após aprovação |

## Fora do escopo

- WhatsApp, SMS ou mensagens automáticas;
- múltiplos administradores;
- isolamento multicliente no mesmo banco;
- pagamentos e contratos;
- upload de fotos pelo CRM;
- campanhas de marketing;
- dashboards avançados;
- aplicativo móvel;
- importação em massa;
- manutenção recorrente.
