import { View, Text, Button, Canvas } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState, useEffect, useCallback } from 'react'
import { getMBTIType } from '@/db/api'
import type { MBTIType } from '@/db/types'
import './index.scss'

export default function Result() {
  const [mbtiData, setMbtiData] = useState<MBTIType | null>(null)
  const [loading, setLoading] = useState(true)
  const [mbtiType, setMbtiType] = useState('')

  useShareAppMessage(() => ({
    title: `我是${mbtiData?.name || 'MBTI'} - 30秒直觉MBTI速测`
  }))

  useShareTimeline(() => ({
    title: `我是${mbtiData?.name || 'MBTI'} - 30秒直觉MBTI速测`
  }))

  const loadMBTIData = useCallback(async (type: string) => {
    setLoading(true)
    const data = await getMBTIType(type)
    if (data) {
      setMbtiData(data)
    } else {
      Taro.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const instance = Taro.getCurrentInstance()
    const type = instance.router?.params?.type || ''
    setMbtiType(type)

    if (type) {
      loadMBTIData(type)
    }
  }, [loadMBTIData])

  const handleRetry = () => {
    Taro.redirectTo({
      url: '/pages/test/index'
    })
  }

  const handleBackHome = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  const handleShare = () => {
    Taro.showToast({
      title: '点击右上角分享给好友',
      icon: 'none',
      duration: 2000
    })
  }

  if (loading) {
    return (
      <View className="min-h-screen bg-gradient-subtle flex flex-col items-center justify-center">
        <View className="i-mdi-loading animate-spin text-6xl text-primary mb-4" />
        <Text className="text-2xl text-muted-foreground">正在分析中...</Text>
      </View>
    )
  }

  if (!mbtiData) {
    return (
      <View className="min-h-screen bg-gradient-subtle flex flex-col items-center justify-center px-8">
        <View className="i-mdi-alert-circle text-6xl text-destructive mb-4" />
        <Text className="text-2xl text-foreground mb-8">加载失败</Text>
        <Button
          className="w-full max-w-md bg-gradient-primary text-primary-foreground text-2xl rounded-3xl"
          onClick={handleBackHome}
        >
          <View className="py-4">
            <Text>返回首页</Text>
          </View>
        </Button>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-gradient-subtle">
      {/* 流体背景 */}
      <View className="fluid-bg">
        <View className="fluid-blob fluid-blob-1" />
        <View className="fluid-blob fluid-blob-2" />
        <View className="fluid-blob fluid-blob-3" />
      </View>

      {/* 主内容 */}
      <View className="relative z-10 px-8 py-12">
        {/* 顶部标语 */}
        <View className="flex flex-col items-center mb-12">
          <View className="glass-card rounded-3xl p-10 w-full">
            <View className="flex flex-col items-center space-y-4">
              <View className="i-mdi-star-circle text-7xl text-primary mb-2" />
              <Text className="text-5xl font-bold gradient-text text-center">
                {mbtiType}
              </Text>
              <Text className="text-3xl font-semibold text-foreground text-center">
                {mbtiData.name}
              </Text>
            </View>
          </View>
        </View>

        {/* 核心关键词 */}
        <View className="glass-card rounded-3xl p-8 mb-6">
          <View className="flex flex-col items-center space-y-4">
            <Text className="text-2xl font-semibold text-foreground mb-2">
              核心关键词
            </Text>
            <View className="flex flex-row flex-wrap justify-center gap-3">
              {mbtiData.keywords.map((keyword, index) => (
                <View
                  key={index}
                  className="bg-gradient-card px-6 py-3 rounded-full"
                >
                  <Text className="text-xl text-foreground font-medium">
                    {keyword}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 人性化深度解析 */}
        <View className="glass-card rounded-3xl p-8 mb-6">
          <View className="flex flex-col space-y-4">
            <View className="flex flex-row items-center mb-2">
              <View className="i-mdi-heart-pulse text-3xl text-primary mr-3" />
              <Text className="text-2xl font-semibold text-foreground">
                你的灵魂画像
              </Text>
            </View>
            <Text className="text-xl text-foreground leading-loose">
              {mbtiData.description}
            </Text>
          </View>
        </View>

        {/* 灵魂共鸣 */}
        <View className="glass-card rounded-3xl p-8 mb-8">
          <View className="flex flex-col items-center space-y-4">
            <View className="i-mdi-format-quote-open text-4xl text-secondary" />
            <Text className="text-2xl text-foreground text-center font-medium leading-relaxed">
              {mbtiData.soul_quote}
            </Text>
            <View className="i-mdi-format-quote-close text-4xl text-secondary" />
          </View>
        </View>

        {/* 操作按钮 */}
        <View className="flex flex-col space-y-4 mb-8">
          <Button
            className="w-full bg-gradient-primary text-primary-foreground text-2xl font-semibold rounded-3xl"
            onClick={handleShare}
          >
            <View className="py-5 flex flex-row items-center justify-center">
              <View className="i-mdi-share-variant text-3xl mr-3" />
              <Text>分享给好友</Text>
            </View>
          </Button>

          <Button
            className="w-full glass-card text-foreground text-2xl font-medium rounded-3xl border-2 border-primary/30"
            onClick={handleRetry}
          >
            <View className="py-5 flex flex-row items-center justify-center">
              <View className="i-mdi-refresh text-3xl mr-3" />
              <Text>再测一次</Text>
            </View>
          </Button>

          <Button
            className="w-full glass-card text-foreground text-2xl font-medium rounded-3xl border-2 border-secondary/30"
            onClick={handleBackHome}
          >
            <View className="py-5 flex flex-row items-center justify-center">
              <View className="i-mdi-home text-3xl mr-3" />
              <Text>返回首页</Text>
            </View>
          </Button>
        </View>

        {/* 底部版权 */}
        <View className="flex flex-col items-center mt-8">
          <Text className="text-xl text-muted-foreground text-center">
            © 2026 30秒直觉MBTI速测
          </Text>
        </View>
      </View>
    </View>
  )
}
