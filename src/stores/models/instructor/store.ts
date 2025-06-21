import { defineStore } from 'pinia';
import { ref} from 'vue';
import { getInstructor } from '@/api/instructor/index';
import type { ApiResponse, InstructorDataModel, Teacher, Course } from '@/api/instructor/types';
import axios from 'axios';

export const useInstructorStore = defineStore('instructorStore', () => {
  const dataModel = ref<InstructorDataModel>();
  const teacher = ref<Teacher>();
  const courses = ref<Course[]>([]);
  const error = ref<string | null>(null);

  // 錯誤訊息
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // 優先取後端回傳的 message
      const msg = err.response?.data?.message
      if (typeof msg === 'string') return msg;
    }
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return '發生未知錯誤';
  };

  // 取得單一精選教師
  const fetchInstructor = async (teacherId: string) => {
    error.value = null;

    try {
      const res: ApiResponse<InstructorDataModel> = await getInstructor(teacherId);
      if (res.data) dataModel.value = res.data;
      else error.value = '取得講師資料失敗';

      teacher.value = dataModel.value?.teacher;
      courses.value = dataModel.value?.course ?? [];
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  return {
    // state
    error,
    teacher,
    courses,

    // actions
    fetchInstructor,
  };
});
