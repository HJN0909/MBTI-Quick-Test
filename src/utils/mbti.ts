import type { Answer, Question } from '@/db/types'

// 12道测试题目
export const questions: Question[] = [
  {
    id: 1,
    dimension: 'E/I',
    question: '累了一整天，你觉得以下哪种方式能让你最快回血？',
    optionA: '叫上三五好友火锅店聚聚',
    optionB: '关灯洗澡，一个人躲进被窝',
    optionC: '在安静的咖啡厅坐着发呆'
  },
  {
    id: 2,
    dimension: 'S/N',
    question: '看到"萝卜"，你脑海里第一秒出现的画面是？',
    optionA: '菜市场那根带泥土的白萝卜',
    optionB: '拔萝卜的小兔子或卡通形象',
    optionC: '"萝卜青菜各有所爱"这句话'
  },
  {
    id: 3,
    dimension: 'T/F',
    question: '朋友在雨里淋成落汤鸡来找你倾诉，你脱口而出的是？',
    optionA: '"天啊，你赶紧把衣服换了！"',
    optionB: '"好心疼，快抱抱，怎么这么惨"',
    optionC: '"先拿毛巾，再跟我说怎么回事"'
  },
  {
    id: 4,
    dimension: 'J/P',
    question: '面对下周一个未知的短途旅行，你通常的姿态是？',
    optionA: '查好路线、定好门票才安心',
    optionB: '到达目的地，看心情再决定去哪',
    optionC: '大致看下攻略，留出一半的自由'
  },
  {
    id: 5,
    dimension: 'E/I',
    question: '在聚会里，你通常扮演什么样的角色？',
    optionA: '负责炒热气氛、拉大家说话的人',
    optionB: '安静听大家聊天、偶尔礼貌微笑',
    optionC: '跟熟悉的人聊，陌生人前略隐身'
  },
  {
    id: 6,
    dimension: 'S/N',
    question: '站在海边看日落，你觉得大海是什么？',
    optionA: '咸咸的海水和细碎的沙滩',
    optionB: '远方连接另一个世界的通道',
    optionC: '蔚蓝色的大片颜色块'
  },
  {
    id: 7,
    dimension: 'T/F',
    question: '看电影时主角为了大局牺牲，你的真实感受是？',
    optionA: '"虽然难过，但这确实是最优解"',
    optionB: '"太残忍了，为什么非要牺牲他"',
    optionC: '"理解这个选择，但心里很难受"'
  },
  {
    id: 8,
    dimension: 'J/P',
    question: '看看你现在的手机桌面或书桌，它看起来更像？',
    optionA: '分类清晰，甚至有点强迫症的整齐',
    optionB: '东西随手放，只有我自己能找着',
    optionC: '乱中有序，核心区域是干净的'
  },
  {
    id: 9,
    dimension: 'S/N',
    question: '如果你要买一本新书，你更容易被什么吸引？',
    optionA: '详实的内容简介和实用性',
    optionB: '书名和封面营造出的浪漫氛围',
    optionC: '朋友的强烈推荐和好评'
  },
  {
    id: 10,
    dimension: 'T/F',
    question: '你试穿了一件非常好看但有点贵的衣服，你的心理活动是：',
    optionA: '"这剪裁和面料，值这个价格吗？"',
    optionB: '"我感觉这衣服就是我的天菜！我要带它走"',
    optionC: '"喜欢是喜欢，得看看我的钱包"'
  },
  {
    id: 11,
    dimension: 'E/I',
    question: '如果要把你比喻成一种发光体，你觉得自己是：',
    optionA: '发光发热、能照亮周围的太阳',
    optionB: '静静反射光芒、温柔淡然的月亮',
    optionC: '忽明忽暗、随心情闪烁的萤火虫'
  },
  {
    id: 12,
    dimension: 'J/P',
    question: '当你有一整天彻底自由的时间，你更希望：',
    optionA: '把之前积压的任务一件件划掉',
    optionB: '什么也不安排，随波逐流过一天',
    optionC: '睡到自然醒，想做什么做什么'
  }
]

// 计算MBTI类型
export function calculateMBTI(answers: Answer[]): string {
  // 统计每个维度的选择
  const dimensions = {
    'E/I': { A: 0, B: 0 },
    'S/N': { A: 0, B: 0 },
    'T/F': { A: 0, B: 0 },
    'J/P': { A: 0, B: 0 }
  }

  // 统计答案（C选项不计入任何一方）
  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId)
    if (question && answer.answer !== 'C') {
      dimensions[question.dimension][answer.answer]++
    }
  }

  // 计算每个维度的结果
  let result = ''

  // E/I维度：A=E, B=I
  if (dimensions['E/I'].A > dimensions['E/I'].B) {
    result += 'E'
  } else if (dimensions['E/I'].A < dimensions['E/I'].B) {
    result += 'I'
  } else {
    result += Math.random() > 0.5 ? 'E' : 'I'
  }

  // S/N维度：A=S, B=N
  if (dimensions['S/N'].A > dimensions['S/N'].B) {
    result += 'S'
  } else if (dimensions['S/N'].A < dimensions['S/N'].B) {
    result += 'N'
  } else {
    result += Math.random() > 0.5 ? 'S' : 'N'
  }

  // T/F维度：A=T, B=F
  if (dimensions['T/F'].A > dimensions['T/F'].B) {
    result += 'T'
  } else if (dimensions['T/F'].A < dimensions['T/F'].B) {
    result += 'F'
  } else {
    result += Math.random() > 0.5 ? 'T' : 'F'
  }

  // J/P维度：A=J, B=P
  if (dimensions['J/P'].A > dimensions['J/P'].B) {
    result += 'J'
  } else if (dimensions['J/P'].A < dimensions['J/P'].B) {
    result += 'P'
  } else {
    result += Math.random() > 0.5 ? 'J' : 'P'
  }

  return result
}
