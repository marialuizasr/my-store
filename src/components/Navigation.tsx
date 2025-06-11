import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export function Navigation() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="px-6 bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
            <div className="flex justify-between items-center h-12">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >
                    <span className="text-lg">🛍️</span>
                    <span>My Store</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        to="/"
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/')
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/cart"
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${isActive('/cart')
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                    >
                        Cart
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                                {totalItems > 9 ? '9+' : totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Button & Cart */}
                <div className="flex md:hidden items-center space-x-3">
                    <Link
                        to="/cart"
                        onClick={closeMenu}
                        className="relative px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                        Cart
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                                {totalItems > 9 ? '9+' : totalItems}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center items-center">
                            <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></div>
                            <div className={`w-4 h-0.5 bg-current transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-4 h-0.5 bg-current transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-32 opacity-100 pb-3' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                <div className="pt-2 space-y-1 border-t border-gray-100">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/')
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/cart"
                        onClick={closeMenu}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/cart')
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                    >
                        <span>Cart</span>
                        {totalItems > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                                {totalItems > 9 ? '9+' : totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
} 