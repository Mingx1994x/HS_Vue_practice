<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>第一週 Vue 環境、基礎概念與 Vue 指令</template>
    餐點管理工具
    <a href="https://hackmd.io/9Q-arVa6RdGjeBoF2XPHMQ" target="_blank" rel="noopener"
      >w1作業繳交連結</a
    >
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>第二週 方法、監聽與AJAX </template>
    串接 Todo List API
    <a href="https://hackmd.io/GaHyBZ0nR-6-Z7s6zbXQhA" target="_blank" rel="noopener"
      >w2作業繳交連結</a
    >
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>第三週 Vue 與元件概念，Props 與 Emits</template>
    <p>上課範例： 購物車、推薦卡片整合</p>
    進階任務 - 元件拆分與資料傳遞
    <a href="https://rpg.hexschool.com/#/tasks/12062817613343793189" target="_blank" rel="noopener"
      >w3進階任務繳交連結</a
    >
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>第四週...to be continued</template>
  </WelcomeItem>
</template>
