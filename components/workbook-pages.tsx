import { useId } from 'react'
import { letterOf, type Lesson } from '@/lib/lessons'
import { gridMetrics, type WritingSize } from '@/lib/oliy'
import { layoutScript, strokeCues } from '@/lib/vn-script'

export type TraceStyle = 'fireworks' | 'dashed' | 'solid'

const GUIDE = [0, 0.25, 0.375, 0.5, 0.625]

function OlyGrid({ bands, cols, band }: { bands: number; cols: number; band: number }) {
  const oli = 10
  const width = cols * oli
  const bandPx = band * oli
  const height = bands * bandPx
  const lines = []
  for (let row = 0; row < bands; row += 1) {
    const y0 = row * bandPx
    GUIDE.forEach((frac, index) => {
      const y = y0 + bandPx * frac
      const kind = index === 0 ? 'oly-solid' : index === 2 ? 'oly-mid' : index === 4 ? 'oly-base' : 'oly-dash'
      lines.push(<line key={`${row}-${index}`} x1={0} y1={y} x2={width} y2={y} className={kind} />)
    })
  }
  lines.push(<line key="bottom" x1={0} y1={height} x2={width} y2={height} className="oly-solid" />)
  for (let col = 0; col <= cols; col += 4) {
    lines.push(<line key={`v${col}`} x1={col * oli} y1={0} x2={col * oli} y2={height} className="oly-vert" />)
  }
  return (
    <svg className="oly-grid" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {lines}
    </svg>
  )
}

function traceMm(token: string, rowMm: number) {
  return (layoutScript(token).width / 80) * rowMm
}

function fitCount(token: string, target: number, widthMm: number, rowMm: number) {
  const width = traceMm(token, rowMm)
  const minGap = 4
  let count = Math.max(1, target)
  while (count > 1 && count * width + (count + 1) * minGap > widthMm) count -= 1
  return count
}

function linePlan(token: string, word: boolean, rowMm: number, modelCol: number, totalRows: number) {
  const inner = 210 - 16 * 2
  const beside = fitCount(token, word ? 2 : 4, inner - modelCol - 4, rowMm)
  const open = fitCount(token, word ? 3 : 6, inner - 4, rowMm)
  const lines: { count: number; full: boolean }[] = []
  for (let i = 0; i < totalRows; i += 1) lines.push({ count: i === 0 ? beside : open, full: i > 0 })
  return lines
}

function TraceText({
  text,
  model = false,
  fontStyle = 'fireworks',
}: {
  text: string
  model?: boolean
  fontStyle?: TraceStyle
}) {
  const laid = layoutScript(text)
  const boxW = laid.width
  const boxH = 80
  const dotted = !model && fontStyle === 'fireworks'
  const dashed = !model && fontStyle === 'dashed'
  const ink = model ? '#2a67d8' : dotted ? '#8f9eac' : '#8b98a6'
  const viewBox = model
    ? `${-4} ${Math.min(0, laid.top) - 4} ${boxW + 12} ${Math.max(boxH, laid.bottom) - Math.min(0, laid.top) + 8}`
    : `0 0 ${boxW} ${boxH}`
  const markerId = useId().replace(/:/g, '')
  const cues = model
    ? laid.parts.flatMap((part) => strokeCues(part.d).map((cue) => ({ ...cue, ox: part.x, oy: part.y })))
    : []
  return (
    <svg
      className={model ? 'trace-svg model' : 'trace-svg'}
      viewBox={viewBox}
      preserveAspectRatio={model ? 'xMidYMid meet' : 'xMinYMin meet'}
      role="img"
      aria-label={text}
    >
      {model ? (
        <defs>
          <marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0L6 3L0 6Z" fill="#e23d32" />
          </marker>
        </defs>
      ) : null}
      <g fill="none" stroke={ink} strokeWidth={model ? 3.3 : dotted ? 1.7 : 2.1} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dotted ? '0.2 3.1' : dashed ? '3.6 2.2' : undefined}>
        {laid.parts.map((part) => (
          <path key={`${part.x}-${part.y}-${part.d.slice(0, 12)}`} d={part.d} transform={`translate(${part.x} ${part.y})`} />
        ))}
      </g>
      {cues.map((cue, index) => (
        <g key={`cue-${index}`} transform={`translate(${cue.ox} ${cue.oy})`}>
          <line x1={cue.x} y1={cue.y} x2={cue.x2} y2={cue.y2} stroke="#e23d32" strokeWidth="1.3" markerEnd={`url(#${markerId})`} />
          <circle cx={cue.x} cy={cue.y} r="3.1" fill="#fff" stroke="#e23d32" strokeWidth="0.8" />
          <text x={cue.x} y={cue.y + 1.5} textAnchor="middle" fontSize="4.2" fontFamily="Arial, sans-serif" fill="#e23d32">
            {index + 1}
          </text>
        </g>
      ))}
    </svg>
  )
}

function ModelFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="model-frame">
      <svg className="octagon" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="30,2 70,2 98,30 98,70 70,98 30,98 2,70 2,30" fill="#fff" stroke="#d09a2c" strokeWidth="3.4" strokeLinejoin="round" />
      </svg>
      <div className="model-frame-body">{children}</div>
    </div>
  )
}

function PracticeBlock({
  model,
  token,
  fontStyle = 'fireworks',
  word = false,
  rows,
  rowMm,
  modelCol,
}: {
  model: React.ReactNode
  token: string
  fontStyle?: TraceStyle
  word?: boolean
  rows: number
  rowMm: number
  modelCol: number
}) {
  const lines = linePlan(token, word, rowMm, modelCol, rows)
  return (
    <div className={word ? 'practice-block word' : 'practice-block'}>
      <div className="practice-model">
        <ModelFrame>{model}</ModelFrame>
      </div>
      {lines.map((line, index) => (
        <div className={line.full ? 'practice-line full' : 'practice-line'} key={`${token}-${index}`}>
          <div className="trace-row">
            {Array.from({ length: line.count }, (_, copy) => (
              <TraceText key={copy} text={token} fontStyle={fontStyle} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function SheetFooter({ student, className, pageNo, unitNo }: { student: string; className: string; pageNo: number; unitNo?: number }) {
  const who = [student.trim(), className.trim()].filter(Boolean).join(' · ')
  return (
    <footer className="sheet-footer">
      <span>{who || (unitNo ? `Bài ${unitNo}` : 'Vở ô ly')}</span>
      <span>Trang {pageNo}</span>
    </footer>
  )
}

function GridStage({ bands, cols, band, children }: { bands: number; cols: number; band: number; children: React.ReactNode }) {
  return (
    <div className="grid-stage" style={{ ['--rows' as string]: bands }}>
      <OlyGrid bands={bands} cols={cols} band={band} />
      <div className="grid-content">{children}</div>
    </div>
  )
}

function sheetStyle(cell: number, cols: number, modelCol: number, band: number) {
  return {
    ['--cell' as string]: `${cell}mm`,
    ['--cols' as string]: cols,
    ['--band' as string]: band,
    ['--row' as string]: `${cell * band}mm`,
    ['--model-col' as string]: `${modelCol}mm`,
  }
}

export function CoverSheet({ title, student, className, lessons, focusId }: { title: string; student: string; className: string; lessons: Lesson[]; focusId?: string }) {
  return (
    <article className="cover-sheet">
      <div className="cover-hero">
        <p className="cover-kicker">Vở ô ly · Lớp 1</p>
        <h2>{title || 'Luyện viết từ'}</h2>
        <p>Viết theo nét, rồi viết lại cho đều và rõ.</p>
      </div>
      <div className="cover-fields">
        <div>
          <span>Họ và tên</span>
          <strong>{student.trim() || ' '}</strong>
        </div>
        <div>
          <span>Lớp</span>
          <strong>{className.trim() || ' '}</strong>
        </div>
      </div>
      <ol className="cover-units">
        {lessons.map((lesson, index) => ({ lesson, index })).filter(({ lesson }) => !focusId || lesson.id === focusId).map(({ lesson, index }) => (
          <li key={lesson.id}>
            <em>Bài {index + 1}</em>
            <span>{lesson.theme || 'Chủ đề'}</span>
            <strong>{letterOf(lesson.letter).toUpperCase()}</strong>
          </li>
        ))}
      </ol>
    </article>
  )
}

export function LetterSheet({
  lesson,
  unitNo,
  pageNo,
  student,
  className,
  fontStyle = 'fireworks',
  writingSize = 'vua',
}: {
  lesson: Lesson
  unitNo: number
  pageNo: number
  student: string
  className: string
  fontStyle?: TraceStyle
  writingSize?: WritingSize
}) {
  const upper = letterOf(lesson.letter).toUpperCase()
  const lower = letterOf(lesson.letter).toLowerCase()
  const focus = lesson.focus.trim() || 'từ'
  const metrics = gridMetrics(writingSize)
  const same = upper === lower
  const blocks = same
    ? [
        { token: upper, rows: 2, word: false },
        { token: focus, rows: 2, word: true },
      ]
    : [
        { token: upper, rows: 2, word: false },
        { token: lower, rows: 2, word: false },
        { token: focus, rows: 1, word: true },
      ]
  return (
    <article className="a4-paper" id={`unit-${lesson.id}`} style={sheetStyle(metrics.cell, metrics.cols, metrics.modelCol, metrics.band)}>
      <header className="wb-banner">
        <span className="unit-badge">Bài {unitNo}</span>
        <h2>{lesson.theme.trim() || 'Chủ đề bài viết'}</h2>
      </header>
      <p className="write-label">Tô chữ, rồi viết.</p>
      <GridStage bands={blocks.reduce((sum, block) => sum + block.rows, 0)} cols={metrics.cols} band={metrics.band}>
        {blocks.map((block) => (
          <PracticeBlock
            key={block.token + block.word}
            fontStyle={fontStyle}
            token={block.token}
            rows={block.rows}
            word={block.word}
            rowMm={metrics.rowMm}
            modelCol={metrics.modelCol}
            model={<TraceText text={block.token} model fontStyle={fontStyle} />}
          />
        ))}
      </GridStage>
      <SheetFooter student={student} className={className} pageNo={pageNo} unitNo={unitNo} />
    </article>
  )
}

export function WordSheet({
  lesson,
  unitNo,
  pageNo,
  words,
  student,
  className,
  fontStyle = 'fireworks',
  writingSize = 'vua',
}: {
  lesson: Lesson
  unitNo: number
  pageNo: number
  words: string[]
  student: string
  className: string
  fontStyle?: TraceStyle
  writingSize?: WritingSize
}) {
  const items = words.length ? words : [lesson.focus.trim() || 'từ']
  const metrics = gridMetrics(writingSize)
  return (
    <article className="a4-paper word-paper" style={sheetStyle(metrics.cell, metrics.cols, metrics.modelCol, metrics.band)}>
      <div className="scallop" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <path fill="#8eb6e8" d="M0 0h1200v46Q1150 86 1100 46t-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0V0z" />
          <path fill="#fff" d="M0 24Q50 68 100 24t100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0V90H0z" />
        </svg>
      </div>
      <GridStage bands={items.length * 2} cols={metrics.cols} band={metrics.band}>
        {items.map((word, index) => (
          <PracticeBlock
            key={`${word}-${index}`}
            word
            fontStyle={fontStyle}
            token={word}
            rows={2}
            rowMm={metrics.rowMm}
            modelCol={metrics.modelCol}
            model={<TraceText text={word} model fontStyle={fontStyle} />}
          />
        ))}
      </GridStage>
      <SheetFooter student={student} className={className} pageNo={pageNo} unitNo={unitNo} />
    </article>
  )
}

export function pagesFor(lessons: Lesson[], scope: 'book' | 'unit', activeId: string) {
  const chosen = scope === 'book' ? lessons : lessons.filter((lesson) => lesson.id === activeId)
  const pages: { key: string; node: 'cover' | 'letter' | 'words'; lesson?: Lesson; unitNo: number; words?: string[] }[] = [
    { key: 'cover', node: 'cover', unitNo: 0 },
  ]
  chosen.forEach((lesson) => {
    const unitNo = lessons.findIndex((item) => item.id === lesson.id) + 1
    pages.push({ key: `${lesson.id}-letter`, node: 'letter', lesson, unitNo })
    const words = lesson.words.map((word) => word.trim()).filter(Boolean)
    const chunks: string[][] = []
    for (let index = 0; index < Math.max(words.length, 1); index += 2) chunks.push(words.slice(index, index + 2))
    chunks.forEach((chunk, index) => {
      pages.push({ key: `${lesson.id}-words-${index}`, node: 'words', lesson, unitNo, words: chunk })
    })
  })
  return pages
}
