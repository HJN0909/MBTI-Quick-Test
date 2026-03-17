import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useCallback } from 'react'
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { questions, calculateMBTI } from '@/utils/mbti'
import type { Answer } from '@/db/types'
import './index.scss'

export default function Test() {
  useShareAppMessage(() => ({
    title: '30秒直觉MBTI速测 - 发现真实的自己'
  }))

  useShareTimeline(() => ({
    title: '30秒直觉MBTI速测 - 发现真实的自己'
  }))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideOut, setSlideOut] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = useCallback(
    (answer: 'A' | 'B' | 'C') => {
      if (isAnimating) return

      // 记录答案
      const newAnswers = [
        ...answers,
        {
          questionId: currentQuestion.id,
          answer
        }
      ]
      setAnswers(newAnswers)

      // 触发滑出动画
      setIsAnimating(true)
      setSlideOut(true)

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          // 下一题
          setCurrentIndex(currentIndex + 1)
          setSlideOut(false)
          setTimeout(() => {
            setIsAnimating(false)
          }, 100)
        } else {
          // 测试完成，计算结果
          const mbtiType = calculateMBTI(newAnswers)
          Taro.redirectTo({
            url: `/pages/result/index?type=${mbtiType}`
          })
        }
      }, 300)
    },
    [currentIndex, answers, currentQuestion, isAnimating]
  )

  return (
    <View className="min-h-screen bg-gradient-subtle">
      {/* 流体背景 */}
      <View className="fluid-bg">
        <View className="fluid-blob fluid-blob-1" />
        <View className="fluid-blob fluid-blob-2" />
        <View className="fluid-blob fluid-blob-3" />
      </View>

      {/* 主内容 */}
      <View className="relative z-10 flex flex-col min-h-screen px-8 py-12">
        {/* 进度条 */}
        <View className="mb-8">
          <View className="flex flex-row items-center justify-between mb-3">
            <Text className="text-xl text-muted-foreground">
              第 {currentIndex + 1} / {questions.length} 题
            </Text>
            <Text className="text-xl text-primary font-semibold">
              {Math.round(progress)}%
            </Text>
          </View>
          <View className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <View
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>

        {/* 题目卡片 */}
        <View className="flex-1 flex flex-col items-center justify-center">
          <View
            className={`w-full glass-card rounded-3xl p-10 mb-8 ${
              slideOut ? 'slide-out-left' : 'slide-in-right'
            }`}
          >
            <View className="flex flex-col items-center space-y-6">
              <View className="i-mdi-head-question text-6xl text-primary mb-2" />
              <Text className="text-3xl font-semibold text-foreground text-center leading-relaxed">
                {currentQuestion.question}
              </Text>
            </View>
          </View>

          {/* 选项按钮 */}
          <View className="w-full flex flex-col space-y-4">
            <View
              className="w-full glass-card rounded-3xl border-2 border-primary/30 p-6"
              onClick={() => handleAnswer('A')}
            >
              <View className="flex flex-col items-center">
                <Text className="text-2xl text-foreground text-center leading-relaxed">
                  {currentQuestion.optionA}
                </Text>
              </View>
            </View>

            <View
              className="w-full glass-card rounded-3xl border-2 border-secondary/30 p-6"
              onClick={() => handleAnswer('B')}
            >
              <View className="flex flex-col items-center">
                <Text className="text-2xl text-foreground text-center leading-relaxed">
                  {currentQuestion.optionB}
                </Text>
              </View>
            </View>

            <View
              className="w-full glass-card rounded-3xl border-2 border-accent/30 p-6"
              onClick={() => handleAnswer('C')}
            >
              <View className="flex flex-col items-center">
                <Text className="text-2xl text-foreground text-center leading-relaxed">
                  {currentQuestion.optionC}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 底部提示 */}
        <View className="mt-8 flex flex-col items-center">
          <Text className="text-xl text-muted-foreground text-center">
            跟随第一直觉，无需思考
          </Text>
        </View>
      </View>
    </View>
  )
}
