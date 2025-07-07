import { defineStore } from 'pinia';
import instance from '@/api/axios';
import type { ApiResponse, Application } from '@/api/application/type';

export const useApplicationStore = defineStore('application', {
  state: () => ({
    application: null as Application | null,
    teacherApplications: [] as Application[],
  }),

  actions: {
    /**
     * 提交講師申請
     * @param course_name 課程名稱
     * @param description 課程描述
     * @returns API 回應
     */
    async postApplication(course_name: string, description: string): Promise<ApiResponse<Application>> {
      const res = await instance.post<ApiResponse<Application>>(`/api/v1/teacher-applications`, {
        course_name,
        description,
      });

      if (res.data.status && res.data.data) {
        this.application = res.data.data;
      }

      return res.data;
    },

    /**
     * 查詢教師申請列表
     * @returns API 回應
     */
    async getTeacherApplications(): Promise<ApiResponse<Application[]>> {
      const res = await instance.get<ApiResponse<Application[]>>(`/api/v1/teacher-applications`);

      if (res.data.status && res.data.data) {
        this.teacherApplications = res.data.data;
      }
      return res.data;
    },

    /**
     * 查詢教師申請詳情
     * @param id 申請 ID
     * @returns API 回應
     */
    // async getTeacherApplicationById(id: string): Promise<ApiResponse<Application>> {
    //   const res = await instance.get<ApiResponse<Application>>(`/api/v1/teacher-applications/${id}`);

    //   if (res.data.status && res.data.data) {
    //     this.application = res.data.data;
    //   }

    //   return res.data;
    // },
  },
});
