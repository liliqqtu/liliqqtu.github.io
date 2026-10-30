<script setup>
import { sound } from '../utils/audio'
import { Terminal, ArrowUp, Github, Heart } from 'lucide-vue-next'

const scrollToTop = () => {
  sound.playClick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="py-10 bg-pixel-card border-t-2 border-pixel-border text-slate-400 text-xs no-print">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
      
      <!-- 终端状态信息 -->
      <div class="flex items-center gap-2 font-pixel text-[11px] text-slate-400">
        <Terminal class="w-4 h-4 text-pixel-green" />
        <span>SYS.STATUS: 200 OK · STATIC HOSTED ON GITHUB PAGES</span>
      </div>

      <!-- 版权与致谢 -->
      <div class="text-center md:text-right space-y-1">
        <p class="text-slate-300">
          Designed with Neo-Pixel Aesthetics & Pure Vue 3 / Vite.
        </p>
        <p class="text-[11px] text-slate-500">
          © {{ new Date().getFullYear() }} Lili. Powered by GitHub Pages.
        </p>
      </div>

      <!-- 回到顶部 -->
      <button 
        @click="scrollToTop" 
        class="pixel-btn p-2.5 bg-pixel-bg border-slate-700 hover:border-pixel-blue text-slate-300 hover:text-white"
        title="返回顶部"
      >
        <ArrowUp class="w-4 h-4" />
      </button>

    </div>
  </footer>
</template>
