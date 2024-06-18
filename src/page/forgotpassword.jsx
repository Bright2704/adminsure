import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://210.246.202.185:3000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Instructions have been sent to your email.');
            } else {
                setMessage(data.message || 'Failed to send reset instructions.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send reset instructions.');
        }
    };

    return (
        <div className="w-screen h-full min-h-screen bg-slate-900 p-4 flex justify-center items-center">
            <div className="bg-slate-300 w-full max-w-md p-4 rounded-2xl drop-shadow-xl shadow-slate-100">
                <h1 className='text-center text-4xl'>Reset Password</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid gap-4">
                        <label htmlFor="email" className='text-slate-600'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800'
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className="text-center mt-4">
                        {message && <p className="text-slate-600">{message}</p>}
                        <button type='submit' className='bg-slate-300/20 px-4 py-3 rounded-xl text-xl font-semibold'>
                            Send Reset Instructions
                        </button>
                    </div>
                </form>
                <Link className='block text-center mt-4 underline text-slate-600' to="/login">
                    Return to login
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
