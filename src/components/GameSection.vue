<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import GameModal from './GameModal.vue'
import { Gamepad2, Download, ExternalLink, Play, Github } from 'lucide-vue-next'

defineProps({
  games: {
    type: Array,
    required: true
  }
})

const selectedGame = ref(null)

const openGameModal = (game) => {
  sound.playClick()
  selectedGame.value = game
}

const closeModal = () => {
  selectedGame.value = null
}
</script>

<template>
  <section id="games" class="py-14 border-b border-pixel-border/60">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- 模块标题 -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
        <div>
          <div class="flex items-center gap-2 text-pixel-green font-pixel text-xs tracking-wider mb-1">
            <Gamepad2 class="w-4 h-4" />
            <span>PIXEL ARCADE & LAB</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">独立像素小游戏 (作品展示与下载)</h2>
        </div>
        <p class="text-xs text-slate-400">
          自主设计手感、物理碰撞与状态机逻辑的趣味作品。
        </p>
      </div>

      <!-- 游戏卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="game in games" 
          :key="game.id"
          class="pixel-border bg-pixel-card flex flex-col justify-between group overflow-hidden"
          @mouseenter="sound.playHover()"
        >
          <div>
            <!-- 游戏顶部封面色块 / 虚拟街机头 (支持本地图片与优雅降级) -->
            <div :class="['h-36 p-4 flex flex-col justify-between bg-gradient-to-br', game.coverColor, 'border-b-2 border-pixel-border relative overflow-hidden group/cover']">
              <img 
                v-if="game.image" 
                :src="game.image" 
                :alt="game.title"
                class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/cover:opacity-85 group-hover/cover:scale-105 transition-all duration-300"
                @error="(e) => e.target.style.display = 'none'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

              <div class="flex items-center justify-between relative z-10">
                <span class="font-pixel text-[10px] px-2 py-0.5 bg-black/70 border border-white/20 text-white shadow-sm">
                  {{ game.platform }}
                </span>
                <span v-if="game.isWip" class="font-pixel text-[10px] text-pixel-purple bg-purple-950/80 px-2 py-0.5 border border-purple-500/50">
                  {{ game.wipBadge || 'IN DEV' }}
                </span>
                <span v-else class="font-pixel text-[10px] text-pixel-amber drop-shadow">INSERT COIN</span>
              </div>
              <h3 class="font-pixel text-base text-white drop-shadow-md relative z-10">
                {{ game.title }}
              </h3>
            </div>

            <!-- 内容区 -->
            <div class="p-5 space-y-3">
              <div class="text-xs font-semibold flex items-center gap-1.5" :class="game.isWip ? 'text-pixel-purple' : 'text-pixel-green'">
                <span class="w-1.5 h-1.5 rounded-full" :class="game.isWip ? 'bg-pixel-purple animate-pulse' : 'bg-pixel-green'"></span>
                <span>{{ game.type }}</span>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                {{ game.desc }}
              </p>

              <!-- 键位/架构提示 -->
              <div class="text-[11px] text-slate-400 font-mono bg-pixel-bg p-2 border border-pixel-border">
                <span :class="game.isWip ? 'text-pixel-purple' : 'text-pixel-amber'">{{ game.isWip ? '架构:' : '按键:' }}</span> {{ game.controls }}
              </div>
            </div>
          </div>

          <!-- 操作按钮栏 -->
          <div class="p-5 pt-0 flex items-center gap-2">
            <!-- 研发中游戏 -->
            <template v-if="game.isWip">
              <button 
                @click="openGameModal(game)"
                class="flex-1 pixel-btn py-2 bg-pixel-card text-pixel-purple border-pixel-purple hover:bg-purple-950/40 text-xs font-bold gap-1.5"
              >
                <span>架构亮点与说明</span>
              </button>

              <a 
                v-if="game.repoUrl"
                :href="game.repoUrl" 
                target="_blank"
                class="pixel-btn px-3 py-2 bg-purple-950/40 border-pixel-purple text-purple-200 hover:text-white text-xs font-bold gap-1.5"
                title="查看 GitHub 仓库 (Lost)"
                @click="sound.playCoin()"
              >
                <Github class="w-3.5 h-3.5" />
                <span>开源仓库</span>
              </a>
            </template>

            <!-- 网页版直接试玩 / 仓库 -->
            <template v-else-if="!game.isDownload">
              <a 
                :href="game.playUrl || game.repoUrl" 
                target="_blank"
                class="flex-1 pixel-btn py-2 bg-pixel-green text-black border-pixel-green text-xs font-bold gap-1.5"
                @click="sound.playCoin()"
              >
                <Play class="w-3.5 h-3.5 fill-black" />
                <span>立即试玩</span>
              </a>

              <a 
                :href="game.repoUrl" 
                target="_blank"
                class="p-2 border border-slate-700 hover:border-white text-slate-300 hover:text-white"
                title="查看 GitHub 仓库源码"
              >
                <Github class="w-4 h-4" />
              </a>
            </template>

            <!-- 客户端提供下载弹窗 -->
            <template v-else>
              <button 
                @click="openGameModal(game)"
                class="w-full pixel-btn py-2 bg-pixel-blue text-black border-pixel-blue text-xs font-bold gap-1.5"
              >
                <Download class="w-3.5 h-3.5" />
                <span>下载游戏 (.EXE)</span>
              </button>
            </template>
          </div>

        </div>
      </div>

    </div>

    <!-- 弹窗组件 -->
    <GameModal :game="selectedGame" @close="closeModal" />
  </section>
</template>
