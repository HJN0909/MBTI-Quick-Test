# 30秒精准速测你的MBTI人格
“不理性的题目，往往最懂真实的你。”
🌟 初衷
在这个快节奏的时代，没有人愿意为了了解自己而去填写 100 道枯燥的逻辑题。
我们剥离了繁琐的学术外壳，利用“直觉脉冲”技术，捕捉你大脑在 3 秒内的第一反应。这不仅仅是一次 MBTI 测试，更是一次与潜意识的深度握手。

⚡️30s速测的核心亮点
直觉导向题库：舍弃了“你是否喜欢社交”这类直白问题，代之以“萝卜与兔子”、“大海与亚特兰蒂斯”等意象联想。
零思考负担：12 道场景化交互题，点击即跳转，无需滑动或确认，像呼吸一样自然。

🧠 人性化深度解析
拒绝标签化：报告中没有冰冷的百分比统计，取而代之的是如诗歌般的文字。
灵魂画像：将 16 型人格重塑为“躲在云朵里的造梦师”、“逻辑的清醒信徒”等标签。
情绪避风港：解析部分侧重于心理关怀与自我接纳，直击你内心最柔软的角落。

🔍 为什么它比传统测试更“准”？
传统测试往往受“期望效应”影响——你会下意识勾选那个“更好的自己”。
而 M-Pulse 利用快速反应，在你大脑的防御机制（逻辑加工）还没启动前，就已经抓取到了你的本能偏好。

<img width="1153" height="2048" alt="jimeng-2026-03-17-1180-改为“告别繁琐测试”" src="https://github.com/user-attachments/assets/c6829c87-730e-4ecd-9ec1-541b7bfe13ac" />


# Project Overview

This repository is a Taro + React + TypeScript starter project for WeChat Mini-Programs and mobile H5, styled with Tailwind CSS and managed via pnpm.
This document explains how to set up your local environment, develop, test, lint, and build the project.
---

## Repository Structure

The project structure is as follows:

```

├── babel.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── project.config.json
├── README.md
├── tailwind.config.js
├── tsconfig.check.json
├── tsconfig.json
├── config/
│   ├── dev.ts
│   ├── index.ts
│   └── prod.ts
├── scripts/
├── src/
│   ├── app.config.ts               # Taro app configuration, defining routes and tabBar, Please note that the "pages" must correctly correspond to the routes defined in src/pages.
│   ├── app.scss
│   ├── app.ts
│   ├── index.html
│   ├── client/
│   │   └── supabase.ts             # Supabase client configuration, When you need to use Supabase, import and use it from this file.
│   ├── db/                         # Database operations and Supabase integration, all database calls should be implemented here
│   │   └── README.md
│   ├── pages/                      # each folder corresponds to a route defined in app.config.ts
│   ├── store/                      # Global state management using Zustand for cross-page state sharing
│   │   └── README.md
│   └── types/                      # TypeScript type definitions
│       └── global.d.ts
└── supabase/
```

After you generate any files or update the structure of this project, please update the README.md file to reflect the changes.

## Installation and Setup

```bash
pnpm install # Install dependencies
```

```bash
pnpm run lint  # Lint source (Important: After modifying the code, please execute this command to perform necessary checks.)
```
