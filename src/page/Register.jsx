import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // สถานะการแสดง modal
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
              const response = await fetch('https://api.adminsure.online/register', {
                // const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email, firstName, lastName, phone }) // Include new fields in the request body
            });
            const data = await response.json();
            if (response.ok) {
                setShowSuccessModal(true);
                setMessage('');
            } else {
                setMessage(data.message || data.error);
                setShowErrorModal(true); // แสดง error modal หากการลงทะเบียนไม่สำเร็จ
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Error registering user');
            setShowErrorModal(true);
        }
    };

    const SuccessModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-slate-100 p-6 rounded-lg">
                <h2 className="text-slate-800 font-bold text-2xl">สมัครใช้งานสำเร็จ!</h2>
                <div className="flex justify-center mt-5">
                <button onClick={() => setShowSuccessModal(false)} className="mt-5 px-6 py-3 rounded bg-slate-700 text-slate-100 text-lg hover:bg-slate-600 transition duration-300 ease-in-out ">ปิด</button>
                </div>
            </div>
        </div>
    );

    const ErrorModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-slate-100 p-6 rounded-lg">
                <h2 className="text-slate-800 font-bold text-2xl">ไม่สามารถสร้างบัญชีได้</h2>
                <p className="text-red-500 text-lg">{message}</p>
                <div className="flex justify-center mt-5">
                    <button onClick={() => setShowErrorModal(false)} className="px-6 py-3 rounded bg-slate-700 text-slate-100 text-lg hover:bg-slate-600 transition duration-300 ease-in-out">ปิด</button>
                </div>
            </div>
        </div>
    );
    
    

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
                                <label htmlFor="username">ชื่อผู้ใช้</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" placeholder='ตัวอย่าง : test001' />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="password">รหัสผ่าน</label>
                                <div className="relative">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800 w-full' type={showPassword ? 'text' : 'password'} placeholder='ตัวอย่าง : 123456' />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-slate-800">
                                        {showPassword ? 'ซ่อน' : 'แสดง'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="email">อีเมล</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="email" placeholder='ตัวอย่าง : example@email.com' />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="firstName">ชื่อจริง</label>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" placeholder='ตัวอย่าง : John' />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="lastName">นามสกุล</label>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" placeholder='ตัวอย่าง : Doe' />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="phone">เบอร์โทร</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" placeholder='ตัวอย่าง : 0812345678' />
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
            {showSuccessModal && <SuccessModal />} 
            {showErrorModal && <ErrorModal />}
        </div>

        
    );
}

export default Register;
