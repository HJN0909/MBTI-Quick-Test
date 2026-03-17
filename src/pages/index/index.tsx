import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useShareAppMessage(() => ({
    title: '30秒直觉MBTI速测 - 发现真实的自己'
  }))

  useShareTimeline(() => ({
    title: '30秒直觉MBTI速测 - 发现真实的自己'
  }))

  const handleStart = () => {
    Taro.navigateTo({
      url: '/pages/test/index'
    })
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
      <View className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* 标题区域 */}
        <View className="flex flex-col items-center space-y-4 mb-16">
          <Text className="text-6xl font-bold gradient-text text-center">
            30秒直觉
          </Text>
          <Text className="text-5xl font-bold gradient-text text-center">
            MBTI速测
          </Text>
          <View className="flex flex-col items-center space-y-2 mt-6">
            <Text className="text-2xl text-muted-foreground text-center">
              无需思考的直觉联想
            </Text>
            <Text className="text-2xl text-muted-foreground text-center">
              发现真实的自己
            </Text>
          </View>
        </View>

        {/* 特点卡片 */}
        <View className="w-full max-w-md mb-12">
          <View className="glass-card rounded-3xl p-8 mb-4">
            <View className="flex flex-row items-center mb-3">
              <View className="i-mdi-lightning-bolt text-4xl text-primary mr-3" />
              <Text className="text-2xl font-semibold text-foreground">
                12道直觉题
              </Text>
            </View>
            <Text className="text-xl text-muted-foreground leading-relaxed">
              每题3秒，跟随内心第一反应
            </Text>
          </View>

          <View className="glass-card rounded-3xl p-8 mb-4">
            <View className="flex flex-row items-center mb-3">
              <View className="i-mdi-heart text-4xl text-secondary mr-3" />
              <Text className="text-2xl font-semibold text-foreground">
                温暖解读
              </Text>
            </View>
            <Text className="text-xl text-muted-foreground leading-relaxed">
              像老友低语般的人格分析
            </Text>
          </View>

          <View className="glass-card rounded-3xl p-8">
            <View className="flex flex-row items-center mb-3">
              <View className="i-mdi-share-variant text-4xl text-accent mr-3" />
              <Text className="text-2xl font-semibold text-foreground">
                精美分享
              </Text>
            </View>
            <Text className="text-xl text-muted-foreground leading-relaxed">
              生成专属人格卡片
            </Text>
          </View>
        </View>

        {/* 开始按钮 */}
        <Button
          className="w-full max-w-md bg-gradient-primary text-primary-foreground text-2xl font-semibold rounded-3xl shadow-lg"
          onClick={handleStart}
        >
          <View className="py-5">
            <Text>开始测试</Text>
          </View>
        </Button>

        {/* 底部提示 */}
        <View className="mt-8">
          <Text className="text-xl text-muted-foreground text-center">
            跟随直觉，无需犹豫
          </Text>
        </View>
      </View>
    </View>
  )
}
