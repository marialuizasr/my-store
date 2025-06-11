import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { Product } from '../store/cartStore';

// Mock the cart store
const mockAddToCart = vi.fn();
vi.mock('../store/cartStore', () => ({
  useCartStore: vi.fn((selector) => {
    const store = {
      addToCart: mockAddToCart,
    };
    return selector ? selector(store) : store;
  }),
}));

// Mock React Router Link component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children, className, ...props }: any) => (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    ),
  };
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product Title',
    price: 29.99,
    description: 'Test product description',
    category: 'electronics',
    image: 'https://example.com/test-image.jpg',
    rating: {
      rate: 4.5,
      count: 100,
    },
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Product Title')).toBeDefined();
    expect(screen.getByText('$29.99')).toBeDefined();
    expect(screen.getByText('4.5')).toBeDefined();
    expect(screen.getByAltText('Test Product Title')).toBeDefined();
  });

  it('displays product image with correct attributes', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    const image = screen.getByAltText('Test Product Title') as HTMLImageElement;
    expect(image.src).toBe('https://example.com/test-image.jpg');
    expect(image.getAttribute('loading')).toBe('lazy');
  });

  it('truncates long product titles', () => {
    const longTitleProduct: Product = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated because it exceeds the maximum length',
    };

    render(
      <TestWrapper>
        <ProductCard product={longTitleProduct} />
      </TestWrapper>
    );

    const titleElement = screen.getByText(/This is a very long product title that should/);
    expect(titleElement.textContent).toBe('This is a very long product title that should...');
  });

  it('does not truncate short product titles', () => {
    const shortTitleProduct: Product = {
      ...mockProduct,
      title: 'Short Title',
    };

    render(
      <TestWrapper>
        <ProductCard product={shortTitleProduct} />
      </TestWrapper>
    );

    expect(screen.getByText('Short Title')).toBeDefined();
  });

  it('calls addToCart when Add to Cart button is clicked', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders product detail links with correct URLs', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    const imageLink = screen.getByAltText('Test Product Title').closest('a');
    const titleLink = screen.getByText('Test Product Title').closest('a');
    const viewDetailsLink = screen.getByText('View Details').closest('a');

    expect(imageLink?.getAttribute('href')).toBe('/products/1');
    expect(titleLink?.getAttribute('href')).toBe('/products/1');
    expect(viewDetailsLink?.getAttribute('href')).toBe('/products/1');
  });

  it('displays formatted price correctly', () => {
    const productWithDecimalPrice: Product = {
      ...mockProduct,
      price: 15.5,
    };

    render(
      <TestWrapper>
        <ProductCard product={productWithDecimalPrice} />
      </TestWrapper>
    );

    expect(screen.getByText('$15.50')).toBeDefined();
  });

  it('displays integer price with two decimal places', () => {
    const productWithIntegerPrice: Product = {
      ...mockProduct,
      price: 25,
    };

    render(
      <TestWrapper>
        <ProductCard product={productWithIntegerPrice} />
      </TestWrapper>
    );

    expect(screen.getByText('$25.00')).toBeDefined();
  });

  it('has proper CSS classes for styling', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    const cardContainer = screen.getByText('Test Product Title').closest('.bg-white');
    const expectedClasses = [
      'bg-white',
      'rounded-lg',
      'shadow-sm',
      'border',
      'border-gray-200',
      'overflow-hidden',
      'hover:shadow-md',
      'transition-shadow',
      'duration-200',
      'group'
    ];
    expectedClasses.forEach(className => {
      expect(cardContainer?.classList.contains(className)).toBe(true);
    });
  });

  it('renders rating with star icon', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    expect(screen.getByText('★')).toBeDefined();
    expect(screen.getByText('4.5')).toBeDefined();
  });

  it('handles products with different IDs correctly', () => {
    const productWithDifferentId: Product = {
      ...mockProduct,
      id: 999,
    };

    render(
      <TestWrapper>
        <ProductCard product={productWithDifferentId} />
      </TestWrapper>
    );

    const links = screen.getAllByRole('link');
    const productLinks = links.filter(link =>
      link.getAttribute('href')?.includes('/products/999')
    );

    expect(productLinks).toHaveLength(3); // Image link, title link, and view details link
  });
});
