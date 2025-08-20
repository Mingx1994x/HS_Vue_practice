<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavLinks from '@/components/NavLinks.vue'

const links = ref([
  {
    name: '課程範例',
    route: '/week3',
  },
  {
    name: '進階任務',
    route: '/week3/week3-task',
  },
])
</script>
<template>
  <div class="w-3/4 mx-auto">
    <h2 class="text-3xl font-bold underline text-center mb-4">Week3 練習</h2>
    <NavLinks :routes="links" />
    <div class="mt-8">
      <RouterView />
    </div>
  </div>
</template>
