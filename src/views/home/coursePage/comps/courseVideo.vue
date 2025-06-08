<template>
  <div class="video-container w-full flex flex-col mt-10 px-2">
    <div class="flex flex-col md:flex-row justify-between gap-6">
      <!-- 左側：撥放器 -->
      <div class="w-full md:flex-[2]">
        <!-- 16:9 外層容器（ UnoCSS 的 aspect-video ） -->
        <div class="relative w-full aspect-video rounded-md overflow-hidden bg-black shadow-md h-auto">
          <video
            ref="videoRef"
            :src="currentVideoSrc"
            controls
            class="absolute inset-0 w-full h-full object-contain"
          >
            您的瀏覽器不支援 HTML5 影片標籤。
          </video>
        </div>

        <typography variant="h2" font-type="title" no-underline>
          {{ currentVideoLabel }}
        </typography>
        <div class="video-title mt-5">
          <p>職人級！一次掌握歐式麵包的高水量與發酵秘訣</p>
        </div>
        <div class="w-full md:flex-[2] text-center mt-5">
          <n-button type="warning">
            完成課程
          </n-button>
        </div>
      </div>

      <!-- 右側：選單 。 縮排設定 :indent="12" -->
      <div class="video-menu w-full md:flex-[1] rounded-md shadow-sm overflow-y-auto h-auto">
        <n-menu
          :options="menuOptions"
          accordion
          v-model:expanded-keys="expandedKeys"
          v-model:value="selectedKey"
          @update:value="switchVideo"
          :theme-overrides="menuThemeOverrides"
          :indent="12"
          class="h-full bg-transparent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { MenuOption, ThemeOverrides} from 'naive-ui'
import typography from '@/components/layout/typography.vue';

interface VideoItem {
  label: string
  url: string
}
interface Chapter {
  name: string
  title: string
  videos: VideoItem[]
}

const chapters = ref<Chapter[]>([
  {
    name: 'chapter1',
    title: '章節 1: 理解歐式麵包與高水量麵糰的基礎理論',
    videos: [
      {
        label: '1-1| 歐式麵包風格概論：從長棍到拖鞋麵包',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/cdefe418-56be-4c98-9a3d-a9e4016b532f.mp4'
      },
      {
        label: '1-2| 何謂高水量麵糰？水量比例與操作差異解析',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/44444444-dddd-eeee-ffff-111111111111.mp4'
      },
      {
        label: '1-3| 麵粉與酵母的選擇對最終麵包的影響',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/22222222-bbbb-cccc-dddd-333333333333.mp4'
      }
    ]
  },
  {
    name: 'chapter2',
    title: '章節 2: 高水量麵糰的操作技巧與工具應用',
    videos: [
      {
        label: '2-1| 高水量麵糰的操作技巧與工具應用',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/44444444-dddd-eeee-ffff-666666666666.mp4'
      },
      {
        label: '2-2| 如何控制黏手不失控？使用水手法與刮板技巧',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/44444444-dddd-eeee-ffff-444444444444.mp4'
      },
      {
        label: '2-3| 使用高吸水麵粉的操作調整要點',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/55555555-eeee-ffff-gggg-555555555555.mp4'
      }
    ]
  },
  {
    name: 'chapter3',
    title: '章節 3: 發酵過程全解析（時間 x 酵母 x 環境）',
    videos: [
      {
        label: '3-1| 直式發酵 vs. 冷藏長時發酵的差異與應用時機',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/66666666-ffff-gggg-hhhh-666666666666.mp4'
      },
      {
        label: '3-2| 階段性發酵觀察技巧 (初發 → 中間拉折 → 最終整形）',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/77777777-gggg-hhhh-iiii-777777777777.mp4'
      },
      {
        label: '3-3| 天然酵母與商用酵母的使用策略',
        url: 'https://butter-sugar-teacher-video.s3.ap-northeast-1.amazonaws.com/videos/88888888-hhhh-iiii-jjjj-888888888888.mp4'
      }
    ]
  }
])

const menuOptions = ref<MenuOption[]>([])
const selectedKey = ref<string>('') // 這裡綁定的是影片 URL
const expandedKeys = ref<string[]>([]) // 預設要展開的章節 key
const currentVideoSrc = ref<string>('') // 影片播放器的 src
const currentVideoLabel = ref<string>('') // 影片的文字標題

const urlToLabelMap = new Map<string, string>()

const videoRef = ref<HTMLVideoElement | null>(null)
const STORAGE_KEY = 'myVideo-currentTime'

onMounted(() => {
  // 1. 先把所有影片的 URL→label 塞到 map 裡
  for (const chap of chapters.value) {
    for (const vid of chap.videos) {
      urlToLabelMap.set(vid.url, vid.label)
    }
  }
  // 2. 接著轉換成 n-menu 的 options
  menuOptions.value = chapters.value.map((chap) => ({
    type: 'submenu',
    key: chap.name,

    label: () => 
      h(
        'div',
        {
          class: [ // 章節標題色彩設定
            'px-2 py-2 rounded-sm text-15px font-semibold text-white',
            'hover:text-primaryDefault',
          ]
        },
        chap.title
      ),

    children: chap.videos.map((vid) => ({
      type: 'item',
      key: vid.url,

      label: () =>
        h(
          'div',
          {
            class: [
              'px-4 py-1 rounded-sm text-14px font-medium text-white',
              'hover:text-neutral_500', 
              selectedKey.value === vid.url
              ? 'bg-primaryDefault text-black' /* active 状态 */
              : 'text-primaryDefault hover:text-primaryDefault', /* 非 active 状态 */
            ]
          },
          vid.label
        )
    }))
  }))

  // 3. 再做「預設第一支影片與 label」
  if (chapters.value.length > 0 && chapters.value[0].videos.length > 0) {
    const first = chapters.value[0].videos[0]
    selectedKey.value = first.url
    currentVideoSrc.value = first.url
    expandedKeys.value = [chapters.value[0].name]
    // 這時 map 已經有東西了，就能正確拿到 label
    currentVideoLabel.value = urlToLabelMap.get(first.url) || ''
  }

  // 4. 續播邏輯
  const videoEl = videoRef.value
  if (videoEl) {
    // 若 localStorage 有紀錄，就等 metadata 載入後設定回去
    const savedTime = localStorage.getItem(STORAGE_KEY)
    if (savedTime !== null) {
      videoEl.addEventListener('loadedmetadata', () => {
        const t = parseFloat(savedTime)
        if (!isNaN(t) && t < videoEl.duration) {
          videoEl.currentTime = t
        }
      })
    }
    videoEl.addEventListener('timeupdate', () => { // 監聽播放進度，不斷更新 localStorage
      localStorage.setItem(STORAGE_KEY, videoEl.currentTime.toString())
    })
    videoEl.addEventListener('ended', () => { // 播放結束，清除紀錄
      localStorage.removeItem(STORAGE_KEY)
    })
  }
})

const menuThemeOverrides = ref<ThemeOverrides>({
  Menu: {
    /* 一般項目 (item) 旁的箭頭 */
    arrowColor: '#ffffff',               // 預設，也就是「沒 hover/active 時」
    arrowColorHover: '#D68E39',          // 當滑鼠懸停在有箭頭的項目上
    arrowColorActive: '#D68E39',         // 當該項目被選中 (active) 時
    arrowColorChildActive: '#D68E39',    // 如果是「子層」被選中
    arrowColorChildActiveHover: '#D68E39',// 當滑鼠 hover 在「已被選中子層」情況下
    /* 章節標題 (groupHeader) 旁的箭頭 */
    groupHeaderArrowColor: '#ffffff',
    groupHeaderArrowColorHover: '#D68E39',
    groupHeaderArrowColorActive: '#D68E39',
    groupHeaderArrowColorChildActive: '#D68E39',
    groupHeaderArrowColorChildActiveHover: '#D68E39',
  }
})

// 5. 點選影片後切換 src
const switchVideo = (key: string): void => {
  currentVideoSrc.value = key
  currentVideoLabel.value = urlToLabelMap.get(key) || ''
  const v = videoRef.value
  if (v) {
    v.load()
    v.play().catch(() => {})
  }
}

</script>
<style scoped>
.video-menu :deep(.n-menu-item-content--selected)::before { background-color: transparent !important; }
.video-menu :deep(.n-menu-item-content__arrow svg) { fill: yellow !important; }
</style>
