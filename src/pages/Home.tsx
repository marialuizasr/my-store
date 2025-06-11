import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../store/cartStore";

export function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get<Product[]>("/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category === selectedCategory);

    // Get unique categories from products
    const categories: string[] = ["all", ...new Set(products.map(product => product.category).filter((category): category is string => Boolean(category)))];

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] flex-col gap-4 px-4 py-8">
                <div className="text-3xl sm:text-4xl md:text-5xl">🛍️</div>
                <div className="text-center max-w-xs">
                    <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">Loading...</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">
                        Please wait while we fetch the latest items
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="no-scroll-x">
            {/* Header with Category Menu */}
            <header className="bg-gray-50 border-b border-gray-200 py-3 sm:py-4 md:py-6 mb-4 sm:mb-6 md:mb-8">
                <div className="container">
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                        <div className="text-center">
                            <h1 className="text-gray-800 mb-2 break-words text-2xl sm:text-3xl md:text-4xl font-bold">
                                🛍️ My Store
                            </h1>
                            <p className="text-gray-500 m-0 max-w-2xl mx-auto text-sm sm:text-base">
                                Discover amazing products at unbeatable prices
                            </p>
                        </div>

                        {/* Category Filter Menu */}
                        <nav>
                            <div className="flex justify-center flex-wrap gap-1 sm:gap-2 md:gap-3 max-w-full">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`
                                            ${selectedCategory === category
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'
                                            }
                                            border-2 border-blue-500 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 
                                            rounded-full cursor-pointer font-semibold capitalize 
                                            transition-all duration-300 min-w-[60px] sm:min-w-[75px] md:min-w-[90px]
                                            text-xs sm:text-sm md:text-base
                                        `}
                                    >
                                        {category === "all" ? "All" : (category || "Unknown")}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container">
                {/* Products Section */}
                <section>
                    {/* Section Header */}
                    <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-8 flex-wrap gap-4">
                        <h2 className="text-gray-800 m-0 break-words flex-1 text-xl sm:text-2xl md:text-3xl font-bold">
                            {selectedCategory === "all" ? "Featured Products" : `Products - ${selectedCategory}`}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 3h4v4H3V3zm6 0h4v4H9V3zm6 0h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9zM3 15h4v4H3v-4zm6 0h4v4H9v-4zm6 0h4v4h-4v-4z" />
                            </svg>
                            <span>{filteredProducts.length} products</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="product-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-8 sm:py-12 md:py-16 px-4 text-gray-500">
                            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🔍</div>
                            <h3 className="mb-2 text-lg sm:text-xl">No products found</h3>
                            <p className="m-0 text-sm sm:text-base">Try selecting a different category</p>
                        </div>
                    )}
                </section>

                {/* Call to Action Section */}
                <section className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 rounded-lg text-center my-8 sm:my-12 md:my-16 max-w-full">
                    <h3 className="mb-4 text-gray-800 break-words text-xl sm:text-2xl font-bold">
                        Didn't find what you're looking for?
                    </h3>
                    <p className="mb-8 text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
                        Subscribe to our newsletter to be notified about new products and exclusive offers.
                    </p>
                    <div className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="py-2.5 sm:py-3 px-4 border-2 border-gray-300 rounded-md text-sm sm:text-base"
                        />
                        <button className="py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 bg-green-600 border-none rounded-md text-white cursor-pointer font-semibold text-sm sm:text-base hover:bg-green-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </section>

                {/* Features */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 my-8 sm:my-12 md:my-16 max-w-full">
                    <div className="text-center p-3 sm:p-4 md:p-6">
                        <div className="text-4xl sm:text-5xl md:text-6xl mb-4">
                            🚚
                        </div>
                        <h4 className="mb-2 text-gray-800 text-base sm:text-lg md:text-xl font-semibold">
                            Free Shipping
                        </h4>
                        <p className="text-gray-500 m-0 text-sm sm:text-base">
                            On orders over $200
                        </p>
                    </div>
                    <div className="text-center p-3 sm:p-4 md:p-6">
                        <div className="text-4xl sm:text-5xl md:text-6xl mb-4">
                            🔒
                        </div>
                        <h4 className="mb-2 text-gray-800 text-base sm:text-lg md:text-xl font-semibold">
                            Secure Payment
                        </h4>
                        <p className="text-gray-500 m-0 text-sm sm:text-base">
                            100% secure transactions
                        </p>
                    </div>
                    <div className="text-center p-3 sm:p-4 md:p-6">
                        <div className="text-4xl sm:text-5xl md:text-6xl mb-4">
                            ↩️
                        </div>
                        <h4 className="mb-2 text-gray-800 text-base sm:text-lg md:text-xl font-semibold">
                            Easy Returns
                        </h4>
                        <p className="text-gray-500 m-0 text-sm sm:text-base">
                            30-day policy
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}