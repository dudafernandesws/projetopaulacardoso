---
id: "0004-ajustes-orientacao-e-textos"
title: "Ajustes de orientação e textos do portfólio"
status: in_progress
version_target: "v0.2.1"
created_at: "2026-10-03"
updated_at: "2026-10-03"
owner: "Projeto PaulaFoto"
---

# Ajustes de orientação e textos do portfólio

## Contexto

Três fotografias horizontais da mudança `0003` precisam aparecer em enquadramento vertical. O destaque contém uma legenda sobreposta indesejada e a palavra plural “Retratos” deve ser substituída por “Fotos” no conteúdo público.

## Objetivo

Corrigir a composição das três fotografias, remover a legenda do destaque e atualizar o vocabulário público sem alterar serviços ou comportamento do site.

## Fora do escopo

- Trocar as fotografias selecionadas.
- Alterar o conteúdo visual dos arquivos originais.
- Mudar serviços, formulário ou CRM.
- Substituir o singular “Retrato” usado como nome de serviço ou descrição.

## Usuários e cenário principal

- Usuário: visitante do portfólio.
- Situação: navegar pelo destaque e pelos trabalhos reais.
- Resultado esperado: ver as três fotos indicadas em composição vertical, sem legenda sobre a foto inicial e sem o plural “Retratos” no site público.

## Requisitos

### Funcionais

- **RF-01:** As fotos da consultora com tablet, do reflexo no espelho e da fotógrafa com câmera devem usar composição vertical.
- **RF-02:** A foto inicial não deve exibir “01 / PRESENÇA PROFISSIONAL”.
- **RF-03:** O conteúdo público não deve exibir a palavra plural “Retratos”, respeitando capitalização e concordância.

### Não funcionais

- **RNF-01:** O enquadramento vertical deve preservar rostos e elementos principais.
- **RNF-02:** A correção deve manter responsividade, carregamento tardio e textos alternativos existentes.

## Critérios de aceite

- **CA-01 / RF-01:** As três figuras indicadas apresentam proporção visual 2:3 em desktop e celular.
- **CA-02 / RNF-01:** Rostos, tablet, espelho e câmera permanecem visíveis no enquadramento.
- **CA-03 / RF-02:** O destaque não contém elemento `.photo-caption` nem o texto removido.
- **CA-04 / RF-03:** Uma busca sem distinção de maiúsculas por “retratos” não retorna ocorrências em `index.html` e `public.js`.
- **CA-05 / RNF-02:** `npm run check` passa e o preview não apresenta erros no console.

## Experiência e conteúdo

As imagens permanecem sem rotação física. O layout usa moldura vertical e `object-fit: cover` com posição específica para cada composição. “Retrato” no singular permanece nos nomes dos serviços.

## Dados e interfaces

Não se aplica. Os mesmos assets e textos alternativos continuam em uso.

## Segurança e privacidade

Não há novos dados pessoais, arquivos ou interfaces.

## Dependências e restrições

- Dependência: mudança `0003-portfolio-trabalhos-reais`.
- Restrição: não modificar os arquivos em `imagens/originais-hd`.

## Questões abertas

- Nenhuma.

## Histórico

| Data | Alteração | Autor |
|---|---|---|
| 2026-10-03 | Spec criada a partir da revisão visual da usuária | Projeto PaulaFoto |
