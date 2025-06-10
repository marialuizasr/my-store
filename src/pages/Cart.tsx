import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

export function Cart() {
    const { items, removeFromCart, clearCart, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-4 max-w-md mx-auto px-4">
                    <div className="text-6xl">🛒</div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h1>
                    <p className="text-gray-600">Start shopping to add items to your cart</p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <div className="lg:col-span-7">
                    <div className="space-y-4">
                        {items.map((item: CartItem) => (
                            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                <div className="flex items-center space-x-4">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                        <p className="text-lg font-bold text-blue-600 mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        title="Remove item"
                                        aria-label={`Remove ${item.title} from cart`}
                                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mt-16 lg:mt-0 lg:col-span-5">
                    <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium text-gray-900">${getTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-medium text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-gray-900">${getTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 space-y-3">
                            <Link
                                to="/checkout"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-center block"
                            >
                                Proceed to Checkout
                            </Link>
                            <button
                                onClick={clearCart}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Shopping Info */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="text-green-600 mr-2">✓</span>
                                Free shipping on all orders
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="text-blue-600 mr-2">↻</span>
                                30-day easy returns
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
