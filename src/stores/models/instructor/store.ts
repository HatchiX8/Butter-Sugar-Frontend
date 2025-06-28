import { defineStore } from 'pinia';
import { ref} from 'vue';
import { getInstructor, getTeacherProfile, updateTeacherProfile, getTeacherCourses } from '@/api/instructor/index';
import type { ApiResponse, InstructorDataModel, Teacher, Course, TeacherProfile, TeacherCourse } from '@/api/instructor/types';
import axios from 'axios';

export const useInstructorStore = defineStore('instructor', () => {
  const dataModel = ref<InstructorDataModel>();
  const teacher = ref<Teacher>();
  const courses = ref<Course[]>([]);
  const teacherProfile = ref<TeacherProfile>();
  const teacherCourses = ref<TeacherCourse[]>([]);

  const loading = ref(false);
  const error = ref<string | null>(null);

  interface ActionResult {
    success: boolean;
    message: string;
  }

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

  // 取得教師資料
  const fetchTeacherProfile = async () => {
    error.value = null;

    try {
      const res: ApiResponse<TeacherProfile> = await getTeacherProfile();
      if (res.data) teacherProfile.value = res.data;
      else error.value = '取得教師資料失敗';
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  // 更新教師資料
  const saveTeacherProfile = async (formData: FormData): Promise<ActionResult> => {
    loading.value = true;
    error.value = null;
    try {
      const res: ApiResponse<TeacherProfile> = await updateTeacherProfile(formData);
      if (res.data) teacherProfile.value = res.data
      return { success: res.status, message: res.message };
    } catch (err) {
      const msg = getErrorMessage(err);
      error.value = msg;
      return { success: false, message: msg };
    } finally {
      loading.value = false;
    }
  };

  // 取得教師課程列表
  const fetchTeacherCourses = async (pageNum: number = 1) => {
    error.value = null;

    try {
      const res: ApiResponse<TeacherCourse[]> = await getTeacherCourses(pageNum);
      teacherCourses.value = res?.data ?? [];
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  return {
    // state
    error,
    teacher,
    courses,
    teacherProfile,
    teacherCourses,

    // actions
    fetchInstructor,
    fetchTeacherProfile,
    saveTeacherProfile,
    fetchTeacherCourses,
  };
});
