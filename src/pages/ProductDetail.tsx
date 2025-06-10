import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../store/cartStore";

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await api.get<Product>(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                setError("Product not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="mb-8">
                        <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.088 2.328C6.308 17.8 6.549 18 6.829 18H12" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8 text-lg">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 group"
                    >
                        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Products</span>
                    </button>
                </div>

                {/* Main Product Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid lg:grid-cols-5 min-h-[600px]">
                        {/* Product Image Section - Takes 3/5 of the width */}
                        <div className="lg:col-span-3 p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                            <div className="w-full max-w-lg">
                                <div className="aspect-square bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Details Section - Takes 2/5 of the width */}
                        <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-between">
                            <div className="space-y-6">
                                {/* Category Badge */}
                                {product.category && (
                                    <div className="flex items-center">
                                        <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                                            {product.category}
                                        </span>
                                    </div>
                                )}

                                {/* Title */}
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                                        {product.title}
                                    </h1>
                                </div>

                                {/* Rating */}
                                {product.rating && (
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-gray-600 text-sm font-medium">
                                            {product.rating.rate} ({product.rating.count} reviews)
                                        </span>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <p className="text-4xl font-bold text-blue-600 mb-2">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <p className="text-gray-600 text-sm">Price includes tax</p>
                                </div>

                                {/* Description */}
                                {product.description && (
                                    <div className="space-y-3">
                                        <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            {product.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Section - Cart and Features */}
                            <div className="space-y-6 pt-8 border-t border-gray-200">
                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
                                >
                                    Add to Cart
                                </button>

                                {/* Features */}
                                <div className="space-y-4">
                                    <div className="flex items-center text-green-600">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">Free shipping on orders over $50</span>
                                    </div>
                                    <div className="flex items-center text-green-600">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">Easy 30-day returns</span>
                                    </div>
                                    <div className="flex items-center text-blue-600">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">2-year warranty included</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 