import { defineStore } from 'pinia';
import { ref } from 'vue';
import instance from '@/api/axios';

// 定義 API 回傳的講師資料介面
export interface TeacherApiResponse {
  teacher_id: string
  user_id: string
  name: string
  nickname?: string // 新增 nickname 欄位
  profile_image_url: string
  rating_score: string
  rating_users: string
  slogan: string
  description: string
  specialization?: string
}

// 前端使用的講師資料介面
export interface Teacher {
  id: string
  name: string
  nickname?: string
  avatar: string
  rating: string
  reviews_count: number
  slogan: string
  introduction: string
  specialization?: string
}

export const useTeacherStore = defineStore('teacherStore', () => {
  // 存儲講師資料
  const teachers = ref<Record<string, Teacher>>({});
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // 用於調試
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastApiResponse = ref<any>(null);

  // 從 API 獲取講師資料
  const fetchTeacher = async (teacherId: string) => {
    if (!teacherId) return null

    try {
      // 如果已經有快取的資料，直接返回
      if (teachers.value[teacherId]) {
        return teachers.value[teacherId]
      }

      loading.value = true
      error.value = null

      // 從 API 獲取資料
      const response = await instance.get(`/api/v1/teacher/${teacherId}`)
      const responseData = response.data
      lastApiResponse.value = responseData

      if (!responseData || !responseData.status || !responseData.data || !responseData.data.teacher) {
        throw new Error('講師資料格式錯誤或資料為空')
      }

      // API 返回的資料結構是 { status: true, message: "取得資料成功", data: { teacher: {...} } }
      const teacherData = responseData.data.teacher as TeacherApiResponse

      // 保存到 store 中，轉換 API 欄位為前端使用的欄位名稱
      const teacher: Teacher = {
        id: teacherData.teacher_id,
        name: teacherData.name || '',
        nickname: teacherData.nickname || teacherData.name || '', // 優先使用 nickname，如果沒有則使用 name
        avatar: teacherData.profile_image_url || '',
        rating: teacherData.rating_score || '0',
        reviews_count: parseInt(teacherData.rating_users || '0'),
        slogan: teacherData.slogan || '',
        introduction: teacherData.description || '',
        specialization: teacherData.specialization
      }

      teachers.value[teacherId] = teacher
      return teacher
    } catch (err) {
      // 設定錯誤狀態供 UI 層顯示
      error.value = err instanceof Error ? err.message : '獲取講師資料時發生錯誤'
      return null
    } finally {
      loading.value = false;
    }
  };

  // 根據 ID 獲取講師資料
  const getTeacherById = (id: string): Teacher | null => teachers.value[id] || null;

  // 清空講師資料
  const clearTeachers = () => {
    teachers.value = {};
  };

  return {
    teachers,
    loading,
    error,
    fetchTeacher,
    getTeacherById,
    clearTeachers
  };
});
