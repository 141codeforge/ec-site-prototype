# プレミアムテキーラ ECサイト

_Started 2026-07-17 02:33 UTC_

---

## User

# プロトタイプ制作依頼：高級テキーラブランド ECサイト

## ブランドコンセプト
日本未上陸のプレミアムテキーラブランドのECサイト。
- アガベ100%使用（ミクストではない正統派）
- レポサド〜エクストラアネホクラスの長期熟成が最大の特徴
- 職人による小ロット生産、蒸留所のストーリー性を重視
- ポジショニング：クラセ・アスールやカーサ・ドラゴネスのような世界的ラグジュアリーテキーラに匹敵する、洗練された「大人のためのアガベスピリッツ」ブランド

## ターゲットユーザー（優先度順）
1. 40〜60代のハイエンド・スピリッツコレクター（ウイスキー/ワイン愛好家。熟成年数やテロワールに価値を見出す）
2. 高級飲食店・バーのオーナー、ソムリエ（法人購買。希少性・話題性を求める）
3. 接待・贈答用途で購入する経営層・富裕層（唯一無二感、化粧箱の高級感を重視）
4. SNSに敏感な新世代ラグジュアリー消費者（20代後半〜40代。体験・自己表現としての消費）

## デザイントーン
- 落ち着いたダーク×ゴールド/アンバーを基調とした「熟成感」「重厚感」のある配色
- メキシコの伝統文化をモチーフにしつつ、過度に民族的・キッチュにならない洗練されたミニマルラグジュアリーの方向性
- タイポグラフィは上質感のあるセリフ体を軸に、余白を活かしたレイアウト
- ボトルや素材の写真を大きく見せる、ギャラリーのような余白設計
- 高級ウイスキーブランドや高級時計ブランドのECサイトに近い品位を意識

## 必要なページ/セクション（1ページのスクロール型プロトタイプでOK）
1. **ヒーローセクション**：ブランドロゴ、キャッチコピー、ボトルビジュアル、CTA（「コレクションを見る」）
2. **年齢確認モーダル**：20歳未満は閲覧不可の簡易ゲート（UIイメージのみでOK）
3. **ブランドストーリー**：アガベ栽培〜長期熟成プロセスをストーリーテリング形式で
4. **商品ラインナップ**：レポサド/アネホ/エクストラアネホなど熟成年数違いをグリッド表示
5. **商品詳細**：1商品分のモーダルまたはセクション（テイスティングノート、熟成年数、価格、購入ボタン）
6. **限定・会員先行販売の告知セクション**
7. **フッター**：ブランド情報、SNSリンク、飲酒に関する注記

## 機能要件（見た目のUIのみでOK、実装ロジックは不要）
- 年齢確認の簡易モーダル
- 商品カードのホバーで熟成年数・テイスティングノートをハイライト表示
- カートアイコン/購入ボタンのUI（決済機能は不要）
- レスポンシブ（PC/モバイル両方を意識したレイアウト）

## トーン＆マナー
- コピーは上品で簡潔に、過度な煽り文句は避ける
- 「熟成」「希少性」「職人技」「ストーリー」をキーワードに据える
- ターゲット①〜④、特に①③の富裕層コレクター・贈答層に響く高級感を最優先する

## Assistant

_[tool: list_files]_

_[tool: read_skill_prompt]_

_[tool: copy_starter_component]_

_[tool: dc_write]_

_[tool: set_project_title]_

_[tool: ready_for_verification]_

プロトタイプをお出ししました。架空ブランド「VELADA（ベラーダ）」として、年齢確認モーダル・ヒーロー・ストーリー3章・4商品グリッド（ホバーで熟成年数とテイスティングノート表示）・商品詳細モーダル・会員先行販売・フッターまで1ページに収めています。

- 写真枠はすべてドロップ対応のプレースホルダーです。ボトルや畑の実素材をドラッグ＆ドロップで差し込めます
- Tweaksで年齢確認モーダルと会員セクションの表示/非表示を切り替えられます
- ブランド名・価格・コピーは仮です。実名称や商品構成があればお知らせください

## User

画像は適当に見繕って

## Assistant

_[tool: dc_html_str_replace]_

_[tool: web_search]_

_[tool: web_search]_

_[tool: web_search]_

_[tool: web_search]_

_[tool: web_search]_

_[tool: web_fetch]_

_[tool: web_fetch]_

_[tool: web_fetch]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: snip]_

_[tool: ready_for_verification]_

全9枠にUnsplashの写真（クレジット付き）を仮当てしました — ヒーローと商品4種はボトル系、ストーリーはアガベ畑・野外の樽・熟成庫です。銅製ポットスチルのちょうど良い無料素材がなかったため、蒸留の章は樽の写真で代用しています。各枠には画像をドラッグ＆ドロップすれば実素材に差し替えられます。

## User

Apply drawing

## User

Apply drawing

## Assistant

_[tool: write_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: delete_file]_

_[tool: ready_for_verification]_

ヒーローをダーク背景のボトル写真（バーカウンター調）に差し替え、ヘッダー下の余白も詰めました。入れ替えで元のボトル写真はアネホのカードに移動しています。

## User

Apply drawing

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

GRAN RESERVAの写真を別のボトル写真（ダーク背景のクローズアップ）に差し替え、AÑEJOとの重複を解消しました。

## User

Apply drawing

## Assistant

_[tool: write_file]_

_[tool: web_fetch]_

_[tool: web_search]_

_[tool: web_fetch]_

_[tool: snip]_

_[tool: snip]_

_[tool: show_html]_

_[tool: dc_js_str_replace]_

_[tool: delete_file]_

_[tool: ready_for_verification]_

GRAN RESERVAをダーク背景の重厚なボトル＋クリスタルグラスの写真に差し替えました。より上質な雰囲気になっています（他候補もあるので、イメージと違えばお知らせください）。

