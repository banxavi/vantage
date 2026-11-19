// Từ vựng ngắn lớp 1, gắn với 29 chữ tiếng Việt. Dùng để chọn từ luyện viết.
export const VN_DICTIONARY: Record<string, readonly string[]> = {
  a: ['ba', 'bà', 'cá', 'cha', 'da', 'ga', 'hoa', 'lá', 'má', 'nhà', 'ra', 'ta'],
  ă: ['ăn', 'măng', 'nắng', 'trắng', 'chăn', 'khăn', 'răng', 'mặn', 'bắt', 'vắng'],
  â: ['cây', 'mây', 'âu', 'câu', 'dầu', 'mẫu', 'sâu', 'tây', 'xây', 'lấy', 'thấy'],
  b: ['bé', 'bò', 'bút', 'ba', 'bà', 'bạn', 'bàn', 'bánh', 'bông', 'bơi', 'bi', 'bóng'],
  c: ['cá', 'cò', 'củ', 'cô', 'cây', 'con', 'cam', 'cún', 'cua', 'cơm', 'cốc', 'cắp'],
  d: ['dê', 'dì', 'dao', 'da', 'dế', 'dừa', 'dâu', 'dưa', 'dơi', 'dán'],
  đ: ['đi', 'đỏ', 'đò', 'đầu', 'đèn', 'đất', 'đũa', 'đứng', 'đẹp', 'đó', 'đĩa', 'đường'],
  e: ['em', 'me', 've', 'be', 'xe', 'que', 'tre', 'khe', 'nghe'],
  ê: ['bê', 'tê', 'mê', 'để', 'lễ', 'ghế', 'rễ', 'chế', 'kể', 'thế', 'về'],
  g: ['gà', 'gỗ', 'gõ', 'gạo', 'gối', 'gần', 'gói', 'gương', 'gấu', 'góc', 'ghe'],
  h: ['hoa', 'hò', 'hổ', 'họ', 'hòn', 'hũ', 'hái', 'hát', 'hình', 'hồ', 'hươu'],
  i: ['bi', 'im', 'đi', 'vịt', 'tim', 'chim', 'kín', 'mì', 'li', 'khỉ'],
  k: ['kẹo', 'kem', 'kẻ', 'kéo', 'kèn', 'keo', 'két', 'kể'],
  l: ['lá', 'lọ', 'lúa', 'lan', 'lúc', 'lợn', 'lửa', 'lời', 'len', 'lim'],
  m: ['mẹ', 'mơ', 'mũ', 'mèo', 'mì', 'mít', 'mưa', 'mồm', 'môi', 'mía'],
  n: ['nơ', 'na', 'nón', 'nhà', 'nai', 'nem', 'nêm', 'nĩa', 'nối'],
  o: ['bò', 'cò', 'ngo', 'con', 'cho', 'lo', 'no', 'to', 'kho', 'nho'],
  ô: ['cô', 'tô', 'ô tô', 'gỗ', 'cổ', 'tổ', 'số', 'cỗ', 'hố', 'mổ'],
  ơ: ['mơ', 'tơ', 'lỡ', 'cờ', 'mỡ', 'tớ', 'bơ', 'chờ', 'mở', 'sờ'],
  p: ['pin', 'pa-nô', 'pô', 'pê'],
  q: ['quê', 'quả', 'quà', 'quạ', 'quạt', 'que', 'quý', 'quét', 'quần'],
  r: ['rổ', 'ra', 'rùa', 'rau', 'rơi', 'rèm', 'rắn', 'rạ'],
  s: ['sao', 'sò', 'sữa', 'sen', 'sáo', 'sỏi', 'súng', 'sáp', 'sên'],
  t: ['tô', 'tép', 'tủ', 'tre', 'tim', 'tôm', 'táo', 'tổ', 'tay', 'tăm', 'tôi'],
  u: ['củ', 'bụ', 'thu', 'cua', 'bún', 'chuột', 'chùm', 'cụ', 'ngủ', 'đủ'],
  ư: ['thư', 'hư', 'mưa', 'chữ', 'từ', 'giữ', 'gửi', 'nữ', 'sự'],
  v: ['vở', 'vẽ', 'voi', 'vịt', 'về', 'vàng', 'vườn', 'vòi', 'vải'],
  x: ['xe', 'xô', 'xẻ', 'xa', 'xôi', 'xúc', 'xinh', 'xách', 'xanh', 'xoài'],
  y: ['bay', 'tay', 'máy', 'may', 'hay', 'ngày', 'thầy', 'yến', 'yếm'],
  '1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '20', '35'],
}

export const VN_WORDS: readonly string[] = [...new Set(Object.values(VN_DICTIONARY).flat())]

export function suggestWords(letter: string, query: string) {
  const q = query.trim().toLocaleLowerCase('vi')
  if (q) return VN_WORDS.filter((word) => word.toLocaleLowerCase('vi').includes(q)).slice(0, 40)
  const key = Array.from(letter.trim().toLocaleLowerCase('vi'))[0] ?? ''
  return [...(VN_DICTIONARY[key] ?? [])]
}
