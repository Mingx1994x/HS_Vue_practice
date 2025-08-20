<script setup>
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavLinks from './components/NavLinks.vue'
import { onMounted, ref } from 'vue'

const links = ref([])
onMounted(() => {
  links.value = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Week1',
      route: '/week1',
    },
    {
      name: 'Week2',
      route: '/week2',
    },
    {
      name: 'Week3',
      route: '/week3',
    },
  ]
})
</script>

<template>
  <header>
    <HelloWorld msg="Vue3 前端新手營｜2025" />
  </header>
  <NavLinks :routes="links" mainNav />
  <div class="flex flex-wrap -mx-3 mt-3">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 80px;
}
</style>
