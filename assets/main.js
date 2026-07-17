/* ============================================================
   VELADA — interactions
   Age gate · nav scroll · product grid · detail modal · cart
   ============================================================ */
(() => {
  'use strict';

  const UTM = '?utm_source=claude_design&utm_medium=referral';
  const UNSPLASH_HOME = 'https://unsplash.com/' + UTM;

  /* ── Product data (mirrors the prototype's `data` array) ── */
  const PRODUCTS = [
    {
      slot: 'reposado', name: 'REPOSADO', en: 'REPOSADO', jp: 'レポサド',
      age: '10ヶ月', price: '¥18,700', badge: '',
      img: 'https://images.unsplash.com/photo-1698288547419-407ca6bafe2a?q=80&w=1000&auto=format&fit=crop',
      creditName: 'Jon Lanzieri', creditHref: 'https://unsplash.com/@jonlanzieri',
      ph: 'REPOSADO ボトル写真',
      notesLine: '蜂蜜 ／ バニラ ／ 焼いた青アガベ',
      aroma: '蜂蜜、バニラ、かすかな柑橘の花',
      palate: '焼いた青アガベの甘み、軽いオークのスパイス',
      finish: '穏やかで澄んだ、ミネラルを感じる余韻',
      desc: 'アメリカンオークの旧バーボン樽で10ヶ月。アガベ本来の輝きに、樽由来のやわらかな甘みがひと筆加わった、蒸留所の原点となる一本です。'
    },
    {
      slot: 'anejo', name: 'AÑEJO', en: 'AÑEJO', jp: 'アネホ',
      age: '26ヶ月', price: '¥36,300', badge: '',
      img: 'https://images.unsplash.com/photo-1718881949298-b658a109bf0b?q=80&w=1000&auto=format&fit=crop',
      creditName: 'SJ 📸', creditHref: 'https://unsplash.com/@uxsj_ph',
      ph: 'AÑEJO ボトル写真',
      notesLine: 'キャラメル ／ オーク ／ ドライフルーツ',
      aroma: 'キャラメル、トーストしたオーク、オレンジピール',
      palate: 'ドライフルーツの凝縮感と、しなやかなタンニン',
      finish: '長く温かい、シガーを思わせる余韻',
      desc: 'フレンチオークとアメリカンオークを使い分け、26ヶ月の熟成を経て瓶詰め。ウイスキー愛好家にこそ味わっていただきたい、深みのあるアネホです。'
    },
    {
      slot: 'extra-anejo', name: 'EXTRA AÑEJO', en: 'EXTRA AÑEJO', jp: 'エクストラアネホ',
      age: '5年', price: '¥79,200', badge: '小ロット',
      img: 'https://images.unsplash.com/photo-1670098499730-4e22ec6d69df?q=80&w=1000&auto=format&fit=crop',
      creditName: 'Andy bardon', creditHref: 'https://unsplash.com/@wc_unsplash',
      ph: 'EXTRA AÑEJO ボトル写真',
      notesLine: 'カカオ ／ タバコリーフ ／ ベーキングスパイス',
      aroma: 'ダークカカオ、タバコリーフ、乾いた革',
      palate: 'ビターチョコレートとベーキングスパイスの重層',
      finish: '静かに続く、ビロードのような長い余韻',
      desc: '五年の歳月を樽の中で過ごした、当蒸留所の粋。一樽ごとに瓶詰めされ、ラベルには樽番号が手書きで記されます。特別な夜のための一本に。'
    },
    {
      slot: 'gran-reserva', name: 'GRAN RESERVA', en: 'EXTRA AÑEJO — GRAN RESERVA', jp: 'グラン・レセルバ ／ 8年熟成',
      age: '8年', price: '¥165,000', badge: '会員限定 300本',
      img: 'https://images.unsplash.com/photo-1696182736807-5d21e38056ec?q=80&w=1000&auto=format&fit=crop',
      creditName: 'Nurlan Isazade', creditHref: 'https://unsplash.com/@nurlanisazade',
      ph: 'GRAN RESERVA ボトル写真',
      notesLine: '黒糖 ／ 熟した無花果 ／ 古樽の香気',
      aroma: '黒糖、熟した無花果、白檀',
      palate: '蜜のような粘性と、幾重にも折り重なる樽香',
      finish: 'いつまでも消えない、瞑想的な余韻',
      desc: '八年熟成、年間三百本のみ。職人が一本ずつ吹いたクリスタルボトルを桐箱に納めてお届けします。贈答に、そして人生の節目に。'
    }
  ];

  /* ── Small DOM helpers ───────────────────────────────────── */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // Text nodes are set via textContent, so page copy is inert. Attribute
  // values here come only from the trusted PRODUCTS table above.
  const el = (tag, props = {}, ...kids) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k in node) node[k] = v;
      else node.setAttribute(k, v);
    }
    for (const kid of kids) if (kid != null) node.append(kid);
    return node;
  };

  // Unsplash credit chip: "Photo by {name} on Unsplash", each part linked
  // with the required utm referral params (mirrors image-slot.js).
  const creditChip = (name, href) => {
    const span = el('span', { class: 'credit' });
    span.append('Photo by ');
    span.append(el('a', { href: href + UTM, target: '_blank', rel: 'noopener noreferrer', text: name }));
    span.append(' on ');
    span.append(el('a', { href: UNSPLASH_HOME, target: '_blank', rel: 'noopener noreferrer', text: 'Unsplash' }));
    return span;
  };

  const photo = (src, alt, name, href) =>
    el('figure', { class: 'photo photo--fill' },
      el('img', { src, alt, loading: 'lazy' }),
      creditChip(name, href)
    );

  /* ── Age-verification gate ───────────────────────────────── */
  const gate = $('#gate');
  $('#gateYes').addEventListener('click', () => { gate.hidden = true; });
  $('#gateNo').addEventListener('click', () => { $('#gateUnderage').hidden = false; });

  /* ── Header / nav smooth scroll ──────────────────────────── */
  const navTo = (target) => {
    if (target === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const node = document.getElementById(target);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  $$('[data-nav]').forEach((node) => {
    node.addEventListener('click', (e) => {
      if (node.tagName === 'A') e.preventDefault();
      navTo(node.dataset.nav);
    });
  });

  /* ── Cart ────────────────────────────────────────────────── */
  const cartBadge = $('#cartBadge');
  let cart = 0;
  const addToCart = () => {
    cart += 1;
    cartBadge.textContent = String(cart);
    cartBadge.hidden = false;
  };

  /* ── Product grid ────────────────────────────────────────── */
  const grid = $('#productGrid');
  PRODUCTS.forEach((p, i) => {
    const overlay = el('div', { class: 'card__overlay' },
      el('div', { class: 'card__age',   text: '熟成 ' + p.age }),
      el('div', { class: 'card__notes', text: p.notesLine }),
      el('div', { class: 'card__more',  text: '詳細を見る →' })
    );

    const media = el('div', { class: 'card__media' },
      photo(p.img, p.ph, p.creditName, p.creditHref),
      overlay
    );
    if (p.badge) media.append(el('div', { class: 'card__badge', text: p.badge }));

    const card = el('div', { class: 'card', tabindex: '0', role: 'button', 'aria-label': p.name + '（' + p.jp + '）' },
      media,
      el('div', { class: 'card__info' },
        el('div', { class: 'card__name',  text: p.name }),
        el('div', { class: 'card__jp',    text: p.jp }),
        el('div', { class: 'card__price', text: p.price })
      )
    );
    card.addEventListener('click', () => openDetail(i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(i); }
    });
    grid.append(card);
  });

  /* ── Product-detail modal ────────────────────────────────── */
  const detail = $('#detail');
  let addedTimer = null;
  let lastFocused = null;

  const noteRow = (label, value) =>
    el('div', { class: 'detail__note-row' },
      el('span', { class: 'detail__note-label', text: label }),
      el('span', { class: 'detail__note-val',   text: value })
    );

  function openDetail(index) {
    const p = PRODUCTS[index];
    lastFocused = document.activeElement;
    clearTimeout(addedTimer);

    const added = el('p', { class: 'detail__added', text: 'カートに追加しました。', hidden: true });

    const buyBtn = el('button', { class: 'btn btn--solid btn--sm', text: 'カートに入れる' });
    buyBtn.addEventListener('click', () => {
      addToCart();
      added.hidden = false;
      clearTimeout(addedTimer);
      addedTimer = setTimeout(() => { added.hidden = true; }, 2200);
    });

    const price = el('div', { class: 'detail__price' });
    price.append(p.price + ' ');
    price.append(el('small', { text: '（税込）' }));

    const card = el('div', { class: 'detail__card' },
      el('button', { class: 'detail__close', 'aria-label': '閉じる', text: '×', onclick: closeDetail }),
      el('div', { class: 'detail__media' }, photo(p.img, 'ボトル写真（' + p.name + '）', p.creditName, p.creditHref)),
      el('div', { class: 'detail__body' },
        el('div', { class: 'detail__en',   text: 'VELADA — ' + p.en }),
        el('h3',  { class: 'detail__name', text: p.name }),
        el('div', { class: 'detail__meta', text: p.jp + ' ／ 熟成 ' + p.age + ' ／ 750ml ・ 40%' }),
        el('p',   { class: 'detail__desc', text: p.desc }),
        el('div', { class: 'detail__notes' },
          noteRow('香り', p.aroma),
          noteRow('味わい', p.palate),
          noteRow('余韻', p.finish)
        ),
        el('div', { class: 'detail__buyrow' }, price, buyBtn),
        added,
        el('p', { class: 'detail__fine' },
          '※ 桐箱入り・ギフトラッピング対応。国内送料無料。',
          el('br'),
          '※ 数量限定のため、お一人様3本までとさせていただきます。'
        )
      )
    );

    // Backdrop click closes; clicks inside the card do not.
    card.addEventListener('click', (e) => e.stopPropagation());

    detail.replaceChildren(card);
    detail.hidden = false;
    buyBtn.focus();
  }

  function closeDetail() {
    detail.hidden = true;
    detail.replaceChildren();
    clearTimeout(addedTimer);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  detail.addEventListener('click', closeDetail); // backdrop
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detail.hidden) closeDetail();
  });

  /* ── Members form (UI only) ──────────────────────────────── */
  $('#membersForm').addEventListener('submit', (e) => e.preventDefault());
})();
