import { reactive } from 'vue'

export const bgmState = reactive({
  isPlaying: false,
  currentTime: 0,
  duration: 204, // 默认 03:24 (204秒)
  title: "アイスクリームと晴れ空",
  audioSrc: "./audio/ice_cream.mp3",
  neteaseUrl: "https://music.163.com/song?id=3452818566&uct2=U2FsdGVkX198YFEg3qDxpsh1yVzs2j6+2svG0x7amnk="
})

class BgmController {
  constructor() {
    this.audio = null
    this.isInitialized = false
  }

  init() {
    if (this.isInitialized || typeof window === 'undefined') return
    
    this.audio = new Audio(bgmState.audioSrc)
    this.audio.preload = 'metadata'

    this.audio.addEventListener('timeupdate', () => {
      bgmState.currentTime = this.audio.currentTime
      if (this.audio.duration && !isNaN(this.audio.duration)) {
        bgmState.duration = this.audio.duration
      }
    })

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio.duration && !isNaN(this.audio.duration)) {
        bgmState.duration = this.audio.duration
      }
    })

    this.audio.addEventListener('ended', () => {
      bgmState.isPlaying = false
      bgmState.currentTime = 0
    })

    this.isInitialized = true
  }

  toggle() {
    this.init()
    if (!this.audio) return

    if (bgmState.isPlaying) {
      this.audio.pause()
      bgmState.isPlaying = false
    } else {
      this.audio.play().then(() => {
        bgmState.isPlaying = true
      }).catch((err) => {
        console.warn('BGM play request failed or blocked:', err)
        if (confirm('本地音频播放受限或未找到文件。是否立即打开网易云音乐在线收听原曲？')) {
          window.open(bgmState.neteaseUrl, '_blank')
        }
      })
    }
    return bgmState.isPlaying
  }

  seek(time) {
    this.init()
    if (this.audio) {
      this.audio.currentTime = time
      bgmState.currentTime = time
    }
  }

  pause() {
    if (this.audio && bgmState.isPlaying) {
      this.audio.pause()
      bgmState.isPlaying = false
    }
  }
}

export const bgm = new BgmController()
