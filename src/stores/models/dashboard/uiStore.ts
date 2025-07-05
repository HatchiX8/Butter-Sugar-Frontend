import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('teacherMenu', () => {
  const activeKey = ref<string>('BasicInfo');
  const isEditingCourse = ref(false);

  const setActiveKey = (key: string) => {
    activeKey.value = key;
  };

  const setEditingCourse = (editing: boolean) => {
    isEditingCourse.value = editing;
  };

  return {
    activeKey,
    isEditingCourse,
    setActiveKey,
    setEditingCourse,
  };
});
