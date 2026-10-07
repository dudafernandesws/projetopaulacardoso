# Checklist de go-live

Preencher responsável, data e evidência para cada item. Qualquer item marcado como bloqueador impede a publicação.

## 1. Contas e propriedade

- [ ] **Bloqueador:** domínio registrado no CPF ou CNPJ do cliente.
- [ ] **Bloqueador:** cliente é proprietário das contas Cloudflare, Supabase e Resend.
- [ ] MFA ativado nas contas Cloudflare, Supabase, GitHub e Resend.
- [ ] Existe método seguro de recuperação de conta.
- [ ] Acessos temporários e permissões do desenvolvedor foram registrados.
- [ ] Dados de cobrança pertencem ao cliente.

## 2. Repositório e build

- [ ] **Bloqueador:** todos os arquivos de produção estão versionados.
- [ ] **Bloqueador:** build parte de um clone limpo e termina sem erro.
- [ ] `dist/` é gerado e não editado manualmente.
- [ ] Nenhum `.env`, segredo, dump ou chave privada está no Git.
- [ ] Editor, apresentações, arquivos legados e fotos originais não entram no build.
- [ ] CI executa lint, testes, build e verificação de segredos.
- [ ] Versão publicada corresponde ao commit aprovado.

## 3. Banco e migrações

- [ ] **Bloqueador:** migrações recriam o banco do zero.
- [ ] **Bloqueador:** RLS está ativa em todas as tabelas expostas.
- [ ] Usuário anônimo não lê, altera ou exclui leads.
- [ ] Sessão `aal1` não acessa o CRM.
- [ ] Sessão `aal2` executa somente operações previstas.
- [ ] Eventos não podem ser alterados diretamente.
- [ ] Índices cobrem etapa, follow-up, e-mail e expiração.
- [ ] Região do projeto confirmada como São Paulo.

## 4. Formulário público

- [ ] **Bloqueador:** submissão válida cria lead persistente.
- [ ] **Bloqueador:** falha do backend não mostra confirmação falsa.
- [ ] Turnstile é verificado no servidor.
- [ ] Rate limit de dez tentativas por dez minutos foi testado.
- [ ] Hashes usados no rate limit expiram em até 24 horas.
- [ ] Origem, método e tamanho do corpo são validados.
- [ ] Campos desconhecidos e valores fora da lista são recusados.
- [ ] Nome, e-mail e notas não aparecem nos logs.
- [ ] Formulário impede submissão duplicada durante carregamento.
- [ ] Mensagens de erro são claras e não expõem detalhes internos.

## 5. Autenticação

- [ ] **Bloqueador:** `PAULA2026` e qualquer senha local foram removidas.
- [ ] **Bloqueador:** cadastro público está desativado.
- [ ] **Bloqueador:** TOTP é obrigatório para o administrador.
- [ ] Login rejeita senha inválida sem revelar se o usuário existe.
- [ ] Recuperação de senha usa domínio verificado.
- [ ] Logout invalida a sessão esperada.
- [ ] Sessão expirada retorna ao login e não deixa dados na tela.
- [ ] URLs de redirecionamento estão restritas aos domínios autorizados.

## 6. CRM

- [ ] Lista, busca e filtros usam dados do banco.
- [ ] Criação e edição persistem após recarregar.
- [ ] Mudança de etapa atualiza `stage_entered_at`.
- [ ] Ações atualizam `last_activity_at` e retenção.
- [ ] Histórico registra criação, edição, etapa e contato.
- [ ] Follow-ups atrasados e futuros aparecem corretamente no fuso de São Paulo.
- [ ] Exclusão exige confirmação e remove os dados relacionados.
- [ ] Estados de carregamento, vazio, erro e sessão expirada foram testados.

## 7. Segurança do navegador

- [ ] **Bloqueador:** payloads XSS não executam no site ou CRM.
- [ ] **Bloqueador:** CSP está ativa sem dependência desnecessária de `unsafe-inline`.
- [ ] HSTS, `nosniff`, `Referrer-Policy` e `Permissions-Policy` estão presentes.
- [ ] `frame-ancestors 'none'` impede clickjacking.
- [ ] Nenhum dado pessoal fica no `localStorage` ou `sessionStorage`.
- [ ] Chave `service_role` não está no bundle ou tráfego do navegador.
- [ ] Dependências não possuem vulnerabilidade crítica conhecida.

## 8. LGPD e conteúdo

- [ ] **Bloqueador:** aviso de privacidade está publicado e revisado pelo controlador.
- [ ] Formulário informa finalidade e canal de atendimento ao titular.
- [ ] Campo de observação orienta a não enviar dados sensíveis.
- [ ] Somente dados necessários são coletados.
- [ ] Exclusão automática após 24 meses está ativa e testada.
- [ ] Procedimento de acesso, correção e exclusão foi entregue ao cliente.
- [ ] Procedimento de incidente foi entregue ao cliente.
- [ ] Contratos definem controlador, operadores e responsabilidades.

## 9. Backup e recuperação

- [ ] **Bloqueador:** plano Supabase Pro está ativo.
- [ ] Backup diário aparece como disponível.
- [ ] Restauração foi testada em ambiente controlado.
- [ ] Responsável e passos da restauração estão documentados.
- [ ] Janela de retenção de sete dias foi comunicada ao cliente.

## 10. Qualidade

- [ ] Testes unitários passam.
- [ ] Testes de integração e RLS passam.
- [ ] Fluxos E2E de formulário, login, TOTP, CRM e logout passam.
- [ ] Site foi testado em Chrome, Safari e Firefox atuais.
- [ ] Layout funciona em 360 px e desktop.
- [ ] Navegação por teclado funciona.
- [ ] Campos possuem rótulos e mensagens acessíveis.
- [ ] Imagens possuem texto alternativo adequado.
- [ ] Lighthouse não apresenta falha crítica em desempenho, acessibilidade, SEO ou boas práticas.

## 11. SEO e publicação

- [ ] `robots.txt`, `sitemap.xml` e `404.html` estão publicados.
- [ ] Title, description, canonical e Open Graph estão corretos.
- [ ] Imagens públicas não contêm EXIF desnecessário.
- [ ] PNGs e arquivos não usados não foram publicados.
- [ ] HTTPS e redirecionamento do domínio estão corretos.
- [ ] Página administrativa usa `noindex` além da autenticação real.

## 12. Monitoramento e suporte

- [ ] Erros do frontend e da função geram alerta.
- [ ] Monitoramento não captura PII, token ou conteúdo de formulário.
- [ ] Teste de disponibilidade está ativo.
- [ ] Limites de custo e consumo estão configurados.
- [ ] Processo de rollback do frontend foi testado.
- [ ] Prazo de garantia e canal de suporte foram comunicados.

## Aprovação

```text
Versão/commit:
Domínio:
Data:
Responsável técnico:
Responsável do cliente:
Bloqueadores pendentes: 0
Decisão: APROVADO / REPROVADO
Observações:
```
