// Lưới ô ly cỡ in. 1 ô = 5 mm. Cỡ vừa: 1 đơn vị = 2 ô.
export const OLI_MM = 5
export const MARGIN_MM = 16

export type WritingSize = 'vua' | 'nho'

// Cỡ vừa: 5 ô trên đường nền + 3 ô nét khuyết dưới.
// Cỡ nhỏ: 1 đơn vị = 1 ô, nên dải kẻ cao bằng một nửa.
export function bandOli(size: WritingSize) {
  return size === 'vua' ? 8 : 4
}

export function gridMetrics(size: WritingSize) {
  const cell = OLI_MM
  const band = bandOli(size)
  const innerW = 210 - MARGIN_MM * 2
  const cols = Math.floor(innerW / cell)
  const rowMm = band * cell
  return {
    cell,
    band,
    cols,
    rowMm,
    modelCol: Math.min(rowMm * 0.9, 36),
  }
}
