<script setup>
import { sound } from '../utils/audio'
import { bgm, bgmState } from '../utils/bgmManager'
import { Volume2, VolumeX, Printer, Music2 } from 'lucide-vue-next'

const toggleBgm = () => {
  sound.playClick()
  bgm.toggle()
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
        <!-- 背景音乐 (BGM) 喇叭开关：与《アイスクリームと晴れ空》全局同步 -->
        <button 
          @click="toggleBgm" 
          :title="bgmState.isPlaying ? '点击暂停背景音乐：《アイスクリームと晴れ空》' : '点击播放背景音乐：《アイスクリームと晴れ空》'"
          class="pixel-btn px-2.5 py-1.5 transition-all text-xs flex items-center gap-2"
          :class="bgmState.isPlaying 
            ? 'bg-rose-950/40 border-rose-500 text-rose-300 shadow-pixel-sm' 
            : 'bg-pixel-card border-pixel-border hover:border-rose-400 text-slate-300 hover:text-white'"
        >
          <!-- 播放时的音波跳动微动效 -->
          <span v-if="bgmState.isPlaying" class="flex items-end gap-0.5 h-3">
            <span class="w-0.5 bg-rose-400 animate-pulse h-3"></span>
            <span class="w-0.5 bg-rose-400 animate-pulse h-1.5" style="animation-delay: 150ms;"></span>
            <span class="w-0.5 bg-rose-400 animate-pulse h-2.5" style="animation-delay: 300ms;"></span>
          </span>
          <component :is="bgmState.isPlaying ? Volume2 : VolumeX" class="w-4 h-4" :class="bgmState.isPlaying ? 'text-rose-400' : 'text-slate-400'" />
          
          <span class="font-pixel text-[11px] tracking-wide">
            {{ bgmState.isPlaying ? 'BGM: ON' : 'BGM: OFF' }}
          </span>
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
