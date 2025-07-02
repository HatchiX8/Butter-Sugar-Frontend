<template>
  <div class="video-container mt-10 flex w-full flex-col px-2">
    <div class="flex flex-col justify-between gap-6 md:flex-row">
      <!-- 左側：撥放器 -->
      <div class="w-full md:flex-[2]">
        <!-- 16:9 外層容器（ UnoCSS 的 aspect-video ） -->
        <div
          class="relative aspect-video h-auto w-full overflow-hidden rounded-md bg-black shadow-md"
        >
          <video
            ref="videoRef"
            :src="currentVideoSrc"
            controls
            class="absolute inset-0 h-full w-full object-contain"
          >
            您的瀏覽器不支援 HTML5 影片標籤。
          </video>
        </div>

        <typography variant="h3" font-type="title" class="mt-4" no-underline>
          {{ currentVideoLabel }}
        </typography>
        <div class="video-title mt-5">
          <p> {{ props.courseName }} </p>
        </div>
        <div class="mt-5 w-full text-center md:flex-[2]">
          <n-spin :show="sectionStore.loading">
            <n-button type="warning" @click="goToNextSubsection" :loading="false"> 完成課程 </n-button>
          </n-spin>
        </div>
      </div>

      <!-- 右側：選單 。 縮排設定 :indent="12" -->
      <div class="video-menu h-auto w-full overflow-y-auto rounded-md shadow-sm md:flex-[1]">
        <n-spin :show="sectionStore.loading">
          <template v-if="!sectionStore.loading && !chapters.length">
            <div class="p-4 text-center">
              <p class="text-white mb-4">目前此課程尚無章節內容，已自動切換至預設影片</p>
            </div>
          </template>

          <n-menu
            v-else
            :options="menuOptions"
            accordion
            v-model:expanded-keys="expandedKeys"
            v-model:value="selectedKey"
            @update:value="switchVideo"
            :indent="12"
            class="h-full bg-transparent"
          />
        </n-spin>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import type { MenuOption } from 'naive-ui';
import { useMessage } from 'naive-ui';
import typography from '@/components/layout/typography.vue';
import { useSectionStore } from '@/stores/models/courseChapter/sectionStore';
import type { Section, Subsection } from '@/views/home/courseIntroduction/api/type';

const props = defineProps({
  courseName: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
    default: '',
  },
  subsectionId: {
    type: String,
    default: '',
  },
});

// 取得當前路由參數
const route = useRoute();
const courseId = computed(() => route.params.id as string);

// 使用 sectionStore
const sectionStore = useSectionStore();
const { sections } = storeToRefs(sectionStore);

// 定義影片項目介面
interface VideoItem {
  label: string;
  url: string;
}

// 定義章節介面
interface Chapter {
  name: string;
  title: string;
  videos: VideoItem[];
}

// 將 sections 轉換為 chapters 格式
const chapters = computed<Chapter[]>(() => {
  if (!sections.value || sections.value.length === 0) {
    return [];
  }

  return sections.value.map((section: Section) => ({
    name: section.id,
    // title: `章節 ${section.order_index + 1}: ${section.main_section_title}`,
    title: section.main_section_title,
    videos: section.subsections
      // 包含所有子章節，不再篩選
      .map((subsection: Subsection) => ({
        label: `${section.order_index + 1}-${subsection.order_index} | ${subsection.subsection_title}`,
        url: subsection.video_file_url || DEFAULT_VIDEO_URL, // 如果沒有影片 URL，則使用預設影片
      })),
  }));
});

// 預設影片 URL
const DEFAULT_VIDEO_URL = 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/cdefe418-56be-4c98-9a3d-a9e4016b532f.mp4';
const DEFAULT_VIDEO_LABEL = '預設影片';

// 初始化消息提示
const message = useMessage();

const menuOptions = ref<MenuOption[]>([]);
const selectedKey = ref<string>(DEFAULT_VIDEO_URL); // 預設為預設影片 URL
const expandedKeys = ref<string[]>([]); // 預設要展開的章節 key
const currentVideoSrc = ref<string>(DEFAULT_VIDEO_URL); // 預設為預設影片 URL
const currentVideoLabel = ref<string>(DEFAULT_VIDEO_LABEL); // 預設影片標題

const urlToLabelMap = new Map<string, string>();

const videoRef = ref<HTMLVideoElement | null>(null);
const STORAGE_KEY = 'myVideo-currentTime';

// 載入課程章節數據
const loadSections = async () => {
  if (courseId.value) {
    await sectionStore.fetchByCourse(courseId.value);
  }
};

// 建立影片項目與唯一 key 的對應關係
const videoKeyMap = new Map<string, VideoItem>();

onMounted(async () => {
  // 載入章節數據
  await loadSections();

  // 1. 先把所有影片的 URL→label 塞到 map 裡
  for (const chap of chapters.value) {
    for (const vid of chap.videos) {
      urlToLabelMap.set(vid.url, vid.label);
    }
  }

  // 2. 接著轉換成 n-menu 的 options，同時建立 videoKeyMap
  menuOptions.value = chapters.value.map((chap) => ({
    type: 'submenu',
    key: chap.name,
    label: () => {
      // 檢查是否有任何子章節是 active 的
      const hasActiveChild = chap.videos.some((_, idx) => {
        const childKey = `${chap.name}-${idx}`;
        return selectedKey.value === childKey;
      });

      return h(
        'div',
        {
          class: [
            'px-2 py-2 rounded-sm text-15px font-semibold',
            'hover:text-primaryDefault',
            hasActiveChild ? 'text-primaryDefault' : 'text-white',
          ],
        },
        chap.title
      );
    },
    children: chap.videos.map((vid, index) => {
      const uniqueKey = `${chap.name}-${index}`;
      // 建立唯一 key 與影片資訊的對應
      videoKeyMap.set(uniqueKey, vid);

      return {
        type: 'item',
        key: uniqueKey,
        label: () =>
          h(
            'div',
            {
              class: [
                'px-4 py-1 rounded-sm text-14px font-medium text-white',
                'hover:text-neutral_500',
                selectedKey.value === uniqueKey
                  ? 'bg-primaryDefault text-black'
                  : 'text-neutral-300 hover:text-primaryDefault',
              ],
            },
            vid.label
          ),
      };
    }),
  })) as MenuOption[];

  // 3. 檢查是否有指定的章節和子章節
  if (props.sectionId && props.subsectionId && chapters.value.length > 0) {
    // 尋找匹配的章節
    const targetChapter = chapters.value.find(chap => chap.name === props.sectionId);
    
    if (targetChapter) {
      // 展開目標章節
      expandedKeys.value = [targetChapter.name];
      
      // 尋找匹配的子章節索引
      // 從原始 sections 數據中查找對應的子章節
      const section = sections.value.find(s => s.id === props.sectionId);
      const targetSubsection = section?.subsections.find(sub => sub.id === props.subsectionId);
      
      // 如果找到子章節，尋找其在章節影片列表中的索引
      let targetSubsectionIndex = -1;
      if (targetSubsection) {
        targetSubsectionIndex = targetChapter.videos.findIndex(vid => 
          vid.label.includes(`${targetSubsection.order_index}`) && 
          vid.label.includes(targetSubsection.subsection_title)
        );
      }
      
      if (targetSubsectionIndex !== -1) {
        // 找到匹配的子章節，設置為當前選中項
        const targetKey = `${targetChapter.name}-${targetSubsectionIndex}`;
        const videoInfo = videoKeyMap.get(targetKey);
        
        if (videoInfo) {
          selectedKey.value = targetKey;
          currentVideoSrc.value = videoInfo.url;
          currentVideoLabel.value = videoInfo.label;
          return; // 已找到指定視頻，不需要繼續執行默認邏輯
        }
      }
    }
  }
  
  // 4. 如果沒有指定章節或找不到指定章節，使用默認邏輯
  if (chapters.value.length > 0) {
    const firstChapter = chapters.value[0];
    expandedKeys.value = [firstChapter.name];

    if (firstChapter.videos.length > 0) {
      const firstVideo = firstChapter.videos[0];
      const firstVideoKey = `${firstChapter.name}-0`; // 第一個影片的唯一 key

      selectedKey.value = firstVideoKey; // 使用唯一 key
      currentVideoSrc.value = firstVideo.url;
      currentVideoLabel.value = firstVideo.label;

      // 建立對應關係
      videoKeyMap.set(firstVideoKey, firstVideo);
      urlToLabelMap.set(firstVideo.url, firstVideo.label);
    } else {
      selectedKey.value = DEFAULT_VIDEO_URL;
      currentVideoSrc.value = DEFAULT_VIDEO_URL;
      currentVideoLabel.value = DEFAULT_VIDEO_LABEL;
      urlToLabelMap.set(DEFAULT_VIDEO_URL, DEFAULT_VIDEO_LABEL);
    }
  } else {
    selectedKey.value = DEFAULT_VIDEO_URL;
    currentVideoSrc.value = DEFAULT_VIDEO_URL;
    currentVideoLabel.value = DEFAULT_VIDEO_LABEL;
    urlToLabelMap.set(DEFAULT_VIDEO_URL, DEFAULT_VIDEO_LABEL);
  }

  // 4. 續播邏輯保持不變
  const videoEl = videoRef.value;
  if (videoEl) {
    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (savedTime !== null) {
      videoEl.addEventListener('loadedmetadata', () => {
        const t = parseFloat(savedTime);
        if (!isNaN(t) && t < videoEl.duration) {
          videoEl.currentTime = t;
        }
      });
    }
    videoEl.addEventListener('timeupdate', () => {
      localStorage.setItem(STORAGE_KEY, videoEl.currentTime.toString());
    });
    videoEl.addEventListener('ended', () => {
      localStorage.removeItem(STORAGE_KEY);
    });
  }
});

// 監聽 sectionId 和 subsectionId 的變化
const updateVideoByProps = () => {
  if (props.sectionId && props.subsectionId && chapters.value.length > 0) {
    // 尋找匹配的章節
    const targetChapter = chapters.value.find(chap => chap.name === props.sectionId);
    
    if (targetChapter) {
      // 展開目標章節
      expandedKeys.value = [targetChapter.name];
      
      // 尋找匹配的子章節索引
      // 從原始 sections 數據中查找對應的子章節
      const section = sections.value.find(s => s.id === props.sectionId);
      const targetSubsection = section?.subsections.find(sub => sub.id === props.subsectionId);
      
      // 如果找到子章節，尋找其在章節影片列表中的索引
      let targetSubsectionIndex = -1;
      if (targetSubsection) {
        targetSubsectionIndex = targetChapter.videos.findIndex(vid => 
          vid.label.includes(`${targetSubsection.order_index}`) && 
          vid.label.includes(targetSubsection.subsection_title)
        );
      }
      
      if (targetSubsectionIndex !== -1) {
        // 找到匹配的子章節，設置為當前選中項
        const targetKey = `${targetChapter.name}-${targetSubsectionIndex}`;
        const videoInfo = videoKeyMap.get(targetKey);
        
        if (videoInfo) {
          selectedKey.value = targetKey;
          currentVideoSrc.value = videoInfo.url;
          currentVideoLabel.value = videoInfo.label;
          
          // 重新載入視頻
          const v = videoRef.value;
          if (v) {
            v.load();
            v.play().catch(() => {});
          }
        }
      }
    }
  }
};

// 監聽 props 變化
watch([() => props.sectionId, () => props.subsectionId], () => {
  if (sections.value.length > 0) {
    updateVideoByProps();
  }
});

// 5. 點選影片後切換 src
const switchVideo = (key: string): void => {
  selectedKey.value = key;

  // 從 videoKeyMap 中取得對應的影片資訊
  const videoInfo = videoKeyMap.get(key);
  if (videoInfo) {
    currentVideoSrc.value = videoInfo.url;
    currentVideoLabel.value = videoInfo.label;
  }

  const v = videoRef.value;
  if (v) {
    v.load();
    v.play().catch(() => {});
  }
};

// 6. 完成課程按鈕點擊，前往下一章節
const goToNextSubsection = (): void => {
  // message.info('正在處理章節切換...');

  if (sectionStore.loading || chapters.value.length === 0) {
    // message.warning('課程內容加載中，請稍候再試');
    return;
  }

  const currentKey = selectedKey.value;

  // 如果是預設視頻，則直接前往第一個章節的第一個視頻
  if (currentKey === DEFAULT_VIDEO_URL) {
    if (chapters.value.length > 0 && chapters.value[0].videos.length > 0) {
      const firstChapterKey = `${chapters.value[0].name}-0`;
      switchVideo(firstChapterKey);
      // message.success('已切換到第一章節');
    } else {
      // message.warning('找不到可用的章節內容');
    }
    return;
  }

  // 修正：使用 lastIndexOf 來正確分割 key
  // 假設格式為 "chapterName-videoIndex"，其中 chapterName 可能包含 "-"
  const lastDashIndex = currentKey.lastIndexOf('-');
  if (lastDashIndex === -1) {
    // message.error('視頻選擇格式錯誤');
    return;
  }

  const currentChapterName = currentKey.substring(0, lastDashIndex);
  const currentVideoIndexStr = currentKey.substring(lastDashIndex + 1);
  const currentVideoIndex = parseInt(currentVideoIndexStr);

  if (isNaN(currentVideoIndex)) {
    // message.error('視頻索引格式錯誤');
    return;
  }

  // 找到當前章節在 chapters 陣列中的索引
  const currentChapterIndex = chapters.value.findIndex(c => c.name === currentChapterName);

  if (currentChapterIndex === -1) {
    // message.error('找不到當前章節');
    return;
  }

  const currentChapter = chapters.value[currentChapterIndex];

  // 判斷是否有下一個子章節
  if (currentVideoIndex < currentChapter.videos.length - 1) {
    // 前往同一章節的下一個子章節
    const nextVideoKey = `${currentChapterName}-${currentVideoIndex + 1}`;
    switchVideo(nextVideoKey);
    // message.success(`已切換到 ${currentChapter.title} 的下一個子章節`);
    return;
  }

  // 如果當前已是最後一個子章節，檢查是否有下一章節
  if (currentChapterIndex < chapters.value.length - 1) {
    const nextChapter = chapters.value[currentChapterIndex + 1];
    if (nextChapter.videos.length > 0) {
      // 前往下一章節的第一個子章節
      const nextVideoKey = `${nextChapter.name}-0`;

      // 展開下一章節的選單
      if (!expandedKeys.value.includes(nextChapter.name)) {
        expandedKeys.value.push(nextChapter.name);
      }

      switchVideo(nextVideoKey);
      // message.success(`已切換到 ${nextChapter.title} 的第一個子章節`);
      return;
    } else {
      // message.warning('下一章節無視頻內容');
    }
  }

  // 如果已經是最後一章的最後一個子章節
  message.success('恭喜您完成所有課程內容！');
};

</script>
<style scoped>
.video-menu :deep(.n-menu-item-content--selected)::before {
  background-color: transparent !important;
}
.video-menu :deep(.n-base-icon.n-menu-item-content__arrow svg) {
  fill: yellow !important;
}
</style>
