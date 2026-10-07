const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const asset = name => window.__embeddedAssets?.[name] || `assets/${name}`;

const picture = ({ base, small, large, width, height, alt, caption, category, className = '' }) => `
  <figure class="portfolio-card ${className}">
    <div class="image-frame"><img
        src="${asset(base + '-' + small + '.jpg')}"
        srcset="${asset(base + '-' + small + '.jpg')} ${small}w, ${asset(base + '-' + large + '.jpg')} ${large}w"
        sizes="(max-width: 560px) 88vw, (max-width: 900px) 44vw, 36vw"
        width="${width}"
        height="${height}"
        alt="${alt}"
        loading="lazy"
        decoding="async"></div>
    <figcaption><span>${caption}</span><small>${category}</small></figcaption>
  </figure>`;

const portfolio = [
  {
    base: 'portfolio-estrategista', small: 720, large: 1200, width: 1200, height: 1800,
    alt: 'Foto profissional de uma mulher de preto segurando um tablet e uma caneta',
    caption: 'Intenção', category: 'IMAGEM PROFISSIONAL', className: 'portrait'
  },
  {
    base: 'portfolio-celebracao', small: 720, large: 1200, width: 1200, height: 1800,
    alt: 'Mulher sorrindo e segurando uma vela em formato de ponto de interrogação',
    caption: 'Novos capítulos', category: 'FOTO PESSOAL', className: 'portrait lifted'
  },
  {
    base: 'portfolio-consultora-celular', small: 720, large: 1200, width: 1200, height: 1800,
    alt: 'Mulher sorrindo enquanto usa o celular sentada em um sofá claro',
    caption: 'Naturalidade', category: 'MARCA PESSOAL', className: 'portrait'
  },
  {
    base: 'portfolio-profissional-sorriso', small: 960, large: 1800, width: 1800, height: 1200,
    alt: 'Profissional de óculos sorrindo, sentada em uma cadeira em ambiente claro',
    caption: 'Confiança que aproxima', category: 'FOTO PROFISSIONAL', className: 'landscape feature'
  },
  {
    base: 'portfolio-clareza', small: 960, large: 1800, width: 1800, height: 1200,
    alt: 'Mulher com camisa branca e tablet sentada em uma poltrona',
    caption: 'Clareza', category: 'POSICIONAMENTO', className: 'landscape clarity'
  },
  {
    base: 'portfolio-perspectiva', small: 960, large: 1800, width: 1800, height: 1200,
    alt: 'Foto criativa de uma mulher em um ensaio autoral',
    caption: 'Perspectiva', category: 'ENSAIO AUTORAL', className: 'portrait-crop crop-center'
  },
  {
    base: 'portfolio-farmaceutica', small: 960, large: 1800, width: 1800, height: 1200,
    alt: 'Foto profissional de uma farmacêutica de jaleco branco e óculos',
    caption: 'Autoridade com presença', category: 'FOTO CORPORATIVA', className: 'landscape feature'
  },
  {
    base: 'portfolio-movimento', small: 960, large: 1600, width: 1600, height: 1066,
    alt: 'Mulher de óculos sorrindo com os cabelos em movimento sobre fundo escuro',
    caption: 'Leveza em movimento', category: 'PERSONALIDADE', className: 'landscape'
  },
  {
    base: 'portfolio-por-tras-do-olhar', small: 960, large: 1800, width: 1800, height: 1200,
    alt: 'A fotógrafa Paula sorrindo e segurando sua câmera',
    caption: 'Por trás do olhar', category: 'PAULA CARDOSO', className: 'portrait-crop crop-left photographer'
  }
];

const rest = $('#rest');
if (rest) rest.innerHTML = `
  <section class="gallery portfolio-grid" aria-label="Portfólio de trabalhos reais">
    ${portfolio.map(picture).join('')}
  </section>
  <section class="experience" id="experiencia">
    <div><span class="eyebrow">O ENSAIO COMEÇA NA CONVERSA</span><h2>Você não precisa<br>saber posar.<br><em>Só precisa chegar.</em></h2><p>Eu cuido da luz, dos detalhes e da direção.<br>Juntas, criamos espaço para a sua versão mais verdadeira aparecer.</p></div>
    <div class="steps"><article><span>01</span><div><h3>Primeiro, eu escuto</h3><p>Conversamos sobre seu momento, suas referências e o que você quer comunicar.</p></div></article><article><span>02</span><div><h3>Um ensaio no seu ritmo</h3><p>Orientação de looks e direção leve, sem pressa e sem poses que não combinam com você.</p></div></article><article><span>03</span><div><h3>Imagens para levar com você</h3><p>Escolha das fotos e entrega em galeria digital, com cuidado em cada detalhe.</p></div></article></div>
  </section>
  <section class="offer"><span class="eyebrow">ESCOLHA O SEU MOMENTO</span><h2>Qual história vamos contar?</h2><div class="packages"><article><span>PARA SE REDESCOBRIR</span><h3>Foto pessoal</h3><p>Uma pausa para celebrar você, uma conquista ou um novo começo.</p><ul><li>Conversa de preparação</li><li>Direção durante todo o ensaio</li><li>Seleção de fotos em galeria digital</li></ul><a href="#contato" data-service="Foto pessoal">Quero minha foto</a></article><article><span>PARA OCUPAR SEU ESPAÇO</span><h3>Imagem profissional</h3><p>Sua personalidade e seu trabalho, traduzidos em imagens com intenção.</p><ul><li>Alinhamento com sua marca pessoal</li><li>Orientação de looks e cenário</li><li>Fotos para seus canais profissionais</li></ul><a href="#contato" data-service="Imagem profissional">Quero renovar minha imagem</a></article></div></section>
  <section class="contact" id="contato"><div><span class="eyebrow">VAMOS CRIAR ALGO SEU?</span><h2>Sua próxima fase<br>merece um<br><em>novo olhar.</em></h2><p>Conte um pouco sobre o que você imagina.<br>O primeiro passo é uma boa conversa.</p><p class="demo-note">Preencha seus dados para solicitar informações sobre o ensaio.</p></div><form id="contactForm"><label>Como você se chama?<input name="name" autocomplete="name" required maxlength="80" placeholder="Seu nome"></label><label>E-mail para contato<input name="email" type="email" autocomplete="email" inputmode="email" required maxlength="120" placeholder="voce@exemplo.com"></label><label>Qual experiência você procura?<select name="service"><option>Foto pessoal</option><option>Imagem profissional</option><option>Ainda quero descobrir</option></select></label><label>Quando você imagina fazer o ensaio?<select name="timing"><option>Nos próximos 30 dias</option><option>Nos próximos 3 meses</option><option>Estou pesquisando para o futuro</option></select></label><label>O que você gostaria de registrar?<textarea name="notes" rows="3" maxlength="1000" placeholder="Me conte sobre seu momento..."></textarea></label><button class="button">Solicitar orçamento</button><p id="formFeedback" role="status"></p></form></section>
  <section class="faq"><h2>Antes do primeiro clique</h2><details><summary>Nunca fiz um ensaio. Isso é um problema?</summary><p>De jeito nenhum. A direção faz parte da experiência: você recebe orientações e tem tempo para se sentir à vontade.</p></details><details><summary>Como escolhemos o local e os looks?</summary><p>A proposta é pensada a partir da sua intenção. Na conversa de preparação, alinhamos referências, roupas e o ambiente do ensaio.</p></details><details><summary>Como funciona o orçamento?</summary><p>A proposta considera a experiência, o local e a quantidade de imagens. Depois do seu contato, conversamos para preparar um orçamento personalizado.</p></details></section>
  <p class="credits">Portfólio formado por trabalhos reais fotografados por Paula Cardoso.</p>`;

$$('[data-service]').forEach(link => {
  link.onclick = () => $('#contactForm').service.value = link.dataset.service;
});

const contactForm = $('#contactForm');
contactForm.onsubmit = event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  if (!data.name.trim()) return;
  const inbox = JSON.parse(localStorage.getItem('paulaLeadInbox') || '[]');
  inbox.unshift({ id: crypto.randomUUID(), name: data.name.trim(), email: data.email, service: data.service, timing: data.timing, notes: data.notes, created: new Date().toISOString() });
  localStorage.setItem('paulaLeadInbox', JSON.stringify(inbox.slice(0, 100)));
  $('#formFeedback').textContent = 'Recebemos seu pedido. Paula entrará em contato para conversar sobre o ensaio.';
  contactForm.reset();
};
