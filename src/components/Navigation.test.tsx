import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

// Mock the cart store
const mockCartStore = vi.fn();
vi.mock('../store/cartStore', () => ({
    useCartStore: (selector: any) => mockCartStore(selector)
}));

// Mock react-router-dom
const mockUseLocation = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useLocation: () => mockUseLocation(),
        Link: ({ to, onClick, className, children, ...props }: any) => (
            <a
                href={to}
                onClick={(e) => {
                    e.preventDefault();
                    if (onClick) onClick();
                }}
                className={className}
                {...props}
            >
                {children}
            </a>
        )
    };
});

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            {component}
        </MemoryRouter>
    );
};

describe('Navigation', () => {
    beforeEach(() => {
        // Default mock implementation for cart store
        mockCartStore.mockImplementation((selector) =>
            selector({ items: [] })
        );

        // Default mock for useLocation
        mockUseLocation.mockReturnValue({ pathname: '/' });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders the logo and store name', () => {
            renderWithRouter(<Navigation />);

            expect(screen.getByText('🛍️')).toBeDefined();
            expect(screen.getByText('My Store')).toBeDefined();
        });

        it('renders navigation links', () => {
            renderWithRouter(<Navigation />);

            const homeLinks = screen.getAllByText('Home');
            const cartLinks = screen.getAllByText('Cart');

            expect(homeLinks).toHaveLength(2); // Desktop and mobile
            expect(cartLinks).toHaveLength(3); // Desktop, mobile menu, and mobile header
        });

        it('renders mobile menu button', () => {
            renderWithRouter(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /toggle menu/i });
            expect(menuButton).toBeDefined();
            expect(menuButton.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('Active State Detection', () => {
        it('highlights Home link when on home page', () => {
            mockUseLocation.mockReturnValue({ pathname: '/' });
            renderWithRouter(<Navigation />);

            const homeLinks = screen.getAllByText('Home');
            homeLinks.forEach(link => {
                expect(link.className).toContain('text-blue-600');
                expect(link.className).toContain('bg-blue-50');
            });
        });

        it('highlights Cart link when on cart page', () => {
            mockUseLocation.mockReturnValue({ pathname: '/cart' });
            renderWithRouter(<Navigation />);

            const cartLinks = screen.getAllByText('Cart');
            // Filter to get only the cart links that use isActive (desktop and mobile menu)
            const activatableCartLinks = cartLinks.filter(link => {
                const linkElement = link.closest('a');
                // Mobile header cart link has hardcoded classes, skip it
                return linkElement && !linkElement.className.includes('px-2 py-1');
            });

            // Should find at least the desktop cart link (mobile menu might not be visible)
            expect(activatableCartLinks.length).toBeGreaterThan(0);

            activatableCartLinks.forEach(link => {
                const linkElement = link.closest('a');
                if (linkElement) {
                    expect(linkElement.className).toContain('text-blue-600');
                    expect(linkElement.className).toContain('bg-blue-50');
                }
            });
        });

        it('does not highlight links when on different page', () => {
            mockUseLocation.mockReturnValue({ pathname: '/products' });
            renderWithRouter(<Navigation />);

            const homeLinks = screen.getAllByText('Home');
            homeLinks.forEach(link => {
                expect(link.className).toContain('text-gray-600');
                // Check that it doesn't have the active state classes (but it might have hover classes)
                expect(link.className).not.toMatch(/(?:^|\s)text-blue-600(?:\s|$)/); // Exact class match
                expect(link.className).not.toContain('bg-blue-50');
            });
        });
    });

    describe('Cart Functionality', () => {
        it('displays cart item count when items are present', () => {
            mockCartStore.mockImplementation((selector) =>
                selector({
                    items: [
                        { id: 1, quantity: 2 },
                        { id: 2, quantity: 3 }
                    ]
                })
            );

            renderWithRouter(<Navigation />);

            const badges = screen.getAllByText('5');
            expect(badges).toHaveLength(3); // Desktop, mobile menu, and mobile header
        });

        it('displays "9+" when cart has more than 9 items', () => {
            mockCartStore.mockImplementation((selector) =>
                selector({
                    items: [
                        { id: 1, quantity: 15 }
                    ]
                })
            );

            renderWithRouter(<Navigation />);

            const badges = screen.getAllByText('9+');
            expect(badges).toHaveLength(3);
        });

        it('does not display cart badge when cart is empty', () => {
            mockCartStore.mockImplementation((selector) =>
                selector({ items: [] })
            );

            renderWithRouter(<Navigation />);

            expect(screen.queryByText('0')).toBeNull();
        });
    });

    describe('Mobile Menu', () => {
        it('toggles mobile menu when button is clicked', () => {
            renderWithRouter(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /toggle menu/i });

            // Initially closed
            expect(menuButton.getAttribute('aria-expanded')).toBe('false');

            // Click to open
            fireEvent.click(menuButton);
            expect(menuButton.getAttribute('aria-expanded')).toBe('true');

            // Click to close
            fireEvent.click(menuButton);
            expect(menuButton.getAttribute('aria-expanded')).toBe('false');
        });

        it('closes mobile menu when navigation links are clicked', () => {
            renderWithRouter(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /toggle menu/i });

            // Open menu
            fireEvent.click(menuButton);
            expect(menuButton.getAttribute('aria-expanded')).toBe('true');

            // Click on mobile Home link (in mobile menu)
            const mobileMenu = menuButton.closest('nav')?.querySelector('.md\\:hidden:last-child');
            const mobileHomeLink = mobileMenu?.querySelector('a[href="/"]');

            if (mobileHomeLink) {
                fireEvent.click(mobileHomeLink);
                expect(menuButton.getAttribute('aria-expanded')).toBe('false');
            }
        });

        it('closes mobile menu when logo is clicked', () => {
            renderWithRouter(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /toggle menu/i });
            const logo = screen.getByText('My Store').closest('a');

            // Open menu
            fireEvent.click(menuButton);
            expect(menuButton.getAttribute('aria-expanded')).toBe('true');

            // Click logo
            if (logo) {
                fireEvent.click(logo);
                expect(menuButton.getAttribute('aria-expanded')).toBe('false');
            }
        });
    });

    describe('Responsive Design', () => {
        it('has proper CSS classes for desktop navigation', () => {
            renderWithRouter(<Navigation />);

            const nav = screen.getByRole('navigation');
            const desktopNav = nav.querySelector('.hidden.md\\:flex');
            expect(desktopNav).toBeDefined();
            expect(desktopNav?.className).toContain('hidden');
            expect(desktopNav?.className).toContain('md:flex');
        });

        it('has proper CSS classes for mobile elements', () => {
            renderWithRouter(<Navigation />);

            const nav = screen.getByRole('navigation');
            const mobileElements = nav.querySelector('.flex.md\\:hidden');
            expect(mobileElements).toBeDefined();
            expect(mobileElements?.className).toContain('flex');
            expect(mobileElements?.className).toContain('md:hidden');
        });
    });

    describe('Accessibility', () => {
        it('has proper ARIA attributes on menu button', () => {
            renderWithRouter(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /toggle menu/i });
            expect(menuButton.getAttribute('aria-label')).toBe('Toggle menu');
            expect(menuButton.hasAttribute('aria-expanded')).toBe(true);
        });

        it('has proper navigation structure', () => {
            renderWithRouter(<Navigation />);

            const nav = screen.getByRole('navigation');
            expect(nav).toBeDefined();
        });

        it('has accessible cart count badges', () => {
            mockCartStore.mockImplementation((selector) =>
                selector({
                    items: [{ id: 1, quantity: 3 }]
                })
            );

            renderWithRouter(<Navigation />);

            const badges = screen.getAllByText('3');
            badges.forEach(badge => {
                expect(badge.className).toContain('bg-red-500');
                expect(badge.className).toContain('text-white');
            });
        });
    });

    describe('Styling', () => {
        it('applies correct hover states', () => {
            // Set location to something other than '/' so home links are not in active state
            mockUseLocation.mockReturnValue({ pathname: '/products' });
            renderWithRouter(<Navigation />);

            const homeLinks = screen.getAllByText('Home');
            homeLinks.forEach(link => {
                expect(link.className).toContain('hover:text-blue-600');
            });
        });

        it('applies sticky navigation styling', () => {
            renderWithRouter(<Navigation />);

            const nav = screen.getByRole('navigation');
            expect(nav.className).toContain('sticky');
            expect(nav.className).toContain('top-0');
            expect(nav.className).toContain('z-50');
        });

        it('applies proper background and shadow', () => {
            renderWithRouter(<Navigation />);

            const nav = screen.getByRole('navigation');
            expect(nav.className).toContain('bg-white');
            expect(nav.className).toContain('shadow-md');
            expect(nav.className).toContain('border-b');
            expect(nav.className).toContain('border-gray-100');
        });
    });
});
