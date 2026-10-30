<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { Volume2, VolumeX, Printer, Code2 } from 'lucide-vue-next'

const isMuted = ref(sound.isMuted())

const toggleSound = () => {
  sound.toggleMute()
  isMuted.value = sound.isMuted()
}

const printResume = () => {
  sound.playClick()
  window.print()
}

const handleNavHover = () => {
  sound.playHover()
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b-2 border-pixel-border bg-pixel-bg/90 backdrop-blur-md no-print">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- 像素 Logo -->
      <a href="#" class="flex items-center gap-2.5 group" @mouseenter="handleNavHover">
        <div class="w-8 h-8 bg-pixel-card border-2 border-pixel-green flex items-center justify-center font-pixel text-xs text-pixel-green shadow-pixel-sm group-hover:bg-pixel-green group-hover:text-black transition-colors">
          >_
        </div>
        <div>
          <span class="font-pixel text-sm tracking-wider text-white">LILI.DEV</span>
          <span class="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 border border-pixel-green/40 text-pixel-green rounded bg-pixel-green/10">
            求职就绪
          </span>
        </div>
      </a>

      <!-- 快速导航 -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <a href="#awards" class="hover:text-pixel-amber transition-colors" @mouseenter="handleNavHover">🏆 荣誉</a>
        <a href="#projects" class="hover:text-pixel-blue transition-colors" @mouseenter="handleNavHover">💼 核心工程</a>
        <a href="#games" class="hover:text-pixel-green transition-colors" @mouseenter="handleNavHover">🎮 游戏</a>
        <a href="#hardware" class="hover:text-pixel-purple transition-colors" @mouseenter="handleNavHover">🔬 创客</a>
        <a href="#music" class="hover:text-rose-400 transition-colors" @mouseenter="handleNavHover">🎵 音乐</a>
        <a href="#skills" class="hover:text-slate-100 transition-colors" @mouseenter="handleNavHover">🛠️ 技能树</a>
      </nav>

      <!-- 顶部功能操作区 -->
      <div class="flex items-center gap-3">
        <!-- 音效开关 -->
        <button 
          @click="toggleSound" 
          :title="isMuted ? '开启 8-bit 复古微音效' : '已开启音效（点击静音）'"
          class="p-2 border border-pixel-border bg-pixel-card hover:border-pixel-blue text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
        >
          <component :is="isMuted ? VolumeX : Volume2" class="w-4 h-4 text-pixel-amber" />
          <span class="hidden sm:inline font-pixel text-[11px]">{{ isMuted ? 'MUTE' : 'AUDIO' }}</span>
        </button>

        <!-- 打印/导出求职页面 -->
        <button 
          @click="printResume" 
          class="pixel-btn px-3 py-1.5 bg-pixel-blue/10 border-pixel-blue text-pixel-blue hover:bg-pixel-blue hover:text-black text-xs font-semibold"
          title="以整洁无干扰格式打印或保存为 PDF 简历"
        >
          <Printer class="w-3.5 h-3.5 mr-1" />
          <span>导出简历</span>
        </button>
      </div>
    </div>
  </header>
</template>
