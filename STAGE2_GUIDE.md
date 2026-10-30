# 第二阶段：数据补充与多媒体素材配置指引 (Stage 2 Guide)

> **目标**：为个人主页补充真实的实机运行图、实物照片、真实下载直链与个人联系方式，从“骨架完备”进阶为“图文并茂、极具说服力的求职作品集”。

---

## 一、 图片放置目录结构（已为你建好）

所有图片资源请统一放入项目的 `public/images/` 目录下。该目录下的文件在项目打包时会被原样输出到静态根目录，网页可以直接通过绝对或相对路径引用。

我们已为你创建好了以下 4 个专属文件夹：

```text
e:\Dream\self_page\public\images\
├── profile/        # 个人头像 / 形象照
├── projects/       # 重点工程项目截图（校园跑、智慧养老）
├── games/          # 独立小游戏截图或动图 GIF（魂斗罗、跑酷、Kirogame）
└── hardware/       # 创客硬件实物照片（红外小车、传感器主板）
```

---

## 二、 各模块所需图片与推荐命名清单

### 1. 个人形象 (Profile)
* **存放位置**：`public/images/profile/`
* **推荐文件**：`avatar.png` 或 `avatar.jpg`
* **建议**：
  * 比例 1:1（建议尺寸 400x400 或 512x512）；
  * 可以是极客/像素风头像，也可以是干净阳光的个人职业形象照。

---

### 2. 重点工程项目 (Projects)
* **存放位置**：`public/images/projects/`
* **所需素材**：
  1. **校园跑系统 (Campus Run)**：
     * 文件名建议：`campus-run.png`（或 `campus-run-1.png`）
     * **素材来源**：在电脑打开本地项目（`E:\项目\xlzp`），截图 1~2 张：
       * 推荐截图 A：移动端/小程序界面（跑步路线打卡界面、或者与 AI 大模型对话建议的页面）；
       * 推荐截图 B：Web 管理后台界面（若有）。
  2. **智慧养老系统 (Smart Elderly Care)**：
     * 文件名建议：`elderly-system.png`
     * **素材来源**：
       * 拍摄 1 张硬件实物接线图、测试连线图或传感器调试照片；
       * 也可以截取上位机或手机端接收报警的界面（若有）。
       * *注：这直接化解了你 GitHub 仓库忘记放 App 图的缺憾，实物图更具硬件技术说服力！*

---

### 3. 独立像素小游戏 (Games)
* **存放位置**：`public/images/games/`
* **所需素材**：
  1. **2D 像素魂斗罗**：
     * 文件名建议：`contra.png` 或 `contra.gif`
     * **建议**：运行本地魂斗罗 `.exe`，截图一张激烈的战斗/射击关卡画面，若是 3~5 秒的录屏 GIF 动图，视觉效果直接拉满！
  2. **像素跑酷闯关**：
     * 文件名建议：`runner.png` 或 `runner.gif`
     * **建议**：运行本地跑酷小游戏，截取一张角色空中跳跃/越过尖刺障碍的关卡画面。
  3. **Kirogame (网页像素小游戏)**：
     * 文件名建议：`kirogame.png`
     * **建议**：打开浏览器截取 Kirogame 的游戏主界面。

---

### 4. 创客硬件实验室 (Hardware)
* **存放位置**：`public/images/hardware/`
* **所需素材**：
  1. **红外循迹小车**：
     * 文件名建议：`car.png`
     * **建议**：拍摄小车实物照片（如果在贴有黑色电工胶带的赛道上俯拍一张，极具工程感）。
  2. **智慧养老随身硬件终端**：
     * 文件名建议：`elderly-device.png`
     * **建议**：单片机主板、姿态传感器模组与杜邦线/焊板特写。

---

## 三、 关键配置项修改指南（`portfolioData.js`）

所有文本、联系方式与资源路径均在以下文件中修改：
📂 **[src/data/portfolioData.js](file:///e:/Dream/self_page/src/data/portfolioData.js)**

### 1. 修改个人基础信息
```javascript
profile: {
  name: "你的真实姓名或常用ID",
  role: "软硬全栈工程师 · 独立游戏开发者",
  status: "寻找全栈 / 嵌入式 / 算法 / 游戏开发机会",
  avatar: "./images/profile/avatar.png", // 换成本地头像文件路径
  email: "your_real_email@example.com", // ★ 换成你日常接收面试/通知的真实邮箱
  location: "中国 · 郑州 / 远程",
  github: "https://github.com/liliqqtu",
  gitee: "https://gitee.com/LingYueQingChun"
}
```

### 2. 绑定项目与游戏截图
图片放入 `public/images/` 之后，在对应的项目/游戏对象中添加 `image` 字段即可：

```javascript
// 示例：小游戏绑定封面
{
  id: "contra-2d",
  title: "2D 像素魂斗罗复刻版",
  image: "./images/games/contra.png", // 或 contra.gif
  downloadUrl: "你的Releases下载直链..."
}

// 示例：硬件项目绑定照片
{
  id: "infrared-car",
  title: "多路红外循迹智能小车",
  image: "./images/hardware/car.png",
  // ...
}
```

---

## 四、 2 款游戏 EXE 如何生成极速下载链接？（保姆级步骤）

> ⚠️ **强烈提醒**：不要把数十兆的 `.exe` 直接 commit 到代码仓库中。通过 **GitHub Releases** 托管是业界标准规范，不仅免流量费、不占仓库体积，而且下载速度飞快。

### 详细操作步骤：

1. **打包压缩**：
   * 将你的 2D 魂斗罗整个游戏文件夹（包含 `.exe` 和依赖资源）压缩为：`Contra-Pixel-2D-v1.0.zip`
   * 将跑酷闯关小游戏整个文件夹压缩为：`Pixel-Runner-v1.0.zip`

2. **在 GitHub 创建 Release**：
   * 打开你的任意一个公开仓库（例如你的 `kirogame` 仓库：https://github.com/liliqqtu/kirogame ，或者专门建一个 `my-games` 仓库）；
   * 在仓库右侧边栏找到 **Releases**，点击 **Create a new release**（或者 Draft a new release）；
   * **Choose a tag**：输入版本号，例如 `v1.0.0`，点击 *Create new tag*；
   * **Release title**：输入标题，例如 `Release v1.0.0 (Contra 2D & Pixel Runner Games)`；
   * **Attach binaries**：把刚压缩好的两个 `.zip` 拖入底部的虚线框中上传；
   * 点击最下方的绿色按钮 **Publish release**。

3. **获取直链并填入代码**：
   * 发布成功后，在 Assets 列表中找到你的 `.zip`，**鼠标右键 -> 复制链接地址**；
   * 链接格式通常为：
     `https://github.com/liliqqtu/kirogame/releases/download/v1.0.0/Contra-Pixel-2D-v1.0.zip`
   * 打开 [src/data/portfolioData.js](file:///e:/Dream/self_page/src/data/portfolioData.js)，将复制好的链接粘贴到对应游戏的 `downloadUrl` 字段即可！

---

## 五、 操作流程总结 CheckList

- [ ] 1. 将个人头像放入 `public/images/profile/avatar.png`
- [ ] 2. 截图 1 张校园跑小程序/后台界面放入 `public/images/projects/campus-run.png`
- [ ] 3. 拍 1 张智慧养老实物接线图放入 `public/images/projects/elderly-system.png`
- [ ] 4. 截取魂斗罗与跑酷游戏画面，放入 `public/images/games/`
- [ ] 5. 拍 1 张循迹小车照片放入 `public/images/hardware/car.png`
- [ ] 6. 在 `portfolioData.js` 中将邮箱换成你的常用真实联系邮箱
- [ ] 7. 按第四步将 2 个小游戏压缩包上传到 GitHub Releases 并复制下载直链
- [ ] 8. 终端运行 `npm run dev` 在本地查看全部效果！
