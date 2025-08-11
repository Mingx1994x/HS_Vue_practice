<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const links = ref([
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
])
</script>
<template>
  <nav>
    <RouterLink v-for="(item, key) in links" :key="key" :to="item.route">{{
      item.name
    }}</RouterLink>
  </nav>
</template>
