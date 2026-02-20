import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ContactDealershipDialog } from '@/components/dealership/contact-dealership-dialog';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { apiFetch } from '@/lib/api-client';

// Mock next-auth
vi.mock('next-auth/react', () => ({
    useSession: vi.fn(),
}));

// Mock use-toast
vi.mock('@/hooks/use-toast', () => ({
    useToast: vi.fn(),
}));

// Mock lib/api-client
vi.mock('@/lib/api-client', () => ({
    apiFetch: vi.fn(),
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, options?: { defaultValue?: string, title?: string }) =>
            options?.defaultValue || options?.title ? `${key} ${options.title}` : key,
    }),
}));

describe('ContactDealershipDialog', () => {
    const mockToast = vi.fn();
    const dealershipId = 'test-dealership-123';
    const dealershipName = 'Auto Center';

    beforeEach(() => {
        vi.clearAllMocks();
        (useToast as any).mockReturnValue({ toast: mockToast });
        (useSession as any).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });
    });

    const triggerButton = <button>Contact Us</button>;

    it('renders trigger button', () => {
        render(<ContactDealershipDialog dealershipId={dealershipId} dealershipName={dealershipName} triggerButton={triggerButton} />);
        expect(screen.getByRole('button', { name: /Contact Us/i })).toBeInTheDocument();
    });

    it('opens dialog when button is clicked', async () => {
        render(<ContactDealershipDialog dealershipId={dealershipId} dealershipName={dealershipName} triggerButton={triggerButton} />);

        fireEvent.click(screen.getByRole('button', { name: /Contact Us/i }));

        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByText('contact.dialogTitle')).toBeInTheDocument();
        });
    });

    it('shows form with all fields for anonymous users', async () => {
        render(<ContactDealershipDialog dealershipId={dealershipId} dealershipName={dealershipName} triggerButton={triggerButton} />);

        fireEvent.click(screen.getByRole('button', { name: /Contact Us/i }));

        await waitFor(() => {
            expect(screen.getByRole('textbox', { name: /contact\.name/i })).toBeInTheDocument();
            expect(screen.getByRole('textbox', { name: /contact\.email/i })).toBeInTheDocument();
            expect(screen.getByRole('textbox', { name: /contact\.phone/i })).toBeInTheDocument();
            expect(screen.getByRole('textbox', { name: /contact\.message/i })).toBeInTheDocument();
        });
    });

    it('submits form successfully', async () => {
        (apiFetch as any).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });

        render(<ContactDealershipDialog dealershipId={dealershipId} dealershipName={dealershipName} triggerButton={triggerButton} />);

        fireEvent.click(screen.getByRole('button', { name: /Contact Us/i }));

        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        // Fill in the form
        fireEvent.change(screen.getByRole('textbox', { name: /contact\.name/i }), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByRole('textbox', { name: /contact\.email/i }), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByRole('textbox', { name: /contact\.message/i }), {
            target: { value: 'I am interested in buying a car' }
        });

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /contact\.sendButton/i });
        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(apiFetch).toHaveBeenCalledWith(
                `/dealerships/${dealershipId}/contact`,
                expect.objectContaining({
                    method: 'POST',
                    body: expect.stringContaining('interested in buying a car'),
                })
            );
        });

        expect(screen.getByText('contact.successTitle')).toBeInTheDocument();
        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: 'contact.successTitle',
        }));
    });

    it('shows error toast on submission failure', async () => {
        (apiFetch as any).mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Server Error' }),
        });

        render(<ContactDealershipDialog dealershipId={dealershipId} dealershipName={dealershipName} triggerButton={triggerButton} />);

        fireEvent.click(screen.getByRole('button', { name: /Contact Us/i }));

        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('textbox', { name: /contact\.name/i }), { target: { value: 'John' } });
        fireEvent.change(screen.getByRole('textbox', { name: /contact\.email/i }), { target: { value: 'j@example.com' } });
        fireEvent.change(screen.getByRole('textbox', { name: /contact\.message/i }), { target: { value: 'Message' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /contact\.sendButton/i }));
        });

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                variant: 'destructive',
                title: 'contact.errorTitle',
                description: 'Server Error',
            }));
        });
    });
});
