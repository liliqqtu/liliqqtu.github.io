<script setup>
import { ref, onMounted } from 'vue'
import { sound } from '../utils/audio'
import { Music, Play, Pause, ExternalLink, Disc, Sparkles, ChevronDown, ChevronUp, Radio } from 'lucide-vue-next'

const props = defineProps({
  music: {
    type: Object,
    required: true
  }
})

const isPlaying = ref(false)
const audioElement = ref(null)
const currentSong = ref(props.music.songs[0] || null)
const audioAvailable = ref(true)
const showAll = ref(false)

const togglePlay = () => {
  if (!audioElement.value) return
  
  sound.playClick()
  if (isPlaying.value) {
    audioElement.value.pause()
    isPlaying.value = false
  } else {
    audioElement.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // 若本地还未放入 .mp3 文件，优雅降级提示，引导去网易云
      audioAvailable.value = false
      alert('本地暂未放入 MP3 文件（可将音频放入 public/audio/ice_cream.mp3），建议直接点击右侧按钮前往网易云音乐在线收听！')
    })
  }
}

const onAudioEnded = () => {
  isPlaying.value = false
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
            <span>AIGC & CREATIVE SOUND LAB</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">数字创意与 AI 音乐 (网易云音乐人)</h2>
        </div>
        <p class="text-xs text-slate-400 max-w-sm">
          探索生成式 AI 与提示词编曲实践，创作日系动漫与游戏叙事风格的音乐作品。
        </p>
      </div>

      <!-- 核心展示卡片：像素磁带播放器 (Pixel Cassette Player) -->
      <div class="pixel-border bg-pixel-card p-6 md:p-8 relative overflow-hidden group">
        
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <!-- 左侧：8-bit 随身听/磁带机拟物卡片 -->
          <div class="w-full lg:w-96 bg-pixel-bg border-2 border-pixel-border p-4 shadow-pixel relative">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-pixel-border text-[10px] font-pixel text-slate-400">
              <span class="flex items-center gap-1.5 text-rose-400">
                <Radio class="w-3.5 h-3.5 animate-pulse" />
                <span>CASSETTE TAPE</span>
              </span>
              <span class="text-pixel-amber">STEREO AIGC</span>
            </div>

            <!-- 磁带视窗与齿轮旋转动效 -->
            <div class="h-28 bg-[#181a20] border-2 border-slate-700 p-3 flex items-center justify-around relative rounded-sm">
              <!-- 左卷轴 -->
              <div class="w-12 h-12 rounded-full border-4 border-slate-600 bg-slate-800 flex items-center justify-center relative shadow-inner" :class="{ 'animate-spin': isPlaying }" style="animation-duration: 3s;">
                <div class="w-3 h-3 bg-pixel-bg rounded-full"></div>
                <div class="absolute w-1 h-full bg-slate-600"></div>
                <div class="absolute h-1 w-full bg-slate-600"></div>
              </div>

              <!-- 磁带标签贴纸 -->
              <div class="px-3 py-1 bg-rose-950/60 border border-rose-500/40 text-center z-10 max-w-[140px]">
                <div class="font-pixel text-[10px] text-rose-300 truncate">{{ currentSong?.title }}</div>
                <div class="text-[9px] text-slate-400 font-mono">{{ currentSong?.style?.split('/')[0] }}</div>
              </div>

              <!-- 右卷轴 -->
              <div class="w-12 h-12 rounded-full border-4 border-slate-600 bg-slate-800 flex items-center justify-center relative shadow-inner" :class="{ 'animate-spin': isPlaying }" style="animation-duration: 3s;">
                <div class="w-3 h-3 bg-pixel-bg rounded-full"></div>
                <div class="absolute w-1 h-full bg-slate-600"></div>
                <div class="absolute h-1 w-full bg-slate-600"></div>
              </div>
            </div>

            <!-- 播放器底部微控制器 -->
            <div class="mt-4 flex items-center justify-between pt-2 border-t border-pixel-border">
              <button 
                @click="togglePlay"
                class="pixel-btn px-4 py-1.5 bg-rose-600 text-white border-rose-600 hover:bg-rose-500 text-xs font-pixel gap-2"
              >
                <component :is="isPlaying ? Pause : Play" class="w-3.5 h-3.5 fill-current" />
                <span>{{ isPlaying ? 'PAUSE' : 'PLAY PREVIEW' }}</span>
              </button>

              <span class="text-[11px] font-mono text-slate-400">
                {{ isPlaying ? 'PLAYING...' : 'STANDBY' }}
              </span>
            </div>

            <!-- 隐藏的 HTML5 audio 元素 -->
            <audio 
              ref="audioElement" 
              :src="currentSong?.audioSrc" 
              @ended="onAudioEnded"
              preload="none"
            ></audio>
          </div>

          <!-- 右侧：曲目详情与官方平台直达 -->
          <div class="flex-1 space-y-4">
            
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 bg-rose-500/10 border border-rose-500/40 text-rose-400 font-pixel text-[11px]">
                  FEATURED TRACK
                </span>
                <span class="px-2 py-0.5 bg-pixel-bg border border-slate-700 text-slate-300 text-xs">
                  {{ currentSong?.platform }}
                </span>
              </div>

              <h3 class="text-2xl font-bold text-white flex items-center gap-2">
                <span>{{ currentSong?.title }}</span>
                <span class="text-sm font-normal text-slate-400">({{ currentSong?.titleCn }})</span>
              </h3>

              <div class="text-xs text-rose-300/90 font-medium">
                曲风定位：{{ currentSong?.style }}
              </div>
            </div>

            <p class="text-sm text-slate-300 leading-relaxed bg-pixel-bg/60 p-4 border border-pixel-border">
              {{ currentSong?.desc }}
            </p>

            <div class="text-xs text-slate-400 leading-relaxed">
              {{ music.description }}
            </div>

            <!-- 外部平台直达外链 -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <!-- 网易云歌曲直达 -->
              <a 
                :href="currentSong?.neteaseUrl || 'https://music.163.com'" 
                target="_blank" 
                class="pixel-btn px-4 py-2 bg-red-600 text-white border-red-600 hover:bg-red-500 text-xs font-bold gap-2"
                @mouseenter="sound.playHover()"
              >
                <Disc class="w-4 h-4" />
                <span>网易云音乐在线试听</span>
                <ExternalLink class="w-3.5 h-3.5 text-white/80" />
              </a>

              <!-- 网易云艺人主页（可选次级入口） -->
              <a 
                v-if="music.artistNeteaseUrl"
                :href="music.artistNeteaseUrl" 
                target="_blank" 
                class="pixel-btn px-3 py-2 bg-pixel-bg border-slate-700 hover:border-slate-400 text-slate-300 text-xs gap-1.5"
                @mouseenter="sound.playHover()"
              >
                <span>音乐人主页</span>
                <ExternalLink class="w-3 h-3 text-slate-500" />
              </a>
            </div>

          </div>

        </div>

        <!-- 未来支持更多歌曲展开时的设计（未来扩展槽） -->
        <div v-if="music.songs.length > 1" class="mt-8 pt-4 border-t border-pixel-border">
          <div class="flex items-center justify-between">
            <span class="text-xs font-pixel text-slate-400">TRACK LIST (共 {{ music.songs.length }} 首)</span>
            <button 
              @click="toggleShowAll"
              class="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-pixel"
            >
              <span>{{ showAll ? 'COLLAPSE' : 'EXPAND ALL' }}</span>
              <component :is="showAll ? ChevronUp : ChevronDown" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
