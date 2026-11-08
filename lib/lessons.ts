export type Lesson = {
  id: string
  theme: string
  letter: string
  focus: string
  words: string[]
}

export const starterLessons: Lesson[] = [
  { id: 'u1', theme: 'In the school playground', letter: 'B', focus: 'book', words: ['ball', 'bike', 'bell'] },
  { id: 'u2', theme: 'In the dining room', letter: 'C', focus: 'cake', words: ['cat', 'car', 'cup'] },
  { id: 'u3', theme: 'At the street market', letter: 'A', focus: 'apple', words: ['hat', 'bag', 'can'] },
  { id: 'u4', theme: 'In the bedroom', letter: 'D', focus: 'dog', words: ['desk', 'door', 'duck'] },
  { id: 'u5', theme: 'At the fish and chip shop', letter: 'I', focus: 'milk', words: ['fish', 'chips', 'chicken'] },
  { id: 'u6', theme: 'In the classroom', letter: 'E', focus: 'pencil', words: ['pen', 'bell', 'red'] },
  { id: 'u7', theme: 'In the garden', letter: 'G', focus: 'gate', words: ['garden', 'goat', 'girl'] },
  { id: 'u8', theme: 'In the park', letter: 'H', focus: 'hand', words: ['horse', 'hair', 'head'] },
  { id: 'u9', theme: 'In the shop', letter: 'O', focus: 'locks', words: ['clocks', 'mops', 'pots'] },
  { id: 'u10', theme: 'At the zoo', letter: 'M', focus: 'mango', words: ['mother', 'mouse', 'monkey'] },
  { id: 'u11', theme: 'At the bus stop', letter: 'U', focus: 'bus', words: ['sun', 'run', 'truck'] },
  { id: 'u12', theme: 'At the lake', letter: 'L', focus: 'lake', words: ['leaf', 'lemon', 'lock'] },
  { id: 'u13', theme: 'In the school canteen', letter: 'N', focus: 'bananas', words: ['nuts', 'noodles', 'nest'] },
  { id: 'u14', theme: 'In the toy shop', letter: 'T', focus: 'turtle', words: ['tiger', 'teddy bear', 'top'] },
  { id: 'u15', theme: 'At the football match', letter: 'F', focus: 'face', words: ['football', 'foot', 'father'] },
  { id: 'u16', theme: 'At home', letter: 'W', focus: 'window', words: ['water', 'wash', 'wall'] },
  { id: 'u17', theme: 'At breakfast', letter: 'J', focus: 'jam', words: ['juice', 'jacket', 'jelly'] },
  { id: 'u18', theme: 'On the hill', letter: 'K', focus: 'kite', words: ['key', 'kitten', 'king'] },
  { id: 'u19', theme: 'At the farm', letter: 'P', focus: 'pig', words: ['parrot', 'pumpkin', 'pot'] },
  { id: 'u20', theme: 'In the castle', letter: 'Q', focus: 'queen', words: ['quilt', 'quail', 'quiz'] },
  { id: 'u21', theme: 'In the rain', letter: 'R', focus: 'rabbit', words: ['rain', 'ring', 'rose'] },
  { id: 'u22', theme: 'At night', letter: 'S', focus: 'star', words: ['sock', 'snake', 'sun'] },
  { id: 'u23', theme: 'On the road', letter: 'V', focus: 'van', words: ['vest', 'violin', 'vase'] },
  { id: 'u24', theme: 'In the woods', letter: 'X', focus: 'fox', words: ['box', 'six', 'ox'] },
  { id: 'u25', theme: 'In the art room', letter: 'Y', focus: 'yo-yo', words: ['yogurt', 'yacht', 'yellow'] },
  { id: 'u26', theme: 'With the zebra', letter: 'Z', focus: 'zebra', words: ['zip', 'zoo', 'zero'] },
]

export function cloneLessons(lessons: Lesson[] = starterLessons): Lesson[] {
  return lessons.map((lesson) => ({ ...lesson, words: [...lesson.words] }))
}

export function letterOf(value: string) {
  const char = value.trim().charAt(0)
  return char || 'A'
}

