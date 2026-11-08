import { useId } from 'react'
import { letterOf, type Lesson } from '@/lib/lessons'
import { layoutScript } from '@/lib/vn-script'
import { hfTextWidth } from '@/lib/hello-fireworks'
import { WordIcon } from '@/components/word-icon'

export type TraceStyle = 'fireworks' | 'dashed' | 'solid'

const PAGE_INNER_W = 186
const LETTER_INNER_H = 246
const WORD_INNER_H = 258

function OlyGrid({ rows, cols }: { rows: number; cols: number }) {
  const size = 40
  const width = cols * size
  const height = rows * size
  const lines = []
  for (let row = 0; row < rows; row += 1) {
    const y = row * size
    lines.push(<line key={`t${row}`} x1={0} y1={y} x2={width} y2={y} className="oly-solid" />)
    lines.push(<line key={`a${row}`} x1={0} y1={y + size * 0.25} x2={width} y2={y + size * 0.25} className="oly-dash" />)
    lines.push(<line key={`m${row}`} x1={0} y1={y + size * 0.5} x2={width} y2={y + size * 0.5} className="oly-mid" />)
    lines.push(<line key={`b${row}`} x1={0} y1={y + size * 0.75} x2={width} y2={y + size * 0.75} className="oly-dash" />)
  }
  lines.push(<line key="bottom" x1={0} y1={height} x2={width} y2={height} className="oly-solid" />)
  for (let col = 0; col <= cols; col += 1) {
    lines.push(<line key={`v${col}`} x1={col * size} y1={0} x2={col * size} y2={height} className="oly-vert" />)
  }
  return (
    <svg className="oly-grid" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {lines}
    </svg>
  )
}

function traceBoxWidth(token: string) {
  return Math.max(hfTextWidth(token, 46) + 8, layoutScript(token).width + 2)
}

function fitCount(token: string, target: number, widthMm: number, cell: number) {
  const width = (traceBoxWidth(token) / 100) * cell
  const minGap = 8.5
  let count = Math.max(1, target)
  while (count > 1 && count * width + (count + 1) * minGap > widthMm) count -= 1
  return count
}

function modelColumn(cell: number) {
  return Math.min(3.15 * cell, 50)
}

function linePlan(token: string, word: boolean, cell: number, totalRows = 5) {
  const beside = fitCount(token, word ? 3 : 5, PAGE_INNER_W - modelColumn(cell) - 6, cell)
  const open = fitCount(token, word ? 4 : 7, PAGE_INNER_W - 0.25 * cell, cell)
  const besideRows = Math.min(word ? 2 : 3, totalRows)
  const openRows = Math.max(0, totalRows - besideRows)
  const lines: { count: number; full: boolean }[] = []
  for (let i = 0; i < besideRows; i += 1) {
    lines.push({ count: beside, full: false })
  }
  for (let i = 0; i < openRows; i += 1) {
    lines.push({ count: open, full: true })
  }
  return lines
}

function getWordRows(index: number, totalWords: number): number {
  if (totalWords <= 0) return 5
  const base = Math.floor(15 / totalWords)
  const remainder = 15 % totalWords
  if (base >= 3) {
    return base + (index < remainder ? 1 : 0)
  }
  return 3
}

function packSheet(entries: { token: string; word: boolean; rows?: number }[], innerH: number) {
  let best = { cell: 13, cols: 14, rows: 1 }
  for (let step = 185; step >= 120; step -= 1) {
    const cell = step / 10
    const rows = entries.reduce((sum, entry) => sum + linePlan(entry.token, entry.word, cell, entry.rows ?? 5).length, 0)
    const cols = Math.max(1, Math.floor(PAGE_INNER_W / cell))
    if (rows * cell <= innerH + 0.4 && cols * cell <= PAGE_INNER_W + 0.4) {
      best = { cell, cols, rows }
      break
    }
  }
  return { ...best, modelCol: modelColumn(best.cell) }
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
  if (fontStyle === 'fireworks') {
    if (model) {
      return (
        <svg
          className="trace-svg model"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={text}
        >
          <text
            x="50"
            y="66"
            textAnchor="middle"
            fontSize="56"
            className="trace-hf"
            fill="#2a67d8"
          >
            {text}
          </text>
        </svg>
      )
    }

    const width = hfTextWidth(text, 46)
    const boxW = Math.max(Math.ceil(width) + 8, 16)
    const boxH = 100
    const ink = '#3d4b5c'

    return (
      <svg
        className="trace-svg"
        viewBox={`0 0 ${boxW} ${boxH}`}
        preserveAspectRatio="xMinYMid meet"
        role="img"
        aria-label={text}
      >
        <text
          x="4"
          y="50"
          fontSize="46"
          className="trace-hf"
          fill={ink}
        >
          {text}
        </text>
      </svg>
    )
  }

  const laid = layoutScript(text)
  const descends = /[gjpqyGJY]/.test(text)
  const boxH = model ? (descends ? 100 : 68) : 100
  const boxW = model ? laid.width + 16 : laid.width
  const shiftX = model ? 8 : 0
  const shiftY = model ? 4 : 0
  const maskId = useId().replace(/:/g, '')
  const ink = model ? '#2a67d8' : '#3d4b5c'
  const strokes = () =>
    laid.parts.map((part) => (
      <path key={`${part.x}-${part.d.slice(0, 8)}`} d={part.d} transform={`translate(${part.x + shiftX} ${shiftY})`} />
    ))
  const shared = {
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  return (
    <svg className={model ? 'trace-svg model' : 'trace-svg'} viewBox={`0 0 ${boxW} ${boxH}`} preserveAspectRatio={model ? 'xMidYMid meet' : 'xMinYMid meet'} role="img" aria-label={text}>
      {!model && fontStyle === 'solid' ? (
        <>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={boxW} height={boxH}>
            <rect x="0" y="0" width={boxW} height={boxH} fill="black" />
            <g stroke="white" strokeWidth="6.4" {...shared}>
              {strokes()}
            </g>
            <g stroke="black" strokeWidth="3.1" {...shared}>
              {strokes()}
            </g>
          </mask>
          <rect x="0" y="0" width={boxW} height={boxH} fill={ink} mask={`url(#${maskId})`} />
        </>
      ) : (
        <g {...shared}>
          {model ? null : (
            <g stroke="#d5d8dc" strokeWidth="1.15">
              {strokes()}
            </g>
          )}
          <g stroke={model ? ink : '#2a3036'} strokeWidth={model ? 4.6 : 1.45} strokeDasharray={model ? undefined : '3.4 2.2'}>
            {strokes()}
          </g>
        </g>
      )}
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
  cell,
  rows = 5,
}: {
  model: React.ReactNode
  token: string
  fontStyle?: TraceStyle
  word?: boolean
  cell: number
  rows?: number
}) {
  const lines = linePlan(token, word, cell, rows)
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
      <span>{who || (unitNo ? `Unit ${unitNo}` : 'Vở ô ly')}</span>
      <span>Page {pageNo}</span>
    </footer>
  )
}

function GridStage({ rows, cols, children }: { rows: number; cols: number; children: React.ReactNode }) {
  return (
    <div className="grid-stage" style={{ ['--rows' as string]: rows }}>
      <OlyGrid rows={rows} cols={cols} />
      <div className="grid-content">{children}</div>
    </div>
  )
}

function sheetStyle(cell: number, cols: number, modelCol: number) {
  return {
    ['--cell' as string]: `${cell}mm`,
    ['--cols' as string]: cols,
    ['--model-col' as string]: `${modelCol}mm`,
  }
}

export function CoverSheet({ title, student, className, lessons }: { title: string; student: string; className: string; lessons: Lesson[] }) {
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
        {lessons.map((lesson, index) => (
          <li key={lesson.id}>
            <em>Unit {index + 1}</em>
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
}: {
  lesson: Lesson
  unitNo: number
  pageNo: number
  student: string
  className: string
  fontStyle?: TraceStyle
}) {
  const upper = letterOf(lesson.letter).toUpperCase()
  const lower = letterOf(lesson.letter).toLowerCase()
  const focus = lesson.focus.trim() || 'word'
  const packed = packSheet(
    [
      { token: upper, word: false, rows: 5 },
      { token: lower, word: false, rows: 5 },
      { token: focus, word: true, rows: 5 },
    ],
    LETTER_INNER_H,
  )
  return (
    <article className="a4-paper" id={`unit-${lesson.id}`} style={sheetStyle(packed.cell, packed.cols, packed.modelCol)}>
      <header className="wb-banner">
        <span className="unit-badge">Unit {unitNo}</span>
        <h2>{lesson.theme.trim() || 'Chủ đề bài viết'}</h2>
      </header>
      <p className="write-label">Write.</p>
      <GridStage rows={packed.rows} cols={packed.cols}>
        <PracticeBlock cell={packed.cell} fontStyle={fontStyle} token={upper} rows={5} model={<TraceText text={upper} model fontStyle={fontStyle} />} />
        <PracticeBlock cell={packed.cell} fontStyle={fontStyle} token={lower} rows={5} model={<TraceText text={lower} model fontStyle={fontStyle} />} />
        <PracticeBlock cell={packed.cell} word fontStyle={fontStyle} token={focus} rows={5} model={<WordIcon name={focus} />} />
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
}: {
  lesson: Lesson
  unitNo: number
  pageNo: number
  words: string[]
  student: string
  className: string
  fontStyle?: TraceStyle
}) {
  const items = words.length ? words : [lesson.focus.trim() || 'word']
  const entries = items.map((token, index) => ({
    token,
    word: true,
    rows: getWordRows(index, items.length),
  }))
  const packed = packSheet(entries, WORD_INNER_H)
  return (
    <article className="a4-paper word-paper" style={sheetStyle(packed.cell, packed.cols, packed.modelCol)}>
      <div className="scallop" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <path fill="#8eb6e8" d="M0 0h1200v46Q1150 86 1100 46t-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0V0z" />
          <path fill="#fff" d="M0 24Q50 68 100 24t100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0V90H0z" />
        </svg>
      </div>
      <GridStage rows={packed.rows} cols={packed.cols}>
        {items.map((word, index) => (
          <PracticeBlock
            key={`${word}-${index}`}
            cell={packed.cell}
            word
            fontStyle={fontStyle}
            token={word}
            rows={getWordRows(index, items.length)}
            model={<WordIcon name={word} />}
          />
        ))}
      </GridStage>
      <SheetFooter student={student} className={className} pageNo={pageNo} unitNo={unitNo} />
    </article>
  )
}

export function pagesFor(lessons: Lesson[], scope: 'book' | 'unit', activeId: string) {
  const chosen = scope === 'book' ? lessons : lessons.filter((lesson) => lesson.id === activeId)
  const pages: { key: string; node: 'cover' | 'letter' | 'words'; lesson?: Lesson; unitNo: number; words?: string[] }[] = []
  if (scope === 'book') pages.push({ key: 'cover', node: 'cover', unitNo: 0 })
  chosen.forEach((lesson) => {
    const unitNo = lessons.findIndex((item) => item.id === lesson.id) + 1
    pages.push({ key: `${lesson.id}-letter`, node: 'letter', lesson, unitNo })
    const words = lesson.words.map((word) => word.trim()).filter(Boolean)
    const chunks: string[][] = []
    for (let index = 0; index < Math.max(words.length, 1); index += 3) chunks.push(words.slice(index, index + 3))
    chunks.forEach((chunk, index) => {
      pages.push({ key: `${lesson.id}-words-${index}`, node: 'words', lesson, unitNo, words: chunk })
    })
  })
  return pages
}
