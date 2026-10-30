<script setup>
import { sound } from '../utils/audio'
import { Briefcase, ExternalLink, HardDrive, CheckCircle, ShieldCheck, Terminal, Layers } from 'lucide-vue-next'

defineProps({
  projects: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section id="projects" class="py-14 border-b border-pixel-border/60 bg-pixel-card/20">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- 模块标题 -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
        <div>
          <div class="flex items-center gap-2 text-pixel-blue font-pixel text-xs tracking-wider mb-1">
            <Briefcase class="w-4 h-4" />
            <span>PRODUCTION ENGINEERING</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">重点工程项目 (求职核心)</h2>
        </div>
        <p class="text-xs text-slate-400 max-w-sm">
          采用 STAR 法则结构化呈现实际工程背景、技术分工与解决的复杂问题。
        </p>
      </div>

      <!-- 项目列表 -->
      <div class="space-y-8">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="pixel-border bg-pixel-card p-6 md:p-8"
        >
          <!-- 头部：标题与状态标签 -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-pixel-border">
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-xl md:text-2xl font-bold text-white">{{ project.title }}</h3>
                <span class="px-2.5 py-0.5 bg-pixel-blue/10 border border-pixel-blue/40 text-pixel-blue text-xs font-semibold">
                  {{ project.role }}
                </span>
              </div>
              <div class="text-xs font-pixel text-slate-400 mt-1">
                {{ project.subtitle }}
              </div>
            </div>

            <!-- 仓库/代码状态入口 -->
            <div class="flex items-center gap-2.5">
              <span v-if="project.localFolder" class="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs">
                <HardDrive class="w-3.5 h-3.5 text-pixel-amber" />
                <span>源码本地完备 ({{ project.localFolder }})</span>
              </span>

              <a 
                v-if="project.repoUrl" 
                :href="project.repoUrl" 
                target="_blank" 
                class="pixel-btn px-3 py-1.5 bg-pixel-bg border-slate-600 hover:border-pixel-blue text-slate-200 text-xs gap-1.5"
                @mouseenter="sound.playHover()"
              >
                <span>{{ project.repoStatus }}</span>
                <ExternalLink class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <!-- 技术栈标签胶囊 -->
          <div class="flex flex-wrap items-center gap-2 py-4">
            <span class="text-xs text-slate-400 font-pixel mr-1">STACK:</span>
            <span 
              v-for="tech in project.techStack" 
              :key="tech"
              class="px-2.5 py-1 bg-pixel-bg border border-pixel-border text-slate-200 text-xs hover:border-pixel-blue transition-colors"
            >
              {{ tech }}
            </span>
          </div>

          <!-- 项目摘要与我的职责分工 (STAR) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            
            <!-- 概述 -->
            <div class="lg:col-span-1 space-y-3 bg-pixel-bg/60 p-4 border border-pixel-border flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Layers class="w-4 h-4 text-pixel-blue" />
                  <span>系统背景与目标</span>
                </div>
                <p class="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {{ project.summary }}
                </p>

                <!-- 项目实机截图/架构图预览 (若存在) -->
                <div v-if="project.image" class="overflow-hidden border border-slate-700 bg-black/60 relative group/pimg">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="w-full h-36 object-cover group-hover/pimg:scale-105 transition-transform duration-300"
                    @error="(e) => e.target.parentElement.style.display = 'none'"
                  />
                  <span class="absolute bottom-1 right-1 bg-black/85 font-pixel text-[8px] text-pixel-blue px-1.5 py-0.5 border border-pixel-blue/40">
                    REAL SCREENSHOT
                  </span>
                </div>
              </div>
              
              <div class="pt-2 border-t border-slate-800 mt-2">
                <div class="text-[11px] text-slate-400 font-pixel mb-1">KEY HIGHLIGHT:</div>
                <div class="text-xs text-pixel-greenLight font-medium">
                  ✦ {{ project.highlights }}
                </div>
              </div>
            </div>

            <!-- 我的职责与贡献 -->
            <div class="lg:col-span-2 space-y-3 bg-pixel-bg/30 p-4 border border-pixel-border">
              <div class="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Terminal class="w-4 h-4 text-pixel-green" />
                <span>我的核心贡献与解决难点 (STAR)</span>
              </div>
              <ul class="space-y-2 text-xs md:text-sm text-slate-300">
                <li v-for="(resp, i) in project.responsibilities" :key="i" class="flex items-start gap-2">
                  <span class="text-pixel-green font-pixel text-xs mt-0.5">></span>
                  <span v-html="resp.replace(/\*\*(.*?)\*\*/g, '<strong class=\'text-white font-semibold\'>$1</strong>')"></span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>
