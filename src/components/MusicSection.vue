<script setup>
import { ref, watch, computed } from 'vue'
import { sound } from '../utils/audio'
import { bgm, bgmState } from '../utils/bgmManager'
import { lyricsData } from '../data/lyrics'
import { 
  Music, Play, Pause, ExternalLink, Disc, Sparkles, 
  ChevronDown, ChevronUp, Radio, Volume2, Clock, 
  FileText, ListMusic, UserCheck
} from 'lucide-vue-next'

const props = defineProps({
  music: {
    type: Object,
    required: true
  }
})

const currentSong = ref(props.music.songs[0] || null)
const lyricsContainer = ref(null)
const activeTab = ref('lyrics') // 'lyrics' | 'info'
const showAll = ref(false)

// 格式化时间 00:00
const formatTime = (secs) => {
  if (isNaN(secs) || secs < 0) return '00:00'
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = Math.floor(secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// 当前播放歌词的高亮行索引
const currentLyricIndex = computed(() => {
  const t = bgmState.currentTime
  let idx = 0
  for (let i = 0; i < lyricsData.length; i++) {
    if (t >= lyricsData[i].time) {
      idx = i
    } else {
      break
    }
  }
  return idx
})

// 监听当前歌词变化，仅在内部容器内平滑滚动，绝不影响浏览器页面全局滚动！
watch(currentLyricIndex, () => {
  if (lyricsContainer.value && activeTab.value === 'lyrics') {
    const activeEl = lyricsContainer.value.querySelector('.active-lyric')
    if (activeEl) {
      const container = lyricsContainer.value
      const targetScrollTop = activeEl.offsetTop - container.offsetTop - (container.clientHeight / 2) + (activeEl.clientHeight / 2)
      container.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
    }
  }
})

// 点击歌词跳转播放
const seekLyric = (time) => {
  sound.playClick()
  bgm.seek(time)
  if (!bgmState.isPlaying) {
    bgm.toggle()
  }
}

// 进度条拖拽/点击
const onSeekSlider = (e) => {
  const targetTime = parseFloat(e.target.value)
  bgm.seek(targetTime)
}

// 播放/暂停（全局同步）
const togglePlay = () => {
  sound.playClick()
  bgm.toggle()
}

const toggleShowAll = () => {
  sound.playClick()
  showAll.value = !showAll.value
}
</script>

<template>
  <section id="music" class="py-14 border-b border-pixel-border/60">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- 模块标题 -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
        <div>
          <div class="flex items-center gap-2 text-rose-400 font-pixel text-xs tracking-wider mb-1">
            <Music class="w-4 h-4" />
            <span>AIGC SOUNDTRACK & CREATIVE LAB</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">数字创意与 AI 音乐 (网易云音乐人)</h2>
        </div>
        <p class="text-xs text-slate-400 max-w-sm">
          探索生成式 AI 提示词编曲实践，已在网易云音乐正式发行上线。已与全站背景音播放同步。
        </p>
      </div>

      <!-- 核心播放器主体卡片 -->
      <div class="pixel-border bg-pixel-card p-6 md:p-8 relative overflow-hidden group">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- 左侧：唱片/专辑封面展示 (Vinyl & Album Jacket) [4 cols] -->
          <div class="lg:col-span-5 flex flex-col items-center">
            
            <!-- 唱片机外壳与黑胶唱片联动效果 -->
            <div class="relative w-full max-w-[320px] aspect-square bg-[#0b0e14] border-2 border-pixel-border p-3 shadow-pixel flex items-center justify-center group/cover">
              
              <!-- 专辑封面大图 (优先加载本地 ice_cream.png，若无则自动降级展示像素 SVG) -->
              <div class="relative w-full h-full border border-slate-700 overflow-hidden shadow-inner bg-slate-900">
                <img 
                  :src="currentSong?.cover || './images/music/ice_cream.png'" 
                  @error="(e) => e.target.src = './images/music/ice_cream.svg'"
                  alt="Album Cover"
                  class="w-full h-full object-cover transition-transform duration-500"
                  :class="{ 'scale-105': bgmState.isPlaying }"
                />

                <!-- 播放状态角标 -->
                <div class="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-white/20 font-pixel text-[9px] text-rose-300 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500" :class="{ 'animate-ping': bgmState.isPlaying }"></span>
                  <span>{{ bgmState.isPlaying ? 'BGM PLAYING' : 'OFFICIAL CD' }}</span>
                </div>

                <div class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 border border-white/20 font-pixel text-[9px] text-pixel-amber">
                  AI 原创单曲
                </div>
              </div>

              <!-- 黑胶唱片露出一角动效 (与全局音乐同步旋转) -->
              <div 
                class="absolute -right-5 top-8 w-32 h-32 rounded-full border-4 border-slate-900 bg-neutral-900 hidden sm:flex items-center justify-center -z-10 shadow-pixel-sm transition-all duration-700"
                :class="bgmState.isPlaying ? 'translate-x-6 rotate-180 animate-spin' : 'translate-x-0'"
                style="animation-duration: 4s;"
              >
                <div class="w-10 h-10 rounded-full border-2 border-rose-500 bg-rose-950 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-black"></div>
                </div>
              </div>
            </div>

            <!-- 播放控制与进度条 -->
            <div class="w-full max-w-[320px] mt-5 space-y-3 bg-pixel-bg p-4 border border-pixel-border">
              
              <!-- 进度条滑块 -->
              <div class="space-y-1">
                <input 
                  type="range" 
                  min="0" 
                  :max="bgmState.duration" 
                  step="0.1"
                  :value="bgmState.currentTime" 
                  @input="onSeekSlider"
                  class="w-full h-1.5 bg-slate-800 rounded-none appearance-none cursor-pointer accent-rose-500"
                />
                <div class="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span class="text-rose-400">{{ formatTime(bgmState.currentTime) }}</span>
                  <span class="flex items-center gap-1">
                    <Clock class="w-3 h-3 text-slate-500" />
                    <span>{{ formatTime(bgmState.duration) }}</span>
                  </span>
                </div>
              </div>

              <!-- 播放控制按钮栏 -->
              <div class="flex items-center justify-between pt-1">
                <button 
                  @click="togglePlay"
                  class="pixel-btn px-4 py-2 bg-rose-600 text-white border-rose-600 hover:bg-rose-500 text-xs font-bold gap-2"
                >
                  <component :is="bgmState.isPlaying ? Pause : Play" class="w-4 h-4 fill-current" />
                  <span>{{ bgmState.isPlaying ? '暂停播放' : '播放背景音' }}</span>
                </button>

                <div class="flex items-center gap-2">
                  <a 
                    :href="currentSong?.neteaseUrl || 'https://music.163.com'" 
                    target="_blank" 
                    class="pixel-btn px-3 py-1.5 bg-red-600/90 text-white border-red-600 hover:bg-red-500 text-xs font-bold gap-1"
                    title="前往网易云音乐在线试听与评论"
                    @mouseenter="sound.playHover()"
                  >
                    <Disc class="w-3.5 h-3.5" />
                    <span>网易云</span>
                    <ExternalLink class="w-3 h-3" />
                  </a>

                  <a 
                    v-if="music.artistNeteaseUrl"
                    :href="music.artistNeteaseUrl" 
                    target="_blank" 
                    class="p-1.5 border border-slate-700 hover:border-slate-400 text-slate-400 hover:text-white"
                    title="访问网易云音乐人主页"
                    @mouseenter="sound.playHover()"
                  >
                    <UserCheck class="w-4 h-4 text-rose-400" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          <!-- 右侧：双语实时滚动歌词与歌曲解析面板 [7 cols] -->
          <div class="lg:col-span-7 flex flex-col h-full space-y-4">
            
            <!-- 歌曲标题与风格标签 -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-pixel-border">
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <span>{{ currentSong?.title }}</span>
                  <span class="text-xs md:text-sm font-normal text-slate-400">({{ currentSong?.titleCn }})</span>
                </h3>
                <div class="text-xs text-rose-400 font-pixel mt-1">
                  STYLE: {{ currentSong?.style }} · 时长 {{ currentSong?.duration || '03:24' }}
                </div>
              </div>

              <!-- 选项卡切换：歌词 vs 介绍 -->
              <div class="flex items-center gap-1 bg-pixel-bg p-1 border border-pixel-border self-start">
                <button 
                  @click="activeTab = 'lyrics'" 
                  class="px-2.5 py-1 text-xs font-pixel transition-colors"
                  :class="activeTab === 'lyrics' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'"
                >
                  <FileText class="w-3.5 h-3.5 inline mr-1" />
                  <span>双语歌词</span>
                </button>
                <button 
                  @click="activeTab = 'info'" 
                  class="px-2.5 py-1 text-xs font-pixel transition-colors"
                  :class="activeTab === 'info' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'"
                >
                  <ListMusic class="w-3.5 h-3.5 inline mr-1" />
                  <span>创作解析</span>
                </button>
              </div>
            </div>

            <!-- 面板 1：双语实时歌词视窗 -->
            <div v-show="activeTab === 'lyrics'" class="relative flex-1">
              <div class="flex items-center justify-between text-[11px] text-slate-400 font-pixel pb-2">
                <span>SYNCHRONIZED LYRICS (点击歌词可跳播)</span>
                <span class="text-rose-400">日文原词 / 中文释义</span>
              </div>

              <!-- 滚动歌词容器（仅在容器内部滚动，绝不锁定页面滚动条） -->
              <div 
                ref="lyricsContainer"
                class="h-[340px] overflow-y-auto pr-3 space-y-4 bg-pixel-bg/80 border border-pixel-border p-4 rounded-none select-none scrollbar-thin scrollbar-thumb-slate-700"
              >
                <div 
                  v-for="(line, idx) in lyricsData" 
                  :key="idx"
                  @click="seekLyric(line.time)"
                  class="cursor-pointer p-2 rounded transition-all duration-200 border-l-2"
                  :class="idx === currentLyricIndex ? 'active-lyric border-rose-500 bg-rose-950/30' : 'border-transparent hover:bg-slate-800/40 text-slate-400'"
                >
                  <!-- 日文原词 -->
                  <div 
                    class="font-medium text-sm md:text-base leading-snug"
                    :class="idx === currentLyricIndex ? 'text-white font-bold scale-[1.01]' : 'text-slate-300'"
                  >
                    {{ line.ja }}
                  </div>
                  <!-- 中文翻译 -->
                  <div 
                    class="text-xs mt-1"
                    :class="idx === currentLyricIndex ? 'text-rose-300 font-medium' : 'text-slate-500'"
                  >
                    {{ line.cn }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 面板 2：创作背景与 AIGC 解析 -->
            <div v-show="activeTab === 'info'" class="space-y-4 bg-pixel-bg/60 p-5 border border-pixel-border">
              <div class="space-y-2">
                <div class="text-xs font-pixel text-slate-400">SONG CONCEPT & STORY:</div>
                <p class="text-sm text-slate-300 leading-relaxed">
                  {{ currentSong?.desc }}
                </p>
              </div>

              <div class="space-y-2 pt-2 border-t border-slate-800">
                <div class="text-xs font-pixel text-slate-400">AIGC WORKFLOW (创作工作流):</div>
                <ul class="text-xs text-slate-300 space-y-1.5 font-mono">
                  <li class="flex items-start gap-2">
                    <span class="text-rose-400">></span>
                    <span><strong>提示词工程 (Prompting)</strong>：构建日系 J-Pop、青春元气动漫 OST 的情绪节拍提示词；</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-rose-400">></span>
                    <span><strong>人声与配器</strong>：调校清脆快节奏的合成器电音、管乐与灵动鼓点；</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-rose-400">></span>
                    <span><strong>母带与发行</strong>：降噪并调整动态增益，成功通过网易云音乐人官方审核并正式上线。</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>
