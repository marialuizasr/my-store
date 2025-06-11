/**
 * Truncates text if it exceeds the specified maximum length
 * @param text - The text to be truncated
 * @param maxLength - The maximum length (default: 45)
 * @returns The truncated text with "..." if necessary
 */
export const truncateText = (text: string, maxLength: number = 45): string => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Formats a price for display with currency symbol
 * @param price - The numeric price
 * @param currency - The currency symbol (default: '$')
 * @param decimals - Number of decimal places (default: 2)
 * @returns The formatted price as a string
 */
export const formatPrice = (price: number, currency: string = '$', decimals: number = 2): string => {
    if (typeof price !== 'number' || isNaN(price)) {
        return `${currency}0.00`;
    }
    return `${currency}${price.toFixed(decimals)}`;
};

/**
 * Formats a rating for display
 * @param rate - The rating score
 * @param count - The number of reviews (optional)
 * @returns Object with formatted rating information
 */
export const formatRating = (rate: number, count?: number) => {
    const stars = '★'.repeat(Math.floor(rate)) + '☆'.repeat(5 - Math.floor(rate));
    return {
        stars,
        rate: rate.toFixed(1),
        count: count ? `(${count})` : ''
    };
};

/**
 * Validates if an ID is valid
 * @param id - The ID to be validated
 * @returns true if the ID is valid
 */
export const isValidId = (id: any): boolean => {
    return typeof id === 'number' && id > 0 && Number.isInteger(id);
};

/**
 * Generates a product URL
 * @param productId - The product ID
 * @returns The formatted URL for the product
 */
export const generateProductUrl = (productId: number): string => {
    if (!isValidId(productId)) {
        throw new Error('Invalid product ID');
    }
    return `/products/${productId}`;
};

/**
 * Calculates the discount percentage
 * @param originalPrice - Original price
 * @param discountedPrice - Discounted price
 * @returns Discount percentage
 */
export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
    if (originalPrice <= 0 || discountedPrice < 0) {
        return 0;
    }
    if (discountedPrice >= originalPrice) {
        return 0;
    }
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}; 