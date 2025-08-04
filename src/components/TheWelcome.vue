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
      >作業繳交連結</a
    >
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>第二週...to be continued</template>
  </WelcomeItem>
</template>
