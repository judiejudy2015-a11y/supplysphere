# 🌐 SupplySphere Frontend

> **Blockchain-Powered Supply Chain Traceability with AI Assistance**  
> *"Trace it. Trust it. Take it."*

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 📌 Overview

SupplySphere's frontend is a modern, responsive web application that provides an intuitive interface for blockchain-powered supply chain traceability. Built with Next.js 14+, it delivers role-based dashboards, AI-powered insights, and seamless product verification through QR codes.

### 🎯 Key Features

- **🔑 Role-Based Access Control (RBAC)** - Tailored dashboards for Suppliers, Vendors, Analysts, and Admins
- **📦 Smart Inventory Management** - Real-time stock tracking with AI-powered alerts
- **🚚 End-to-End Shipment Tracking** - Live status updates from production to delivery
- **🔗 Blockchain Verification** - QR code scanning for instant product authenticity
- **🤖 AI Assistant** - Natural language queries for supply chain data
- **📊 Advanced Analytics** - Interactive dashboards with exportable reports
- **🌙 Dark/Light Mode** - Seamless theme switching with brand consistency
- **📱 Mobile Responsive** - Optimized for all device sizes

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/supplysphere-frontend.git
cd supplysphere-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BLOCKCHAIN_URL=http://localhost:8080

# AI Assistant (Optional)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🏗️ Project Structure

```
supplysphere-frontend/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Role-based dashboards
│   ├── products/          # Product management
│   ├── analytics/         # Analytics & reporting
│   └── globals.css        # Global styles with brand theme
├── components/            # Reusable UI components
│   ├── ui/               # ShadCN UI components
│   ├── charts/           # Chart components (Recharts)
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── api.ts           # API client
│   ├── auth.ts          # Authentication logic
│   ├── blockchain.ts    # Blockchain integration
│   └── utils.ts         # General utilities
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── docs/                # Documentation
```

## 🎨 Design System

### Brand Colors

Our design system is built around SupplySphere's signature colors:

- **Navy Blue** `oklch(0.25 0.08 248.5)` - Primary brand color
- **Vibrant Green** `oklch(0.65 0.16 162.5)` - Accent and success states
- **Light Background** `oklch(0.99 0.005 106.4)` - Clean, professional backdrop

### Components

We use **ShadCN/ui** components with custom theming:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Brand-themed button
<Button className="supplysphere-gradient">
  Get Started
</Button>

// Themed card with glow effect
<Card className="supplysphere-glow">
  <CardHeader>
    <CardTitle>Product Details</CardTitle>
  </CardHeader>
</Card>
```

### Custom Utilities

```css
/* Brand gradient */
.supplysphere-gradient {
  background: linear-gradient(135deg, navy-blue, vibrant-green);
}

/* Glow effect */
.supplysphere-glow {
  box-shadow: 0 0 20px green/30%;
}

/* Custom scrollbars */
.scrollbar-thin {
  /* Thin scrollbars with brand colors */
}
```

## 👥 User Roles & Dashboards

### 🏭 Supplier Dashboard
- Add and manage product batches
- Generate QR codes for products
- Update shipment status
- View supplier analytics

### 🛒 Vendor Dashboard  
- Search and browse products
- Place and track orders
- Verify product authenticity
- Manage inventory

### 📊 Analyst Dashboard
- Advanced analytics and KPIs
- Supplier reliability metrics
- Demand forecasting
- Export reports (CSV/PDF)

### 👨‍💼 Admin Dashboard
- User management and RBAC
- System audit logs
- Global analytics overview
- Platform configuration

## 🔌 API Integration

The frontend communicates with the backend through a RESTful API:

```typescript
// Example API usage
import { apiClient } from '@/lib/api'

// Get products
const products = await apiClient.get('/products')

// Create shipment
const shipment = await apiClient.post('/shipments', {
  productId: '123',
  destination: 'Nairobi, Kenya',
  estimatedArrival: '2024-12-01'
})

// Verify on blockchain
const verification = await apiClient.get('/blockchain/verify/batch123')
```

## 🤖 AI Assistant Integration

The AI assistant allows natural language queries:

```typescript
// Example AI queries
"What's my pending order value?"
"Show me suppliers with delivery issues"
"Which products are running low on stock?"
"Generate a report for Q4 shipments"
```

## 📊 Analytics & Charts

Built with **Recharts** for interactive data visualization:

```tsx
import { LineChart, BarChart, PieChart } from 'recharts'

// Delivery performance chart
<LineChart data={deliveryData}>
  <Line dataKey="onTime" stroke="var(--color-primary)" />
  <Line dataKey="delayed" stroke="var(--color-destructive)" />
</LineChart>
```

## 🔒 Authentication & Security

- **JWT-based authentication** with NextAuth.js
- **Role-based access control (RBAC)**
- **Secure API communication**
- **Optional 2FA support**

```typescript
// Protected route example
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Render dashboard based on user role
}
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests  
npm run test:e2e

# Run tests with coverage
npm run test:coverage

# Lint and format
npm run lint
npm run format
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start

# Analyze bundle size
npm run analyze
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'supplysphere-navy': 'oklch(0.25 0.08 248.5)',
        'supplysphere-green': 'oklch(0.65 0.16 162.5)',
      }
    }
  }
}
```

### Next.js Config

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** and **Prettier** configurations
- Write meaningful commit messages
- Add tests for new features

## 📋 Roadmap

- [x] Role-based authentication
- [x] Product & batch creation  
- [x] QR code generation
- [x] Blockchain integration
- [x] Custom brand theming
- [ ] AI assistant integration
- [ ] Advanced analytics panel
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Real-time notifications

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
npm run type-check
```

**Styles not loading correctly:**
```bash
rm -rf .next
npm run dev
```

**API connection issues:**
```bash
# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ShadCN/ui Documentation](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **SupplySphere Team** - *Initial work* - [SupplySphere](https://github.com/supplysphere)

## 🙏 Acknowledgments

- Built for **ICP Kenya Hackathon**
- Powered by **Internet Computer Protocol**
- UI components by **ShadCN/ui**
- Icons by **Lucide React**

---

<div align="center">

**Made with ❤️ for transparent supply chains**

[Website](https://supplysphere.app) • [Documentation](https://docs.supplysphere.app) • [Support](mailto:support@supplysphere.app)

</div>