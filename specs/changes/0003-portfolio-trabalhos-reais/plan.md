---
spec: "0003-portfolio-trabalhos-reais"
status: verified
updated_at: "2026-10-03"
---

# Plano técnico — Portfólio com trabalhos reais

## Resumo da abordagem

Curar dez composições representativas, gerar duas larguras por fotografia e substituir a galeria rígida por um grid editorial. Manter HTML semântico, carregamento tardio e dimensões explícitas.

## Componentes afetados

| Componente | Mudança | Responsabilidade preservada |
|---|---|---|
| `site/web/assets` | Variantes JPEG das fotos reais | Entregar mídia pública otimizada |
| `site/web/index.html` | Destaque e descrição atualizados | Estrutura inicial da página |
| `site/web/public.js` | Nova curadoria e marcação da galeria | Conteúdo dinâmico do site público |
| `site/web/style.css` | Grid editorial responsivo | Apresentação e enquadramento |
| `ferramentas/create_public_assets.py` | Empacotamento do site público atual | Gerar entrega autônoma sem alterar a fonte |
| `entregas/paula-cardoso-publica.html` | Versão compartilhável sincronizada | Abrir o site completo sem servidor local |
| `specs` | Mudança e versão documentadas | Rastreabilidade SDD |

## Fluxo de dados e interfaces

Os originais entram somente no processo local de redução. O site referencia variantes de 720/1200 px para retratos e 960/1600 ou 960/1800 px para paisagens por `srcset`. `jpegtran -copy none` remove os metadados das cópias públicas.

## Implementação

1. Selecionar fotografias sem repetição de enquadramento.
2. Gerar variantes públicas sem alterar originais.
3. Atualizar destaque, galeria, textos alternativos e legendas.
4. Criar composição responsiva sem recorte destrutivo.
5. Gerar o HTML compartilhável com os assets incorporados.
6. Validar sintaxe, specs, arquivos e preview local.

## Segurança e privacidade

- Validação: apenas arquivos locais conhecidos entram na curadoria.
- Autorização: não se aplica.
- Dados pessoais: não publicar nomes nem metadados adicionais.
- Segredos: não se aplica.

## Testes e evidências

| Critério | Tipo de teste | Comando ou evidência |
|---|---|---|
| CA-01, CA-02 | Estrutural | referências de assets e contagem de figuras |
| CA-03 | Visual | capturas locais em desktop e celular |
| CA-04 a CA-07 | Estrutural | inspeção da marcação e dos arquivos gerados |
| Todos | Verificação | `npm run check` |

## Publicação e rollback

- Publicação: incluir assets, código público e manifesto `v0.2.0`.
- Monitoramento: revisar peso transferido e enquadramento no preview.
- Rollback: restaurar referências anteriores; os originais permanecem intactos.

## Verificação local

```bash
npm run check
npm run dev
```
