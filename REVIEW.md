# Review UI/UX — Vở Xinh (vở ô ly luyện viết)

- **Thời điểm audit:** 18/11/2026, khoảng 23:22–23:40 (giờ Asia/Saigon, UTC+7).
- **URL:** https://employers-mails-collective-printing.trycloudflare.com/
- **Lưu ý:** Source nằm trên máy local của bạn (Next.js, `x-powered-by: Next.js`, `generator: v0.app`). Mọi sửa làm trên source local. Repo công khai [nhaweb/print-teach](https://github.com/nhaweb/print-teach) mình có đọc (không push gì): đó là site in bao bì (`pml-print-tech`), **không phải** app Vở Xinh này.
- **Phương pháp:** Playwright Chromium (`channel="chrome"`) 1440 và 390. Đo lưới và chữ trên bản PDF in A4 (150 dpi). Đối chiếu mẫu chữ với văn bản và bảng chữ đã đọc (dẫn URL, không bịa). Không gửi form / không in ra máy in thật.

---

## Cơ sở mẫu chữ (chỉ khẳng định những gì đã đọc)

**Văn bản gốc.** Quyết định [31/2002/QĐ-BGDĐT](https://thuvienphapluat.vn/van-ban/Giao-duc/Quyet-dinh-31-2002-QD-BGD-DT-mau-chu-viet-truong-tieu-hoc-87903.aspx) ngày 14/6/2002, ký bởi Thứ trưởng Đặng Huỳnh Mai, **Điều 1** ban hành “Mẫu chữ viết trong trường tiểu học”, **Điều 2** áp dụng từ năm học 2002–2003. [Vandap](https://vandap.com/van-ban/31-2002-qd-bgd-and-dt) ghi quyết định **còn hiệu lực**. Mình **không đọc được phụ lục mẫu chữ** trên Thư viện Pháp luật (bị khóa thành viên), nên **không trích phụ lục gốc**.

**Bảng chiều cao — nguồn thứ cấp, các trang này viết trùng nhau** ([Luật Minh Khuê](https://luatminhkhue.vn/mau-chu-viet-chuan-cua-bo-giao-duc-va-dao-tao.aspx) 29/05/2024, [Monkey](https://monkey.edu.vn/ba-me-can-biet/giao-duc/hoc-tieng-viet/file-tap-viet-chu-lop-1), [Taimienphi](https://taimienphi.vn/download-mau-chu-viet-chuan-cua-bo-giao-duc-va-dao-tao-96006)):

| Nhóm | Chiều cao (đơn vị) | Quy ra ô li khi **cỡ vừa** (1 đơn vị = 2 ô li)* |
|---|---|---|
| o, ô, ơ, a, ă, â, e, ê, i, u, ư, c, n, m, v, x | 1 | 2 ô li |
| r, s | 1,25 | 2,5 ô li |
| t | 1,5 | 3 ô li |
| d, đ, p, q | 2 | 4 ô li |
| b, g, h, k, l, y | 2,5 | 5 ô li |
| Chữ hoa (kiểu 1: 29 chữ; kiểu 2: A, M, N, Q, V) | 2,5; riêng **G, Y = 4** | 5 ô li; G, Y = 8 ô li |
| Chữ số 0–9 | 2 | 4 ô li |
| Dấu thanh | trong ô vuông cạnh **0,5 đơn vị** | 1 ô li |

\*Quyết định quy định theo **đơn vị**, không theo mm. Luật Minh Khuê viết “2,5 đơn vị, tức là độ cao 5 ô li”. [Ôn Thi](https://onthi.app/tap-viet/chu-cai) tách **cỡ nhỏ** (1 đơn vị = 1 ô li) và **cỡ vừa** (1 đơn vị = 2 ô li). Vở tập viết lớp 1 thường dùng cỡ vừa.

**Kiểu chữ và nét.** [Primarium](https://primarium.info/handwriting-models/mau-chu-thao-tieng-viet/) (cập nhật 09.11.2023), dựa trên QĐ 31/2002 và sách *Dạy và học Tập viết ở Tiểu học* (Hưởng, NXBGD, 2010): mẫu là **chữ thảo liền nét** (continuous cursive), có **4 biến thể** — đứng nét đều, đứng nét thanh–đậm, **nghiêng 15°** nét đều, nghiêng 15° nét thanh–đậm; **ưu tiên dạy chữ đứng**. “No official digital typeface for the model exists.” Chữ hoa mang tính trang trí, không phải chữ nào cũng nối sang chữ thường. Khi viết trôi, dấu thanh và gạch chữ t viết sau cả tiếng. Luật Minh Khuê nêu các nét cần nắm: **nét khuyết trên, khuyết dưới, nét thắt, nét móc ngược, nét móc hai đầu**.

**Bảng chữ đối chiếu.** File Wikimedia [Vietnamese Decision 31 Cursive Chart.svg](https://commons.wikimedia.org/wiki/File:Vietnamese_Decision_31_Cursive_Chart.svg) (người dùng vẽ 2019, ghi nguồn QĐ 31/2002; **không phải bản scan phụ lục gốc**). Bản render: `ref-qd31-chart-white.png`.

**Font “tiểu học” phổ biến và bản quyền.** Giáo viên hay dùng **HP001 4 hàng / 5 hàng** (trường [Lê Thị Hồng Gấm](https://thlethihonggamtanbinh.hcm.edu.vn/tai-nguyen-phan-mem/fonts-chu-hoc-tro/ctmb/34720/23345) hướng dẫn HP0014HN, bản `(cham)` để đồ nét). [Font2s](https://font2s.com/fonts/91551/hp001_4_h.html) ghi HP001 4 hàng **“Free for Personal Use”**. **Không nhúng HP001 vào web/app thương mại** nếu chưa có giấy phép rõ. VNI-Viettay / AVO cũng được trường phổ biến; giấy phép gốc cần tự kiểm. Hướng đúng: **vẽ SVG path bám mẫu**, hoặc mua font có giấy phép web/app.

---

## 🌟 Điểm Tốt

- **Luồng tạo vở và in đã có đủ “xương sống” của một công cụ tập viết.** Bên trái: tên vở, họ tên, lớp, 26 unit, kiểu nét (Chấm sao / Nét đứt / Chữ rỗng), từ luyện thêm, “Thêm bài / Xóa / In bài này”. Bên phải: xem trước tờ A4, “Vừa màn hình”, nhãn “A4 · 2 trang”. `@media print` ẩn sidebar, ra **2 trang A4** (đo PDF: 594,96 × 841,92 pts). Chữ trên tờ in là **text vector** (`<text>` trong SVG), không phải ảnh raster — in 100% sẽ không vỡ răng cưa.
- **Lưới ô ly đều và có cấu trúc.** Trên bản in A4, mình đếm **61 đường ngang** xen kẽ liền / đứt (`SDSD…`), khoảng cách trung vị **24 px @ 150 dpi ≈ 4,06 mm/ô**; đường dọc chia cột rộng **4 ô** (≈ 16,4 mm). Ô gần vuông. Có ô mẫu bo bát giác và dòng chữ mờ để đồ — đúng hướng “nhìn mẫu, tô, viết”. Input “Tên vở / Họ và tên / Lớp” có label, ô cao 47px.

---

## ⚠️ Lỗi UX/UI & Điểm Cần Cải Tiến

### Nét chữ & chuẩn mẫu chữ

- **High. Đang dùng font HelloFireworks (Jen Jones) — đây là font tập tô kiểu Âu–Mỹ, không phải mẫu chữ thảo tiểu học Việt Nam.** File được serve tại `/fonts/HelloFireworks.ttf`. `font-family` đo được: `HelloFireworks, Nunito, "Nunito Fallback", sans-serif`. Trong bảng `cmap` của file font (đọc name table: *HelloFireworks / Jen Jones*):
  - **Thiếu hoàn toàn:** ă, đ, ơ, ư, Ă, Đ, Ơ, Ư và hầu hết chữ có dấu thanh dựng sẵn (ắ, ờ, ự, ị…).
  - Có một số chữ Latin có dấu (â, ê, ô, á, é…) nhưng **hình nét vẫn là print/pre-cursive phương Tây**, không phải chữ thảo QĐ 31/2002.
  - Fallback Nunito là **sans-serif bo tròn**, càng lệch mẫu nếu học sinh gõ tiếng Việt.
  - Font này trên các kho phổ biến thường ghi **personal / non-commercial**; dùng trên web và nhúng file `.ttf` cần giấy phép thương mại/webfont. Đây không phải “font chữ tiểu học” (HP001, v.v.).
- **High. Hình nét từng chữ lệch mẫu.** So trực tiếp `tv-crop-B-grid.png` và `tv-compare-side.png` với bảng Wikimedia:
  - **B, b viết thường/hoa:** kiểu in tròn, hai vòng, thân thẳng, **không có nét vào / nét khuyết trên** như chữ thảo (chữ *b* mẫu là vòng lên cao rồi mở bụng phải).
  - **o, k** trong từ *book*: *o* là vòng tròn đứng; *k* là k in, không phải k tiểu học có **nét thắt**.
  - Chữ **đứng, gần 0°**, không sai với ưu tiên “chữ đứng” của Primarium, nhưng cấu tạo nét vẫn sai.
  - **Không có mũi tên thứ tự nét, không đánh số chiều viết** — thiếu phần cốt lõi của tiết Tập viết.
- **High. Chiều cao chữ không theo nhóm đơn vị.** Trên PDF trang 1, nét mực của chữ **B / b luyện** cao khoảng **32 px ≈ 1,33 ô ≈ 5,4 mm**, **đặt trên đường kẻ giữa** (cách đỉnh dòng ~0,7 ô, đáy sát dòng đặc giữa). Hai ô dưới của mỗi “dòng 5 kẻ” để trống. Cả B hoa và b thường **cùng cỡ**.
  - Nếu coi 1 đơn vị = 2 ô (cỡ vừa), chữ *a/o* phải cao 2 ô và **đặt trên đường nền (đáy dòng)**; *b, h, k, l* phải cao **5 ô**; *t* 3 ô; *d, đ, p, q* 4 ô; chữ hoa 5 ô (G, Y 8 ô).
  - Hiện tại B/b chỉ ~1,3 ô — thấp hơn cả nhóm 1 đơn vị, và **không phân biệt nhóm cao**.
- **Medium. Bộ bài là 26 chữ cái tiếng Anh (A–Z, có F, J, W, Z) với từ *book, ball, bike, bell* và chỉ dẫn “Write.”** — không phải 29 chữ tiếng Việt, không có unit ă â đ ê ô ơ ư. Phù hợp luyện chữ Anh, **không khớp mục tiêu “học sinh tiểu học Việt Nam tập viết”**.
- **Chưa kiểm chứng được** trên tờ in: ă, â, đ, ê, ô, ơ, ư và dấu thanh (điền form “Chữ cái” trong test không đổi preview; một số thao tác bị timeout / reload). Kết luận hình nét với các chữ này dựa trên **cmap font** (thiếu glyph) chứ không phải ảnh tờ in.

### Lưới ô li & bố cục in

- **Medium. “Ô ly 5 dòng” là giấy 5 kẻ liên tục, không phải vở ô li / 4 đường kẻ của mẫu chữ Việt.** Mẫu Wikimedia và sách tập viết dùng **4 đường** (hai liền, hai chấm) với đường nền rõ, phần dưới dành **nét khuyết dưới** (g, y, p, q và hoa G, Y). App kẻ đều 4 ô cho mọi dòng rồi đặt chữ lên **đường giữa**, nên không còn chỗ đúng cho nét xuống dưới, cũng không “ôm” chiều cao 2,5–4 đơn vị.
- **Medium. Kích thước ô in ra ≈ 4,06 mm**, nhỏ hơn ô li 5 mm phổ biến. Lề **không đều**: trái ≈ 31 mm, phải ≈ 15 mm, trên ≈ 31 mm (có banner), dưới ≈ 20 mm — đo trên `tv-print-page-1.png`.
- **Low.** Banner “Unit 1 In the school playground” và “Write.” chiếm chỗ, lại bằng tiếng Anh. Bìa vở (họ tên, lớp) có trên form nhưng mình **không bắt được trang bìa riêng** trong PDF 2 trang của Unit 1 (chỉ trang luyện). Có thể bìa chỉ xuất hiện khi in “Cả vở” — **chưa kiểm chứng**.

### UI/UX công cụ

- **Medium. Mobile cuộn ngang 592 px trên viewport 390 px**; phần xem trước bị cắt (`tv-390-full.png`). **34/45** vùng bấm cao dưới 44px: unit 36px, “Chấm sao / Nét đứt / Chữ rỗng” 33px, “Bài này / Cả vở” 34px, **“Đặt lại vở mẫu” chỉ 18px**. Nút “In bài này” đạt 46px.
- **Medium. Ba kiểu nét không thấy đổi trên preview** trong lần bấm thử (ảnh giống nhau). Có thể font vốn đã là nét chấm nên “Nét đứt / Chữ rỗng” không có hiệu ứng — cần kiểm lại bằng tay.
- **Low.** Click “Cỡ in” không thấy menu đổi khổ (nhãn vẫn “A4 · 2 trang”). H1 trang công cụ dùng Georgia 28px, không phải Fredoka như token CSS. Console chỉ có lỗi WebSocket HMR 502 qua Cloudflare (lỗi dev, không tính).

---

## Bảng so sánh từng chữ

*Cột “Hiện tại” đo trên tờ in Unit 1 (B, b, book) hoặc suy từ cùng một font/cùng cách đặt dòng. Ô li đo ≈ 4,06 mm trên A4. “Chuẩn (ô, cỡ vừa)” theo nguồn thứ cấp ở trên.*

| Chữ | Chuẩn (đơn vị / ô cỡ vừa) | Hiện tại (đo / quan sát) | Vấn đề | Hướng sửa |
|---|---|---|---|---|
| a, ă, â, e, ê, i, o, ô, ơ, u, ư, c, n, m, v, x | 1 đv / 2 ô, đáy trên đường nền | *o* trong *book*: ~1,3–1,5 ô, đặt trên **đường giữa**; ă đ ơ ư **không có glyph** trong HelloFireworks | Sai font, sai đường nền, ă/đ/ơ/ư sẽ rơi sang Nunito | Path chữ thảo; đáy = đường nền; cao đúng 2 ô; vẽ ă/đ/ơ/ư và dấu 0,5 đv |
| r, s | 1,25 / 2,5 ô, **nét thắt** trên | Không đo được trên tờ in | Font in không có nét thắt | Path riêng, cao 2,5 ô |
| t | 1,5 / 3 ô, gạch ngang viết sau | Không đo được trên tờ in | Cần path thảo, không t in | Cao 3 ô, có hướng dẫn nét gạch |
| d, đ, p, q | 2 / 4 ô (d, đ lên; p, q xuống) | Không đo được; **đ thiếu glyph** | d in ≠ d thảo (nét lên 2 đv bên phải) | Ô 4; đ có nét gạch ngắn; p/q xuống 2 ô dưới nền |
| b, g, h, k, l, y | 2,5 / 5 ô | **b đo ≈ 1,33 ô / 5,4 mm**, cùng cỡ B hoa, không vượt quá đường giữa | Thiếu nét khuyết trên (b, h, k, l) / khuyết dưới (g, y); k thiếu nét thắt | Dùng dòng 5–8 ô hoặc cho nét cao tràn đúng 5 ô; không co về x-height |
| Chữ hoa A–Y (trừ G, Y) | 2,5 / 5 ô; có kiểu 1 và kiểu 2 (A, M, N, Q, V) | **B hoa ≈ 1,33 ô**, kiểu B in tròn | Không phải chữ hoa thảo | Path hoa kiểu 1 (và tùy chọn kiểu 2) |
| G, Y hoa | 4 đv / 8 ô (đuôi dưới) | Chưa đo trên tờ in | Cần 8 ô, không nhét vào 4 ô | Tăng nhịp dòng hoặc cho đuôi sang dòng dưới |
| Chữ số | 2 / 4 ô; có kiểu 2 cho 2, 3, 4, 5, 7 | Không thấy unit số | — | Thêm bài 0–9 |
| Dấu thanh | ô 0,5 đv, không đè thân chữ | Chưa in được tiếng có dấu | Font thiếu hầu hết dấu dựng sẵn | Đặt dấu sau khi vẽ chữ, trong ô 0,5 đv |

Ảnh đối chiếu: `tv-compare-side.png`, `tv-compare-official-vs-app.png`, `tv-crop-B-grid.png`, `ref-qd31-chart-white.png`, `tv-print-page-1.png`.

---

## 🛠️ Code sửa (Next.js / React / SVG)

**1. Hình học lưới in A4 — 1 ô = 5 mm, cỡ vừa (1 đơn vị = 2 ô = 10 mm).** Đường nền đậm, đường đơn vị (2 ô) hơi đậm, đường 1 ô và 3 ô nét đứt. Chừa 1,5–2 đơn vị dưới nền nếu dòng có g, y, p, q, G, Y.

```tsx
// lib/oliy.ts  — đơn vị mm, gốc ở góc trên trái vùng kẻ
export const OLI_MM = 5
export const UNIT_MM = 2 * OLI_MM // 10 mm = 1 đơn vị (cỡ vừa)
export const A4 = { w: 210, h: 297 }
export const MARGIN = { top: 18, right: 16, bottom: 16, left: 16 } // lề đều

export const HEIGHT_UNITS: Record<string, number> = {
  // thường
  a:1, ă:1, â:1, e:1, ê:1, i:1, o:1, ô:1, ơ:1, u:1, ư:1, c:1, n:1, m:1, v:1, x:1,
  r:1.25, s:1.25, t:1.5,
  d:2, đ:2, p:2, q:2,
  b:2.5, g:2.5, h:2.5, k:2.5, l:2.5, y:2.5,
  // hoa (thêm G,Y = 4). Số = 2.
}

export function baselineY(rowTopMm: number, rowUnits = 2.5) {
  // rowTop là đường trên cùng dành cho chữ 2,5 đv; đường nền ở +2,5 đv
  return rowTopMm + rowUnits * UNIT_MM
}
```

```css
/* print — 1 CSS px khi in = 1 mm nếu dùng 210mm width */
@page { size: A4 portrait; margin: 0; }
@media print {
  .app-chrome { display: none !important; }
  .sheet { width: 210mm; height: 297mm; break-after: page; overflow: hidden; }
  html, body { margin: 0; background: #fff; }
}
```

**2. Đừng dùng HelloFireworks / Nunito cho chữ mẫu.** Vẽ chữ bằng `<path>` (viewBox tính theo đơn vị). Mỗi glyph: `d` (nét chính), optional `dConnect` (nét nối), `arrows` (mũi tên thứ tự nét). Đặt `transform` để đáy glyph trùng đường nền, scale = `HEIGHT_UNITS[letter] * UNIT_MM`.

**3. Tô nét — đừng phụ thuộc font chấm.** Một path, ba style: `stroke-dasharray` (nét đứt), `fill="none"` (chữ rỗng), hoặc chấm theo `getPointAtLength` (chấm sao). `prefers-reduced-motion` thì không animate.

**4. Bộ bài tiếng Việt:** 29 chữ + ă â đ ê ô ơ ư, chữ hoa kiểu 1 (và kiểu 2 nếu có), chữ số 0–9, từ/câu tiếng Việt. Đổi “Write.” thành “Tô chữ, rồi viết.”

**5. UI:** mọi nút `min-h-11` (44px); mobile xếp preview **dưới** form, `overflow-x: clip`; “Cỡ in” cho chọn cỡ nhỏ (1 đv = 1 ô) / cỡ vừa (1 đv = 2 ô).

---

## Prompt cho Cursor

Dán lần lượt vào Cursor (code ở **máy local**, Next.js). Không push lên `nhaweb/print-teach` (repo đó là site khác).

**Prompt 1 — thay hệ thống chữ (P0)**

```
Bạn đang sửa app “Vở Xinh” (Next.js, source local) — công cụ in vở ô ly tập viết cho học sinh tiểu học Việt Nam.

Vấn đề đã đo (18/11/2026): chữ đang dùng font HelloFireworks (Jen Jones), serve tại /fonts/HelloFireworks.ttf, fallback Nunito. Đây là font tập tô Âu–Mỹ, KHÔNG phải mẫu chữ viết trong trường tiểu học (Quyết định 31/2002/QĐ-BGDĐT). Cmap font thiếu ă đ ơ ư Ă Đ Ơ Ư và hầu hết chữ có dấu thanh. Trên tờ in A4, chữ B/b cao khoảng 1,33 ô (≈5,4 mm) và đặt trên đường kẻ GIỮA của dòng 5 kẻ; hai ô dưới để trống; B hoa và b thường cùng cỡ. Không có mũi tên thứ tự nét.

Yêu cầu:
1) Bỏ HelloFireworks khỏi chữ mẫu / chữ tô. Không nhúng HP001 hay font “tiểu học” nào nếu chưa có giấy phép web/app rõ (nhiều bộ chỉ “Free for Personal Use”).
2) Tạo bộ SVG path chữ thảo bám mẫu QĐ 31/2002 (tham khảo hình: https://commons.wikimedia.org/wiki/File:Vietnamese_Decision_31_Cursive_Chart.svg — đây là bản vẽ lại, không phải scan phụ lục gốc; ưu tiên đối chiếu sách Tập viết NXBGD nếu có).
   - Chữ đứng (ưu tiên), tuỳ chọn nghiêng 15°.
   - Đủ 29 chữ thường + hoa kiểu 1; tuỳ chọn hoa kiểu 2 (A, M, N, Q, V) và số 0–9 (kể cả kiểu 2 của 2,3,4,5,7).
   - Có ă â đ ê ô ơ ư và tổ hợp dấu thanh. Dấu nằm trong ô vuông 0,5 đơn vị, không đè thân chữ.
   - Mỗi chữ: path nét chính, nét nối (nếu có), mũi tên / số thứ tự nét.
3) Chiều cao tính bằng ĐƠN VỊ, cỡ vừa mặc định (1 đơn vị = 2 ô li = 10 mm nếu 1 ô = 5 mm):
   a ă â e ê i o ô ơ u ư c n m v x = 1
   r s = 1,25 (có nét thắt trên)
   t = 1,5
   d đ p q = 2
   b g h k l y = 2,5 (b h k l: nét khuyết trên; g y: khuyết dưới; k: nét thắt)
   hoa = 2,5; G và Y hoa = 4
   chữ số = 2
   Đáy chữ thường/hoa (trừ nét xuống) đặt trên ĐƯỜNG NỀN, không phải đường giữa.
4) Lưới in A4: 1 ô = 5 mm, ô vuông; lề đều ≥ 16 mm; đường nền đậm hơn; dòng kẻ 4 đường (2 liền + 2 đứt) theo mẫu tập viết, chừa chỗ nét dưới cho g y p q và hoa G Y. In @page A4, scale 100%, vector path (không raster chữ).
5) Ba kiểu tô (Chấm sao, Nét đứt, Chữ rỗng) phải đổi thật trên cùng một path (dash / outline / dots), không đổi font.
6) Nội dung bài: 29 chữ tiếng Việt + từ/câu tiếng Việt; đổi “Write.” thành “Tô chữ, rồi viết.” Có thể giữ khóa Anh như tuỳ chọn, nhưng mẫu chữ vẫn phải là chữ thảo Việt.
```

**Prompt 2 — UI in và mobile (P1)**

```
Tiếp tục app Vở Xinh, source local Next.js:
- Mọi nút/link (unit, kiểu nét, Thêm/Xóa, Đặt lại vở mẫu) min-height 44px. “Đặt lại vở mẫu” hiện chỉ cao 18px.
- Mobile (390px): không cuộn ngang (hiện scrollWidth 592). Xếp tờ xem trước bên dưới form, tờ scale theo chiều ngang, overflow-x: clip.
- Nút “Cỡ in” mở được: cỡ nhỏ (1 đơn vị = 1 ô) / cỡ vừa (1 đơn vị = 2 ô), khổ A4, số trang.
- In “Bài này” và “Cả vở” ra PDF/trang in gồm bìa (tên vở, họ tên, lớp) rồi các trang luyện. Kiểm tra lề trái/phải đều.
- Ô “Chữ cái / Từ trọng tâm / Từ luyện thêm” phải cập nhật preview ngay (onChange). Cho phép nhập ă, â, đ, ơ, ư và từ có dấu.
- Tôn trọng prefers-reduced-motion với mọi hiệu ứng tô nét.
```

**Prompt 3 — (P2) tăng tính sư phạm**

```
Thêm: (1) animation “viết mẫu” theo thứ tự nét, tắt khi reduced-motion; (2) dòng chữ mờ giảm dần (mẫu đậm → nét đứt → dòng trống); (3) khoảng cách giữa các tiếng ≈ một chữ o; (4) tuỳ chọn chữ nghiêng 15°; (5) bài nét cơ bản (ngang, sổ, xiên, móc xuôi/ngược/hai đầu, cong kín/hở, khuyết trên/dưới, nét thắt) trước khi vào chữ cái, đúng trình tự Tập viết lớp 1.
```

---

## Phụ lục đo lường

| Hạng mục | Kết quả |
|---|---|
| HTTP / JS | 200, Next.js dev, 3 font preload + HelloFireworks.ttf (137 932 bytes) |
| Canvas / SVG | 0 canvas, 151 SVG; chữ là `<text class="trace-hf">` |
| Preview page 1 | viewBox `0 0 440 600`, 1 ô = 10 unit; 11 cột × 4 ô |
| In A4 | 2 trang, 594,96 × 841,92 pts; ô ≈ 4,06 mm; lề T 31 / P 15 / trên 31 / dưới 20 mm |
| Chiều cao mực B, b | ≈ 32 px @ 150 dpi ≈ 5,4 mm ≈ 1,33 ô, đáy tại đường giữa |
| Mobile | scrollWidth 592, h-scroll có; 34/45 target &lt; 44px |
| LCP / contrast chữ mẫu | Không phải landing marketing; chữ mẫu xám-xanh trên nền trắng, đọc được (không đo WCAG từng chấm) |

Ảnh nên xem: `tv-print-page-1.png`, `tv-crop-B-grid.png`, `tv-compare-side.png`, `tv-1440-home.png`, `ref-qd31-chart-white.png`.
