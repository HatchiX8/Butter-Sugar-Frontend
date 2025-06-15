<template>
	<svg v-if="!isBookmarked" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
		<path fill="#FFFDFA" d="M26 34a2 2 0 0 1-1.41-.58L18 26.82l-6.54 6.52A2 2 0 0 1 8 31.93V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2m0-2V4H10v27.93L18 24Z" class="clr-i-outline clr-i-outline-path-1" />
		<path fill="none" d="M0 0h36v36H0z" />
	</svg>

	<svg v-if="isBookmarked" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
		<path fill="#FFFDFA" d="M26 2H10a2 2 0 0 0-2 2v27.93a2 2 0 0 0 3.42 1.41l6.54-6.52l6.63 6.6A2 2 0 0 0 28 32V4a2 2 0 0 0-2-2" class="clr-i-solid clr-i-solid-path-1" />
		<path fill="none" d="M0 0h36v36H0z" />
	</svg>
</template>

<script setup lang="ts">
interface Props {
  isBookmarked?: boolean
}

defineProps<Props>()
</script>

<style scoped>
svg {
  width: 16px;
  height: 16px;
}
</style>
