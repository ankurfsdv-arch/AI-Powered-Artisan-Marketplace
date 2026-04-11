# 🎨 AI-Powered Artisan Marketplace Platform

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome"/>
</p>

<p align="center">
  A comprehensive <strong>Full-Stack AI-Driven Marketplace</strong> designed to empower local artisans with modern e-commerce tools, intelligent product discovery, and multi-language support — bridging the gap between traditional craftsmanship and the digital world.
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Author](#-author)

---

## 🌟 Overview

The **AI-Powered Artisan Marketplace** is a full-stack web platform that gives local artisans the tools they need to compete in the global digital economy. Artisans can manage their products, share their cultural stories, and leverage AI-driven features — all within a secure, real-time environment powered by Supabase.

Whether you are a buyer looking for handcrafted goods or an artisan ready to grow your business, this platform is built for you.

---

## 🚀 Key Features

### 🛠 Artisan Ecosystem
- **Smart Dashboard** — Real-time tracking of sales, orders, and customer engagement metrics.
- **Product Management** — Full CRUD operations for artisan products with advanced category tagging and inventory control.
- **Stories Manager** — A unique section for artisans to share the heritage, culture, and process behind their crafts, building deeper customer connections.

### 🤖 AI & Advanced Services
- **Translation Service** — Automatic multi-language content support for global reach and accessibility.
- **AI Product Discovery** — Intelligent search and trending product recommendations powered by user behavior analytics.
- **Dynamic Pricing Tools** — Smart pricing management to help artisans stay competitive in the marketplace.

### 🔐 Secure Infrastructure
- **Auth Flow** — Robust OTP-based mobile authentication with multi-role signup (User / Artisan).
- **Supabase Backend** — Real-time database updates, secure edge functions, and row-level security policies.
- **Data Protection** — Secure handling of all user and transaction data via PostgreSQL RLS.

### 🛒 Marketplace Experience
- **Product Discovery** — Browse and search handcrafted goods with AI-powered recommendations.
- **Order Management** — End-to-end order tracking for both buyers and artisans.
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | [React.js 18](https://react.dev/) + [Vite](https://vitejs.dev/) | Fast, component-based UI |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first responsive design |
| **UI Components** | [Shadcn/UI](https://ui.shadcn.com/) | Accessible, customizable components |
| **Icons** | [Lucide Icons](https://lucide.dev/) | Clean, consistent icon set |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth UI transitions |
| **Backend & DB** | [Supabase](https://supabase.com/) | Real-time database, auth, edge functions |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational data storage |

---

## 📁 Project Structure

```
AI-Powered-Artisan-Marketplace/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Shadcn/UI base components
│   │   ├── dashboard/       # Artisan dashboard components
│   │   ├── marketplace/     # Product listing & discovery
│   │   └── auth/            # Authentication components
│   ├── pages/               # Route-level page components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Supabase client & utilities
│   ├── services/            # API calls & AI service integrations
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   ├── App.tsx              # Root application component
│   └── main.tsx             # Application entry point
├── .env.example             # Environment variable template
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps carefully to get the project running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — v18.x or higher
- [npm](https://www.npmjs.com/) — v9.x or higher (comes with Node.js)
- [Git](https://git-scm.com/)
- A free [Supabase account](https://supabase.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/ankurfsdv-arch/AI-Powered-Artisan-Marketplace.git
cd AI-Powered-Artisan-Marketplace
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env` file in the project root by copying the example template:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values (see [Environment Variables](#-environment-variables) below).

### Step 4 — Set Up Supabase

1. Go to [supabase.com](https://supabase.com/) and create a new project.
2. Navigate to **Settings → API** to get your Project URL and Anon Key.
3. Run the database migrations (if provided in `/supabase/migrations/`) using the Supabase CLI:

```bash
npx supabase db push
```

### Step 5 — Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173**

---

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint code checks |
| `npm run type-check` | Run TypeScript type checking |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ─── Supabase Configuration ──────────────────────────────
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# ─── AI Services (Optional) ──────────────────────────────
VITE_AI_API_KEY=your_ai_service_api_key

# ─── App Configuration ───────────────────────────────────
VITE_APP_NAME=Artisan Marketplace
VITE_APP_ENV=development
```

> **⚠️ Important:** Never commit your `.env` file to version control. It is already included in `.gitignore`.

---

## 🧭 Usage

### For Buyers
1. Sign up with your mobile number (OTP verification).
2. Browse the marketplace and discover handcrafted products.
3. Use AI-powered search to find products by style, category, or region.
4. Place orders and track them in real-time.

### For Artisans
1. Sign up and select the **Artisan** role.
2. Complete your artisan profile and add your craft story.
3. Add and manage your products via the **Smart Dashboard**.
4. Monitor sales, orders, and customer engagement in real-time.
5. Use the translation tool to reach a global customer base.

---

## 🤝 Contributing

Contributions are welcome and greatly appreciated! Here is how to get started:

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/your-username/AI-Powered-Artisan-Marketplace.git

# 3. Create a new feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes and commit
git add .
git commit -m "feat: add your feature description"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

### Contribution Guidelines
- Follow the existing code style and TypeScript conventions.
- Write clear, descriptive commit messages.
- Add comments to complex logic.
- Test your changes before submitting a PR.
- Update the README if you add new features or change setup steps.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for full details.

```
MIT License — You are free to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of this software with proper attribution.
```

---

## 🙏 Acknowledgments

- Inspired by the rich tradition of local artisans and the transformative potential of AI in e-commerce.
- [Supabase](https://supabase.com/) — for the incredible open-source backend infrastructure.
- [Shadcn/UI](https://ui.shadcn.com/) — for the beautiful, accessible component library.
- [Framer Motion](https://www.framer.com/motion/) — for bringing the UI to life with fluid animations.
- [Tailwind CSS](https://tailwindcss.com/) — for making styling fast and consistent.
- The open-source community for providing invaluable tools, libraries, and inspiration.

---

## 👤 Author

<table>
  <tr>
    <td align="center">
      <strong>Ankur Yadav</strong><br/>
      Full Stack Developer<br/><br/>
      📧 <a href="mailto:ankurcse437@gmail.com">ankurcse437@gmail.com</a><br/>
      🐙 <a href="https://github.com/ankurfsdv-arch">github.com/ankurfsdv-arch</a>
    </td>
  </tr>
</table>

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ankurfsdv-arch">Ankur Yadav</a>
  <br/>
  If you found this project helpful, please consider giving it a ⭐ on GitHub!
</p>
