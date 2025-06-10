import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">My Store</h3>
                            <p className="text-gray-300 text-sm">
                                Your trusted online destination for quality products and exceptional customer service.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.547 8.623c-1.235 0-2.235 1-2.235 2.235s1 2.235 2.235 2.235 2.235-1 2.235-2.235-1-2.235-2.235-2.235zm0 3.675c-.794 0-1.44-.646-1.44-1.44s.646-1.44 1.44-1.44 1.44.646 1.44 1.44-.646 1.44-1.44 1.44zm2.869-3.901c-.288 0-.522-.234-.522-.522s.234-.522.522-.522.522.234.522.522-.234.522-.522.522zm1.48-.107c-.033-.663-.192-1.252-.703-1.762-.51-.51-1.099-.67-1.762-.703-1.485-.084-5.937-.084-7.422 0-.663.033-1.252.192-1.762.703-.51.51-.67 1.099-.703 1.762-.084 1.485-.084 5.937 0 7.422.033.663.192 1.252.703 1.762.51.51 1.099.67 1.762.703 1.485.084 5.937.084 7.422 0 .663-.033 1.252-.192 1.762-.703.51-.51.67-1.099.703-1.762.084-1.485.084-5.937 0-7.422zm-1.418 9.001c-.137.342-.402.607-.744.744-1.159.459-3.905.353-5.184.353s-4.025.106-5.184-.353c-.342-.137-.607-.402-.744-.744-.459-1.159-.353-3.905-.353-5.184s-.106-4.025.353-5.184c.137-.342.402-.607.744-.744 1.159-.459 3.905-.353 5.184-.353s4.025-.106 5.184.353c.342.137.607.402.744.744.459 1.159.353 3.905.353 5.184s.106 4.025-.353 5.184z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Customer Service */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Customer Service</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Track Your Order</a></li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Best Sellers</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sale Items</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gift Cards</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Stay Connected</h3>
                            <p className="text-gray-300 text-sm">
                                Subscribe to our newsletter for exclusive offers and updates.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-300 text-sm mb-2">We accept:</p>
                                <div className="flex space-x-2">
                                    <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-semibold">VISA</div>
                                    <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-semibold">MC</div>
                                    <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-semibold">AMEX</div>
                                    <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-semibold">PAYPAL</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm">
                            © 2024 My Store. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 