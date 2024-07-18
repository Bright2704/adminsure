import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.adminsure.online/login', {
            
            
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log('Response from server:', data); // Log response from server
            if (response.ok) {
                setMessage('Login successful');
                localStorage.setItem('token', data.token); // Store the token in local storage
                navigate('/'); // Navigate to the homepage
            } else {
                setMessage(data.message || 'Login failed');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Error logging in');
            setShowErrorModal(true);
        }
    };

    const ErrorModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-slate-100 p-6 rounded-lg">
                <h2 className="text-slate-800 font-bold text-2xl">ไม่สามารถเข้าสู่ระบบได้</h2>
                <p className="text-red-500 text-lg">{message}</p>
                <div className="flex justify-center mt-5">
                    <button onClick={() => setShowErrorModal(false)} className="px-6 py-3 rounded bg-slate-700 text-slate-100 text-lg hover:bg-slate-600 transition duration-300 ease-in-out">ปิด</button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="w-screen h-full min-h-screen bg-slate-900 p-4">
                <div className="bg-slate-300 w-full h-full p-4 rounded-2xl drop-shadow-xl shadow-slate-100">
                    <h1 className='text-center text-4xl'>เข้าสู่ระบบ</h1>

                    <div className="w-full max-w-[550px] h-[3px] rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-700 mx-auto my-4"></div>

                    <div className="p-4 bg-slate-600 rounded-xl text-slate-200 max-w-[700px] mx-auto">
                        {message && <p>{message}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="username">ชื่อผู้ใช้</label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" placeholder='ตัวอย่าง : test001' />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="password">รหัสผ่าน</label>
                                    <div className="relative">
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className='h-[45px] rounded-xl border outline-none px-4 text-slate-800 w-full'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='ตัวอย่าง : 123456'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-800"
                                        >
                                            {showPassword ? 'ซ่อน' : 'แสดง'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <Link className='underline' to={'/forgot-password'}>
                                    ลืมรหัสผ่าน?
                                </Link>
                                <Link className='underline' to={'/register'}>
                                    สมัครสมาชิก กดที่นี่
                                </Link>
                            </div>

                            <div className="flex items-center justify-center mt-4">
                                <button type='submit' className='bg-slate-300/20 px-4 py-3 rounded-xl text-xl font-semibold'>
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showErrorModal && <ErrorModal />}
        </>
    )
}

export default Login
