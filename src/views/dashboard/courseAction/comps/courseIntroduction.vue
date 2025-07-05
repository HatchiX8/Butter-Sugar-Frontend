<template>
  <div>
    <div class="mb-5">
      <p class="fw-bold text-primaryDefault">「撰寫一個吸引人的課程簡介」</p>
      <br />
      <ul class="introDesc line-height-5 pl-6">
        <li>課程名稱：簡單明瞭，能夠立即傳達課程主題。</li>
        <li>課程簡介：用幾句話概述課程內容，強調獨特價值。</li>
        <li>適合對象：明確說明此課程適合哪些學員，如初學者、進階學員或專業人士。</li>
        <li>課程長度與章節：說明學習時間，幫助學生規劃學習進度。</li>
        <li>學習收穫：告知學生完成課程後能夠掌握的技能與應用。</li>
        <li>課程圖片：視覺是學生對課程的第一印象，請選擇一張專屬於課程的封面</li>
      </ul>
    </div>
    <div v-if="canShowForm">
      <div class="w-100% mb-5">
        <div class="mb-5">
          <p class="fw-bold text-primaryDefault mb-3">課程名稱</p>
          <baseInput type="text" placeholder="請輸入課程名稱" v-model="courseTitle" disabled />
        </div>
        <div class="w-100% mb-5">
          <p class="fw-bold text-primaryDefault mb-3">課程類別</p>
          <n-space vertical>
            <n-select v-model:value="optionsValue" :options="options" placeholder="請選擇類別" disabled />
          </n-space>
        </div>
      </div>
    </div>

    <div v-show="courseTitle && optionsValue" class="w-100%">
      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:create-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          課程描述
          <span class="text-red-500 ml-1">*</span>
        </p>
        <n-input
          v-model:value="course_banner_description"
          type="textarea"
          placeholder="請輸入課程描述"
          class="bg-black focus:outline-none"
        />
      </div>
      <div class="mb-5">
        <!-- banner圖片 -->
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:create-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          Banner圖片
        </p>
        <div class="mb-5 flex gap-3">
          <div class="flex flex-col">
            <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
            <div v-if="imgBannerUrl !== ''">
              <img :src="imgBannerUrl" alt="Banner圖片預覽" class="rounded-lg w-full max-w-md shadow" />
            </div>
            <div class="flex items-center justify-between">
              <div v-show="isImgBanner" class="mr-4 flex-1">
                <n-upload
                  ref="imgBannerUploadRef"
                  accept="image/*"
                  :max="1"
                  :custom-request="customImgBannerUpload"
                  :show-file-list="true"
                  :show-trigger="false"
                  @remove="handleImgBannerRemove"
                />
              </div>
              <div v-show="!isImg" class="mr-2">尚未選擇Banner圖片</div>
              <!-- 右邊：上傳按鈕 -->
              <div>
                <n-button @click="triggerImgBannerUpload">上傳Banner圖片</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 課程封面圖片 -->
      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:create-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          課程圖片
          <span class="text-red-500 ml-1">*</span>
        </p>
        <div class="mb-5 flex gap-3">
          <div class="flex flex-col">
            <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
            <div v-if="imgUrl !== ''">
              <img :src="imgUrl" alt="課程圖片預覽" class="rounded-lg w-full max-w-md shadow" />
            </div>
            <div class="flex items-center justify-between">
              <div v-show="isImg" class="mr-4 flex-1">
                <n-upload
                  ref="imgUploadRef"
                  accept="image/*"
                  :max="1"
                  :custom-request="customImgUpload"
                  :show-file-list="true"
                  :show-trigger="false"
                  @remove="handleImgRemove"
                />
              </div>
              <div v-show="!isImg" class="mr-2">尚未選擇圖片</div>
              <!-- 右邊：上傳按鈕 -->
              <div>
                <n-button @click="triggerImgUpload">上傳圖片</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 課程簡介 -->
      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:create-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          課程簡介
          <span class="text-red-500 ml-1">*</span>
        </p>
        <n-input
          v-model:value="course_description"
          type="textarea"
          placeholder="請輸入課程簡介"
          class="bg-black focus:outline-none"
        />
      </div>
      <!-- 課程簡介圖片 -->
      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:create-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          課程簡介說明圖片
          <span class="text-red-500 ml-1">*</span>
        </p>
        <div class="mb-5 flex gap-3">
          <div class="flex flex-col">
            <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
            <div v-if="imgDescriptionUrl !== ''">
              <img
                :src="imgDescriptionUrl"
                alt="課程簡介圖片預覽"
                class="rounded-lg w-full max-w-md shadow"
              />
            </div>
            <div class="flex items-center justify-between">
              <div v-show="isImgDescription" class="mr-4 flex-1">
                <n-upload
                  ref="imgDescriptionUploadRef"
                  accept="image/*"
                  :max="1"
                  :custom-request="customImgDescriptionUpload"
                  :show-file-list="true"
                  :show-trigger="false"
                  @remove="handleImgDescriptionRemove"
                />
              </div>
              <div v-show="!isImgDescription" class="mr-2">尚未選擇簡介圖片</div>
              <!-- 右邊：上傳按鈕 -->
              <div>
                <n-button @click="triggerImgDescriptionUpload">上傳簡介圖片</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 預告片 -->
      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:create-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          課前準備
        </p>
        <div class="mb-5 flex gap-3 ml-6">
          <div class="flex flex-col">
            <p class="fw-bold text-primaryLight">預告片</p>
            <div class="flex items-center justify-between">
              <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
              <div v-show="isVideo" class="mr-4 flex-1">
                <n-upload
                  ref="videoUploadRef"
                  v-model:file-list="videoFileList"
                  accept="video/mp4"
                  :max="1"
                  :custom-request="customVideoUpload"
                  :show-file-list="true"
                  :show-trigger="false"
                  @remove="handleVideoRemove"
                />
                <!-- 預告片預覽 -->
                <video
                  v-if="trailerUrl"
                  :src="trailerUrl"
                  controls
                  class="rounded-lg w-full max-w-md"
                ></video>
              </div>
              <div v-show="!isVideo" class="mr-2">尚未選擇影片</div>
              <!-- 右邊：上傳按鈕 -->
              <div>
                <n-button @click="triggerVideoUpload">上傳影片</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 課程講義 -->
      <div class="mb-5">
        <div class="mb-5 flex gap-3 ml-6">
          <div class="flex flex-col">
            <p class="fw-bold text-primaryLight">課程講義</p>
            <div class="flex items-center justify-between">
              <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
              <div v-show="isFile" class="mr-4 flex-1">
                <n-upload
                  ref="fileUploadRef"
                  v-model:file-list="fileList"
                  accept="video/mp4,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  :max="5"
                  :custom-request="customFileUpload"
                  :show-file-list="true"
                  :show-trigger="false"
                  @remove="handleFileRemove"
                  multiple
                />
              </div>
              <div v-show="!isFile" class="mr-2">尚未選擇檔案</div>
              <!-- 右邊：上傳按鈕 -->
              <div>
                <n-button @click="triggerFileUpload">上傳檔案</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:people w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          適合對象
          <span class="text-red-500 ml-1">*</span>
        </p>
        <n-input
          v-model:value="suitable_for"
          type="textarea"
          placeholder="請輸入適合對象"
          class="bg-black focus:outline-none"
        />
      </div>
      <div class="mb-5">
        <p class="fw-bold text-primaryDefault mb-3 flex">
          <span class="i-ion:golf-outline w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          課程目標
          <span class="text-red-500 ml-1">*</span>
        </p>
        <n-input
          v-model:value="course_goal"
          type="textarea"
          placeholder="請輸入課程目標"
          class="bg-black focus:outline-none"
        />
      </div>
    </div>

    <n-button v-if="!isSubmitCategory" @click="modelValue = true" class="bg-secondaryDefault text-white border-none rounded-md px-4 py-3 mr-4 mb-4">建立課程</n-button>
    <n-button v-if="isSubmitCategory" @click="submitForm" :disabled="!isAllFilled" class="bg-secondaryDefault text-white border-none rounded-md px-4 py-3 mr-4 mb-4">儲存</n-button>
  </div>
  <titleModal
    v-model:modelValue="modelValue"
    v-model:inputValue="courseTitle"
    title="請輸入課程標題"
    :showFooter="true"
    @update:title="handleAddTitle"
    @update:type="handleAddCategory"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import titleModal from './titleModal.vue';
import { baseInput } from '@/components/index';
import type { AddChildRequestPayload, courseSaveFormPostData } from '@/views/dashboard/type';
import {
  apiPost_AddImg,
  apiDelete_DeleteImg,
  apiPost_AddImgBanner,
  apiDelete_DeleteImgBanner,
  apiPost_AddImgDescription,
  apiDelete_DeleteImgDescription,
  apiPost_AddTrailer,
  apiDelete_DeleteTrailer,
  apiPost_AddHandouts,
  apiDelete_DeleteHandouts,
  apiGet_handoutsDetail,
  apiPost_SaveForm,
} from '@/views/dashboard/api/index';
import { useMessage } from 'naive-ui';
import type { UploadFileInfo } from 'naive-ui';

const message = useMessage();

// -----------emit&props-----------
const props = defineProps<Props>();

interface Props {
  courseData: {
    id: string;
    course_name: string;
    category_id: string;
    course_description: string;
    course_banner_description: string;
    suitable_for: string;
    course_goal: string;
    course_banner_imageUrl: string;
    course_small_imageUrl: string;
    course_description_imageUrl: string;
    trailer_url: string;
    trailer_name: string;
  };
  isEdit: boolean;
  request: (args: AddChildRequestPayload) => Promise<unknown>;
}

// -----------------------------

// -----------彈跳視窗-----------
const emit = defineEmits<{
  'update:courseName': [val: string];
  'update:categoryId': [val: number];
}>();

const modelValue = ref(false);
const courseTitle = ref<string>('');
const isSubmitCategory = ref(false);

const handleAddTitle = async (title: string) => {
  courseTitle.value = title;
  emit('update:courseName', title); // 通知外層
  console.log('成功寫入', courseTitle.value);
  const courseId = await props.request({
    type: 'addTitle',
    payload: title,
  });
  titleId.value = courseId;
};
// -----------------------------

// -----------下拉選單-----------
// 這邊後續建議抓取API類別會比較準確
const options = [
  { label: '麵包', value: 2 },
  { label: '餅乾', value: 3 },
  { label: '蛋糕', value: 4 },
];
const optionsValue = ref();
const titleId = ref();

const handleAddCategory = async (categoryId: number) => {
  optionsValue.value = categoryId;
  await props.request({
    type: 'addCategory',
    payload: {
      categoryId,
    },
  });
  isSubmitCategory.value = true;
};

const hasCategoryChanged = ref(false);
watch(
  optionsValue,
  (newVal, oldVal) => {
    if (!hasCategoryChanged.value) {
      hasCategoryChanged.value = true;
      return; // 第一次監聽不觸發更新
    }

    if (newVal && newVal !== oldVal) {
      console.log('觸發存檔請求API', newVal);
      emit('update:categoryId', newVal); // 通知外層
      handleAddCategory(optionsValue.value);
    } else {
      return;
    }
  },
  {
    flush: 'post',
    immediate: false,
  }
);
// -----------------------------

// -----------影片上傳-----------
const videoUploadRef = ref();
const isVideo = ref(false);
const trailerUrl = ref<string>('');
const videoFileList = ref<UploadFileInfo[]>([]);
const triggerVideoUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = videoUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const customVideoUpload = async ({
  file,
  onFinish,
  onError,
}: {
  file: { file: File };
  onFinish: () => void;
  onError: (err: Error) => void;
}) => {
  try {
    const result = await apiPost_AddTrailer(titleId.value, file.file); // 你前面存好的課程 id
    trailerUrl.value = result.data.videoUrl; // 如果你想預覽可以設這個
    console.log('檢視寫入', result);

    videoFileList.value = [{
      id: titleId.value,
      name: file.file.name || '預告片',
      status: 'finished',
      url: trailerUrl.value || '',
    }];

    isVideo.value = true;
    onFinish(); // 通知 n-upload 成功
  } catch (err) {
    onError(err as Error); // 通知 n-upload 失敗
  }
};

const handleVideoRemove = () => {
  console.log('使用者移除影片');
  deleteTrailer();
  trailerUrl.value = '';
  isVideo.value = false;
};

const deleteTrailer = async () => {
  const res = await apiDelete_DeleteTrailer(titleId.value);
  console.log('刪除預告片成功', res);
};
// -----------------------------

// -----------講義上傳-----------
const fileUploadRef = ref();
const isFile = ref(false);
const triggerFileUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = fileUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const fileList = ref<UploadFileInfo[]>([]);
const customFileUpload = async ({
  file,
  onFinish,
  onError,
}: {
  file: { file: File };
  onFinish: () => void;
  onError: (err: Error) => void;
}) => {
  console.log('使用者上傳的檔案名稱:', file.file.name);
  try {
    const result = await apiPost_AddHandouts(titleId.value, [file.file]);
    const handout = result.data.handouts[0];

    console.log('後端回傳的 handout 名稱:', handout.name);
    console.log('更新前fileList.value: ', fileList.value)
    // 找到 Naive UI 自動加進 fileList 的那一筆，更新它
    const targetIndex = fileList.value.findIndex(f => f.name === file.file.name && f.status !== 'finished');
    if (targetIndex !== -1) {
      fileList.value[targetIndex] = {
        ...fileList.value[targetIndex],
        id: handout.id,
        name: handout.name,
        status: 'finished',
        url: handout.url,
      };
    }
    console.log('更新後fileList.value: ', fileList.value)

    isFile.value = true;
    onFinish(); // 通知 n-upload 成功
  } catch (err) {
    onError(err as Error); // 通知 n-upload 失敗
  }
};

const handleFileRemove = ({ file }: { file: UploadFileInfo }) => {
  console.log('使用者移除檔案');

  // 刪除後端講義
  deleteHandouts(file.id);

  // 若清空了所有檔案，設定 isFile 為 false
  if (fileList.value.length === 0) {
    isFile.value = false;
  }
};

const deleteHandouts = async (id: string) => {
  const res = await apiDelete_DeleteHandouts(id);
  console.log('刪除講義成功', res);
};
// -----------------------------

// -----------課程圖片-----------
const imgUploadRef = ref();
const isImg = ref(false);
const imgUrl = ref<string>(''); // 儲存圖片網址

const triggerImgUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = imgUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const customImgUpload = async ({
  file,
  onFinish,
  onError,
}: {
  file: { file: File };
  onFinish: () => void;
  onError: (err: Error) => void;
}) => {
  try {
    const result = await apiPost_AddImg(titleId.value, file.file); // 你前面存好的課程 id
    imgUrl.value = result.data.imageUrl; // 如果你想預覽可以設這個
    console.log('檢視寫入', imgUrl.value);

    isImg.value = true;
    onFinish(); // 通知 n-upload 成功
  } catch (err) {
    onError(err as Error); // 通知 n-upload 失敗
  }
};

const handleImgRemove = () => {
  console.log('使用者移除圖片');
  imgUrl.value = '';
  deleteImg();
  isImg.value = false;
};

const deleteImg = async () => {
  try {
    const res = await apiDelete_DeleteImg(titleId.value);
    console.log('檢視回傳', res);
  } catch (err) {
    console.log('刪除失敗', err);
  }
};
// -----------------------------

// -----------Banner圖片-----------
const imgBannerUploadRef = ref();
const isImgBanner = ref(false);
const imgBannerUrl = ref<string>(''); // 儲存圖片網址

const triggerImgBannerUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = imgBannerUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const customImgBannerUpload = async ({
  file,
  onFinish,
  onError,
}: {
  file: { file: File };
  onFinish: () => void;
  onError: (err: Error) => void;
}) => {
  try {
    const result = await apiPost_AddImgBanner(titleId.value, file.file); // 你前面存好的課程 id
    imgBannerUrl.value = result.data.imageUrl; // 如果你想預覽可以設這個
    console.log('檢視寫入', imgBannerUrl.value);

    isImgBanner.value = true;
    onFinish(); // 通知 n-upload 成功
  } catch (err) {
    onError(err as Error); // 通知 n-upload 失敗
  }
};

const handleImgBannerRemove = () => {
  console.log('使用者移除圖片');
  imgBannerUrl.value = '';
  deleteImgBanner();
  isImgBanner.value = false;
};

const deleteImgBanner = async () => {
  try {
    const res = await apiDelete_DeleteImgBanner(titleId.value);
    console.log('檢視回傳', res);
  } catch (err) {
    console.log('刪除失敗', err);
  }
};
// -----------------------------

// -----------課程描述圖片-----------
const imgDescriptionUploadRef = ref();
const isImgDescription = ref(false);
const imgDescriptionUrl = ref<string>(''); // 儲存圖片網址

const triggerImgDescriptionUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = imgDescriptionUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const customImgDescriptionUpload = async ({
  file,
  onFinish,
  onError,
}: {
  file: { file: File };
  onFinish: () => void;
  onError: (err: Error) => void;
}) => {
  try {
    const result = await apiPost_AddImgDescription(titleId.value, file.file); // 你前面存好的課程 id
    imgDescriptionUrl.value = result.data.imageUrl; // 如果你想預覽可以設這個
    console.log('檢視寫入', imgDescriptionUrl.value);
    isImgDescription.value = true;
    onFinish(); // 通知 n-upload 成功
  } catch (err) {
    onError(err as Error); // 通知 n-upload 失敗
  }
};

const handleImgDescriptionRemove = () => {
  console.log('使用者移除圖片');
  imgDescriptionUrl.value = '';
  deleteImgDescription();
  isImgDescription.value = false;
};

const deleteImgDescription = async () => {
  try {
    const res = await apiDelete_DeleteImgDescription(titleId.value);
    console.log('檢視回傳', res);
  } catch (err) {
    console.log('刪除失敗', err);
  }
};
// -----------------------------

// 判斷後端資料是否已載入
const isLoaded = ref(false);

// -----------表單內容-----------
// 當滿足三個值都有的時候才會顯示表單內容
const canShowForm = computed(() => !!courseTitle.value && !!optionsValue.value && !!titleId.value && isLoaded.value);

const suitable_for = ref<string>(''); // 適合對象
const course_goal = ref<string>(''); // 課程目標
const course_description = ref<string>(''); // 課程簡介
const course_banner_description = ref<string>(''); // 課程橫幅描述

const isAllFilled = computed(
  () =>
    suitable_for.value.trim() !== '' &&
    course_goal.value.trim() !== '' &&
    course_description.value.trim() !== '' &&
    course_banner_description.value.trim() !== ''
);

const checkRequiredFields = () => {
  const missingFields: string[] = []

  if (!imgUrl.value) missingFields.push('課程圖片')
  if (!imgDescriptionUrl.value) missingFields.push('課程簡介說明圖片')

  if (missingFields.length > 0) {
    message.error(`必填欄位:\n${missingFields.join(', ')}`);
    return false;
  }

  return true;
};

const submitForm = () => {
  if (!checkRequiredFields()) return;

  const postData = {
    suitable_for: suitable_for.value,
    course_goal: course_goal.value,
    course_description: course_description.value,
    course_banner_description: course_banner_description.value,
  };
  submitFormApi(titleId.value, postData);
};
const submitFormApi = async (titleId: string, postData: courseSaveFormPostData) => {
  try {
    const res = await apiPost_SaveForm(titleId, postData);
    if (res.status) message.success(res.message);
    else message.error(res.message);
    console.log('檢視寫入', res);
  } catch (err) {
    console.log('寫入失敗', err);
  }
};
// -----------------------------

// -----------監聽 props.courseData 的變化，一旦資料變動就觸發初始化流程-----------
const initForm = async (courseDetail: Props['courseData']) => {
  if (!courseDetail || !courseDetail.id) {
  courseTitle.value = '';
  optionsValue.value = '';
  titleId.value = '';
  isLoaded.value = false;
  return;
}

  try{
    // 判斷是否為有效課程基本資料
    const hasBasicInfo = !!courseDetail.course_name && !!courseDetail.category_id && !!courseDetail.id;
    if (hasBasicInfo){
      courseTitle.value = courseDetail.course_name ?? '';
      optionsValue.value = courseDetail.category_id ?? '';
      titleId.value = courseDetail.id ?? '';
      isSubmitCategory.value = true;
    }

    // 文字內容
    course_description.value = courseDetail.course_description ?? '';
    course_banner_description.value = courseDetail.course_banner_description ?? '';
    suitable_for.value = courseDetail.suitable_for ?? '';
    course_goal.value = courseDetail.course_goal ?? '';

    // Banner圖片
    if (courseDetail.course_banner_imageUrl){
      imgBannerUrl.value = courseDetail.course_banner_imageUrl ?? '';
      isImgBanner.value = true;
    }
    // 課程圖片
    if (courseDetail.course_small_imageUrl){
      imgUrl.value = courseDetail.course_small_imageUrl ?? '';
      isImg.value = true;
    }
    // 課程簡介說明圖片
    if (courseDetail.course_description_imageUrl){
      imgDescriptionUrl.value = courseDetail.course_description_imageUrl ?? '';
      isImgDescription.value = true;
    }

    // 預告片
    if (courseDetail.trailer_url){
      trailerUrl.value = courseDetail.trailer_url ?? '';
      isVideo.value = true;
      videoFileList.value = [{
        id: titleId.value,
        name: '預告片',
        status: 'finished',
        url: trailerUrl.value || '',
      }];
    }

    // 課程講義
    const res = await apiGet_handoutsDetail(courseDetail.id);
    const handouts = res.data?.handouts ?? [];
    if (handouts.length > 0) {
      fileList.value = handouts.map(handout => ({
        id: handout.id,
        name: handout.name,
        status: 'finished',
        url: handout.url,
      }));
      isFile.value = true;
    }

    // 標記後端資料已完成載入
    isLoaded.value = true;
  } catch (err) {
    console.error('載入課程資料失敗', err);
  }
};
watch(
  () => props.courseData,
  (newVal) => {
    if (!newVal || !newVal.id) {
      // 如果是新增模式，要清空欄位
      courseTitle.value = '';
      optionsValue.value = '';
      titleId.value = '';
      isLoaded.value = false;

      course_description.value = '';
      course_banner_description.value = '';
      suitable_for.value = '';
      course_goal.value = '';

      imgBannerUrl.value = '';
      isImgBanner.value = false;

      imgUrl.value = '';
      isImg.value = false;

      imgDescriptionUrl.value = '';
      isImgDescription.value = false;

      trailerUrl.value = '';
      isVideo.value = false;

      fileList.value = [];
      isFile.value = false;

      isSubmitCategory.value = false;

      return;
    }

    // 有資料才初始化
    initForm(newVal);
  },
  { immediate: true, deep: true } // immediate: 第一次也執行；deep: 避免淺層變動漏掉
);
// -----------------------------
</script>
<style scoped>
.introDesc li {
  padding: 10px 0;
  list-style: disc;
}
</style>
