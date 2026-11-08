'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, ChevronDown, Plus, Printer, RotateCcw, Sparkles, Trash2 } from 'lucide-react'
import { cloneLessons, starterLessons, type Lesson } from '@/lib/lessons'
import { CoverSheet, LetterSheet, pagesFor, WordSheet } from '@/components/workbook-pages'

const sample = {
  title: 'Luyện viết từ',
  student: '',
  className: '',
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  )
}

export function WorksheetGenerator() {
  const [title, setTitle] = useState(sample.title)
  const [student, setStudent] = useState(sample.student)
  const [className, setClassName] = useState(sample.className)
  const [lessons, setLessons] = useState<Lesson[]>(() => cloneLessons())
  const [activeId, setActiveId] = useState(starterLessons[0].id)
  const [scope, setScope] = useState<'unit' | 'book'>('unit')
  const [solid, setSolid] = useState(false)
  const [zoom, setZoom] = useState<'fit' | 'actual'>('fit')
  const [fitScale, setFitScale] = useState(1)
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = stackRef.current
    if (!node) return
    const measure = () => {
      const pageWidth = (210 / 25.4) * 96
      const next = (node.clientWidth - 4) / pageWidth
      setFitScale(Math.max(0.45, Math.min(next, 1.55)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hideChrome = () => {
      document.documentElement.dataset.printTitle = document.title
      document.title = '\u00A0'
      document.querySelectorAll<HTMLElement>('.cover-sheet').forEach((node) => {
        node.style.setProperty('display', 'none', 'important')
      })
    }
    const restoreChrome = () => {
      const title = document.documentElement.dataset.printTitle
      if (title) document.title = title
      document.querySelectorAll<HTMLElement>('.cover-sheet').forEach((node) => {
        node.style.removeProperty('display')
      })
    }
    window.addEventListener('beforeprint', hideChrome)
    window.addEventListener('afterprint', restoreChrome)
    return () => {
      window.removeEventListener('beforeprint', hideChrome)
      window.removeEventListener('afterprint', restoreChrome)
    }
  }, [])

  const pageScale = zoom === 'actual' ? 1 : fitScale

  const active = lessons.find((lesson) => lesson.id === activeId) ?? lessons[0]
  const pages = pagesFor(lessons, scope, active?.id ?? '')
  let pageNo = 0

  const update = (patch: Partial<Lesson>) => {
    setLessons((current) => current.map((lesson) => (lesson.id === active.id ? { ...lesson, ...patch } : lesson)))
  }

  const addLesson = () => {
    const id = crypto.randomUUID()
    setLessons((current) => [...current, { id, theme: 'Chủ đề mới', letter: 'A', focus: 'ant', words: ['ant'] }])
    setActiveId(id)
    setScope('unit')
  }

  const removeLesson = () => {
    if (lessons.length === 1) return
    const index = lessons.findIndex((lesson) => lesson.id === active.id)
    const next = lessons.filter((lesson) => lesson.id !== active.id)
    setLessons(next)
    setActiveId(next[Math.max(0, index - 1)].id)
  }

  const reset = () => {
    setTitle(sample.title)
    setStudent(sample.student)
    setClassName(sample.className)
    setLessons(cloneLessons())
    setActiveId(starterLessons[0].id)
    setScope('unit')
    setSolid(false)
  }

  return (
    <main className="app-shell">
      <aside className="editor-sidebar">
        <div className="brand-row">
          <div className="brand-mark">
            <BookOpen size={19} strokeWidth={2.5} />
          </div>
          <div>
            <p className="brand-name">Vở Xinh</p>
            <p className="brand-subtitle">Vở ô ly luyện viết</p>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="eyebrow">
            <Sparkles size={14} /> VỞ VIẾT TỪ
          </div>
          <h1>
            <span>Tô chữ, viết từ</span>
            <em>trên ô ly.</em>
          </h1>
          <p className="intro">Mỗi bài có trang chữ cái và trang từ vựng, kẻ ô ly 5 dòng, in được cả vở.</p>

          <section className="control-section">
            <div className="section-heading">
              <span className="step-number">01</span>
              <span>Bìa vở</span>
            </div>
            <Field label="Tên vở" value={title} onChange={setTitle} />
            <div className="two-fields">
              <Field label="Họ và tên" value={student} onChange={setStudent} placeholder="Nguyễn Minh Anh" />
              <Field label="Lớp" value={className} onChange={setClassName} placeholder="1A" />
            </div>
          </section>

          <section className="control-section">
            <div className="section-heading">
              <span className="step-number">02</span>
              <span>Bài luyện</span>
            </div>
            <div className="scope-switch" role="tablist">
              <button type="button" className={scope === 'unit' ? 'on' : ''} onClick={() => setScope('unit')}>
                Bài này
              </button>
              <button type="button" className={scope === 'book' ? 'on' : ''} onClick={() => setScope('book')}>
                Cả vở
              </button>
            </div>
            <div className="unit-list">
              {lessons.map((lesson, index) => (
                <button type="button" key={lesson.id} className={lesson.id === active.id ? 'unit-item on' : 'unit-item'} onClick={() => setActiveId(lesson.id)}>
                  <em>Unit {index + 1}</em>
                  <span>{lesson.theme}</span>
                </button>
              ))}
            </div>
            <Field label="Chủ đề" value={active.theme} onChange={(theme) => update({ theme })} />
            <div className="two-fields">
              <Field label="Chữ cái" value={active.letter} onChange={(letter) => update({ letter: letter.slice(0, 2) })} placeholder="B" />
              <Field label="Từ trọng tâm" value={active.focus} onChange={(focus) => update({ focus })} placeholder="book" />
            </div>
            <label className="field">
              <span>Kiểu chữ tô</span>
              <div className="select-wrap">
                <select value={solid ? 'solid' : 'dotted'} onChange={(event) => setSolid(event.target.value === 'solid')}>
                  <option value="dotted">Nét đứt — Tập tô</option>
                  <option value="solid">Nét liền — Chữ mẫu</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </label>
            <label className="field">
              <span>Từ luyện thêm, mỗi từ một dòng</span>
              <textarea value={active.words.join('\n')} onChange={(event) => update({ words: event.target.value.split('\n') })} rows={4} />
            </label>
            <div className="inline-actions">
              <button type="button" onClick={addLesson}>
                <Plus size={14} /> Thêm bài
              </button>
              <button type="button" onClick={removeLesson} disabled={lessons.length === 1}>
                <Trash2 size={14} /> Xóa bài này
              </button>
            </div>
          </section>
        </div>
        <div className="sidebar-actions">
          <button className="print-button" onClick={() => window.print()}>
            <Printer size={17} /> In {scope === 'book' ? 'cả vở' : 'bài này'}
          </button>
          <button className="reset-button" onClick={reset}>
            <RotateCcw size={14} /> Đặt lại vở mẫu
          </button>
        </div>
        <div className="sidebar-footer">
          <span className="status-dot" />
          {pages.length} trang A4
          <span className="footer-version">Ô ly 5 dòng</span>
        </div>
      </aside>

      <section className="preview-area">
        <div className="preview-toolbar">
          <div>
            <span className="preview-label">XEM TRƯỚC</span>
            <span className="preview-title">{scope === 'book' ? 'Cả vở' : `Unit ${lessons.findIndex((lesson) => lesson.id === active.id) + 1}`}</span>
          </div>
          <div className="zoom-switch" role="group" aria-label="Cỡ xem">
            <button type="button" className={zoom === 'fit' ? 'on' : ''} onClick={() => setZoom('fit')}>
              Vừa màn hình
            </button>
            <button type="button" className={zoom === 'actual' ? 'on' : ''} onClick={() => setZoom('actual')}>
              Cỡ in
            </button>
          </div>
          <div className="a4-badge">A4 · {pages.length} trang</div>
        </div>
        <div className="paper-stack" ref={stackRef} style={{ ['--page-scale' as string]: pageScale }}>
          {pages.map((page) => {
            if (page.node === 'cover') {
              return <CoverSheet key={page.key} title={title} student={student} className={className} lessons={lessons} />
            }
            pageNo += 1
            if (page.node === 'letter' && page.lesson) {
              return <LetterSheet key={page.key} lesson={page.lesson} unitNo={page.unitNo} pageNo={pageNo} student={student} className={className} solid={solid} />
            }
            if (page.node === 'words' && page.lesson) {
              return <WordSheet key={page.key} lesson={page.lesson} unitNo={page.unitNo} pageNo={pageNo} words={page.words ?? []} student={student} className={className} solid={solid} />
            }
            return null
          })}
        </div>
      </section>
    </main>
  )
}
