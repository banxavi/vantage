# Review nét đứt — Vở Xinh: bản cũ vs bản hiện tại

- **Thời điểm:** 19/11/2026, khoảng 20:38–20:45 (giờ Asia/Saigon, UTC+7).
- **Bản cũ (đo live):** https://vantage-rho-pearl.vercel.app/ — HTTP 200, đã bấm **Nét đứt**, đo computed/SVG và lấy pixel trên PDF in A4.
- **Bản hiện tại:** https://employers-mails-collective-printing.trycloudflare.com/ — **không vào được** lúc audit (TLS `unexpected eof`; tunnel Cloudflare chạy trên máy bạn, máy đang offline nên không còn đường vào). Số liệu bản hiện tại lấy từ lần đo **18/11/2026, ~23:22–23:40** (cùng máy đo, cùng phương pháp). Lần đó trang đang ở kiểu mặc định **Chấm sao** (font HelloFireworks). Mình **không đo lại được** kiểu Nét đứt trên bản hiện tại.
- **Source:** Next.js trên máy local. In: `@page` A4, `.a4-paper { print-color-adjust: exact; }`.
- **Không bịa:** mọi số dưới đây là attribute SVG, computed style, hoặc pixel trên ảnh in 150 dpi.

---

## 🌟 Điểm Tốt

- **Bản cũ đã có công thức nét đứt rõ, in được đúng màu.** Khi bấm “Nét đứt”, chữ luyện là **một path SVG dùng chung**, vẽ hai lớp: nét nền xám nhạt liền + nét đứt xám đậm đè lên (`stroke-linecap/linejoin: round`, `fill: none`). Chữ mẫu trong khung bát giác là nét xanh đặc, không dash. PDF 2 trang A4 giữ đúng màu nhờ `print-color-adjust: exact` (đo `colorAdjust: exact` khi emulate print; lúc xem trên màn hình computed là `economy`).
- **Cùng một path cho ba kiểu** (cấu trúc bản cũ, nên giữ): `fontStyle === "fireworks"` mới dùng font chấm; `"dashed"` và `"solid"` (Chữ rỗng) đều vẽ từ `parts[].d`. Không đổi glyph khi đổi kiểu tô.

---

## ⚠️ Lỗi UX/UI & Điểm Cần Cải Tiến

**High. Nét đứt trên tờ luyện của bản hiện tại (ảnh 18/11) không giống bản cũ.** Bản cũ “Nét đứt” là path mảnh, màu `#2a3036`, có lớp chữ mờ `#d5d8dc` bên dưới — nhìn thanh, nhẹ, đều. Bản hiện tại (kiểu đang mở lúc đo) dùng font **HelloFireworks**, `fill: #3d4b5c`, `stroke: none`: chấm nằm trong glyph, vòng anti-alias xám, trông **đậm hơn và “nặng mực” hơn**, dù độ sáng đo được của nhân chấm còn cao hơn nét `#2a3036`. Xem `tv-dash-compare.png`.

**Medium. Không đo được kiểu Nét đứt của bản hiện tại hôm nay** vì tunnel tắt. Ngày 18/11, bấm “Nét đứt” trên bản hiện tại **không đổi ảnh preview** (cần kiểm tra lại khi site lên: có thể click không ăn, hoặc style path chưa gắn). Nếu Cursor đã đổi sang path mới, hãy gắn đúng token bản cũ dưới đây — đừng đoán màu.

**Low.** Trên bản cũ, mọi dòng luyện (5 hàng chữ B) dùng **cùng một màu và cùng độ đậm** — median pixel luôn `#2a3036`, luminance 0,0287, không nhạt dần theo hàng. Không cần làm fade theo dòng trừ khi bạn chủ ý thêm.

---

## Bảng đo: bản cũ (Nét đứt) vs bản hiện tại (18/11, Chấm sao)

`uu` = đơn vị trong `viewBox` (chữ luyện thường cao 100). `px` / `mm` là kích thước **khi in A4**, `transform: none`, 1 CSS px = 25,4/96 mm. `--cell` = 13 mm. Độ sáng Y là relative luminance (sRGB).

### Chữ luyện (practice)

| Thuộc tính | Bản cũ — Nét đứt (đo 19/11) | Bản hiện tại — mặc định Chấm sao (đo 18/11) |
|---|---|---|
| Cách vẽ | 2 lớp `<path>` (nền + đứt) | `<text class="trace-hf">` font HelloFireworks |
| Fill | `none` | `#3d4b5c` / computed `rgb(61, 75, 92)`, opacity 1 |
| Stroke chữ mờ (nền) | `#d5d8dc` `rgb(213, 216, 220)`, Y token = **0,684** | không có lớp này |
| Độ rộng nền | `1.15` uu → in **0,713 px ≈ 0,189 mm** (chữ đơn); từ ~0,747 px ≈ 0,198 mm | — |
| Stroke nét đứt | `#2a3036` `rgb(42, 48, 54)`, Y token = **0,0287** | `stroke: none` (nét chấm là fill của font) |
| Độ rộng nét đứt | `1.45` uu → in **0,899 px ≈ 0,238 mm** (chữ đơn); từ ~0,943 px ≈ 0,250 mm | — |
| `stroke-dasharray` | **`3.4 2.2`** (uu) → in ≈ **2,11 px / 1,36 px** (0,56 mm / 0,36 mm) với chữ đơn | `none` |
| `stroke-dashoffset` | không đặt (0) | — |
| `stroke-linecap` / `linejoin` | **`round` / `round`** | — |
| Opacity | 1 (không đổi theo hàng) | 1 |
| Pixel trên PDF 150 dpi | Nhân nét median **đúng `#2a3036`**, Y = 0,0287, 5 hàng B giống nhau. Lớp nền trên giấy, do nét mảnh + khử răng cưa, pixel bắt được khoảng `#a0a3a6` (Y ≈ 0,36) — mỏng hơn token `#d5d8dc`. | Nhân chấm median **`#414f5f`** (gần `#3d4b5c`), Y ≈ **0,075**; viền AA `#79838f` (Y ≈ 0,22) |

### Chữ mẫu (model, khung bát giác)

| Thuộc tính | Bản cũ — Nét đứt | Bản hiện tại — Chấm sao (18/11) |
|---|---|---|
| Cách vẽ | `<path>`, không dash, không lớp nền | `<text class="trace-hf" fontSize="56" fill="#2a67d8">` |
| Stroke | `#2a67d8` `rgb(42, 103, 216)`, Y = **0,1515** | fill `#2a67d8`, stroke none |
| Độ rộng | `4.6` uu, viewBox cao 68 → in **5,456 px ≈ 1,444 mm** | — |
| Dash | không (`undefined`) | — |
| Pixel in | median **đúng `#2a67d8`** | nhân còn `#2a67d8` (p10), median AA **`#6b95e3`** (Y ≈ 0,30) vì font chấm trộn nền trắng |

### Lưới ô ly (hai bản trùng token CSS)

| Lớp | Token |
|---|---|
| `.oly-solid` | `stroke: #c4c4c4; stroke-width: 1.15px` |
| `.oly-mid` | `stroke: #b7b7b7; stroke-width: 1.2px` |
| `.oly-dash` | `stroke: #c8c8c8; stroke-width: .9px; stroke-dasharray: 2.1 2.3` |
| `.oly-vert` | `stroke: #d4d4d4; stroke-width: .75px` |

Chữ rỗng (bản cũ, đo DOM): mask nét trắng `6.4` + nét đen `3.1`, `fill: #3d4b5c` (luyện) / `#2a67d8` (mẫu). Không phải chủ đề lần này, nhưng cùng path.

Ảnh: `tv-dash-compare.png`, `tv-dash-compare-model.png`, `tv-old-dashed-page-1.png`, `tv-print-page-1.png` (bản hiện tại 18/11).

---

## 🛠️ Code Sửa Tối Ưu

Gắn token vào CSS variables, vẽ **một path** cho cả ba kiểu. Đơn vị `stroke-*` theo `viewBox` (chữ luyện cao 100, như bản cũ). Giữ `print-color-adjust: exact`.

```css
:root {
  /* Chữ luyện — Nét đứt (đo từ bản cũ) */
  --trace-dash: #2a3036;
  --trace-ghost: #d5d8dc;
  --trace-dash-width: 1.45;      /* user unit, viewBox height 100 */
  --trace-ghost-width: 1.15;
  --trace-dasharray: 3.4 2.2;
  --trace-cap: round;
  --trace-join: round;

  /* Chữ mẫu */
  --trace-model: #2a67d8;
  --trace-model-width: 4.6;      /* viewBox height 68 (bản cũ) */

  /* Chấm sao / chữ rỗng (fill) — bản cũ cũng dùng khi fireworks / hollow */
  --trace-fill: #3d4b5c;

  /* Lưới (giữ nguyên) */
  --oly-solid: #c4c4c4;
  --oly-mid: #b7b7b7;
  --oly-dash: #c8c8c8;
  --oly-vert: #d4d4d4;
}

.a4-paper {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
@media print {
  .a4-paper {
    box-shadow: none !important;
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    transform: none !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

```tsx
// components/TraceGlyph.tsx
type Style = "fireworks" | "dashed" | "solid"
type Props = { d: string; style: Style; model?: boolean; viewBox: string }

export function TraceGlyph({ d, style, model = false, viewBox }: Props) {
  const modelColor = "var(--trace-model)"
  const fillColor = "var(--trace-fill)"
  const cap = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

  if (style === "dashed" || (style === "solid" && model)) {
    return (
      <svg viewBox={viewBox} className={model ? "trace-svg model" : "trace-svg"} role="img">
        <g {...cap}>
          {!model && (
            <path d={d} stroke="var(--trace-ghost)" strokeWidth="var(--trace-ghost-width)" />
          )}
          <path
            d={d}
            stroke={model ? modelColor : "var(--trace-dash)"}
            strokeWidth={model ? "var(--trace-model-width)" : "var(--trace-dash-width)"}
            strokeDasharray={model ? undefined : "var(--trace-dasharray)"}
          />
        </g>
      </svg>
    )
  }

  if (style === "solid") {
    // Chữ rỗng: mask như bản cũ (6.4 / 3.1 uu)
    const id = useId().replace(/:/g, "")
    return (
      <svg viewBox={viewBox} className="trace-svg" role="img">
        <mask id={id} maskUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill="black" />
          <path d={d} stroke="white" strokeWidth="6.4" {...cap} />
          <path d={d} stroke="black" strokeWidth="3.1" {...cap} />
        </mask>
        <rect width="100%" height="100%" fill={model ? modelColor : fillColor} mask={`url(#${id})`} />
      </svg>
    )
  }

  // fireworks: chỉ khi còn giữ font chấm; không dùng cho Nét đứt
  return null
}
```

**Không** tô nét đứt bằng `fill: #3d4b5c` trên font HelloFireworks. **Không** đổi `#2a3036` thành đen thuần hay giảm opacity theo hàng — bản cũ không làm vậy.

---

## Prompt cho Cursor

```
Bạn đang sửa app “Vở Xinh” (Next.js App Router + Tailwind, source trên máy local).

Mục tiêu: kiểu “Nét đứt” phải giống phiên bản cũ https://vantage-rho-pearl.vercel.app/ về MÀU và ĐỘ ĐẬM NHẠT. Đây là số đo thật (19/11/2026), không bịa, không “gần đúng”.

Khi fontStyle === "dashed" (nút Nét đứt):

1) Dùng MỘT SVG path cho cả ba kiểu (dashed / solid-chữ rỗng / và sau này fireworks nếu còn). Không vẽ nét đứt bằng font HelloFireworks.

2) Chữ LUYỆN (model=false), hai lớp cùng path, fill="none", strokeLinecap="round", strokeLinejoin="round", opacity=1:
   - Lớp nền (chữ mờ, nét liền): stroke #d5d8dc, stroke-width 1.15 (user unit, viewBox cao 100 như bản cũ)
   - Lớp đứt đè lên: stroke #2a3036, stroke-width 1.45, stroke-dasharray "3.4 2.2", không đặt stroke-dashoffset
   Khi in A4 (210mm, transform none, 96 CSS px/inch), chữ đơn đo được ≈ 0,189 mm (nền) và ≈ 0,238 mm (nét đứt). Giữ tỷ lệ nếu đổi viewBox.

3) Chữ MẪU (model=true): một lớp, stroke #2a67d8, stroke-width 4.6, KHÔNG dash, KHÔNG lớp #d5d8dc (bản cũ viewBox cao 68; in ra ≈ 1,444 mm).

4) Không làm mờ dần theo hàng. Bản cũ 5 hàng chữ B, pixel median luôn #2a3036 (Y=0,0287).

5) In: giữ
   .a4-paper { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
   @media print { .a4-paper { box-shadow:none !important; width:210mm !important; height:297mm !important; margin:0 !important; transform:none !important; } }
   Đưa màu/độ rộng/dasharray vào CSS variables: --trace-dash, --trace-ghost, --trace-dash-width, --trace-ghost-width, --trace-dasharray, --trace-model, --trace-model-width, --trace-fill (#3d4b5c, chỉ dùng cho Chấm sao/Chữ rỗng).

6) Đối chiếu bằng mắt với https://vantage-rho-pearl.vercel.app/ (bật Nét đứt, in preview). Nét phải mảnh, xám đậm #2a3036 trên nền chữ mờ #d5d8dc — không được đậm/nặng như fill #3d4b5c của HelloFireworks.
```

---

## Phụ lục

| Hạng mục | Giá trị |
|---|---|
| Bản cũ HTTP | 200, title “Vở Xinh — Vở ô ly luyện viết từ” |
| Nút sau khi bấm Nét đứt | `class="on"` trên “Nét đứt”; 0 `<text>`, 672 `<path>` (gồm lưới/icon) |
| `--page-scale` preview | ≈ 1,285; in: `transform: none`, khổ 793,69 × 1122,52 px = 210 × 297 mm |
| Padding tờ | `9mm 12mm 8mm` |
| Bản hiện tại 19/11 | Tunnel Cloudflare lỗi TLS, không đo được |
