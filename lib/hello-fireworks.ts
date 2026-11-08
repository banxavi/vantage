// Bảng độ rộng (horiz-adv-x / 1000) của font HelloFireworks
export const HF_ADV: Record<string, number> = {
  'A': 668, 'B': 693, 'C': 713, 'D': 730, 'E': 575, 'F': 647, 'G': 711, 'H': 698, 'I': 222, 'J': 485,
  'K': 707, 'L': 635, 'M': 827, 'N': 709, 'O': 788, 'P': 652, 'Q': 788, 'R': 678, 'S': 653, 'T': 618,
  'U': 715, 'V': 689, 'W': 954, 'X': 675, 'Y': 682, 'Z': 658,
  'a': 502, 'b': 580, 'c': 539, 'd': 560, 'e': 574, 'f': 382, 'g': 560, 'h': 527, 'i': 215, 'j': 226,
  'k': 548, 'l': 203, 'm': 817, 'n': 525, 'o': 578, 'p': 570, 'q': 545, 'r': 403, 's': 456, 't': 284,
  'u': 543, 'v': 540, 'w': 761, 'x': 514, 'y': 498, 'z': 556,
  '0': 594, '1': 401, '2': 601, '3': 576, '4': 601, '5': 571, '6': 550, '7': 557, '8': 552, '9': 542,
  ' ': 300, '-': 375, '.': 223, ',': 251, '!': 265, '?': 570, "'": 224
}

export function hfTextWidth(text: string, fontSize: number): number {
  let width = 0
  for (const ch of text) {
    const adv = HF_ADV[ch] ?? 500
    width += (adv / 1000) * fontSize
  }
  return width
}
