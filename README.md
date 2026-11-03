# StockBridge 🌉📦

> **India's Intelligent B2B Surplus Inventory Marketplace**  
> Turn dead stock into working capital. Connect verified B2B sellers and buyers with smart liquidation discovery.

---

## 📌 Overview

**StockBridge** is a modern B2B platform designed to solve the dead stock and slow-moving inventory problem for manufacturers, wholesalers, and distributors (focused on regional trade hubs across Gujarat including Rajkot, Ahmedabad, Surat, Vadodara, and more).

Instead of locking working capital in depreciating assets, sellers can list surplus stock at wholesale liquidation discounts, while buyers discover high-value lots at discounted rates with minimum order quantities (MOQ).

---

## ✨ Features

- **🔍 Smart Marketplace Discovery**: Filter listings by category, discount tiers, condition (New, Like New, Used), location/city, and pricing.
- **📊 Seller Analytics & Dashboard**: Monitor recovered capital, active listings, pending buyer offers, and liquidation trends powered by Recharts.
- **🛒 Buyer Management Dashboard**: Track submitted requests, negotiations, procurement status, and calculated cost savings.
- **🏢 Verified Business Profiles**: View company GST verification badges, ratings, trade history, and direct contact details.
- **💬 Direct Negotiation & Messaging**: Integrated inquiry and negotiation communication channel between verified businesses.
- **⚡ Modern Responsive UI**: Fast, responsive design styled with Tailwind CSS v4 and Lucide React icons.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (or `yarn` / `pnpm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tushar-Singh07/Stock-Bridge.git
   cd Stock-Bridge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and optimizes assets for production in the `dist` directory.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs Oxlint code analysis.

---

## 🔐 Environment & Security

- **Environment File Handling**: Never commit `.env` or files containing secret credentials to source control. Use `.env.example` as a template for team members.
- Configured `.gitignore` ensures `node_modules`, build outputs (`dist/`), local environments, logs, and sensitive files remain excluded from Git tracking.

---

## 📁 Project Structure

```text
Stock-Bridge/
├── public/                 # Static assets & icons
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/         # Reusable UI components (Navbar, Footer, Modal, Cards, etc.)
│   ├── data/               # Mock data (businesses, listings, requests)
│   ├── pages/              # Application pages (Marketplace, Dashboards, Profiles, Messaging)
│   ├── utils/              # Utility & formatting helpers (INR currency formatting, date helpers)
│   ├── App.jsx             # Router and application layout
│   ├── index.css           # Global stylesheet & Tailwind directives
│   └── main.jsx            # React root entry point
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules for node_modules, env, dist, etc.
├── package.json            # Project manifest & dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
