<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  routes: {
    type: Array,
    default: () => [],
  },
  mainNav: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <nav class="w-3/4" :class="mainNav ? 'mx-auto text-center' : 'me-auto'">
    <template v-for="(item, key) in routes" :key="key">
      <RouterLink :to="item.route">{{ item.name }} </RouterLink> |
    </template>
  </nav>
</template>
<style scoped>
nav {
  font-size: 20px;
}

nav a.router-link-exact-active {
  box-shadow: inset 0 6px 15px var(--color-secondary-300);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-radius: 8px;
}

nav a:first-of-type {
  border: 0;
}
</style>
