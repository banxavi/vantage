'use client'

import { useState } from 'react'
import { BookOpen, Check, ChevronDown, FileText, Info, Printer, RotateCcw, Sparkles } from 'lucide-react'

const defaults = {
  title: 'English Vocabulary Practice',
  student: 'Nguyễn Minh Anh',
  className: '1A',
  practice: `book
ball
cat`,
}

const pdfSections = [
  ['In the school playground', ['book', 'ball', 'bike']],
  ['In the dining room', ['cake', 'cat', 'cup']],
  ['At the street market', ['apple', 'hat', 'bag']],
  ['In the bedroom', ['dog', 'desk', 'door']],
  ['At the fish and chip shop', ['fish', 'chips', 'chicken']],
  ['In the classroom', ['pencil', 'pen', 'bell']],
  ['In the garden', ['gate', 'goat', 'girl']],
  ['In the park', ['hand', 'horse', 'hair']],
  ['In the shop', ['clock', 'mop', 'pot']],
  ['At the zoo', ['mango', 'mother', 'monkey']],
  ['At the bus stop', ['sun', 'run', 'bus']],
  ['At the lake', ['lake', 'leaf', 'lemon']],
  ['In the school canteen', ['banana', 'nuts', 'noodles']],
  ['In the toy shop', ['turtle', 'tiger', 'teddy bear']],
  ['At the football match', ['face', 'football', 'father']],
  ['At home', ['window', 'water', 'wash']],
] as const

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  )
}

function GridLines() {
  return (
    <svg className="worksheet-grid" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 800 100">
      <defs>
        <pattern id="writing-grid" width="80" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 0H80 M0 33.333H80 M0 66.666H80 M0 100H80" fill="none" stroke="#9fc9e6" strokeWidth="1.15" />
          <path d="M0 16.666H80 M0 50H80 M0 83.333H80" fill="none" stroke="#b8d9ed" strokeWidth="0.7" strokeDasharray="2 3" />
          <path d="M0 0V100 M80 0V100" fill="none" stroke="#e8aeb5" strokeWidth="0.5" opacity="0.52" />
        </pattern>
      </defs>
      <rect width="800" height="100" fill="url(#writing-grid)" />
    </svg>
  )
}

export function WorksheetGenerator() {
  const [title, setTitle] = useState(defaults.title)
  const [student, setStudent] = useState(defaults.student)
  const [className, setClassName] = useState(defaults.className)
  const [practice, setPractice] = useState(defaults.practice)
  const [fontStyle, setFontStyle] = useState<'normal' | 'dotted'>('dotted')

  const reset = () => {
    setTitle(defaults.title); setStudent(defaults.student); setClassName(defaults.className); setPractice(defaults.practice); setFontStyle('dotted')
  }

  return (
    <main className="app-shell">
      <aside className="editor-sidebar">
        <div className="brand-row">
          <div className="brand-mark"><BookOpen size={19} strokeWidth={2.5} /></div>
          <div><p className="brand-name">Vở Xinh</p><p className="brand-subtitle">Công cụ tạo phiếu viết</p></div>
        </div>

        <div className="sidebar-content">
          <div className="eyebrow"><Sparkles size={14} /> TẠO PHIẾU MỚI</div>
          <h1>Thiết kế bài tập<br /><em>thật xinh.</em></h1>
          <p className="intro">Điền thông tin bên dưới để bắt đầu tạo phiếu tập viết cho học sinh.</p>

          <section className="control-section">
            <div className="section-heading"><span className="step-number">01</span><span>Thông tin bài học</span></div>
            <Field label="Tên bài học" value={title} onChange={setTitle} />
            <div className="two-fields"><Field label="Tên học sinh" value={student} onChange={setStudent} /><Field label="Lớp" value={className} onChange={setClassName} /></div>
          </section>

          <section className="control-section">
            <div className="section-heading"><span className="step-number">02</span><span>Nội dung luyện viết</span></div>
            <label className="field"><span>Kiểu chữ</span><div className="select-wrap"><select value={fontStyle} onChange={(event) => setFontStyle(event.target.value as 'normal' | 'dotted')}><option value="dotted">Nét đứt — Tập đồ chữ</option><option value="normal">Nét liền — Chữ chuẩn</option></select><ChevronDown size={16} /></div></label>
            <label className="field"><span>Chữ, từ hoặc câu muốn luyện</span><textarea value={practice} onChange={(event) => setPractice(event.target.value)} rows={5} /></label>
            <p className="hint"><Info size={13} /> Mỗi dòng sẽ hiển thị trên một hàng kẻ ô ly.</p>
          </section>

          <div className="sidebar-actions">
            <button className="print-button" onClick={() => window.print()}><Printer size={17} /> In phiếu bài tập</button>
            <button className="reset-button" onClick={reset}><RotateCcw size={14} /> Đặt lại nội dung mẫu</button>
          </div>
        </div>
        <div className="sidebar-footer"><span className="status-dot" /> Sẵn sàng để in <span className="footer-version">Vở Xinh · 01</span></div>
      </aside>

      <section className="preview-area">
        <div className="preview-toolbar"><div><span className="preview-label">XEM TRƯỚC</span><span className="preview-title">Phiếu tập viết A4</span></div><div className="a4-badge"><Check size={13} /> A4 · Dọc</div></div>
        <div className="paper-wrap">
          <article className="a4-paper">
            <header className="paper-header">
              <div className="paper-kicker">PHIẾU LUYỆN VIẾT</div>
              <h2>{title || 'Tên bài học'}</h2>
              <div className="paper-info"><span><strong>Họ và tên:</strong> {student || '................................'}</span><span><strong>Lớp:</strong> {className || '........'}</span></div>
            </header>
            <div className="instruction"><FileText size={13} /> Trace the words, then write them on your own.</div>
            <div className="pdf-sections">
              {pdfSections.map(([location, words], sectionIndex) => (
                <section className="pdf-section" key={location}>
                  <h3>{location}</h3>
                  <div className={`writing-area compact ${fontStyle}`}><GridLines /><div className="practice-text">{words.map((word) => <div key={word}>{word}</div>)}</div></div>
                </section>
              ))}
            </div>
            <footer className="paper-footer"><span>English vocabulary • Trace and write</span><span>16 topics</span></footer>
          </article>
        </div>
      </section>
    </main>
  )
}
