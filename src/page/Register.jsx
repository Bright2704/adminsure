import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // State to hold the email
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email }) // Include email in the request body
            });
            const data = await response.json();
            console.log('Response from server:', data);
            setMessage(data.message || data.error);
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Error registering user');
        }
    };

    return (
        <div className="w-screen h-full min-h-screen bg-slate-900 p-4">
            <div className="bg-slate-300 w-full h-full p-4 rounded-2xl drop-shadow-xl shadow-slate-100">
                <h1 className='text-center text-4xl'>สมัครสมาชิก</h1>

                <div className="w-full max-w-[550px] h-[3px] rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-700 mx-auto my-4"></div>

                <div className="p-4 bg-slate-600 rounded-xl text-slate-200 max-w-[700px] mx-auto">
                    {message && <p>{message}</p>}
                    <form onSubmit={handleRegister}>
                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                                <label htmlFor="username">Username</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" placeholder='ตัวอย่าง : test001' />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="password" placeholder='ตัวอย่าง : 123456' />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="email" placeholder='ตัวอย่าง : example@email.com' />
                            </div>
                        </div>

                        <Link className='mt-4 block ml-auto w-fit underline' to={'/login'}>
                            เข้าสู่ระบบ กดที่นี่
                        </Link>

                        <div className="flex items-center justify-center mt-4">
                            <button type='submit' className='bg-slate-300/20 px-4 py-3 rounded-xl text-xl font-semibold'>
                                สมัครสมาชิก
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
