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
    <div class="wrapper">
      <HelloWorld msg="Vue3 前端新手營｜2025" />
      <NavLinks :routes="links" />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
