import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { PasswordSettings } from '@/components/dashboard/password-settings';
import { useToast } from '@/hooks/use-toast';
import { apiFetch } from '@/lib/api-client';

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
        t: (key: string, options?: { defaultValue: string }) => options?.defaultValue || key,
    }),
}));

describe('PasswordSettings', () => {
    const mockToast = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useToast as any).mockReturnValue({ toast: mockToast });
    });

    it('renders correctly', () => {
        render(<PasswordSettings />);

        expect(screen.getByText('Security')).toBeInTheDocument();
        expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^New Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Update Password/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty submisson', async () => {
        render(<PasswordSettings />);

        const submitBtn = screen.getByRole('button', { name: /Update Password/i });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        await waitFor(() => {
            expect(screen.getByText('Current password is required')).toBeInTheDocument();
            expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
        });
    });

    it('shows validation errors for mismatching passwords', async () => {
        render(<PasswordSettings />);

        fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'oldpassword' } });
        fireEvent.change(screen.getByLabelText(/^New Password/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'different123' } });

        const submitBtn = screen.getByRole('button', { name: /Update Password/i });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        await waitFor(() => {
            expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
        });
    });

    it('submits successfully when passwords match', async () => {
        (apiFetch as any).mockResolvedValueOnce({ success: true });

        render(<PasswordSettings />);

        fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'oldpassword123' } });
        fireEvent.change(screen.getByLabelText(/^New Password/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'newpassword123' } });

        const submitBtn = screen.getByRole('button', { name: /Update Password/i });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        await waitFor(() => {
            expect(apiFetch).toHaveBeenCalledWith('/auth/change-password', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ currentPassword: 'oldpassword123', newPassword: 'newpassword123' })
            }));
        });

        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Password changed'
        }));
    });

    it('shows error toast if apiFetch fails', async () => {
        (apiFetch as any).mockRejectedValueOnce(new Error('Invalid password'));

        render(<PasswordSettings />);

        fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'wrongpassword' } });
        fireEvent.change(screen.getByLabelText(/^New Password/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/Confirm New Password/i), { target: { value: 'newpassword123' } });

        const submitBtn = screen.getByRole('button', { name: /Update Password/i });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                variant: 'destructive',
                title: 'Failed to change password',
                description: 'Invalid password'
            }));
        });
    });
});
