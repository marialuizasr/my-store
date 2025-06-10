import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

type FormData = {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
};

export function Checkout() {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);

    if (items.length === 0) {
        return (
            <div>
                <div>
                    <h1>Checkout</h1>
                    <p>Your cart is empty</p>
                    <button onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simular processamento do pagamento
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            alert("Order placed successfully! Thank you for your purchase.");
            navigate("/");
        }, 2000);
    };

    return (
        <div>
            <h1>Checkout</h1>

            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* Contact Information */}
                        <div>
                            <h2>Contact Information</h2>
                            <div>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        {/* Shipping Information */}
                        <div>
                            <h2>Shipping Information</h2>
                            <div>
                                <div>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        required
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div>
                            <h2>Payment Information</h2>
                            <div>
                                <div>
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        required
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <div>
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            required
                                            placeholder="MM/YY"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            required
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            maxLength={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Processing..." : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <div>
                        <h2>Order Summary</h2>

                        <div>
                            <div>
                                {items.map((item) => (
                                    <div key={item.id}>
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div>
                                            <p>{item.title}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div>
                                <div>
                                    <span>Subtotal</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                                <div>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div>
                                    <svg>
                                        <path />
                                    </svg>
                                    Secure checkout
                                </div>
                                <div>
                                    <svg>
                                        <path />
                                    </svg>
                                    Free shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 