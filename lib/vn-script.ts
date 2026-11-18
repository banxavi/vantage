// Chữ thảo đứng, một nét giữa, theo nhóm chiều cao QĐ 31/2002 (cỡ vừa).
// Trục y xuống. 1 ô = 10. Đường nền y=50.
//   1 đv (2 ô): y=30 — a ă â e ê i o ô ơ u ư c n m v x
//   1,25: y=25 — r, s (có nét thắt)
//   1,5: y=20 — t
//   2: y=10 phía trên (d, đ) hoặc y=70 phía dưới (p, q)
//   2,5: y=0 — b h k l và chữ hoa; g, y khuyết tới y=78
//   G, Y hoa = 4 đv, đuôi tới y=78
// Dấu thanh nằm trong ô 0,5 đv (10×10), phía trên thân, không đè nét.

type Glyph = { w: number; d: string; top: number; bot: number }

const aBody =
  'M16 33C18 30 8 29 7 38C6 48 16 51 18 42M18 32V46C20 50 26 49 27 45'
const eBody =
  'M7 38H17M17 37C16 30 6 30 6 38C6 48 14 51 20 44'
const oBody =
  'M18 34C22 30 22 48 14 50C6 51 4 40 6 34C8 28 14 29 18 34'
const uBody =
  'M6 32V42C6 50 16 50 16 42V32M16 32V46C18 50 24 49 25 45'

const glyphs: Record<string, Glyph> = {
  a: { w: 30, d: aBody, top: 30, bot: 50 },
  ă: { w: 30, d: `${aBody}M8 24C11 19 18 19 21 24`, top: 19, bot: 50 },
  â: { w: 30, d: `${aBody}M8 24L15 16L22 24`, top: 16, bot: 50 },
  b: {
    w: 30,
    d: 'M12 22C7 12 6 2 13 2C18 2 18 12 14 18C12 22 11 28 11 34V50M11 34C11 30 24 29 24 40C24 50 12 51 11 43',
    top: 2,
    bot: 50,
  },
  c: { w: 26, d: 'M20 34C18 29 7 29 7 39C7 49 16 52 22 45', top: 29, bot: 50 },
  d: {
    w: 30,
    d: 'M8 38C8 30 18 30 18 39C18 49 8 51 8 41M22 10V46C24 50 28 49 28 45',
    top: 10,
    bot: 50,
  },
  đ: {
    w: 32,
    d: 'M8 38C8 30 18 30 18 39C18 49 8 51 8 41M22 10V46C24 50 28 49 28 45M16 18H28',
    top: 10,
    bot: 50,
  },
  e: { w: 24, d: eBody, top: 30, bot: 50 },
  ê: { w: 24, d: `${eBody}M6 24L12 16L18 24`, top: 16, bot: 50 },
  f: { w: 24, d: 'M16 14C14 4 8 2 8 12V50M3 28H18', top: 2, bot: 50 },
  g: {
    w: 30,
    d: 'M8 38C8 30 18 30 18 39C18 48 8 50 8 41M18 40C22 54 20 74 12 76C6 77 4 68 10 64C14 61 18 66 18 58',
    top: 30,
    bot: 78,
  },
  h: {
    w: 30,
    d: 'M10 18C8 8 6 2 12 2C17 2 16 12 13 18C11 22 10 28 10 34V50M10 36C10 30 22 30 22 38V46C24 50 28 49 28 45',
    top: 2,
    bot: 50,
  },
  i: { w: 16, d: 'M8 30V46C10 50 15 49 15 45M8 20V23', top: 20, bot: 50 },
  j: { w: 18, d: 'M10 30V62C10 74 4 76 6 68M10 20V23', top: 20, bot: 76 },
  k: {
    w: 30,
    d: 'M8 2V50M18 26C12 30 8 34 10 38C12 42 16 38 14 34L24 50',
    top: 2,
    bot: 50,
  },
  l: {
    w: 22,
    d: 'M10 16C8 6 6 1 12 2C17 3 15 14 12 20V44C13 50 18 50 19 45',
    top: 1,
    bot: 50,
  },
  m: {
    w: 40,
    d: 'M6 50V34C6 30 14 30 14 36V50M14 36C14 30 22 30 22 36V50M22 36C22 30 30 30 30 36V46C32 50 36 49 36 45',
    top: 30,
    bot: 50,
  },
  n: {
    w: 28,
    d: 'M6 50V34C6 30 16 30 16 36V46C18 50 24 49 24 45',
    top: 30,
    bot: 50,
  },
  o: { w: 24, d: oBody, top: 29, bot: 50 },
  ô: { w: 24, d: `${oBody}M6 24L12 16L18 24`, top: 16, bot: 50 },
  ơ: { w: 28, d: `${oBody}M16 28C20 20 26 22 24 30`, top: 20, bot: 50 },
  p: {
    w: 28,
    d: 'M8 30V70M8 36C8 30 22 30 22 40C22 50 8 51 8 42',
    top: 30,
    bot: 70,
  },
  q: {
    w: 28,
    d: 'M8 38C8 30 18 30 18 39C18 49 8 51 8 41M20 30V70',
    top: 30,
    bot: 70,
  },
  r: {
    w: 26,
    d: 'M8 50V28M8 34C10 26 14 25 16 29C18 33 14 35 12 33',
    top: 25,
    bot: 50,
  },
  s: {
    w: 22,
    d: 'M16 28C12 24 5 26 7 32C9 38 15 36 14 42C13 48 5 49 7 44',
    top: 24,
    bot: 50,
  },
  t: {
    w: 24,
    d: 'M10 20V44C12 50 18 50 18 44M3 32H18',
    top: 20,
    bot: 50,
  },
  u: { w: 28, d: uBody, top: 32, bot: 50 },
  ư: { w: 32, d: `${uBody}M18 30C22 22 28 24 26 32`, top: 22, bot: 50 },
  v: { w: 26, d: 'M4 32L12 50L20 32', top: 32, bot: 50 },
  w: { w: 36, d: 'M3 32L9 50L16 36L23 50L30 32', top: 32, bot: 50 },
  x: { w: 24, d: 'M5 32L18 50M18 32L5 50', top: 32, bot: 50 },
  y: {
    w: 28,
    d: 'M4 32L12 48M20 32L12 48C10 62 6 76 8 76C11 76 14 68 13 58',
    top: 32,
    bot: 78,
  },
  z: { w: 24, d: 'M5 32H18L5 50H18', top: 32, bot: 50 },
  A: { w: 34, d: 'M4 50L17 2L30 50M10 32H24', top: 2, bot: 50 },
  Ă: { w: 36, d: 'M4 50L17 8L30 50M10 34H24M10 6C13 2 22 2 25 6', top: 2, bot: 50 },
  Â: { w: 34, d: 'M4 50L17 10L30 50M10 34H24M8 8L17 2L26 8', top: 2, bot: 50 },
  B: {
    w: 30,
    d: 'M8 4C6 0 14 0 14 8C14 16 8 16 8 16V50M8 8C16 6 20 12 18 18C16 24 8 22 8 22M8 24C18 22 22 32 20 40C18 50 8 50 8 42',
    top: 0,
    bot: 50,
  },
  C: { w: 28, d: 'M22 12C14 2 4 10 6 26C8 44 16 50 24 42', top: 2, bot: 50 },
  D: { w: 32, d: 'M8 4V46C8 52 14 50 12 46M8 6C20 4 28 16 26 28C24 44 12 50 8 46', top: 4, bot: 50 },
  Đ: {
    w: 34,
    d: 'M8 4V46C8 52 14 50 12 46M8 6C20 4 28 16 26 28C24 44 12 50 8 46M14 14H26',
    top: 4,
    bot: 50,
  },
  E: { w: 26, d: 'M8 4V50M8 4H22M8 26H18M8 50H22', top: 4, bot: 50 },
  Ê: { w: 26, d: 'M8 10V50M8 10H22M8 28H18M8 50H22M6 8L13 2L20 8', top: 2, bot: 50 },
  F: { w: 26, d: 'M8 4V50M8 4H22M8 26H18', top: 4, bot: 50 },
  G: {
    w: 32,
    d: 'M24 10C14 2 4 12 6 28C8 46 18 52 26 44C30 40 28 56 22 64C16 74 10 76 12 70C14 64 20 66 22 58',
    top: 2,
    bot: 78,
  },
  H: { w: 30, d: 'M7 4V50M23 4V50M7 26H23', top: 4, bot: 50 },
  I: { w: 14, d: 'M7 4V50', top: 4, bot: 50 },
  J: { w: 20, d: 'M14 4V40C14 50 6 52 6 42', top: 4, bot: 52 },
  K: { w: 30, d: 'M8 4V50M22 8C14 16 8 24 10 28C12 32 16 28 14 24L24 50', top: 4, bot: 50 },
  L: { w: 26, d: 'M8 4V50H22', top: 4, bot: 50 },
  M: { w: 36, d: 'M4 50V4L18 32L32 4V50', top: 4, bot: 50 },
  N: { w: 30, d: 'M6 50V4L24 50V4', top: 4, bot: 50 },
  O: { w: 30, d: 'M20 6C28 12 28 42 18 50C8 54 4 34 8 18C10 8 14 4 20 6', top: 4, bot: 50 },
  Ô: { w: 30, d: 'M20 12C28 16 28 42 18 50C8 54 4 34 8 20C10 12 14 8 20 12M8 8L15 2L22 8', top: 2, bot: 50 },
  Ơ: { w: 34, d: 'M20 10C28 14 28 42 18 50C8 54 4 34 8 18C10 10 14 6 20 10M22 8C26 2 32 4 30 12', top: 2, bot: 50 },
  P: { w: 28, d: 'M8 4V50M8 6C18 4 24 12 20 20C16 28 8 26 8 26', top: 4, bot: 50 },
  Q: { w: 32, d: 'M20 6C28 12 28 40 18 48C8 52 4 32 8 18C10 8 14 4 20 6M16 36C20 44 26 52 28 48', top: 4, bot: 52 },
  R: { w: 30, d: 'M8 4V50M8 6C18 4 24 12 18 20C14 26 8 24 8 24M14 22L26 50', top: 4, bot: 50 },
  S: { w: 26, d: 'M20 10C12 2 4 8 6 18C8 28 18 26 18 34C18 46 8 50 6 44', top: 2, bot: 50 },
  T: { w: 28, d: 'M4 6H24M14 6V50', top: 6, bot: 50 },
  U: { w: 30, d: 'M6 4V36C6 48 24 48 24 36V4', top: 4, bot: 50 },
  Ư: { w: 34, d: 'M6 8V36C6 48 22 48 22 36V8M24 6C28 0 34 2 32 10', top: 0, bot: 50 },
  V: { w: 30, d: 'M4 4L15 50L26 4', top: 4, bot: 50 },
  W: { w: 38, d: 'M2 4L10 50L18 16L26 50L34 4', top: 4, bot: 50 },
  X: { w: 28, d: 'M5 4L23 50M23 4L5 50', top: 4, bot: 50 },
  Y: {
    w: 30,
    d: 'M4 4L14 36M24 4L14 36C12 54 8 74 10 76C13 78 16 68 15 56',
    top: 4,
    bot: 78,
  },
  Z: { w: 28, d: 'M5 6H23L5 50H23', top: 6, bot: 50 },
  '0': { w: 22, d: 'M14 14C20 18 20 44 12 48C4 50 2 32 6 20C8 12 10 10 14 14', top: 10, bot: 50 },
  '1': { w: 16, d: 'M6 18C8 12 12 12 12 12V50', top: 12, bot: 50 },
  '2': { w: 22, d: 'M6 20C8 10 18 10 18 20C18 32 6 36 6 50H18', top: 10, bot: 50 },
  '3': { w: 22, d: 'M6 16C10 10 18 12 16 20C14 26 8 26 10 32C12 42 18 44 16 50C12 54 6 48 8 44', top: 10, bot: 50 },
  '4': { w: 22, d: 'M14 10V50M14 10L6 32H18', top: 10, bot: 50 },
  '5': { w: 22, d: 'M16 12H7L6 28C10 24 18 26 16 36C14 48 6 48 6 42', top: 12, bot: 50 },
  '6': { w: 22, d: 'M16 16C10 8 4 18 6 30C8 46 16 50 16 38C16 28 8 30 8 36', top: 8, bot: 50 },
  '7': { w: 22, d: 'M5 14H18L10 50', top: 14, bot: 50 },
  '8': { w: 22, d: 'M11 12C16 8 18 18 12 24C6 30 4 42 10 48C16 52 18 36 12 30C8 26 6 16 11 12', top: 8, bot: 50 },
  '9': { w: 22, d: 'M8 40C14 50 20 40 16 28C12 12 6 14 8 24C10 32 16 30 16 24', top: 12, bot: 50 },
  '-': { w: 16, d: 'M3 40H13', top: 40, bot: 40 },
}

const marks: Record<string, string> = {
  s: 'M1 8L9 1',
  f: 'M1 2L9 8',
  r: 'M2 3C5 0 9 4 6 8',
  x: 'M1 5C3 1 6 8 9 4',
  j: 'M5 7A1.7 1.7 0 1 1 5.2 7',
}

const TONE_KEYS = ['', 's', 'f', 'r', 'x', 'j'] as const

const VOWEL_FORMS: [string, string[]][] = [
  ['a', ['a', 'á', 'à', 'ả', 'ã', 'ạ']],
  ['ă', ['ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ']],
  ['â', ['â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ']],
  ['e', ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ']],
  ['ê', ['ê', 'ế', 'ề', 'ể', 'ễ', 'ệ']],
  ['i', ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị']],
  ['o', ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ']],
  ['ô', ['ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ']],
  ['ơ', ['ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ']],
  ['u', ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ']],
  ['ư', ['ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự']],
  ['y', ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ']],
  ['A', ['A', 'Á', 'À', 'Ả', 'Ã', 'Ạ']],
  ['Ă', ['Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ']],
  ['Â', ['Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ']],
  ['E', ['E', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ']],
  ['Ê', ['Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ']],
  ['I', ['I', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị']],
  ['O', ['O', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ']],
  ['Ô', ['Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ']],
  ['Ơ', ['Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ']],
  ['U', ['U', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ']],
  ['Ư', ['Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự']],
  ['Y', ['Y', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ']],
]

const baseOf: Record<string, string> = {}
const toneOf: Record<string, string> = {}
for (const [base, forms] of VOWEL_FORMS) {
  forms.forEach((form, index) => {
    baseOf[form] = base
    const tone = TONE_KEYS[index]
    if (tone) toneOf[form] = tone
  })
}

export type ScriptPart = { d: string; x: number; y: number }

export function layoutScript(text: string) {
  const gap = 4
  const space = glyphs.o.w
  let x = 2
  let spaced = false
  let top = 50
  let bottom = 50
  const parts: ScriptPart[] = []
  for (const ch of text.normalize('NFC')) {
    if (ch === ' ') {
      x += space
      spaced = false
      continue
    }
    const base = baseOf[ch] ?? ch
    const glyph = glyphs[base]
    if (!glyph) continue
    if (spaced) x += gap
    parts.push({ d: glyph.d, x, y: 0 })
    top = Math.min(top, glyph.top)
    bottom = Math.max(bottom, glyph.bot)
    const tone = toneOf[ch]
    if (tone) {
      const box = 10
      let my = glyph.top - box - 1
      let mx = x + (glyph.w - box) / 2
      if (my < 1) {
        my = 1
        mx = x + glyph.w - 2
      }
      parts.push({ d: marks[tone], x: mx, y: my })
      top = Math.min(top, my)
    }
    x += glyph.w
    spaced = true
  }
  return { parts, width: Math.max(18, x + 2), top, bottom }
}

export function strokeCues(d: string) {
  const cues: { x: number; y: number; x2: number; y2: number }[] = []
  const re = /M\s*(-?\d*\.?\d+)[\s,]+(-?\d*\.?\d+)/g
  let match: RegExpExecArray | null
  while ((match = re.exec(d))) {
    const x = Number(match[1])
    const y = Number(match[2])
    const rest = d.slice(match.index + match[0].length)
    const nums = rest.match(/-?\d*\.?\d+/g)
    let ax = x
    let ay = y + 8
    if (nums && nums.length) {
      if (/^\s*V/i.test(rest)) ay = Number(nums[0])
      else if (/^\s*H/i.test(rest)) ax = Number(nums[0])
      else if (nums.length >= 2) {
        ax = Number(nums[0])
        ay = Number(nums[1])
      }
    }
    const dx = ax - x
    const dy = ay - y
    const len = Math.hypot(dx, dy) || 1
    cues.push({ x, y, x2: x + (dx / len) * 8, y2: y + (dy / len) * 8 })
  }
  return cues
}
