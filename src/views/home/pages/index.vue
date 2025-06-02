<template>
  <div>
    <brandFeatures />
    <brandAdvantages />
    <popularCourses />
    <highlightedInstructors />
    <learnerReviews />
    <certificateMap />
  </div>
</template>

<script setup lang="ts">
import brandFeatures from '@/views/home/homeComps/brandFeatures.vue';
import brandAdvantages from '@/views/home/homeComps/brandAdvantages.vue';
import popularCourses from '@/views/home/homeComps/popularCourses.vue';
import highlightedInstructors from '@/views/home/homeComps/highlightedInstructors.vue';
import learnerReviews from '@/views/home/homeComps/learnerReviews.vue';
import certificateMap from '@/views/home/homeComps/certificateMap.vue';
</script>
