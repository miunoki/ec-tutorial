<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ chapter: number }>()

// 第 N 章需通过第 N-1 章的问卷；第一章无门槛，故 chapter 从 2 开始使用本组件。
const needKey = `rm-ec-passed-${props.chapter - 1}`
const unlocked = ref(false)

onMounted(() => {
  unlocked.value = localStorage.getItem(needKey) === '1'
})

const prevQuizUrl = withBase(`/chapter${props.chapter - 1}/quiz`)
</script>

<template>
  <div v-if="unlocked" class="chapter-gate is-ok">
    <span class="chapter-gate__icon">✅</span>
    <div class="chapter-gate__body">
      <strong>本章已解锁</strong>
      <span>你已完成第 {{ chapter - 1 }} 章的问卷，可以开始本章学习。</span>
    </div>
  </div>
  <div v-else class="chapter-gate is-lock">
    <span class="chapter-gate__icon">🔒</span>
    <div class="chapter-gate__body">
      <strong>本章尚未解锁</strong>
      <span>请先完成第 {{ chapter - 1 }} 章的问卷，通过后即可解锁本章。</span>
      <a class="chapter-gate__link" :href="prevQuizUrl">去完成第 {{ chapter - 1 }} 章问卷 →</a>
    </div>
  </div>
</template>
