export type Lesson = {
  id: string
  theme: string
  letter: string
  focus: string
  words: string[]
}

// 29 chữ tiếng Việt (QĐ 31/2002) rồi một bài số. Từ ngắn, lớp 1.
export const starterLessons: Lesson[] = [
  { id: 'a', theme: 'Ao cá', letter: 'a', focus: 'ao', words: ['cá', 'ba'] },
  { id: 'aw', theme: 'Ăn cơm', letter: 'ă', focus: 'ăn', words: ['măng', 'nắng'] },
  { id: 'aa', theme: 'Cây cau', letter: 'â', focus: 'cây', words: ['âu', 'mây'] },
  { id: 'b', theme: 'Bé vẽ', letter: 'b', focus: 'bé', words: ['bò', 'bút'] },
  { id: 'c', theme: 'Cá cò', letter: 'c', focus: 'cá', words: ['cò', 'củ'] },
  { id: 'd', theme: 'Dê con', letter: 'd', focus: 'dê', words: ['dì', 'dao'] },
  { id: 'dd', theme: 'Đi học', letter: 'đ', focus: 'đi', words: ['đỏ', 'đò'] },
  { id: 'e', theme: 'Em bé', letter: 'e', focus: 'em', words: ['me', 've'] },
  { id: 'ee', theme: 'Bê con', letter: 'ê', focus: 'bê', words: ['tê', 'mê'] },
  { id: 'g', theme: 'Gà gáy', letter: 'g', focus: 'gà', words: ['gỗ', 'gõ'] },
  { id: 'h', theme: 'Hoa hồng', letter: 'h', focus: 'hoa', words: ['hò', 'hổ'] },
  { id: 'i', theme: 'Bí ngô', letter: 'i', focus: 'bi', words: ['im', 'đi'] },
  { id: 'k', theme: 'Kẹo kem', letter: 'k', focus: 'kẹo', words: ['kem', 'kẻ'] },
  { id: 'l', theme: 'Lá sen', letter: 'l', focus: 'lá', words: ['lọ', 'lúa'] },
  { id: 'm', theme: 'Mẹ và bé', letter: 'm', focus: 'mẹ', words: ['mơ', 'mũ'] },
  { id: 'n', theme: 'Nơ đỏ', letter: 'n', focus: 'nơ', words: ['na', 'nón'] },
  { id: 'o', theme: 'Bò sữa', letter: 'o', focus: 'bò', words: ['cò', 'ngo'] },
  { id: 'oo', theme: 'Cô giáo', letter: 'ô', focus: 'cô', words: ['tô', 'ô tô'] },
  { id: 'ow', theme: 'Mơ ước', letter: 'ơ', focus: 'mơ', words: ['tơ', 'lỡ'] },
  { id: 'p', theme: 'Pa-nô', letter: 'p', focus: 'pin', words: ['pê', 'pô'] },
  { id: 'q', theme: 'Quê nhà', letter: 'q', focus: 'quê', words: ['quả', 'quà'] },
  { id: 'r', theme: 'Rổ cá', letter: 'r', focus: 'rổ', words: ['ra', 'rùa'] },
  { id: 's', theme: 'Sao đêm', letter: 's', focus: 'sao', words: ['sò', 'sữa'] },
  { id: 't', theme: 'Tô chữ', letter: 't', focus: 'tô', words: ['tép', 'tủ'] },
  { id: 'u', theme: 'Củ khoai', letter: 'u', focus: 'củ', words: ['bụ', 'thu'] },
  { id: 'uw', theme: 'Thư nhà', letter: 'ư', focus: 'thư', words: ['hư', 'mưa'] },
  { id: 'v', theme: 'Vở viết', letter: 'v', focus: 'vở', words: ['vẽ', 'voi'] },
  { id: 'x', theme: 'Xe đạp', letter: 'x', focus: 'xe', words: ['xô', 'xẻ'] },
  { id: 'y', theme: 'Bay cao', letter: 'y', focus: 'bay', words: ['tay', 'máy'] },
  { id: 'so', theme: 'Chữ số', letter: '1', focus: '10', words: ['20', '35'] },
]

export function cloneLessons(lessons: Lesson[] = starterLessons): Lesson[] {
  return lessons.map((lesson) => ({ ...lesson, words: [...lesson.words] }))
}

export function letterOf(value: string) {
  const char = Array.from(value.trim())[0]
  return char || 'a'
}
