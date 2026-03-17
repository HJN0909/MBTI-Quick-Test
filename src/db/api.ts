import { supabase } from '@/client/supabase'
import type { MBTIType, TestRecord } from './types'

// 获取MBTI类型信息
export async function getMBTIType(id: string): Promise<MBTIType | null> {
  const { data, error } = await supabase
    .from('mbti_types')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('获取MBTI类型失败:', error)
    return null
  }

  return data
}

// 保存测试记录
export async function saveTestRecord(
  mbtiType: string,
  answers: Record<number, string>
): Promise<TestRecord | null> {
  const { data, error } = await supabase
    .from('test_records')
    .insert({
      mbti_type: mbtiType,
      answers
    })
    .select()
    .maybeSingle()

  if (error) {
    console.error('保存测试记录失败:', error)
    return null
  }

  return data
}

// 上传分享卡片图片
export async function uploadShareImage(
  file: File | Blob | ArrayBuffer,
  fileName: string
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('app-ab1ewdnv3g8x_share_images')
    .upload(fileName, file)

  if (error) {
    console.error('上传分享图片失败:', error)
    return null
  }

  const { data: urlData } = supabase.storage
    .from('app-ab1ewdnv3g8x_share_images')
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
