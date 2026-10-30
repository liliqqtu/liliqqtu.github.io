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
            <!-- 游戏顶部封面色块 / 虚拟街机头 -->
            <div :class="['h-28 p-4 flex flex-col justify-between bg-gradient-to-br', game.coverColor, 'border-b-2 border-pixel-border relative']">
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] px-2 py-0.5 bg-black/60 border border-white/20 text-white">
                  {{ game.platform }}
                </span>
                <span class="font-pixel text-[10px] text-pixel-amber">INSERT COIN</span>
              </div>
              <h3 class="font-pixel text-base text-white drop-shadow-md">
                {{ game.title }}
              </h3>
            </div>

            <!-- 内容区 -->
            <div class="p-5 space-y-3">
              <div class="text-xs font-semibold text-pixel-green flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-pixel-green rounded-full"></span>
                <span>{{ game.type }}</span>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                {{ game.desc }}
              </p>

              <!-- 键位提示 -->
              <div class="text-[11px] text-slate-400 font-mono bg-pixel-bg p-2 border border-pixel-border">
                <span class="text-pixel-amber">按键:</span> {{ game.controls }}
              </div>
            </div>
          </div>

          <!-- 操作按钮栏 -->
          <div class="p-5 pt-0 flex items-center gap-2">
            <!-- 网页版直接试玩 / 仓库 -->
            <template v-if="!game.isDownload">
              <a 
                :href="game.repoUrl" 
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
