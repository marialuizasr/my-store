import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { ProductDetail } from "../pages/ProductDetail";
import { Checkout } from "../pages/Checkout";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Home />,
                // Opcional: adicionar meta informações
                handle: {
                    title: "Home - My Store",
                    description: "Browse our amazing products",
                },
            },
            {
                path: "cart",
                element: <Cart />,
                handle: {
                    title: "Shopping Cart - My Store",
                    description: "Review your selected items",
                },
            },
            {
                path: "products/:id",
                element: <ProductDetail />,
                handle: {
                    title: "Product Details - My Store",
                    description: "View product information",
                },
            },
            {
                path: "checkout",
                element: <Checkout />,
                handle: {
                    title: "Checkout - My Store",
                    description: "Complete your purchase",
                },
            },
            {
                path: "*",
                element: <NotFound />,
                handle: {
                    title: "Page Not Found - My Store",
                    description: "The page you're looking for doesn't exist",
                },
            },
        ],
    },
]); 