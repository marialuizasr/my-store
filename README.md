# 🛍️ My Store - E-commerce Application

A modern, responsive e-commerce web application built with React, TypeScript, and Vite. This application provides a seamless shopping experience with product browsing, cart management, and checkout functionality.

## ✨ Features

- 🏪 **Product Catalog**: Browse through various product categories
- 🔍 **Category Filtering**: Filter products by category (electronics, jewelery, clothing, etc.)
- 🛒 **Shopping Cart**: Add, remove, and manage items in your cart
- 💰 **Real-time Pricing**: Dynamic price calculation with cart totals
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Clean and intuitive interface with Tailwind CSS
- 🧪 **Testing**: Comprehensive test suite with Vitest and Testing Library
- 🚀 **Performance**: Fast loading with Vite and React 19
- 🔄 **State Management**: Zustand for efficient state management
- 🌐 **API Integration**: Integration with external product API

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest version of React with improved performance
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Zustand** - Lightweight state management library

### HTTP Client
- **Axios** - Promise-based HTTP client for API requests

### Testing
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **jsdom** - DOM implementation for testing

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing tool

## 📁 Project Structure

```
my-store/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   └── ProductCard.tsx
│   ├── pages/            # Page components
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   └── ProductDetail.tsx
│   ├── router/           # Route configuration
│   ├── services/         # API services
│   │   └── api.ts
│   ├── store/           # State management
│   │   └── cartStore.ts
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm test` | Run the test suite |

## 🧪 Testing

The project includes a comprehensive testing setup:

```bash
# Run all tests
npm test
```

Tests are located alongside their respective components and include:
- Component unit tests
- Navigation functionality tests
- Cart store tests
- Product card tests

## 🌐 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com/) to fetch product data:

- **Base URL**: `https://fakestoreapi.com`
- **Endpoints Used**:
  - `GET /products` - Fetch all products
  - Product data includes: title, price, image, category, description, and ratings

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktop
- **Loading States**: Elegant loading indicators during data fetching
- **Error Handling**: Graceful error handling with user-friendly messages
- **Category Navigation**: Easy product filtering by category
- **Shopping Cart**: Persistent cart state across page navigation
- **Product Details**: Detailed product pages with images and descriptions
- **Checkout Process**: Streamlined checkout experience

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with Vite integration. Configuration is minimal and follows Tailwind's latest conventions.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [React](https://reactjs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
