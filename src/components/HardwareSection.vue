<script setup>
import { sound } from '../utils/audio'
import { Cpu, Radio, Zap, Activity } from 'lucide-vue-next'

defineProps({
  hardware: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section id="hardware" class="py-14 border-b border-pixel-border/60 bg-pixel-card/20">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- 模块标题 -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
        <div>
          <div class="flex items-center gap-2 text-pixel-purple font-pixel text-xs tracking-wider mb-1">
            <Cpu class="w-4 h-4" />
            <span>MAKER & EMBEDDED LAB</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">创客硬件实验室 (物理贯通)</h2>
        </div>
        <p class="text-xs text-slate-400">
          不局限于纯软件界面，具备从电路焊接、传感器选型到单片机控制的全流程动手能力。
        </p>
      </div>

      <!-- 硬件卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="item in hardware" 
          :key="item.id"
          class="pixel-border bg-pixel-card p-6 relative group"
          @mouseenter="sound.playHover()"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-pixel-bg border-2 border-pixel-purple flex items-center justify-center shrink-0 shadow-pixel-sm">
              <Zap class="w-6 h-6 text-pixel-purple" />
            </div>

            <div class="space-y-3 flex-1">
              <h3 class="text-lg font-bold text-white group-hover:text-pixel-purple transition-colors">
                {{ item.title }}
              </h3>

              <!-- 标签 -->
              <div class="flex flex-wrap gap-1.5">
                <span 
                  v-for="tag in item.tags" 
                  :key="tag"
                  class="px-2 py-0.5 bg-pixel-bg border border-slate-700 text-slate-300 text-[11px]"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- 原理与落地 -->
              <p class="text-xs md:text-sm text-slate-300 leading-relaxed bg-pixel-bg/60 p-3 border border-pixel-border">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
