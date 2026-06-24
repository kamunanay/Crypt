<div align="center">
  <img src="https://cukimai.store/favicon.ico" alt="CUKIMAI Logo" width="80" />
  <h1>🌌 CUKIMAI — World Financial Galaxy</h1>
  <p><strong>Financial Galaxy dengan Aset 3D Interaktif • Real-time Market Data • Premium UI</strong></p>
  
  <p>
    <a href="https://cukimai.store" target="_blank">
      <img src="https://img.shields.io/badge/🌐-Live_Demo-gold?style=for-the-badge&logo=vercel&logoColor=white&color=f5c842" alt="Live Demo" />
    </a>
    <a href="https://crypt-3un.pages.dev" target="_blank">
      <img src="https://img.shields.io/badge/🚀-Pages_Backup-blue?style=for-the-badge&logo=cloudflare&logoColor=white&color=4a8fe7" alt="Pages Backup" />
    </a>
    <a href="#">
      <img src="https://img.shields.io/badge/📱-Responsive-success?style=for-the-badge&logo=tailwindcss&logoColor=white&color=38bdf8" alt="Responsive" />
    </a>
    <a href="#">
      <img src="https://img.shields.io/badge/⚡-Performance_90+-brightgreen?style=for-the-badge&logo=googlechrome&logoColor=white&color=34d399" alt="Performance" />
    </a>
  </p>
</div>

---

## 📸 Preview

<div align="center">
  <img src="https://cukimai.store/og-image.png" alt="CUKIMAI Preview" width="800" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);" />
  <br />
  <em>✨ World Financial Galaxy — 3D Interactive Financial Dashboard</em>
</div>

---

## 🚀 Live Demo

| Platform | URL | Status |
|----------|-----|--------|
| 🌐 **Custom Domain** | [cukimai.store](https://cukimai.store) | ✅ Active |
| 📦 **Pages Backup** | [crypt-3un.pages.dev](https://crypt-3un.pages.dev) | ✅ Active |
| ⚙️ **Worker Preview** | [crypt.gapriyus1.workers.dev](https://crypt.gapriyus1.workers.dev) | ✅ Active |

---

## ✨ Fitur Utama

### 🌌 World Financial Galaxy
- **3D Interactive Scene** — Drag, rotate, zoom untuk eksplorasi galaksi finansial
- **Premium 3D Coins** — USD, EUR, GBP, JPY, IDR, AUD, CHF, CNY
- **Crypto Coins** — BTC, ETH, SOL, XRP, BNB dengan efek neon holographic
- **Gold Bar** — 3D realistic dengan efek shine dan reflection
- **Click to Navigate** — Klik aset 3D untuk melihat detail harga

### 📊 Real-time Market Data
- **Forex** — USD/IDR, EUR/IDR, GBP/IDR, JPY/IDR, AUD/IDR (tanpa API key)
- **Crypto** — Bitcoin, Ethereum, Solana, XRP, BNB (live dari CoinGecko)
- **Gold** — XAU/USD (live dari Gold-API)
- **Auto-refresh** — Update setiap 30 detik

### 🎨 Premium UI/UX
- **Dark Space Theme** — Deep navy, black gradient, gold glow
- **Glassmorphism** — Blur, saturate, border glow effect
- **Animasi Halus** — Framer Motion, GSAP, Lenis scroll
- **Responsive** — Mobile, tablet, desktop
- **Logo C Premium** — Gradient gold dengan shadow glow

### 🛠️ Tools & Features
- **💰 Konverter Mata Uang** — Real-time conversion 8 currencies
- **📈 TradingView Charts** — Candlestick chart 1D, 1W, 1M, 3M, 1Y
- **🎯 Interactive Cards** — Hover glow, scale, shadow effect
- **🏆 Gold Badge** — Special card untuk emas

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3 |
| **3D** | Three.js + React Three Fiber + Drei |
| **Animasi** | Framer Motion + GSAP + Lenis |
| **Data Fetching** | TanStack Query + Axios |
| **Chart** | TradingView Lightweight Charts |
| **Deployment** | Cloudflare Pages (Static Export) |

---

cukimai/
├── app/ # Next.js App Router
│ ├── (routes)/ # Halaman-halaman
│ │ ├── page.tsx # Beranda — Galaxy 3D
│ │ ├── forex/page.tsx # Halaman Forex
│ │ ├── crypto/page.tsx # Halaman Crypto
│ │ ├── emas/page.tsx # Halaman Emas
│ │ ├── currency/[symbol]/ # Detail Currency
│ │ └── crypto/[symbol]/ # Detail Crypto
│ ├── layout.tsx
│ ├── globals.css
│ └── providers.tsx
├── components/
│ ├── ui/ # UI Components
│ │ ├── navbar.tsx
│ │ ├── card-premium.tsx
│ │ ├── converter.tsx
│ │ └── coin-display.tsx
│ ├── three/ # 3D Components
│ │ ├── galaxy-scene.tsx
│ │ ├── galaxy-scene-content.tsx
│ │ └── premium-coin.tsx
│ └── charts/
│ └── price-chart.tsx
├── services/ # API Services
│ ├── forex.ts # Forex (exchangerate-api.com)
│ ├── crypto.ts # Crypto (CoinGecko)
│ └── gold.ts # Gold (Gold-API)
├── lib/ # Utilities
├── types/ # TypeScript types
├── public/
│ └── _redirects # SPA routing fallback
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md

text

---

## 🚀 Deploy ke Cloudflare Pages

### 1️⃣ Build Lokal
```bash
# Install dependencies
npm install

# Build static export
npm run build

# Cek folder out
ls -la out/
# Harus ada: index.html, _redirects, _next/, dll
2️⃣ Upload Manual (Recommended)
Zip folder out (isi folder, BUKAN folder out-nya):

bash
cd out
zip -r ../cukimai.zip *
cd ..
Buka Cloudflare Dashboard → Pages → Upload assets.

Upload file cukimai.zip.

Tunggu selesai → URL Pages akan muncul.

3️⃣ Custom Domain (cukimai.store)
Di Pages → Custom Domains → tambahkan cukimai.store.

Cloudflare akan otomatis menambahkan CNAME record.

4️⃣ Environment Variables (Opsional)
env
# Tidak diperlukan untuk Forex (gratis), tapi untuk Crypto & Gold:
NEXT_PUBLIC_FREECRYPTO_API_KEY=your_key
NEXT_PUBLIC_GOLDAPI_KEY=your_key
🔧 Troubleshooting
Error	Solusi
Invalid JSON data in package.json	Perbaiki sintaks JSON di package.json
404 Not Found	Pastikan _redirects ada di public/ dengan isi /* /index.html 200
There is nothing here yet	Upload ulang folder out dengan struktur yang benar
Error 1031	Hapus Worker yang bertabrakan dengan domain
pages-manifest.json not found	Gunakan static export (output: 'export')
📦 API Providers
Data	Provider	Status
Forex	exchangerate-api.com	✅ Free, no API key
Crypto	CoinGecko API	✅ Free (limited)
Gold	Gold-API.io	⚠️ Requires API key (free tier)
🎯 Performance
Lighthouse Score: 90+ (Performance, Accessibility, SEO)

First Load JS: ~99 kB (shared chunks)

Static Export: All pages pre-rendered

Code Splitting: Dynamic imports for Three.js

📄 License
MIT © 2026 CUKIMAI

🌟 Credits
Design Inspiration: Apple Vision Pro, Revolut, Stripe, TradingView, Bloomberg

3D Assets: Three.js community

Icons: Custom design

📞 Contact
Website: cukimai.store

Email: support@cukimai.store

<div align="center"> <h3>✨ CUKIMAI — World Financial Galaxy ✨</h3> <p>Made with ❤️ and ☕</p> </div> ```
