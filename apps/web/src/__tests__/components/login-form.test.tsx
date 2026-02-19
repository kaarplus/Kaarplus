import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/auth/login-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock next-auth/react specifically
vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
    getSession: vi.fn(() => Promise.resolve({ user: { role: 'USER' } })),
}));

// Mock use-toast specifically
vi.mock('@/hooks/use-toast', () => ({
    useToast: vi.fn(() => ({
        toast: vi.fn(),
    })),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe('LoginForm', () => {
    const mockPush = vi.fn();
    const mockRefresh = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as any).mockReturnValue({
            push: mockPush,
            refresh: mockRefresh,
        });
        // Mock fetch for the login API call
        global.fetch = vi.fn();
    });

    it('renders login form correctly', () => {
        render(<LoginForm />);
        expect(screen.getByText('login.title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('login.emailPlaceholder')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('login.passwordPlaceholder')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login.submit/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        render(<LoginForm />);
        const submitButton = screen.getByRole('button', { name: /login.submit/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Zod messages for empty fields if not overridden
            expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
        });
    });

    it('calls fetch and signIn when form is submitted with valid data', async () => {
        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ user: { id: '1', email: 'test@example.com' } }),
        });
        (signIn as any).mockResolvedValue({ error: null });

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('login.emailPlaceholder'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('login.passwordPlaceholder'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login.submit/i }));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                '/api/v1/auth/login',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
                })
            );
        });

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith('credentials', expect.objectContaining({
                email: 'test@example.com',
                password: 'password123',
                redirect: false,
            }));
        });
    });

    it('handles login error from API', async () => {
        const mockToast = vi.fn();
        const { useToast } = await import('@/hooks/use-toast');
        (useToast as any).mockReturnValue({ toast: mockToast });

        (fetch as any).mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Invalid credentials' }),
        });

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('login.emailPlaceholder'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('login.passwordPlaceholder'), {
            target: { value: 'wrong-password' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login.submit/i }));

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                variant: 'destructive',
                title: 'errors.loginFailed',
            }));
        });
    });
});
