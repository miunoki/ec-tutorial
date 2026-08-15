<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ chapter: number }>()

interface Question {
  q: string
  options: string[]
  answer: number
  explain?: string
}

interface QuizData {
  title: string
  pass: number
  questions: Question[]
}

// 问卷题库：按章节编号索引。编写后续章节时，在对应编号下补充 questions 即可。
const QUIZZES: Record<number, QuizData> = {
  1: {
    title: '第一章 · 认识 RoboMaster',
    pass: 8,
    questions: [
      {
        q: 'RoboMaster 机甲大师赛是由哪家公司发起创办的？',
        options: ['大疆创新（DJI）', '华为', '小米', '百度'],
        answer: 0,
        explain: 'RoboMaster 由大疆创新发起，是全球首个射击对抗类的机器人比赛。',
      },
      {
        q: 'RoboMaster 首届正式比赛是在哪一年举办的？',
        options: ['2013 年', '2014 年', '2015 年', '2016 年'],
        answer: 2,
        explain: '2015 年首届机甲大师赛正式举办；2013、2014 年是作为大疆夏令营的雏形。',
      },
      {
        q: '超级对抗赛（RMUC）一场比赛的时长约为多少？',
        options: ['3 分钟', '5 分钟', '7 分钟', '10 分钟'],
        answer: 2,
        explain: '超级对抗赛一局约 7 分钟，率先摧毁对方基地或血量占优的一方获胜。',
      },
      {
        q: '下列哪个机器人是全自动运行、在固定轨道上巡航保护基地的？',
        options: ['英雄机器人', '步兵机器人', '工程机器人', '哨兵机器人'],
        answer: 3,
        explain: '哨兵机器人全自动自瞄、自主导航，在固定轨道巡航，是基地的最后一道防线。',
      },
      {
        q: '英雄机器人使用的大弹丸直径约为多少？',
        options: ['17 毫米', '42 毫米', '6 毫米', '100 毫米'],
        answer: 1,
        explain: '英雄使用约 42mm 大弹丸（高尔夫球大小）；步兵使用 17mm 小弹丸。',
      },
      {
        q: '2019 年起，大能量机关被改造成了什么形式？',
        options: ['九宫格数字', '手写火焰数字', '五片装甲板的旋转大风车', '移动靶车'],
        answer: 2,
        explain: '2019 年大能量机关改为配备五片装甲板的巨大风车，需在远距离击打旋转扇叶。',
      },
      {
        q: '2026 赛季，工程机器人的核心任务发生了什么变化？',
        options: ['由取矿兑矿改为装配能量单元', '取消了工程机器人', '改为纯战斗', '改为搬运弹药'],
        answer: 0,
        explain: '2026 赛季工程机器人任务由「取矿兑矿」升级为抓取并装配「能量单元」。',
      },
      {
        q: '在一支战队中，通常负责电子电路、嵌入式开发与运动控制的是哪个组？',
        options: ['机械组', '电控组', '视觉组', '运营组'],
        answer: 1,
        explain: '电控组负责电路设计、嵌入式开发、运动控制与整车调试。',
      },
      {
        q: '「双轴云台」的「双轴」通常指哪两个自由度？',
        options: ['俯仰轴（pitch）与偏航轴（yaw）', '横滚轴与俯仰轴', 'X 轴与 Y 轴', '前进轴与后退轴'],
        answer: 0,
        explain: '双轴云台通常指俯仰（pitch）与偏航（yaw）两个轴，用于稳定与瞄准。',
      },
      {
        q: 'RoboMaster 是一个典型的多学科融合赛事，主要涵盖哪些学科？',
        options: ['仅机械设计', '仅嵌入式编程', '机器视觉、嵌入式、机械控制、人工智能等', '仅人工智能'],
        answer: 2,
        explain: 'RoboMaster 融合机器视觉、嵌入式系统、机械控制、惯性导航、人工智能等多学科。',
      },
    ],
  },
}

const quiz = computed(() => QUIZZES[props.chapter])

const answers = ref<Array<number | undefined>>([])
const submitted = ref(false)
const storageKey = `rm-ec-passed-${props.chapter}`
const alreadyPassed = ref(false)

onMounted(() => {
  alreadyPassed.value = localStorage.getItem(storageKey) === '1'
})

const score = computed(() => {
  const q = quiz.value
  if (!q) return 0
  return q.questions.reduce((s, item, i) => s + (answers.value[i] === item.answer ? 1 : 0), 0)
})

const total = computed(() => quiz.value?.questions.length ?? 0)
const answered = computed(() => answers.value.filter((a) => a !== undefined).length)

const passed = computed(() => {
  const q = quiz.value
  return !!q && score.value >= q.pass
})

const nextChapter = computed(() => {
  const n = props.chapter + 1
  return n <= 4 ? { n, url: withBase(`/chapter${n}/`) } : null
})

function choose(qIdx: number, optIdx: number) {
  if (submitted.value) return
  answers.value[qIdx] = optIdx
}

function submit() {
  if (answered.value < total.value) return
  submitted.value = true
  if (passed.value) localStorage.setItem(storageKey, '1')
}

function reset() {
  answers.value = []
  submitted.value = false
}

function letter(i: number) {
  return String.fromCharCode(65 + i)
}

function optClass(qIdx: number, optIdx: number) {
  if (!submitted.value) {
    return answers.value[qIdx] === optIdx ? 'is-selected' : ''
  }
  const q = quiz.value!.questions[qIdx]
  if (optIdx === q.answer) return 'is-correct'
  if (answers.value[qIdx] === optIdx) return 'is-wrong'
  return ''
}
</script>

<template>
  <div v-if="quiz" class="rm-quiz">
    <div class="rm-quiz__head">
      <span class="rm-status">第 {{ chapter }} 章问卷</span>
      <h2>{{ quiz.title }}</h2>
      <p>共 {{ total }} 题，答对 {{ quiz.pass }} 题即通过。通过后自动解锁下一章（进度保存在本机浏览器）。</p>
      <p v-if="alreadyPassed" class="rm-quiz__passed">✅ 你已通过本章问卷，下一章已解锁。</p>
    </div>

    <div v-for="(item, qi) in quiz.questions" :key="qi" class="rm-quiz__q">
      <p class="rm-quiz__q-title"><span class="rm-quiz__q-num">{{ qi + 1 }}</span>{{ item.q }}</p>
      <div class="rm-quiz__options">
        <button
          v-for="(opt, oi) in item.options"
          :key="oi"
          type="button"
          class="rm-quiz__opt"
          :class="optClass(qi, oi)"
          @click="choose(qi, oi)"
        >
          <span class="rm-quiz__letter">{{ letter(oi) }}</span>{{ opt }}
        </button>
      </div>
      <p v-if="submitted" class="rm-quiz__explain" :class="{ 'is-right': answers[qi] === item.answer }">
        {{ item.explain }}
      </p>
    </div>

    <div class="rm-quiz__actions">
      <template v-if="!submitted">
        <button type="button" class="rm-btn rm-btn-primary" :disabled="answered < total" @click="submit">
          提交答案
        </button>
        <span class="rm-quiz__hint">已作答 {{ answered }} / {{ total }}</span>
      </template>
      <template v-else>
        <div class="rm-quiz__result" :class="passed ? 'is-pass' : 'is-fail'">
          <span class="rm-quiz__score">{{ score }} / {{ total }}</span>
          <strong>{{ passed ? '🎉 通过！下一章已解锁。' : '未通过，复习后再试一次吧。' }}</strong>
          <a v-if="passed && nextChapter" class="rm-btn rm-btn-primary" :href="nextChapter.url">进入下一章 →</a>
          <button v-else type="button" class="rm-btn rm-btn-ghost" @click="reset">重新作答</button>
        </div>
      </template>
    </div>
  </div>

  <div v-else class="rm-quiz">
    <p>本章问卷题目待补充。</p>
  </div>
</template>
