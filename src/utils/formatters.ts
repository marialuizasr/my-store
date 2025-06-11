/**
 * Trunca um texto se ele exceder o comprimento máximo especificado
 * @param text - O texto a ser truncado
 * @param maxLength - O comprimento máximo (padrão: 45)
 * @returns O texto truncado com "..." se necessário
 */
export const truncateText = (text: string, maxLength: number = 45): string => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Formata um preço para exibição com símbolo de moeda
 * @param price - O preço numérico
 * @param currency - O símbolo da moeda (padrão: '$')
 * @param decimals - Número de casas decimais (padrão: 2)
 * @returns O preço formatado como string
 */
export const formatPrice = (price: number, currency: string = '$', decimals: number = 2): string => {
    if (typeof price !== 'number' || isNaN(price)) {
        return `${currency}0.00`;
    }
    return `${currency}${price.toFixed(decimals)}`;
};

/**
 * Formata uma avaliação para exibição
 * @param rate - A nota da avaliação
 * @param count - O número de avaliações (opcional)
 * @returns Objeto com informações formatadas da avaliação
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
 * Valida se um ID é válido
 * @param id - O ID a ser validado
 * @returns true se o ID for válido
 */
export const isValidId = (id: any): boolean => {
    return typeof id === 'number' && id > 0 && Number.isInteger(id);
};

/**
 * Gera uma URL de produto
 * @param productId - O ID do produto
 * @returns A URL formatada para o produto
 */
export const generateProductUrl = (productId: number): string => {
    if (!isValidId(productId)) {
        throw new Error('ID do produto inválido');
    }
    return `/products/${productId}`;
};

/**
 * Calcula o desconto percentual
 * @param originalPrice - Preço original
 * @param discountedPrice - Preço com desconto
 * @returns Percentual de desconto
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