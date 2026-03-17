// MBTI类型定义
export interface MBTIType {
  id: string
  name: string
  title: string
  description: string
  keywords: string[]
  soul_quote: string
  created_at: string
}

// 测试记录
export interface TestRecord {
  id: string
  mbti_type: string
  answers: Record<number, string>
  created_at: string
}

// 测试题目
export interface Question {
  id: number
  dimension: 'E/I' | 'S/N' | 'T/F' | 'J/P'
  question: string
  optionA: string
  optionB: string
  optionC: string
}

// 测试答案
export interface Answer {
  questionId: number
  answer: 'A' | 'B' | 'C'
}
