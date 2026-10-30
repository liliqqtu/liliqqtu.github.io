export const portfolioData = {
  profile: {
    name: "Lili (明耀寒玥)",
    role: "软硬全栈工程师 · 独立游戏开发者",
    status: "积极求职中 (全栈 / 嵌入式 / 算法 / 游戏开发)",
    avatar: "./images/profile/avatar.png", // 用户放入本地头像后自动生效，未放前通过错误处理 fallback 到像素生成头像
    avatarFallback: "https://api.dicebear.com/7.x/pixel-art/svg?seed=lili_maker&backgroundColor=121722",
    bio: "拥有扎实的数学逻辑与建模底蕴（数学竞赛省二等奖），兼具软硬件贯通研发能力。既能在单片机电路板上焊出稳定通信的硬件终端，也能在云端高效接入大模型与高并发架构，同时热衷于用像素艺术和自研逻辑编写独立的 2D 小游戏。",
    location: "中国 · 河南 / 远程",
    email: "contact@lili.dev", // 可后续替换为用户的真实邮箱
    github: "https://github.com/liliqqtu",
    gitee: "https://gitee.com/LingYueQingChun"
  },

  // 🏆 竞赛荣誉（求职硬核背书）
  awards: [
    {
      id: "math",
      title: "第 17 届全国大学生数学竞赛（非数学 A 类）",
      prize: "省二等奖",
      organizer: "中国数学会",
      type: "算法与数理",
      desc: "体现突出的微积分、线性代数等底层数理推导功底，具备严密的逻辑思维与算法建模能力。"
    },
    {
      id: "computer",
      title: "第 19 届计算机设计大赛",
      prize: "校一等奖",
      organizer: "河南财经政法大学",
      type: "工程设计",
      desc: "综合软硬件架构设计、完整工程链路落地与答辩评审，展现团队协作与系统级交付能力。"
    }
  ],

  // 💼 核心工程项目（STAR 法则求职排版）
  projects: [
    {
      id: "campus-run",
      title: "校园跑综合服务与运动智能体系统",
      subtitle: "Campus Run with LLM & Mobile Platform",
      role: "核心开发 · LLM 接入与微调 · 接口联调",
      techStack: ["Java", "Spring Boot", "UniApp", "微信小程序", "LLM API", "MySQL", "Redis"],
      repoStatus: "团队协同仓库 (Gitee 权限受限 · 本地备份)",
      repoUrl: "https://gitee.com/LingYueQingChun",
      localFolder: "E:\\项目\\xlzp",
      image: "./images/projects/campus-run.png",
      summary: "面向高校跑步打卡与运动健康的综合服务系统，结合移动端、管理后台与大语言模型。",
      responsibilities: [
        "**大模型智能体接入**：完成 LLM 接口全链路对接，设计结构化 Prompt 模版与流式响应（SSE），为学生生成定制配速与运动指导；",
        "**场景化数据微调**：针对校园体育规范与健康安全问答做 Few-Shot 样本构建与微调限制，杜绝模型幻觉输出；",
        "**系统前后端联调**：协同团队完成 Spring Boot 后端接口与 UniApp 移动端的通信调试，确保打卡数据与对话流畅并发。"
      ],
      highlights: "攻关大模型在实际业务垂直场景的落地与低延时交互，本地保有完整工程源码。"
    },
    {
      id: "smart-elderly",
      title: "智慧养老综合监护与应急警报系统",
      subtitle: "Smart Elderly Care IoT & Embedded Hardware",
      role: "全权负责全部硬件研制 · 软硬通信协议设计",
      techStack: ["嵌入式硬件", "传感器阵列", "软硬件通信协议", "微控制器", "移动端协同"],
      repoStatus: "开源项目 (个人独立主导硬件)",
      repoUrl: "https://github.com/liliqqtu/jiayouhuawei",
      localFolder: null,
      image: "./images/projects/elderly-system.png",
      summary: "解决独居老人生命体征监测与跌倒紧急救助的软硬件一体化综合解决方案。",
      responsibilities: [
        "**全部硬件设计与研制**：自主完成传感器模块选型、电路板连线与原型焊接，集成姿态跌倒检测与生命体征感应模组；",
        "**软硬互联通信协议**：制定单片机端到移动端/网关的实时通信协议报文，实现毫米级跌倒识别与高可靠紧急报警机制；",
        "**抗干扰与低功耗调优**：针对日常微晃动设计数据滤波算法，有效降低误报率并优化待机功耗。"
      ],
      highlights: "实现真正意义上的从物理层传感器到应用层通信的软硬件全链路打通。"
    }
  ],

  // 🎮 独立像素小游戏（兼具玩法与下载）
  games: [
    {
      id: "kirogame",
      title: "Kirogame 像素探索",
      type: "Web 原生像素游戏",
      platform: "Web / 浏览器即开即玩",
      coverColor: "from-emerald-900 to-slate-900",
      image: "./images/games/kirogame.png",
      repoUrl: "https://github.com/liliqqtu/kirogame",
      playUrl: "https://github.com/liliqqtu/kirogame",
      isDownload: false,
      desc: "纯前端自研网页像素小游戏，基于 Canvas 与 原生 JavaScript 渲染，复古调色与平滑帧率控制。",
      controls: "方向键 / WASD 移动 · 空格交互"
    },
    {
      id: "contra-2d",
      title: "2D 像素魂斗罗复刻版",
      type: "独立客户端游戏 (.exe)",
      platform: "Windows PC",
      coverColor: "from-amber-900 to-slate-900",
      image: "./images/games/contra.png",
      repoUrl: null,
      downloadUrl: "https://github.com/liliqqtu/kirogame/releases", // 建议挂载 Releases
      isDownload: true,
      fileSize: "独立打包免安装",
      desc: "经典街机 2D 平台射击玩法重构。自主设计多向弹幕生成、多层碰撞体积判定与关卡敌人 AI 状态机。",
      controls: "WASD: 八向移动瞄准 | J: 连续射击 | K: 跳跃 | R: 快速重开"
    },
    {
      id: "pixel-runner",
      title: "像素跑酷闯关",
      type: "独立客户端游戏 (.exe)",
      platform: "Windows PC",
      coverColor: "from-sky-900 to-slate-900",
      image: "./images/games/runner.png",
      repoUrl: null,
      downloadUrl: "https://github.com/liliqqtu/kirogame/releases",
      isDownload: true,
      fileSize: "独立打包免安装",
      desc: "快节奏像素横版跑酷，强调严苛的物理跳跃手感、陷阱判定机制以及节奏感关卡编排。",
      controls: "A / D: 左右移动加速 | Space: 跳跃 / 二段跳 | Shift: 瞬间冲刺"
    }
  ],

  // 🔬 创客实验室（物理与硬件落地）
  hardware: [
    {
      id: "infrared-car",
      title: "多路红外循迹智能小车",
      image: "./images/hardware/car.png",
      tags: ["红外反射阵列", "电机驱动", "差速转向 PID", "硬件电路"],
      desc: "通过底部多路高灵敏度红外收发对管实时判别黑线边界，通过单片机定时器与 PWM 差速调校，实现平稳应对直角弯、十字路口与虚线轨迹。"
    },
    {
      id: "elderly-device",
      title: "智慧养老随身硬件终端",
      image: "./images/hardware/elderly-device.png",
      tags: ["姿态传感器", "单片机开发", "串口/蓝牙", "低功耗电源"],
      desc: "智慧养老项目的物理硬件核心。集成微型姿态传感器与应急按键，支持软硬件互联数据报文的快速上传与指示灯状态回馈。"
    }
  ],

  // 🛠️ 技能树矩阵
  skills: [
    {
      category: "编程语言 & 算法底蕴",
      items: ["Java", "C / C++", "C#", "Python", "JavaScript / ES6+", "数学建模与逻辑推演"]
    },
    {
      category: "后端架构 & 大模型落地",
      items: ["Spring Boot", "MySQL", "Redis", "LLM API 对接", "Prompt 微调与约束", "RESTful 规范"]
    },
    {
      category: "前端交互 & 游戏开发",
      items: ["Vue 3", "UniApp (微信小程序)", "HTML5 Canvas", "Tailwind CSS", "2D游戏物理与状态机", "Aseprite 像素绘制"]
    },
    {
      category: "嵌入式硬件 & 物联网",
      items: ["STM32 / 51 单片机", "多路传感器集成", "串口 / 蓝牙 / WiFi 通信协议", "电路板焊接与硬件调试"]
    }
  ]
};
