<script setup>
import { ref, onMounted } from 'vue'
import { sound } from '../utils/audio'
import { Github, Mail, MapPin, Check, Copy, ExternalLink, Gamepad2, Briefcase } from 'lucide-vue-next'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

// 打字机轮播效果
const titles = [
  '全栈系统开发 & 接口协同',
  '软硬件穿透研制 · 单片机与通信协议',
  '大语言模型 (LLM) API 接入与微调落地',
  '独立像素游戏制作者 (Web & 2D EXE)'
]
const currentTitle = ref('')
let titleIdx = 0
let charIdx = 0
let isDeleting = false

const typeEffect = () => {
  const currentFull = titles[titleIdx]
  
  if (isDeleting) {
    currentTitle.value = currentFull.substring(0, charIdx - 1)
    charIdx--
  } else {
    currentTitle.value = currentFull.substring(0, charIdx + 1)
    charIdx++
  }

  let delay = isDeleting ? 40 : 80

  if (!isDeleting && charIdx === currentFull.length) {
    delay = 2000 // 停留展示
    isDeleting = true
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false
    titleIdx = (titleIdx + 1) % titles.length
    delay = 400
  }

  setTimeout(typeEffect, delay)
}

onMounted(() => {
  typeEffect()
})

// 复制邮箱交互
const copied = ref(false)
const copyEmail = () => {
  sound.playClick()
  navigator.clipboard.writeText(props.profile.email)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2200)
}
</script>

<template>
  <section class="py-12 md:py-16 border-b border-pixel-border/60 relative overflow-hidden bg-pixel-grid">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        <!-- 左侧个人核心陈述 -->
        <div class="flex-1 space-y-5">
          <!-- 活跃求职状态标签 -->
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-pixel-card border border-pixel-green/40 shadow-pixel-sm">
            <span class="w-2.5 h-2.5 bg-pixel-green rounded-full animate-ping"></span>
            <span class="text-xs text-pixel-green font-medium tracking-wide">
              {{ profile.status }}
            </span>
          </div>

          <!-- 姓名与打字机职业定位 -->
          <div>
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              你好，我是 <span class="text-transparent bg-clip-text bg-gradient-to-r from-pixel-green via-pixel-blue to-pixel-amber font-pixel text-2xl md:text-4xl">{{ profile.name }}</span>
            </h1>
            
            <div class="h-8 flex items-center font-pixel text-xs md:text-sm text-pixel-blue tracking-wide">
              <span class="text-slate-500 mr-2">></span>
              <span>{{ currentTitle }}</span>
              <span class="animate-pulse ml-1 text-pixel-amber">_</span>
            </div>
          </div>

          <!-- 求职向自述 -->
          <p class="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl bg-pixel-card/50 p-4 border-l-4 border-pixel-blue">
            {{ profile.bio }}
          </p>

          <!-- 快速社交与联系渠道 -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a 
              :href="profile.github" 
              target="_blank" 
              class="pixel-btn px-3 py-1.5 bg-pixel-card border-slate-700 hover:border-white text-slate-200 text-xs gap-1.5"
              @mouseenter="sound.playHover()"
            >
              <Github class="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink class="w-3 h-3 text-slate-400" />
            </a>

            <a 
              :href="profile.gitee" 
              target="_blank" 
              class="pixel-btn px-3 py-1.5 bg-pixel-card border-slate-700 hover:border-red-400 text-slate-200 text-xs gap-1.5"
              @mouseenter="sound.playHover()"
            >
              <span class="font-pixel text-red-500 font-bold">G</span>
              <span>Gitee 协作</span>
              <ExternalLink class="w-3 h-3 text-slate-400" />
            </a>

            <button 
              @click="copyEmail" 
              class="pixel-btn px-3 py-1.5 bg-pixel-card border-slate-700 hover:border-pixel-green text-slate-200 text-xs gap-1.5"
            >
              <component :is="copied ? Check : Copy" class="w-4 h-4 text-pixel-green" />
              <span>{{ copied ? '已复制邮箱' : profile.email }}</span>
            </button>

            <span class="hidden lg:inline-flex items-center text-xs text-slate-400 gap-1 ml-2">
              <MapPin class="w-3.5 h-3.5 text-pixel-amber" />
              {{ profile.location }}
            </span>
          </div>

          <!-- CTA 快捷跳转按钮 -->
          <div class="flex items-center gap-4 pt-3 no-print">
            <a 
              href="#projects" 
              class="pixel-btn px-5 py-2.5 bg-pixel-blue text-black border-pixel-blue font-semibold text-sm hover:bg-sky-400 gap-2"
              @click="sound.playClick()"
            >
              <Briefcase class="w-4 h-4" />
              <span>查看工程项目</span>
            </a>

            <a 
              href="#games" 
              class="pixel-btn px-5 py-2.5 bg-pixel-card text-pixel-green border-pixel-green text-sm hover:bg-pixel-green/10 gap-2"
              @click="sound.playClick()"
            >
              <Gamepad2 class="w-4 h-4" />
              <span>体验小游戏</span>
            </a>
          </div>
        </div>

        <!-- 右侧像素复古形象与雷达属性卡 -->
        <div class="w-full md:w-72 bg-pixel-card border-2 border-pixel-border p-4 shadow-pixel">
          <div class="flex items-center justify-between pb-3 border-b border-pixel-border mb-3 font-pixel text-[11px] text-slate-400">
            <span>PLAYER STATS</span>
            <span class="text-pixel-green">LV.99 READY</span>
          </div>
          
          <div class="flex justify-center mb-4">
            <div class="relative w-28 h-28 border-2 border-pixel-green bg-pixel-bg p-1 shadow-pixel-sm">
              <img :src="profile.avatar" alt="Pixel Avatar" class="w-full h-full object-cover rendering-pixelated" />
              <div class="absolute -bottom-2 -right-2 bg-pixel-green text-black font-pixel text-[9px] px-1 py-0.5 border border-black">
                FULL
              </div>
            </div>
          </div>

          <!-- 属性条 -->
          <div class="space-y-2 text-xs">
            <div>
              <div class="flex justify-between text-slate-300 text-[11px] mb-0.5">
                <span>数理与算法 (MATH)</span>
                <span class="text-pixel-amber">MAX</span>
              </div>
              <div class="w-full bg-slate-800 h-2 border border-slate-700">
                <div class="bg-pixel-amber h-full w-[95%]"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-slate-300 text-[11px] mb-0.5">
                <span>软硬件贯通 (HARDWARE)</span>
                <span class="text-pixel-green">92%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 border border-slate-700">
                <div class="bg-pixel-green h-full w-[92%]"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-slate-300 text-[11px] mb-0.5">
                <span>工程架构与AI (SYSTEM)</span>
                <span class="text-pixel-blue">88%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 border border-slate-700">
                <div class="bg-pixel-blue h-full w-[88%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
