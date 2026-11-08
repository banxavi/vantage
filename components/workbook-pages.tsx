import { letterOf, type Lesson } from '@/lib/lessons'
import { WordIcon } from '@/components/word-icon'

export const CELL = 13
export const COLS = 14

function OlyGrid({ rows }: { rows: number }) {
  const size = 40
  const width = COLS * size
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
  for (let col = 0; col <= COLS; col += 1) {
    lines.push(<line key={`v${col}`} x1={col * size} y1={0} x2={col * size} y2={height} className="oly-vert" />)
  }
  return (
    <svg className="oly-grid" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {lines}
    </svg>
  )
}

const TRACE_FONT = 64

function traceBoxWidth(token: string) {
  const factor = token.length <= 2 ? 0.78 : 0.6
  return token.length * TRACE_FONT * factor + 8
}

function fitCount(token: string, target: number, widthMm: number) {
  const width = (traceBoxWidth(token) / 100) * CELL
  const minGap = 2.4
  let count = Math.max(1, target)
  while (count > 1 && count * width + (count + 1) * minGap > widthMm) count -= 1
  return count
}

const besideWidth = (COLS - 3.15) * CELL
const openWidth = (COLS - 0.25) * CELL

function TraceText({ text, model = false, solid = false }: { text: string; model?: boolean; solid?: boolean }) {
  const fontSize = model ? 84 : TRACE_FONT
  const boxH = 100
  const boxW = model ? 80 : traceBoxWidth(text)
  return (
    <svg className={model ? 'trace-svg model' : 'trace-svg'} viewBox={`0 0 ${boxW} ${boxH}`} preserveAspectRatio={model ? 'xMidYMid meet' : 'xMinYMid meet'} role="img" aria-label={text}>
      <text
        x={model ? boxW / 2 : 1}
        y={model ? 78 : 51}
        textAnchor={model ? 'middle' : 'start'}
        fontSize={fontSize}
        fontWeight={model ? 800 : 700}
        xmlSpace="preserve"
        style={{ fontFamily: 'var(--font-trace), Nunito, sans-serif' }}
        fill={solid ? (model ? '#2563eb' : '#4b5568') : 'none'}
        stroke={solid ? 'none' : model ? '#2a67d8' : '#3d4b5c'}
        strokeWidth={model ? 3.2 : 1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={solid || model ? undefined : '1.1 2.15'}
      >
        {text}
      </text>
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

function wordLines(token: string) {
  const beside = fitCount(token, 5, besideWidth)
  const open = fitCount(token, 5, openWidth)
  const lines: { count: number; full: boolean }[] = []
  let left = 10
  for (let row = 0; row < 2 && left > 0; row += 1) {
    const count = Math.min(beside, left)
    lines.push({ count, full: false })
    left -= count
  }
  while (left > 0) {
    const count = Math.min(open, left)
    lines.push({ count, full: true })
    left -= count
  }
  return lines
}

function PracticeBlock({ model, token, solid = false, word = false }: { model: React.ReactNode; token: string; solid?: boolean; word?: boolean }) {
  const beside = fitCount(token, 5, besideWidth)
  const open = fitCount(token, 7, openWidth)
  const lines = word
    ? wordLines(token)
    : [
        { count: beside, full: false },
        { count: beside, full: false },
        { count: beside, full: false },
        { count: open, full: true },
        { count: open, full: true },
      ]
  return (
    <div className="practice-block" style={word ? { ['--model-size' as string]: '1.85' } : undefined}>
      <div className="practice-model">
        <ModelFrame>{model}</ModelFrame>
      </div>
      {lines.map((line, index) => (
        <div className={line.full ? 'practice-line full' : 'practice-line'} key={`${token}-${index}`}>
          <div className="trace-row">
            {Array.from({ length: line.count }, (_, copy) => (
              <TraceText key={copy} text={token} solid={solid} />
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

function GridStage({ rows, children }: { rows: number; children: React.ReactNode }) {
  return (
    <div className="grid-stage" style={{ ['--rows' as string]: rows }}>
      <OlyGrid rows={rows} />
      <div className="grid-content">{children}</div>
    </div>
  )
}

export function CoverSheet({ title, student, className, lessons }: { title: string; student: string; className: string; lessons: Lesson[] }) {
  return (
    <article className="cover-sheet">
      <div className="cover-hero">
        <p className="cover-kicker">Vở ô ly · Lớp 1</p>
        <h2>{title || 'Luyện viết từ'}</h2>
        <p>Tô theo nét đứt, rồi viết lại cho đều và rõ.</p>
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
  solid,
}: {
  lesson: Lesson
  unitNo: number
  pageNo: number
  student: string
  className: string
  solid: boolean
}) {
  const upper = letterOf(lesson.letter).toUpperCase()
  const lower = letterOf(lesson.letter).toLowerCase()
  const focus = lesson.focus.trim() || 'word'
  return (
    <article className="a4-paper" id={`unit-${lesson.id}`}>
      <header className="wb-banner">
        <span className="unit-badge">Unit {unitNo}</span>
        <h2>{lesson.theme.trim() || 'Chủ đề bài viết'}</h2>
      </header>
      <p className="write-label">Write.</p>
      <GridStage rows={10 + wordLines(focus).length}>
        <PracticeBlock solid={solid} token={upper} model={<TraceText text={upper} model solid={solid} />} />
        <PracticeBlock solid={solid} token={lower} model={<TraceText text={lower} model solid={solid} />} />
        <PracticeBlock word solid={solid} token={focus} model={<WordIcon name={focus} />} />
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
  solid,
}: {
  lesson: Lesson
  unitNo: number
  pageNo: number
  words: string[]
  student: string
  className: string
  solid: boolean
}) {
  const items = words.length ? words : [lesson.focus.trim() || 'word']
  return (
    <article className="a4-paper word-paper">
      <div className="scallop" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <path fill="#8eb6e8" d="M0 0h1200v46Q1150 86 1100 46t-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0-100 0V0z" />
          <path fill="#fff" d="M0 24Q50 68 100 24t100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0V90H0z" />
        </svg>
      </div>
      <GridStage rows={items.reduce((sum, word) => sum + wordLines(word).length, 0)}>
        {items.map((word, index) => (
          <PracticeBlock key={`${word}-${index}`} word solid={solid} token={word} model={<WordIcon name={word} />} />
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
