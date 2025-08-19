<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  routes: {
    type: Array,
    default: () => [],
  },
})
</script>
<template>
  <nav>
    <template v-for="(item, key) in routes" :key="key">
      <RouterLink :to="item.route">{{ item.name }} </RouterLink> |
    </template>
  </nav>
</template>
