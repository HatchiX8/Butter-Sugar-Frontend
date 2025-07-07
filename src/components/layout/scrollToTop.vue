<template>
  <n-button
    v-show="showScrollTop"
    quaternary
    circle
    :class="[
      'z-50 b-solid b-1 rounded-full p-1 border-neutral_300 transition-all duration-300 hover:shadow-md',
      'fixed bottom-20 right-5'
    ]"
    @click="scrollToTop"
  >
    <span
      class="inline-block w-8 h-8 i-ion:arrow-up color-neutral_300 hover:color-neutral_200 hover:scale-105"
    />
  </n-button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
