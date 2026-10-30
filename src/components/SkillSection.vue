<script setup>
import { sound } from '../utils/audio'
import { Wrench, CheckCircle } from 'lucide-vue-next'

defineProps({
  skills: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section id="skills" class="py-14 border-b border-pixel-border/60">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- 模块标题 -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <div class="flex items-center gap-2 text-slate-400 font-pixel text-xs tracking-wider mb-1">
            <Wrench class="w-4 h-4 text-pixel-amber" />
            <span>TECH ARSENAL</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">全栈技能树矩阵</h2>
        </div>
      </div>

      <!-- 技能网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="group in skills" 
          :key="group.category"
          class="pixel-border bg-pixel-card p-5 space-y-4"
          @mouseenter="sound.playHover()"
        >
          <div class="pb-2 border-b border-pixel-border flex items-center gap-2">
            <span class="w-2 h-2 bg-pixel-blue"></span>
            <h3 class="font-bold text-sm text-white">{{ group.category }}</h3>
          </div>

          <div class="flex flex-wrap gap-2">
            <span 
              v-for="item in group.items" 
              :key="item"
              class="px-2.5 py-1 bg-pixel-bg border border-slate-700 hover:border-pixel-green text-slate-200 text-xs transition-colors cursor-default"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
