<script setup>
import { sound } from '../utils/audio'
import { Trophy, Award, Sparkles, CheckCircle2 } from 'lucide-vue-next'

defineProps({
  awards: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section id="awards" class="py-12 border-b border-pixel-border/60">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- 模块标题 -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <div class="flex items-center gap-2 text-pixel-amber font-pixel text-xs tracking-wider mb-1">
            <Trophy class="w-4 h-4" />
            <span>ACHIEVEMENTS UNLOCKED</span>
          </div>
          <h2 class="text-2xl font-bold text-white tracking-tight">竞赛荣誉与核心背书</h2>
        </div>
        <span class="text-xs text-slate-400 font-pixel hidden sm:inline">2 / 2 VERIFIED</span>
      </div>

      <!-- 荣誉卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="award in awards" 
          :key="award.id"
          class="pixel-border bg-pixel-card p-6 relative group"
          @mouseenter="sound.playHover()"
        >
          <!-- 8-bit 金色角标 -->
          <div class="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/40 text-pixel-amber font-pixel text-xs">
            <Sparkles class="w-3.5 h-3.5" />
            <span>{{ award.prize }}</span>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-pixel-bg border-2 border-pixel-amber flex items-center justify-center shrink-0 shadow-pixel-sm">
              <Award class="w-6 h-6 text-pixel-amber" />
            </div>

            <div class="space-y-2 pr-16">
              <div class="text-xs font-semibold text-slate-400 tracking-wider">
                {{ award.organizer }} · {{ award.type }}
              </div>
              <h3 class="text-lg font-bold text-white group-hover:text-pixel-amber transition-colors">
                {{ award.title }}
              </h3>
              <p class="text-sm text-slate-300 leading-relaxed pt-1">
                {{ award.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
