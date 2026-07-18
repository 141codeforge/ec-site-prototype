# VELADA — プレミアムテキーラ ECサイト

A single-page, scroll-type e-commerce landing site for **VELADA**, a fictional
high-end aged-tequila brand. Dark × gold "aged luxury" aesthetic, Japanese copy,
built as a self-contained static site (HTML / CSS / vanilla JS — no build step).

Implemented from a Claude Design handoff. The original prototype and the design
conversation are preserved under [`project/`](project/) and [`chats/`](chats/).

## Run it

It's a static site — no dependencies, no build. Just open it:

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or open `index.html` directly in a browser. Fonts (Google Fonts) and photography
(Unsplash) load from their hosted URLs, so an internet connection is needed for
those assets.

## Structure

```
index.html          Markup for every section
assets/styles.css    All styling (design tokens as CSS variables)
assets/main.js       Interactions + product data
project/             Original Claude Design prototype (reference)
chats/               Design conversation transcript
```

## Sections & behaviour

- **年齢確認モーダル (age gate)** — shown on load; "はい" dismisses it, "いいえ"
  reveals the under-20 notice.
- **ヘッダー** — fixed, blurred; nav links smooth-scroll to sections; cart icon
  shows a badge once something is added.
- **ヒーロー** — brand mark, tagline, lead copy, "コレクションを見る" CTA.
- **ブランドストーリー** — three chapters (栽培 / 蒸留 / 熟成) with alternating
  image/text layout.
- **商品ラインナップ** — four products in a responsive grid; hovering a card
  reveals its aging period and tasting notes.
- **商品詳細モーダル** — opens on card click: tasting notes (香り/味わい/余韻),
  price, and "カートに入れる" (increments the cart, shows a confirmation).
  Closes on the ×, backdrop click, or Escape.
- **会員先行販売** — GRAN RESERVA members-only pre-sale sign-up (UI only).
- **フッター** — brand info, social links, and the required drinking notices.

The layout is fully responsive (CSS grid with `auto-fit` + `clamp()`), matching
the prototype's breakpoints.

## Images & attribution

Product photography (hero bottles, REPOSADO / AÑEJO collection cards + detail,
GRAN RESERVA box) uses the brand's own transparent WebP shots in `assets/img/`,
rendered with `object-fit: contain` over CSS backdrops. Story photography and
the two Coming-Soon card placeholders still come from Unsplash, referenced by
URL; each of those photos carries its required "Photo by … on Unsplash" credit
(with the `utm` referral params Unsplash's terms require). To swap in more
brand photography, replace the `img` `src` values in `index.html` (story) and
in the `PRODUCTS` array in `assets/main.js` (collection + detail), and remove
the corresponding credits.
