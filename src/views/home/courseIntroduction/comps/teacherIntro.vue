<template>
  <!-- 只有當 teacherId 存在時才渲染組件 -->
  <div v-if="props.teacherId && isLoading" class="flex flex-col gap-4 w-full p-6 rounded-[0.125rem] border border-white/20 bg-blackbox-border">
    <div class="mb-2">
      <typography variant="h6" font-type="title" class="text-neutral-200">載入講師資料中...</typography>
    </div>
  </div>

  <div v-else-if="!props.teacherId" class="flex flex-col gap-4 w-full p-6 rounded-[0.125rem] border border-white/20 bg-black box-border">
    <div class="mb-2">
      <typography variant="h6" font-type="title" class="text-neutral-200">無講師資料</typography>
    </div>
  </div>

  <div v-else-if="props.teacherId && !isLoading && !teacherData" class="flex flex-col gap-4 w-full p-6 rounded-[0.125rem] border border-white/20 bg-blackbox-border">
    <div class="mb-2">
      <typography variant="h6" font-type="title" class="text-neutral-200">無講師資料</typography>
    </div>
  </div>

  <div v-else-if="props.teacherId && teacherData" class="flex flex-col gap-4 w-full p-6 rounded-[0.125rem] border border-white/20 bg-black box-border">
    <div class="mb-2">
      <typography variant="h6" font-type="title" class="text-neutral-200">關於講師</typography>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        <img :src="teacherData.avatar || defaultTeacherImg" :alt="teacherData.nickname + '照片'" class="w-full h-full" style="object-fit: cover; object-position: center;"/>
      </div>
      <div class="flex flex-col gap-2">
        <typography variant="h5" font-type="title" class="text-white">{{ teacherData.name }}</typography>
        <typography variant="paragraph-medium" font-type="content" class="text-neutral-100 flex items-center">
          <div class="i-ion:star text-primary-light me-1"></div>
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">{{ teacherData.rating || '5.0' }}（{{ teacherData.reviews_count || 0 }} 則評價）</typography>
        </typography>
      </div>
    </div>

    <typography v-if="teacherData.slogan" variant="h6" font-type="title" class="text-white mb-4">
      「{{ teacherData.slogan }}」
    </typography>

    <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">
      {{ teacherData.introduction }}
      </typography>

    <router-link :to="`/Home/highlighted-instructor/${props.teacherId}`" v-if="props.teacherId">
      <n-button size="large" class="px-3 py-6 max-w-164px">
        <div class="flex items-center gap-1">
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100" @click="goToTeacher">前往講師頁面</typography>
          <div class="i-ion:arrow-forward-outline cursor-pointer w-5 h-5"></div>
        </div>
      </n-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTeacherStore } from '@/stores/models/teacher/store';
import typography from '@/components/layout/typography.vue';
import { NButton } from 'naive-ui';
import defaultTeacherImg from '@/assets/images/course/teacher.jpg';

const props = defineProps({
  teacherId: {
    type: String,
    required: false,
    default: ''
  }
});

const teacherStore = useTeacherStore();
const isLoading = ref(false);
const teacherData = computed(() => {
  const data = teacherStore.getTeacherById(props.teacherId);
  return data;
});

// 標語已直接從 API 取得，不需要再處理

// 初始化加載講師資料
const loadTeacherData = async () => {
  if (!props.teacherId) {
    return;
  }

  // 檢查是否已有資料，但無論如何都重新獲取以確保資料最新
  isLoading.value = true;
  await teacherStore.fetchTeacher(props.teacherId);
  isLoading.value = false;
};

// 當組件掛載或 teacherId 變化時，加載講師資料
onMounted(() => {
  if (props.teacherId) {
    loadTeacherData();
  }
});

const emit = defineEmits(['go-to-teacher']);

const goToTeacher = () => {
  emit('go-to-teacher', props.teacherId);
};
</script>
