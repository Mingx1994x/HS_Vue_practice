<template>
  <h2>迷路了唷～～</h2>
  <p>{{ countDown }}秒後，系統將為您挑轉首頁</p>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const countDown = ref(7)
const router = useRouter()

let timer
onMounted(() => {
  timer = setInterval(() => {
    countDown.value--
    console.log(countDown.value)

    if (countDown.value === 0) router.push('/')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
