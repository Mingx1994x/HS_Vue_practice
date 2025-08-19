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
  <div>
    <h2 class="text-3xl font-bold underline py-4">Week3</h2>
    <NavLinks :routes="links" />
    <RouterView />
  </div>
</template>
