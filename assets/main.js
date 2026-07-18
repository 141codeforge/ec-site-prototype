/* ============================================================
   RESERVA DE LOS GONZÁLEZ — interactions
   Age gate · nav scroll · product grid · detail modal · cart
   ============================================================ */
(() => {
  'use strict';

  const UTM = '?utm_source=claude_design&utm_medium=referral';
  const UNSPLASH_HOME = 'https://unsplash.com/' + UTM;

  /* ── Product data ─────────────────────────────────────────
     熟成期間は仮スペック（要蒸留所確認）。価格は参考の仮値で、
     輸入条件の確定後に要調整。風味の記述は海外レビューの傾向を
     要約したもの（直接引用ではない）。                        ── */
  const PRODUCTS = [
    {
      slot: 'blanco', name: 'BLANCO', en: 'BLANCO', jp: 'ブランコ',
      age: '未熟成', badge: '', comingSoon: true,
      img: 'https://images.unsplash.com/photo-1696182736807-5d21e38056ec?q=80&w=1000&auto=format&fit=crop',
      creditName: 'Nurlan Isazade', creditHref: 'https://unsplash.com/@nurlanisazade',
      ph: 'BLANCO ボトル写真（準備中）',
      notesLine: '加熱アガベ ／ 黒胡椒 ／ 蜂蜜'
    },
    {
      slot: 'reposado', name: 'REPOSADO', en: 'REPOSADO', jp: 'レポサド',
      age: 'オーク樽 6ヶ月熟成', /* 仮スペック: 要蒸留所確認 */
      vol: '700ml', abv: '36%',
      price: '¥9,900', /* 仮価格: 輸入条件確定後に要調整 */
      badge: '',
      img: 'assets/img/reposado_bottle_alt.webp',
      tone: 'reposado',
      ph: 'REPOSADO ボトル写真',
      notesLine: '蜂蜜 ／ バニラ ／ 加熱アガベ',
      aroma: '蜂蜜、バニラ、加熱したアガベの甘い香り',
      palate: '加熱アガベの甘みに、穏やかなオーク',
      finish: '黒胡椒のスパイスがほどよく締める余韻',
      desc: 'オーク樽で6ヶ月熟成させたレポサド。海外のレビューでは、蜂蜜やバニラ、加熱アガベを思わせる風味の傾向が語られています。アガベの輪郭に、樽のやわらかな甘みが加わった一本です。'
    },
    {
      slot: 'anejo', name: 'AÑEJO', en: 'AÑEJO', jp: 'アネホ',
      age: 'オーク樽 24ヶ月熟成', /* 仮スペック: 要蒸留所確認 */
      vol: '800ml', abv: '38%',
      price: '¥16,500', /* 仮価格: 輸入条件確定後に要調整 */
      badge: '',
      img: 'assets/img/anejo_bottle_alt.webp',
      tone: 'anejo',
      ph: 'AÑEJO ボトル写真',
      gallery: [
        { src: 'assets/img/anejo_box_closeup.webp',   alt: 'AÑEJO 化粧箱' },
        { src: 'assets/img/anejo_label_closeup.webp', alt: 'AÑEJO ラベル' }
      ],
      notesLine: 'キャラメル ／ バタースコッチ ／ オーク',
      aroma: 'キャラメル、バタースコッチ、トーストしたオーク',
      palate: '加熱アガベの甘みに、オークの厚みが重なる',
      finish: 'バニラと黒胡椒がゆっくりと引いていく余韻',
      desc: 'オーク樽で24ヶ月熟成させたアネホ。海外のレビューでは、キャラメルやバタースコッチ、オークを思わせる風味の傾向が語られています。一族の熟成観をよく映す一本です。'
    },
    {
      slot: 'extra-anejo-cristalino', name: 'EXTRA AÑEJO CRISTALINO', en: 'EXTRA AÑEJO CRISTALINO', jp: 'エクストラアネホ・クリスタリーノ',
      age: '36ヶ月以上熟成・ろ過', /* 仮スペック: 要蒸留所確認 */
      badge: '', comingSoon: true,
      img: 'https://images.unsplash.com/photo-1670098499730-4e22ec6d69df?q=80&w=1000&auto=format&fit=crop',
      creditName: 'Andy bardon', creditHref: 'https://unsplash.com/@wc_unsplash',
      ph: 'EXTRA AÑEJO CRISTALINO ボトル写真（準備中）',
      notesLine: 'バニラ ／ オーク ／ 加熱アガベ'
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

  // Local product shots (transparent WebP) get a tone class for their CSS
  // backdrop and carry no credit; Unsplash sources keep their credit chip.
  // Bottles go inside a .stage-bottle wrapper: it carries the contact
  // shadow (1.4x bottle width) while the img gets drop-shadow + reflection.
  const photo = (p, alt) => {
    const tone = p.tone ? ' photo--product photo--' + p.tone : '';
    const img = el('img', { src: p.img, alt, loading: 'lazy' });
    return el('figure', { class: 'photo photo--fill' + tone },
      p.tone ? el('span', { class: 'stage-bottle' }, img) : img,
      p.creditName ? creditChip(p.creditName, p.creditHref) : null
    );
  };

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
      el('div', { class: 'card__age',   text: p.age }),
      el('div', { class: 'card__notes', text: p.notesLine }),
      p.comingSoon ? null : el('div', { class: 'card__more', text: '詳細を見る →' })
    );

    const media = el('div', { class: 'card__media' },
      photo(p, p.ph),
      overlay
    );
    if (p.comingSoon) {
      media.append(el('div', { class: 'card__soon-overlay' }, el('span', { text: 'COMING SOON' })));
    }
    if (p.badge) media.append(el('div', { class: 'card__badge', text: p.badge }));

    const card = el('div', { class: 'card' + (p.comingSoon ? ' card--soon' : '') },
      media,
      el('div', { class: 'card__info' },
        el('div', { class: 'card__name',  text: p.name }),
        el('div', { class: 'card__jp',    text: p.jp }),
        el('div', { class: 'card__price', text: p.comingSoon ? '近日入荷予定' : p.price })
      )
    );
    if (!p.comingSoon) {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', p.name + '（' + p.jp + '）');
      card.addEventListener('click', () => openDetail(i));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(i); }
      });
    }
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
    price.append(el('small', { text: '（税込・参考価格）' }));

    const card = el('div', { class: 'detail__card' },
      el('button', { class: 'detail__close', 'aria-label': '閉じる', text: '×', onclick: closeDetail }),
      el('div', { class: 'detail__media' + (p.gallery ? ' detail__media--stack' : '') },
        photo(p, 'ボトル写真（' + p.name + '）'),
        p.gallery ? el('div', { class: 'detail__gallery' },
          ...p.gallery.map((g) =>
            el('figure', { class: 'photo' }, el('img', { src: g.src, alt: g.alt, loading: 'lazy' }))
          )
        ) : null
      ),
      el('div', { class: 'detail__body' },
        el('div', { class: 'detail__en',   text: 'RESERVA DE LOS GONZÁLEZ — ' + p.en }),
        el('h3',  { class: 'detail__name', text: p.name }),
        el('div', { class: 'detail__meta', text: p.jp + ' ／ ' + p.age + ' ／ ' + p.vol + ' ・ ' + p.abv }),
        el('p',   { class: 'detail__desc', text: p.desc }),
        el('div', { class: 'detail__notes' },
          noteRow('香り', p.aroma),
          noteRow('味わい', p.palate),
          noteRow('余韻', p.finish)
        ),
        el('div', { class: 'detail__buyrow' }, price, buyBtn),
        added,
        el('p', { class: 'detail__fine' },
          '※ 表示価格・仕様は参考値です。輸入条件の確定後に変更となる場合があります。',
          el('br'),
          '※ 本商品は現在メキシコ国内限定流通です（日本未上陸）。'
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
