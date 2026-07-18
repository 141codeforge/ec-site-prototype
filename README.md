# Reserva de los González — プレミアムテキーラ ECサイト（プロトタイプ）

A single-page, scroll-type e-commerce landing site for **Reserva de los
González**（レセルバ・デ・ロス・ゴンサレス）, a real Mexico-only tequila brand
produced by Tequila Casa de los González, S.A. de C.V. (NOM 1518, Ayotlán,
Jalisco). Dark × gold "aged luxury" aesthetic, Japanese copy, built as a
self-contained static site (HTML / CSS / vanilla JS — no build step).

このサイトは日本の輸入商社向け営業資料として使うデモ（プロトタイプ）です。
ブランドは日本未上陸・メキシコ国内限定流通のため、価格・熟成期間などの
仮の数値には `仮スペック: 要蒸留所確認` / `仮価格` のコメントを付けています。
Don Julio への言及は創業家の歴史的事実の記載のみで、現 Don Julio ブランド
（Diageo 社所有）との提携・関係を示すものではありません。

The layout was implemented from a Claude Design handoff for a fictional brand
("VELADA"); the original prototype and the design conversation are preserved
under [`project/`](project/) and [`chats/`](chats/). Brand copy has since been
rewritten with factual Reserva de los González information.

## Run it

It's a static site — no dependencies, no build. Just open it:

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or open `index.html` directly in a browser. Fonts (Google Fonts) and story
photography (Unsplash) load from their hosted URLs, so an internet connection
is needed for those assets. `reserva-standalone.html` is a single-file version
(CSS/JS inlined) that still references the product shots in `assets/img/`.

## Structure

```
index.html               Markup for every section
assets/styles.css         All styling (design tokens as CSS variables)
assets/main.js            Interactions + product data
reserva-standalone.html   Single-file version (CSS/JS inlined)
project/                  Original Claude Design prototype (VELADA, reference)
chats/                    Design conversation transcript
```

## Sections & behaviour

- **年齢確認モーダル (age gate)** — shown on load; "はい" dismisses it, "いいえ"
  reveals the under-20 notice.
- **ヘッダー** — fixed, blurred; nav links smooth-scroll to sections; cart icon
  shows a badge once something is added.
- **ヒーロー** — brand mark, 「ドン・フリオを生んだ一族が、家名を懸けて造る、
  メキシコ国内限定のテキーラ。」, "100% de Agave Azul — NOM 1518, Jalisco".
- **ブランドストーリー** — three chapters (01 HERENCIA 継承 / 02 DESTILACIÓN
  蒸留 / 03 AÑEJAMIENTO 熟成) with alternating image/text layout. 製法は
  実情報（石窯・ローラーミル・深井戸水・銅コイル付きスチルで2回蒸留）。
- **商品ラインナップ** — the real four-bottle lineup in a responsive grid:
  Blanco（近日入荷予定）/ Reposado（700ml・36%）/ Añejo（800ml・38%）/
  Extra Añejo Cristalino（近日入荷予定）. Hovering a card reveals its aging
  spec and tasting-note tendencies.
- **商品詳細モーダル** — opens on Reposado / Añejo card click: tasting notes
  (香り/味わい/余韻), reference price, and "カートに入れる" (increments the
  cart, shows a confirmation). Closes on the ×, backdrop click, or Escape.
- **会員先行案内** — Extra Añejo Cristalino advance-notice sign-up (UI only).
- **フッター** — distillery name / NOM 1518 / address, importer placeholder
  (輸入・販売：（調整中）), the required drinking notices, and a note that the
  Don Julio mentions are historical facts only.

The layout is fully responsive (CSS grid with `auto-fit` + `clamp()`), matching
the prototype's breakpoints.

## Images & attribution

Product photography (hero bottles, REPOSADO / AÑEJO collection cards + detail,
AÑEJO box) uses the brand's own transparent WebP shots in `assets/img/`,
rendered with `object-fit: contain` over CSS backdrops. Story photography and
the two Coming-Soon card placeholders (Blanco / Extra Añejo Cristalino) still
come from Unsplash, referenced by URL; each of those photos carries its
required "Photo by … on Unsplash" credit (with the `utm` referral params
Unsplash's terms require). To swap in more brand photography, replace the
`img` `src` values in `index.html` (story) and in the `PRODUCTS` array in
`assets/main.js` (collection + detail), and remove the corresponding credits.
