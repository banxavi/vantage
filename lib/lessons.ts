export type Lesson = {
  id: string
  theme: string
  letter: string
  focus: string
  words: string[]
}

export const starterLessons: Lesson[] = [
  { id: 'u1', theme: 'In the school playground', letter: 'B', focus: 'book', words: ['ball', 'bike'] },
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
  { id: 'u12', theme: 'At the lake', letter: 'L', focus: 'lake', words: ['leaf', 'lemon'] },
  { id: 'u13', theme: 'In the school canteen', letter: 'N', focus: 'bananas', words: ['nuts', 'noodles'] },
  { id: 'u14', theme: 'In the toy shop', letter: 'T', focus: 'turtle', words: ['tiger', 'teddy bear', 'top'] },
  { id: 'u15', theme: 'At the football match', letter: 'F', focus: 'face', words: ['football', 'foot', 'father'] },
  { id: 'u16', theme: 'At home', letter: 'W', focus: 'window', words: ['water', 'wash'] },
]

export function cloneLessons(lessons: Lesson[] = starterLessons): Lesson[] {
  return lessons.map((lesson) => ({ ...lesson, words: [...lesson.words] }))
}

export function letterOf(value: string) {
  const char = value.trim().charAt(0)
  return char || 'A'
}

