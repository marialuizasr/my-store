import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

// Mock the Navigation component
vi.mock('./Navigation', () => ({
    Navigation: () => <nav data-testid="navigation">Navigation Component</nav>
}));

// Mock react-router-dom's Outlet
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        Outlet: () => <div data-testid="outlet">Outlet Content</div>
    };
});

// Helper function to render Layout with Router
const renderLayout = () => {
    return render(
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
};

describe('Layout', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render without crashing', () => {
        renderLayout();
        expect(screen.getByTestId('navigation')).toBeTruthy();
        expect(screen.getByTestId('outlet')).toBeTruthy();
    });

    it('should render the Navigation component', () => {
        renderLayout();
        expect(screen.getByTestId('navigation')).toBeTruthy();
    });

    it('should render the Outlet for router content', () => {
        renderLayout();
        expect(screen.getByTestId('outlet')).toBeTruthy();
    });

    it('should have the correct main container structure', () => {
        renderLayout();
        const main = screen.getByRole('main');
        expect(main).toBeTruthy();
        expect(main.className).toContain('flex-1');
    });

    describe('Footer Content', () => {
        it('should render company information section', () => {
            renderLayout();
            expect(screen.getByText('My Store')).toBeTruthy();
            expect(screen.getByText(/Your trusted online destination/)).toBeTruthy();
        });

        it('should render social media links', () => {
            renderLayout();
            const socialLinks = screen.getAllByRole('link');
            const socialMediaSection = socialLinks.filter(link =>
                link.getAttribute('href') === '#' &&
                link.querySelector('svg')
            );
            expect(socialMediaSection.length).toBeGreaterThan(0);
        });

        it('should render customer service section', () => {
            renderLayout();
            expect(screen.getByText('Customer Service')).toBeTruthy();
            expect(screen.getByText('Contact Us')).toBeTruthy();
            expect(screen.getByText('Help Center')).toBeTruthy();
            expect(screen.getByText('Shipping Info')).toBeTruthy();
            expect(screen.getByText('Returns & Exchanges')).toBeTruthy();
        });

        it('should render quick links section', () => {
            renderLayout();
            expect(screen.getByText('Quick Links')).toBeTruthy();
            expect(screen.getByText('New Arrivals')).toBeTruthy();
            expect(screen.getByText('Best Sellers')).toBeTruthy();
            expect(screen.getByText('Sale Items')).toBeTruthy();
            expect(screen.getByText('Gift Cards')).toBeTruthy();
        });

        it('should render newsletter subscription section', () => {
            renderLayout();
            expect(screen.getByText('Stay Connected')).toBeTruthy();
            expect(screen.getByText(/Subscribe to our newsletter/)).toBeTruthy();
            expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
            expect(screen.getByRole('button', { name: 'Subscribe' })).toBeTruthy();
        });

        it('should render payment methods', () => {
            renderLayout();
            expect(screen.getByText('We accept:')).toBeTruthy();
            expect(screen.getByText('VISA')).toBeTruthy();
            expect(screen.getByText('MC')).toBeTruthy();
            expect(screen.getByText('AMEX')).toBeTruthy();
            expect(screen.getByText('PAYPAL')).toBeTruthy();
        });

        it('should render copyright and legal links', () => {
            renderLayout();
            expect(screen.getByText(/© 2024 My Store/)).toBeTruthy();
            expect(screen.getByText('Privacy Policy')).toBeTruthy();
            expect(screen.getByText('Terms of Service')).toBeTruthy();
            expect(screen.getByText('Cookie Policy')).toBeTruthy();
        });
    });

    describe('Newsletter Subscription', () => {
        it('should have a functional email input field', () => {
            renderLayout();
            const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            expect(emailInput.value).toBe('test@example.com');
        });

        it('should have correct input and button styling classes', () => {
            renderLayout();
            const emailInput = screen.getByPlaceholderText('Enter your email');
            const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });

            expect(emailInput.className).toContain('flex-1');
            expect(emailInput.className).toContain('px-4');
            expect(subscribeButton.className).toContain('bg-blue-600');
            expect(subscribeButton.className).toContain('px-4');
        });
    });

    describe('Layout Structure', () => {
        it('should have correct CSS classes for layout', () => {
            renderLayout();
            const rootDiv = screen.getByTestId('navigation').parentElement;
            expect(rootDiv?.className).toContain('min-h-screen');
            expect(rootDiv?.className).toContain('bg-gray-50');
        });

        it('should have footer with correct styling', () => {
            renderLayout();
            const footer = screen.getByRole('contentinfo');
            expect(footer).toBeTruthy();
            expect(footer.className).toContain('bg-gray-800');
            expect(footer.className).toContain('text-white');
        });

        it('should have grid layout in footer', () => {
            renderLayout();
            const footerGrid = screen.getByRole('contentinfo').querySelector('.grid');
            expect(footerGrid?.className).toContain('grid-cols-1');
            expect(footerGrid?.className).toContain('md:grid-cols-2');
            expect(footerGrid?.className).toContain('lg:grid-cols-4');
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic HTML structure', () => {
            renderLayout();
            expect(screen.getByRole('main')).toBeTruthy();
            expect(screen.getByRole('contentinfo')).toBeTruthy();
        });

        it('should have proper form elements for newsletter', () => {
            renderLayout();
            const emailInput = screen.getByRole('textbox');
            const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });

            expect(emailInput.getAttribute('type')).toBe('email');
            expect(subscribeButton.tagName.toLowerCase()).toBe('button');
        });

        it('should have links with proper href attributes', () => {
            renderLayout();
            const links = screen.getAllByRole('link');
            links.forEach(link => {
                expect(link.getAttribute('href')).toBeTruthy();
            });
        });
    });
});
