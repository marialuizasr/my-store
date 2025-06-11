import { Link } from "react-router-dom";
import type { Product } from "../store/cartStore";
import { useCartStore } from "../store/cartStore";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const truncateTitle = (title: string, maxLength: number = 45) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      {/* Image Container */}
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {truncateTitle(product.title, 45)}
          </h3>
        </Link>

        {/* Price & Rating */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-xs text-gray-500">4.5</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
          >
            Add to Cart
          </button>
          <Link
            to={`/products/${product.id}`}
            className="w-full block text-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 py-1"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}