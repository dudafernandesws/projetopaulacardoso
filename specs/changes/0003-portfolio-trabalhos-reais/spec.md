---
id: "0003-portfolio-trabalhos-reais"
title: "Portfólio com trabalhos reais"
status: verified
version_target: "v0.2.0"
created_at: "2026-10-03"
updated_at: "2026-10-03"
owner: "Projeto PaulaFoto"
---

# Portfólio com trabalhos reais

## Contexto

O site usa uma seleção provisória de quatro imagens. O diretório `imagens/originais-hd` contém fotografias de trabalhos reais da Paula, em formatos vertical e horizontal, adequadas para demonstrar retratos pessoais e profissionais.

## Objetivo

Substituir a seleção provisória por uma curadoria responsiva de trabalhos reais, preservando o enquadramento das fotografias e o desempenho do site.

## Fora do escopo

- Publicar o site em produção.
- Alterar os serviços, preços, formulário ou CRM.
- Editar o conteúdo visual das fotografias.
- Exibir nomes ou dados das pessoas fotografadas.

## Usuários e cenário principal

- Usuário: potencial cliente da fotógrafa.
- Situação: conhecer o estilo e a variedade do trabalho antes de solicitar orçamento.
- Resultado esperado: visualizar uma seleção autêntica, nítida e bem enquadrada em celular e desktop.

## Requisitos

### Funcionais

- **RF-01:** O destaque inicial deve usar uma fotografia real fornecida no diretório de originais.
- **RF-02:** O portfólio deve mostrar trabalhos reais com diversidade de retratos pessoais e profissionais.
- **RF-03:** Fotografias verticais e horizontais devem receber composições adequadas à sua orientação.
- **RF-04:** Cada fotografia deve possuir texto alternativo descritivo, sem identificação pessoal.

### Não funcionais

- **RNF-01:** O navegador deve receber variantes dimensionadas para telas menores e maiores.
- **RNF-02:** Fotografias fora do destaque inicial devem usar carregamento tardio.
- **RNF-03:** O layout não deve depender de JavaScript para definir dimensões ou recortes.

## Critérios de aceite

- **CA-01 / RF-01:** Ao abrir a página, o destaque mostra uma fotografia derivada de `imagens/originais-hd`.
- **CA-02 / RF-02:** A seção de portfólio mostra pelo menos oito fotografias reais em mais de uma ambientação.
- **CA-03 / RF-03:** Em larguras de 375 px, 768 px e 1440 px, rostos e elementos principais permanecem visíveis e sem deformação.
- **CA-04 / RF-04:** Todas as imagens de conteúdo possuem `alt` específico e sem nomes pessoais.
- **CA-05 / RNF-01:** Cada imagem possui ao menos duas variantes no `srcset` ou em media queries.
- **CA-06 / RNF-02:** Todas as imagens abaixo do destaque possuem `loading="lazy"`.
- **CA-07 / RNF-03:** O conteúdo reserva espaço por `width`, `height` ou `aspect-ratio` antes do carregamento.

## Experiência e conteúdo

A composição segue ritmo editorial: retratos verticais em pares, imagens horizontais em largura ampliada e uma seção final sobre o olhar da fotógrafa. Os textos destacam presença, profissão, celebração e movimento sem atribuir identidades.

## Dados e interfaces

Os arquivos em `imagens/originais-hd` permanecem como fontes. Variantes JPEG otimizadas e com nomes neutros são publicadas em `site/web/assets`.

## Segurança e privacidade

As imagens foram fornecidas para compor o portfólio. O site não acrescenta nomes, contatos, metadados pessoais ou informações de clientes.

## Dependências e restrições

- Dependências: `sips` para dimensionar e `jpegtran` para remover metadados das variantes locais.
- Restrições: manter os originais intactos; não aplicar filtros, retoques ou recortes destrutivos.

## Questões abertas

- Nenhuma.

## Histórico

| Data | Alteração | Autor |
|---|---|---|
| 2026-10-03 | Spec criada e aprovada pela autonomia concedida na solicitação | Projeto PaulaFoto |
| 2026-10-03 | Implementação verificada em desktop e celular | Projeto PaulaFoto |
