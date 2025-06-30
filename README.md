# 🧠 Data Alchemist Pro - AI-Powered Data Cleaner & Rule Builder

> An intelligent spreadsheet-to-insights engine powered by DeepSeek AI, Redis task queues, and Next.js – transforming messy CSV/XLSX files into clean, validated datasets with explainable AI.

---

## 🚀 **Live Demo**
- **Deployed App**: [https://data-alchemist-prj.vercel.app](https://data-alchemist-prj.vercel.app)
- **GitHub Repo**: [https://github.com/Virenishere/data-alchemist-prj.git](https://github.com/Virenishere/data-alchemist-prj.git)
- **Video Link**: https://we.tl/t-i6Nv3lH3In


---

## 📦 **Project Summary**

This full-stack app empowers users to:
- Upload client/worker/task datasets
- Validate data with 12+ rules and DeepSeek AI
- Auto-correct issues via AI suggestions
- Manage validation tasks through Redis queues
- Export clean datasets + generated business rules

---

## 🛠 **Tech Stack**

| Layer        | Tech Used                                    |
|--------------|-----------------------------------------------|
| Frontend     | Next.js 14, TypeScript, Tailwind CSS          |
| UI Libraries | Shadcn UI, Magic UI                           |
| Backend      | Node.js, API routes (Next.js), TypeScript     |
| AI Layer     | DeepSeek AI API                               |
| Caching/Queue| Redis with Task Queues                        |
| Database     | MongoDB with Mongoose                         |
| Auth         | NextAuth.js (Email or OAuth if used)          |

---

## ⚙️ **Core Features**

### ✅ **1. Smart File Upload**
- Upload **CSV/XLSX** files for clients, workers, tasks
- Auto-detects headers, formats, and cleans up dirty inputs

### 🧠 **2. AI-Powered Validation**
- Validates 12+ data rules including:
  - Required fields
  - Duplicate IDs
  - JSON & array parsing
  - Range and reference checks
- Uses **DeepSeek AI** for:
  - Suggesting fixes
  - Interpreting anomalies
  - Rule generation via natural language

### 🔁 **3. AI Queuing with Redis**
- AI prompts are queued using Redis
- Prevents race conditions and redundant calls
- Automatically returns cached responses when matched

### 🧩 **4. Visual UI & Rule Builder**
- MagicUI-powered landing interface
- Shadcn UI for clean dashboards
- Real-time validation result UI with badges, color-coded errors

### 💾 **5. Export Functionality**
- Download **cleaned CSV** files
- Export `rules.json` for business logic reusability

---

## 🎮 **How to Use**

### 🔧 Prerequisites
- Node.js 18+
- Redis Server (or cloud Redis URL)
- MongoDB URI
- DeepSeek AI API Key

### 🖥️ Local Setup

```bash
git clone https://github.com/virenderprasad/data-alchemist-pro.git
cd data-alchemist-pro

# Install dependencies
npm install

# Add your .env.local file
touch .env.local
````

#### 🧬 Sample `.env.local`

```env
MONGODB_URI=mongodb://localhost:27017/data-alchemist
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000
OPENROUTER_API_KEY=your-openrouter-api-key-here
REDIS_USERNAME=default
REDIS_HOST=your-aiven-redis-host.aivencloud.com
REDIS_PORT=your-port
REDIS_PASSWORD=your-password
```

```bash
# Start the dev server
npm run dev
```

---

## ✨ **Highlight Features**

| Feature                       | Description                                                      |
| ----------------------------- | ---------------------------------------------------------------- |
| AI-Backed Validation          | Uses DeepSeek AI for fixing messy data, malformed lists, etc.    |
| Redis Queue for AI Tasks      | Ensures AI calls are batched, cached, and resolved predictably   |
| Natural Language Rule Builder | Write “Don’t assign T001 with T002” and generate rules instantly |
| Real-Time Feedback            | Inline validation errors with suggestions                        |
| Magic UI Homepage             | Stunning landing experience with call-to-actions                 |
| Shadcn UI Interface           | Consistent design system for data and export dashboards          |

---

## 🧪 **Validation Rules Covered**

1. Missing Required Fields
2. Duplicate Client/Worker/Task IDs
3. Malformed Arrays & JSON
4. Out-of-Range Values
5. Skill Coverage & Slot Overload
6. Non-existent Task References
7. AI-based Error Correction
8. Phase and Duration Validation
9. Cross-Entity Dependency Checks
10. Suggested Fixes by DeepSeek AI
11. Redis-based AI prompt batching
12. Pattern Recognition from uploaded data



## 🚀 **Deployment (Vercel)**

Vercel auto-detects Next.js!

```bash
# Manual deployment (if needed)
npm run build
vercel --prod
```

### ✅ Update Vercel ENV

Set the following in **Vercel → Project Settings → Environment Variables**:

```env
MONGODB_URI=mongodb://localhost:27017/data-alchemist
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000
OPENROUTER_API_KEY=your-openrouter-api-key-here
REDIS_USERNAME=default
REDIS_HOST=your-aiven-redis-host.aivencloud.com
REDIS_PORT=your-port
REDIS_PASSWORD=your-password
```

---

## 🔍 **How to Test**

1. Upload sample CSV/XLSX files
2. View validation results panel
3. Use AI Validation to suggest fixes
4. Check Redis logs for queued tasks
5. Export clean data and `rules.json`

---

## 👤 **Author**

* **Name**: Virender Prasad
* **Email**: [virender288@gmail.com](mailto:virender288@gmail.com)
* **GitHub**: [@virenishere](https://github.com/Virenishere)
* **Location**: New Delhi, India

---

## 🧠 Special Thanks

* [DeepSeek AI](https://deepseek.com)
* [Redis](https://redis.io/)
* [Shadcn UI](https://ui.shadcn.com)
* [Magic UI](https://magicui.design)

---

**Built with 🚀 by Virender Prasad for intelligent data workflows**

