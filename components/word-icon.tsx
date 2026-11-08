type Cmd =
  | { t: 'p'; d: string; fill?: string }
  | { t: 'c'; cx: number; cy: number; r: number; fill?: string }
  | { t: 'e'; cx: number; cy: number; rx: number; ry: number; fill?: string }
  | { t: 'r'; x: number; y: number; w: number; h: number; rx?: number; fill?: string }

const ink = '#243140'

const icons: Record<string, Cmd[]> = {
  book: [
    { t: 'p', d: 'M12 18c6-7 12-7 20 0v32c-8-7-14-7-20 0z' },
    { t: 'p', d: 'M32 18c8-7 14-7 20 0v32c-6-7-12-7-20 0z' },
    { t: 'p', d: 'M32 18v32' },
  ],
  ball: [
    { t: 'c', cx: 32, cy: 34, r: 16 },
    { t: 'p', d: 'M18 27c9-5 19-5 28 0M17 34h30M18 41c9 5 19 5 28 0' },
  ],
  bike: [
    { t: 'c', cx: 18, cy: 46, r: 8 },
    { t: 'c', cx: 46, cy: 46, r: 8 },
    { t: 'p', d: 'M18 46 30 28h12l4 18M30 28 22 46M38 28 36 20h-8M42 24h8M46 24l2 4' },
  ],
  cake: [
    { t: 'p', d: 'M16 34h32l-4 16H20z' },
    { t: 'p', d: 'M18 34c0-10 28-10 28 0' },
    { t: 'c', cx: 32, cy: 22, r: 3, fill: ink },
    { t: 'p', d: 'M32 19V15M22 42h6M36 42h6' },
  ],
  cat: [
    { t: 'e', cx: 34, cy: 38, rx: 14, ry: 12 },
    { t: 'p', d: 'M22 30 16 14l14 12M42 26l10-12-2 16M24 50c6 8 16 6 22-2' },
    { t: 'c', cx: 28, cy: 36, r: 1.6, fill: ink },
    { t: 'c', cx: 40, cy: 36, r: 1.6, fill: ink },
    { t: 'p', d: 'M32 40v4M29 44h6' },
  ],
  car: [
    { t: 'p', d: 'M10 40h44v10H10z' },
    { t: 'p', d: 'M16 40 22 28h16l8 12' },
    { t: 'p', d: 'M24 28v12M38 28v12' },
    { t: 'c', cx: 20, cy: 50, r: 5 },
    { t: 'c', cx: 44, cy: 50, r: 5 },
  ],
  cup: [
    { t: 'p', d: 'M16 18h28l-3 26a10 10 0 0 1-10 8H28a10 10 0 0 1-10-8z' },
    { t: 'p', d: 'M44 24h6a8 8 0 0 1 0 16h-8' },
    { t: 'p', d: 'M22 14c2-4 4-4 4 0M30 14c2-4 4-4 4 0' },
  ],
  apple: [
    { t: 'p', d: 'M32 22c-10 0-18 8-18 18 0 10 8 16 18 16s18-6 18-16c0-10-8-18-18-18z' },
    { t: 'p', d: 'M32 22c2-8 10-10 14-8' },
    { t: 'p', d: 'M32 24c6-2 10 2 12 6' },
  ],
  hat: [
    { t: 'p', d: 'M14 40h36' },
    { t: 'p', d: 'M20 40c0-14 24-14 24 0' },
    { t: 'p', d: 'M22 28h20' },
    { t: 'e', cx: 32, cy: 40, rx: 20, ry: 6 },
  ],
  bag: [
    { t: 'p', d: 'M18 26h28l-2 28H20z' },
    { t: 'p', d: 'M24 26c0-8 16-8 16 0' },
    { t: 'p', d: 'M28 36v8M36 36v8' },
  ],
  can: [
    { t: 'e', cx: 32, cy: 18, rx: 12, ry: 5 },
    { t: 'p', d: 'M20 18v28c0 4 24 4 24 0V18' },
    { t: 'e', cx: 32, cy: 46, rx: 12, ry: 5 },
    { t: 'p', d: 'M20 24c8 3 16 3 24 0' },
  ],
  dog: [
    { t: 'e', cx: 34, cy: 36, rx: 14, ry: 13 },
    { t: 'p', d: 'M20 30 12 18l10 6M44 24c8-6 14 2 10 10' },
    { t: 'c', cx: 28, cy: 34, r: 1.6, fill: ink },
    { t: 'c', cx: 40, cy: 34, r: 1.6, fill: ink },
    { t: 'p', d: 'M30 42h8M34 42v4' },
    { t: 'e', cx: 22, cy: 48, rx: 6, ry: 4 },
  ],
  desk: [
    { t: 'p', d: 'M10 28h44v6H10z' },
    { t: 'p', d: 'M16 34v16M48 34v16M14 50h8M42 50h8' },
    { t: 'r', x: 26, y: 18, w: 12, h: 10, rx: 1 },
  ],
  door: [
    { t: 'r', x: 18, y: 10, w: 28, h: 44, rx: 2 },
    { t: 'c', cx: 40, cy: 34, r: 2, fill: ink },
    { t: 'p', d: 'M18 54h28' },
  ],
  duck: [
    { t: 'e', cx: 30, cy: 40, rx: 16, ry: 12 },
    { t: 'c', cx: 46, cy: 30, r: 8 },
    { t: 'p', d: 'M52 30h10l-4 4h-6' },
    { t: 'c', cx: 48, cy: 28, r: 1.3, fill: ink },
    { t: 'p', d: 'M22 50c4 6 12 6 16 0' },
  ],
  milk: [
    { t: 'p', d: 'M22 16h20l4 8v28H18V24z' },
    { t: 'p', d: 'M22 16l4-6h12' },
    { t: 'p', d: 'M18 28h28M24 36h8l-2 10h-4z' },
  ],
  fish: [
    { t: 'e', cx: 30, cy: 34, rx: 16, ry: 10 },
    { t: 'p', d: 'M46 34 58 22v24z' },
    { t: 'c', cx: 22, cy: 32, r: 1.7, fill: ink },
    { t: 'p', d: 'M28 24c4-6 10-6 12-2' },
  ],
  chips: [
    { t: 'p', d: 'M22 28 32 54 42 28z' },
    { t: 'p', d: 'M20 28h24' },
    { t: 'p', d: 'M28 18l2 10M34 14l-1 14M31 20l6 8' },
  ],
  chicken: [
    { t: 'e', cx: 32, cy: 38, rx: 16, ry: 12 },
    { t: 'c', cx: 46, cy: 26, r: 7 },
    { t: 'p', d: 'M50 26h8l-3 4h-5M20 36c-6 2-8 8-4 10M18 48l6 6M40 48l6 6' },
    { t: 'c', cx: 48, cy: 24, r: 1.2, fill: ink },
  ],
  pencil: [
    { t: 'p', d: 'M14 46 40 14l8 8L22 54z' },
    { t: 'p', d: 'M14 46l-4 10 10-4M40 14l8 8M18 42l8 8' },
  ],
  pen: [
    { t: 'p', d: 'M38 10 50 22 24 52h-8v-8z' },
    { t: 'p', d: 'M34 16l8 8M16 44l6 6' },
  ],
  bell: [
    { t: 'p', d: 'M32 12v4' },
    { t: 'p', d: 'M20 42c0-14 24-14 24 0' },
    { t: 'p', d: 'M16 42h32' },
    { t: 'p', d: 'M28 42c0 6 8 6 8 0' },
    { t: 'c', cx: 32, cy: 14, r: 2, fill: ink },
  ],
  red: [
    { t: 'p', d: 'M18 40 32 16l14 24z' },
    { t: 'r', x: 16, y: 40, w: 32, h: 10, rx: 2 },
    { t: 'p', d: 'M22 40v10M32 40v10M42 40v10' },
  ],
  gate: [
    { t: 'p', d: 'M12 54V22M52 54V22M12 26h40M12 54h40' },
    { t: 'p', d: 'M12 22 32 12 52 22M24 26v28M32 18v36M40 26v28' },
  ],
  garden: [
    { t: 'c', cx: 32, cy: 24, r: 6 },
    { t: 'c', cx: 20, cy: 30, r: 6 },
    { t: 'c', cx: 44, cy: 30, r: 6 },
    { t: 'p', d: 'M32 30v20M24 50h16M32 36c8 2 10 8 8 12' },
  ],
  goat: [
    { t: 'e', cx: 32, cy: 38, rx: 14, ry: 12 },
    { t: 'p', d: 'M22 30 16 12M26 28 24 12M42 30l6-18M38 28l2-16' },
    { t: 'c', cx: 26, cy: 38, r: 1.5, fill: ink },
    { t: 'c', cx: 38, cy: 38, r: 1.5, fill: ink },
    { t: 'p', d: 'M28 46h8' },
  ],
  girl: [
    { t: 'c', cx: 32, cy: 16, r: 7 },
    { t: 'p', d: 'M32 23v10M24 30h16M22 52l10-16 10 16zM24 36 18 48M40 36l6 12' },
  ],
  hand: [
    { t: 'p', d: 'M24 30v16a10 10 0 0 0 20 0V22' },
    { t: 'p', d: 'M24 30V18M30 28V14M36 28V16M42 30V20' },
  ],
  horse: [
    { t: 'p', d: 'M18 48c2-16 10-22 20-22 6 0 10 4 14 2 2 6-2 10-2 16' },
    { t: 'p', d: 'M38 28c8-10 16-8 16-2M22 36h8M46 40h8' },
    { t: 'c', cx: 28, cy: 34, r: 1.4, fill: ink },
  ],
  hair: [
    { t: 'p', d: 'M18 18c6 20 8 28 6 36M28 12c4 18 4 30 2 40M38 16c2 16 6 28 8 36M48 20c0 14 2 24 6 32' },
  ],
  head: [
    { t: 'c', cx: 32, cy: 28, r: 14 },
    { t: 'p', d: 'M20 40c-2 12 6 16 12 16h8c8 0 12-6 10-14' },
    { t: 'p', d: 'M24 26h6M36 26h4M28 34c3 3 8 3 10 0' },
  ],
  locks: [
    { t: 'r', x: 16, y: 28, w: 32, h: 24, rx: 3 },
    { t: 'p', d: 'M22 28v-6a10 10 0 0 1 20 0v6' },
    { t: 'c', cx: 32, cy: 40, r: 3 },
    { t: 'p', d: 'M32 43v5' },
  ],
  clocks: [
    { t: 'c', cx: 32, cy: 34, r: 16 },
    { t: 'p', d: 'M32 34V22M32 34l8 6M32 14v4M32 50v4M16 34h4M44 34h4' },
  ],
  mops: [
    { t: 'p', d: 'M34 10v28' },
    { t: 'p', d: 'M18 38h28l-2 8c-8 8-16 8-24 0z' },
    { t: 'p', d: 'M22 46v6M28 48v6M34 48v6M40 46v6' },
  ],
  pots: [
    { t: 'p', d: 'M16 26h32l-4 22H20z' },
    { t: 'p', d: 'M14 26h36M22 26c0-8 20-8 20 0M18 36h4M42 36h4' },
  ],
  mango: [
    { t: 'p', d: 'M20 36c0-12 10-20 22-16 8 8 8 22-2 30-12 6-20-2-20-14z' },
    { t: 'p', d: 'M36 20c4-6 10-6 12-2' },
  ],
  mother: [
    { t: 'c', cx: 32, cy: 16, r: 7 },
    { t: 'p', d: 'M22 30c2 16 6 26 10 26s8-10 10-26c-6 4-14 4-20 0zM24 34 16 48M40 34l8 14' },
  ],
  mouse: [
    { t: 'e', cx: 32, cy: 40, rx: 16, ry: 12 },
    { t: 'c', cx: 20, cy: 22, r: 7 },
    { t: 'c', cx: 40, cy: 20, r: 7 },
    { t: 'c', cx: 26, cy: 38, r: 1.5, fill: ink },
    { t: 'c', cx: 38, cy: 38, r: 1.5, fill: ink },
    { t: 'p', d: 'M32 42v3M46 44c8 2 10 8 6 10' },
  ],
  monkey: [
    { t: 'c', cx: 32, cy: 34, r: 14 },
    { t: 'c', cx: 14, cy: 32, r: 6 },
    { t: 'c', cx: 50, cy: 32, r: 6 },
    { t: 'e', cx: 32, cy: 40, rx: 7, ry: 5 },
    { t: 'c', cx: 26, cy: 32, r: 1.6, fill: ink },
    { t: 'c', cx: 38, cy: 32, r: 1.6, fill: ink },
  ],
  bus: [
    { t: 'r', x: 10, y: 18, w: 44, h: 28, rx: 4 },
    { t: 'p', d: 'M10 30h44M18 18v12M30 18v12M42 18v12' },
    { t: 'c', cx: 22, cy: 48, r: 5 },
    { t: 'c', cx: 44, cy: 48, r: 5 },
  ],
  sun: [
    { t: 'c', cx: 32, cy: 34, r: 10 },
    { t: 'p', d: 'M32 12v8M32 48v8M14 34h8M42 34h8M18 20l6 6M40 42l6 6M46 20l-6 6M24 42l-6 6' },
  ],
  run: [
    { t: 'c', cx: 36, cy: 14, r: 5 },
    { t: 'p', d: 'M34 20 24 32l10 4 6 14M28 30 16 28M30 34l12 6M22 50l8-10M42 36l8 4' },
  ],
  truck: [
    { t: 'p', d: 'M8 24h28v18H8zM36 30h12l6 8v4H36z' },
    { t: 'c', cx: 18, cy: 46, r: 5 },
    { t: 'c', cx: 46, cy: 46, r: 5 },
  ],
  lake: [
    { t: 'p', d: 'M8 28c6 6 10 6 16 0s10-6 16 0 10 6 16 0' },
    { t: 'p', d: 'M8 40c6 6 10 6 16 0s10-6 16 0 10 6 16 0' },
    { t: 'p', d: 'M8 52c6 6 10 6 16 0s10-6 16 0 10 6 16 0' },
  ],
  leaf: [
    { t: 'p', d: 'M14 46C18 20 40 12 54 14 42 28 30 40 14 46z' },
    { t: 'p', d: 'M18 42c10-6 20-16 28-26' },
  ],
  lemon: [
    { t: 'e', cx: 32, cy: 36, rx: 16, ry: 12 },
    { t: 'p', d: 'M46 28c6-2 8 4 4 8M18 30c-4 4-2 8 2 8' },
  ],
  bananas: [
    { t: 'p', d: 'M18 40c8-16 20-20 28-16-8 2-14 10-16 22-6-2-10-2-12-6z' },
    { t: 'p', d: 'M24 42c8-14 18-16 26-12' },
    { t: 'p', d: 'M40 18c4 2 6 2 8-2' },
  ],
  nuts: [
    { t: 'e', cx: 32, cy: 36, rx: 14, ry: 16 },
    { t: 'p', d: 'M32 20c4 6 4 22 0 32M24 28c6 4 12 4 16 0' },
  ],
  noodles: [
    { t: 'p', d: 'M14 30h36c-2 16-10 22-18 22S16 46 14 30z' },
    { t: 'p', d: 'M22 30c2 8 4 12 2 16M30 28c2 8 2 14 0 18M38 30c0 8-2 12-2 16M24 24c2-6 4-6 6-2M34 22c2-4 5-4 6 0' },
  ],
  turtle: [
    { t: 'e', cx: 32, cy: 36, rx: 14, ry: 10 },
    { t: 'c', cx: 48, cy: 32, r: 5 },
    { t: 'p', d: 'M24 44l-4 8M32 46v8M40 44l4 8M22 32l-8-2M22 38l-8 4' },
  ],
  tiger: [
    { t: 'c', cx: 32, cy: 34, r: 16 },
    { t: 'p', d: 'M20 24 16 14l8 6M44 24l4-10-8 6M22 30h6M36 30h6M24 42c4 4 12 4 16 0' },
    { t: 'c', cx: 26, cy: 34, r: 1.6, fill: ink },
    { t: 'c', cx: 38, cy: 34, r: 1.6, fill: ink },
  ],
  teddy: [
    { t: 'c', cx: 32, cy: 38, r: 14 },
    { t: 'c', cx: 16, cy: 22, r: 7 },
    { t: 'c', cx: 48, cy: 22, r: 7 },
    { t: 'e', cx: 32, cy: 42, rx: 6, ry: 4 },
    { t: 'c', cx: 26, cy: 36, r: 1.6, fill: ink },
    { t: 'c', cx: 38, cy: 36, r: 1.6, fill: ink },
  ],
  top: [
    { t: 'p', d: 'M32 14v8' },
    { t: 'p', d: 'M16 32h32L32 54z' },
    { t: 'p', d: 'M32 22v10M24 18h16' },
  ],
  face: [
    { t: 'c', cx: 32, cy: 32, r: 18 },
    { t: 'c', cx: 25, cy: 28, r: 2, fill: ink },
    { t: 'c', cx: 39, cy: 28, r: 2, fill: ink },
    { t: 'p', d: 'M24 38c4 6 12 6 16 0' },
  ],
  football: [
    { t: 'c', cx: 32, cy: 34, r: 16 },
    { t: 'p', d: 'M32 22l6 5-2 7h-8l-2-7zM26 27 18 30M38 27l8 3M24 41l-4 8M40 41l4 8M28 41l4 10 4-10' },
  ],
  foot: [
    { t: 'p', d: 'M16 36c0-8 8-14 16-10 4-6 14-6 16 2 6 2 8 10 4 16-2 8-10 10-28 8-8-2-8-8-8-16z' },
  ],
  father: [
    { t: 'c', cx: 32, cy: 14, r: 7 },
    { t: 'p', d: 'M32 22v16M22 28h20M24 54l8-16 8 16M26 18h12' },
  ],
  window: [
    { t: 'r', x: 14, y: 12, w: 36, h: 36, rx: 2 },
    { t: 'p', d: 'M32 12v36M14 30h36' },
  ],
  water: [
    { t: 'p', d: 'M32 10c8 12 16 18 16 28a16 16 0 0 1-32 0c0-10 8-16 16-28z' },
  ],
  wash: [
    { t: 'p', d: 'M22 16h8v10' },
    { t: 'p', d: 'M18 26h28v6H18z' },
    { t: 'p', d: 'M20 32c2 12 6 18 12 18s10-6 12-18' },
    { t: 'p', d: 'M28 18c2-4 6-4 8 0' },
  ],
}

const aliases: Record<string, string> = {
  lock: 'locks',
  clock: 'clocks',
  mop: 'mops',
  pot: 'pots',
  banana: 'bananas',
  nut: 'nuts',
  noodle: 'noodles',
  bear: 'teddy',
}

function lookup(name: string) {
  const clean = name.trim().toLowerCase()
  if (icons[clean]) return icons[clean]
  const words = clean.split(/\s+/)
  if (words.length > 1 && icons[words.join(' ')]) return icons[words.join(' ')]
  for (const word of words) {
    if (icons[word]) return icons[word]
    if (aliases[word]) return icons[aliases[word]]
  }
  return null
}

export function WordIcon({ name }: { name: string }) {
  const glyph = lookup(name)
  if (!glyph) {
    return <span className="icon-fallback">{name.trim().charAt(0).toUpperCase() || '?'}</span>
  }
  return (
    <svg className="line-icon" viewBox="0 0 64 64" aria-hidden="true">
      {glyph.map((cmd, index) => {
        const stroke = cmd.fill && cmd.t !== 'p' ? 'none' : ink
        const fill = cmd.fill ?? 'none'
        if (cmd.t === 'p') return <path key={index} d={cmd.d} fill={fill === ink ? ink : 'none'} stroke={ink} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        if (cmd.t === 'c') return <circle key={index} cx={cmd.cx} cy={cmd.cy} r={cmd.r} fill={fill} stroke={stroke} strokeWidth="2.3" />
        if (cmd.t === 'e') return <ellipse key={index} cx={cmd.cx} cy={cmd.cy} rx={cmd.rx} ry={cmd.ry} fill={fill} stroke={stroke} strokeWidth="2.3" />
        return <rect key={index} x={cmd.x} y={cmd.y} width={cmd.w} height={cmd.h} rx={cmd.rx ?? 2} fill={fill} stroke={stroke} strokeWidth="2.3" />
      })}
    </svg>
  )
}
