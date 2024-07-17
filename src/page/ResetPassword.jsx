import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            // const response = await fetch('https://api.adminsure.online/update-password', {
                const response = await fetch('http://localhost:3000/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password reset successfully');
                navigate('/login');
            } else {
                setMessage(data.message || 'Error resetting password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Error resetting password');
        }
    };

    return (
        <div className="w-screen h-full min-h-screen bg-slate-900 p-4 flex justify-center items-center">
            <div className="bg-slate-300 w-full max-w-md p-4 rounded-2xl drop-shadow-xl shadow-slate-100">
                <h1 className="text-center text-4xl">Reset Password</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid gap-4">
                        <label htmlFor="newPassword" className="text-slate-600">New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800"
                            placeholder="Enter your new password"
                        />
                        <label htmlFor="confirmPassword" className="text-slate-600">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800"
                            placeholder="Confirm your new password"
                        />
                    </div>
                    <div className="text-center mt-4">
                        {message && <p className="text-slate-600">{message}</p>}
                        <button type="submit" className="bg-slate-300/20 px-4 py-3 rounded-xl text-xl font-semibold">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
