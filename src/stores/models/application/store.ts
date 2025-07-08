import { defineStore } from 'pinia';
import instance from '@/api/axios';
import type { ApiResponse, Application } from '@/api/application/type';

interface ApplicationsResponse {
  data: Application[];
  total: number;
  perNum: number;
  pageNum: number;
}

export const useApplicationStore = defineStore('application', {
  state: () => ({
    application: null as Application | null,
    teacherApplications: [] as Application[],
    adminTeacherApplications: [] as Application[],
    totalApplications: 0,
    perPage: 12,
    currentPage: 1,
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
     * 管理員獲取所有教師申請資料
     * @param page 頁碼
     * @param perPage 每頁顯示數量
     * @returns API 回應
     */
    async getAdminTeacherApplications(page: number = 1, perPage: number = 12): Promise<ApiResponse<ApplicationsResponse>> {
      const res = await instance.get<ApiResponse<ApplicationsResponse>>(`/api/v1/admin/teacher-applications`, {
        params: {
          page,
          perPage
        }
      });

      if (res.data.status && res.data.data) {
        this.adminTeacherApplications = res.data.data.data;
        this.totalApplications = res.data.data.total;
        this.perPage = res.data.data.perNum;
        this.currentPage = res.data.data.pageNum;
      }

      return res.data;
    },

    /**
     * 管理員審核教師申請
     * @param id 申請ID
     * @param status 審核狀態 (approved 或 rejected)
     * @returns API 回應
     */
    async reviewTeacherApplication(id: string, status: 'approved' | 'rejected'): Promise<ApiResponse<Application>> {
      const res = await instance.patch<ApiResponse<Application>>(`/api/v1/admin/teacher-applications/${id}/status`, {
        status
      });

      // 如果審核成功，更新本地狀態
      if (res.data.status) {
        // 更新管理員列表中的申請狀態
        const index = this.adminTeacherApplications.findIndex(app => app.id === id);
        if (index !== -1) {
          this.adminTeacherApplications[index].status = status;
        }
      }

      return res.data;
    },

    /**
     * 退回教師申請到審核狀態
     * @param id 申請ID
     * @returns API 回應
     */
    async returnToPendingStatus(id: string): Promise<ApiResponse<Application>> {
      // 使用相同的 API 端點，但將狀態設為 pending
      const res = await instance.patch<ApiResponse<Application>>(`/api/v1/admin/teacher-applications/${id}/status`, {
        status: 'pending'
      });

      // 如果操作成功，更新本地狀態
      if (res.data.status) {
        // 更新管理員列表中的申請狀態
        const index = this.adminTeacherApplications.findIndex(app => app.id === id);
        if (index !== -1) {
          this.adminTeacherApplications[index].status = 'pending';
        }
      }

      return res.data;
    },
  },
});
