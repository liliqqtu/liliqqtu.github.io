<script setup>
import { sound } from '../utils/audio'
import { X, Download, ExternalLink, Gamepad2, ShieldCheck, Keyboard } from 'lucide-vue-next'

defineProps({
  game: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  sound.playClick()
  emit('close')
}
</script>

<template>
  <div v-if="game" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
    <!-- 点击外部遮罩关闭 -->
    <div class="absolute inset-0" @click="handleClose"></div>

    <!-- 弹窗主体 -->
    <div class="relative w-full max-w-lg bg-pixel-card border-2 border-pixel-border shadow-pixel p-6 space-y-5 text-white z-10">
      
      <!-- 弹窗顶栏 -->
      <div class="flex items-center justify-between pb-3 border-b border-pixel-border">
        <div class="flex items-center gap-2">
          <Gamepad2 class="w-5 h-5" :class="game.isWip ? 'text-pixel-purple' : 'text-pixel-green'" />
          <h3 class="font-pixel text-sm" :class="game.isWip ? 'text-pixel-purple' : 'text-pixel-green'">{{ game.title }}</h3>
        </div>
        <button 
          @click="handleClose" 
          class="p-1 text-slate-400 hover:text-white border border-transparent hover:border-slate-600"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- 游戏说明 -->
      <div class="space-y-2">
        <div class="text-xs text-slate-400 font-pixel">{{ game.isWip ? 'SYSTEM ARCHITECTURE:' : 'GAME SPECS:' }}</div>
        <p class="text-sm text-slate-200 leading-relaxed bg-pixel-bg p-3 border border-pixel-border">
          {{ game.desc }}
        </p>
      </div>

      <!-- 研发中专属架构亮点 vs 普通按键指南 -->
      <template v-if="game.isWip">
        <div class="space-y-2">
          <div class="text-xs text-pixel-purple font-pixel">KEY ALGORITHMS & DESIGN:</div>
          <ul class="p-3 bg-pixel-bg border border-pixel-border text-xs text-slate-300 space-y-2">
            <li class="flex items-start gap-1.5">
              <span class="text-pixel-purple">✦</span>
              <span><strong>A* 网格寻路与地形代价</strong>：在 Godot (GDScript) 中实现棋盘格移动边界计算与障碍视线遮挡。</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-pixel-purple">✦</span>
              <span><strong>回合制有限状态机 (FSM)</strong>：严格解耦玩家回合、AI 决策树演化、战斗动画与结算阶段。</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-pixel-purple">✦</span>
              <span><strong>数值与克制矩阵</strong>：复刻经典《火焰纹章》武器三角克制、必杀概率与职业属性成长模型。</span>
            </li>
          </ul>
        </div>

        <div class="flex items-start gap-2 text-xs text-purple-300/80 bg-purple-950/30 p-2.5 border border-purple-900/50">
          <ShieldCheck class="w-4 h-4 text-pixel-purple shrink-0 mt-0.5" />
          <span>本项目作为重度策略系统架构实践，代码与核心玩法持续完善中，后续将开放试玩 Demo 与技术日志！</span>
        </div>
      </template>

      <template v-else>
        <!-- 按键操作指南 -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-pixel-amber font-pixel">
            <Keyboard class="w-4 h-4" />
            <span>CONTROLS (按键指引):</span>
          </div>
          <div class="p-3 bg-pixel-bg border border-pixel-border text-xs text-slate-300 font-mono">
            {{ game.controls }}
          </div>
        </div>

        <!-- 安全与免安装提示 -->
        <div class="flex items-start gap-2 text-xs text-slate-400 bg-emerald-950/20 p-2.5 border border-emerald-900/40">
          <ShieldCheck class="w-4 h-4 text-pixel-green shrink-0 mt-0.5" />
          <span>独立可执行程序 (.exe)，绿色免安装，解压即玩。若杀毒软件报未知程序，点击“允许运行”即可。</span>
        </div>
      </template>

      <!-- 操作区 -->
      <div class="flex items-center justify-end gap-3 pt-2 border-t border-pixel-border">
        <button 
          @click="handleClose" 
          class="px-4 py-2 border border-slate-700 text-slate-300 text-xs hover:border-slate-500"
        >
          关闭
        </button>

        <a 
          v-if="!game.isWip"
          :href="game.downloadUrl || 'https://github.com/liliqqtu/kirogame/releases'" 
          target="_blank"
          class="pixel-btn px-5 py-2 bg-pixel-green text-black border-pixel-green text-xs font-bold gap-2"
          @click="sound.playCoin()"
        >
          <Download class="w-4 h-4" />
          <span>前往 GitHub Releases 下载 (.exe)</span>
        </a>

        <a 
          v-if="game.isWip && game.repoUrl"
          :href="game.repoUrl"
          target="_blank"
          class="pixel-btn px-5 py-2 bg-pixel-purple text-white border-pixel-purple text-xs font-bold gap-1.5"
          @click="sound.playCoin()"
        >
          <ExternalLink class="w-4 h-4" />
          <span>访问 GitHub 源码 (Lost)</span>
        </a>

        <button 
          v-else-if="game.isWip"
          @click="handleClose"
          class="pixel-btn px-5 py-2 bg-pixel-purple text-white border-pixel-purple text-xs font-bold gap-1.5"
        >
          <span>了解进度</span>
        </button>
      </div>

    </div>
  </div>
</template>
