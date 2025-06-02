<template>
    <div class="text-center font-bold">
        <h3 class="text-4 sm:text-7 text-white">{{ subtitle }}</h3>
        <p class="text-3 sm:text-5 text-neutral_200 leading-tight mt-4">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    subtitle: string
    description: string
}>();
</script>
