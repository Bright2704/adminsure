import { PDFDownloadLink } from '@react-pdf/renderer'
import MyPDFComponent from '../MyPDFComponent'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [imageID, setImageID] = useState(null);
    const [imageDetail, setImageDetail] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        accountType: '',
        paymentMethod: '',
        accountNumber: '',
        username: '',
        saleDate: '',
        buyerFirstName: '',
        buyerLastName: '',
        refund: '',
        phoneNumber: '',
        fileName: '',
    });

    const navigate = useNavigate()

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    useEffect(() => {
        const storage = window.localStorage;
        const token = storage.getItem('token');
        if (!token) {
            navigate('/login'); // ถ้าไม่มี token ให้กลับไปหน้า Login
        }
    }, [navigate]);

    const handleLogout = () => {
        const storage = window.localStorage;
        const token = storage.removeItem('token');
        navigate('/login')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChangeID = (e) => {
        const fileID = e.target.files[0];
        if (fileID) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageID(reader.result);
                setFormData({ ...formData, fileID: reader.result });
            };
            reader.readAsDataURL(fileID);
        }
    };

    const handleImageChangeDetail = (e) => {
        const fileDetail = e.target.files[0];
        if (fileDetail) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageDetail(reader.result);
                setFormData({ ...formData, fileDetail: reader.result });
            };
            reader.readAsDataURL(fileDetail);
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // ส่ง formData ไปที่ server หรือ process ต่อ
        console.log(formData);
    };

    return (
        <>
            <div className="w-screen h-full bg-slate-900 p-4">
                <div className="bg-slate-300 w-full h-full p-4 rounded-2xl drop-shadow-xl shadow-slate-100">
                    <h1 className='text-center text-4xl te'>สัญญาซื้อขาย</h1>
                    <div className="w-full max-w-[550px] h-[3px] rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-700 mx-auto my-4"></div>

                    <button onClick={handleLogout} className='mx-auto w-fit flex bg-slate-800/20 mb-4 px-5 py-3 rounded-xl'>ออกจากระบบ</button>

                    <div className="p-4 bg-slate-600 rounded-xl text-slate-200 max-w-[700px] mx-auto">
                        <h1 className='text-2xl mb-4'>กรอกข้อมูลสัญญาซื้อขาย</h1>
                        <div className="w-full max-w-[250px] h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 mb-4"></div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-2 my-4">
                                <label htmlFor="firstName">ชื่อไฟล์</label>
                                <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="fileName" id="fileName" value={formData.fileName} onChange={handleInputChange} placeholder='ตัวอย่าง : สัญญาประกันการขาย' />
                            </div>
                            <div>
                                <h1>รูปบัตรประชาชน</h1>
                                <div className="w-full p-4 bg-slate-400/30 my-4 rounded-xl">
                                    {imageID ? <img src={imageID} alt="Preview" className='w-[300px] rounded-xl drop-shadow-xl bg-slate-200 p-3' /> : <span>ไม่มีรูปภาพ</span>}
                                </div>
                                <div className="p-4 bg-slate-400/30 rounded-xl mb-4">
                                    <input className='w-full' required type="file" onChange={handleImageChangeID} accept="image/*" />
                                </div>
                            </div>
                            <div>
                                <h1>รูปข้อมูล ID หรือ บัญชีโซเชียวมีเดีย</h1>
                                <p className='text-sm my-2'>*หากรูปเป็นแนวตั้งแก้ไขรูปให้เป็นจัตุรัส*</p>
                                <div className="w-full p-4 bg-slate-400/30 my-4 rounded-xl">
                                    {imageDetail ? <img src={imageDetail} alt="Preview" className='w-[300px] rounded-xl drop-shadow-xl bg-slate-200 p-3' /> : <span>ไม่มีรูปภาพ</span>}
                                </div>
                                <div className="p-4 bg-slate-400/30 rounded-xl mb-4">
                                    <input className='w-full' required type="file" onChange={handleImageChangeDetail} accept="image/*" />
                                </div>
                            </div>

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>1. กรอก ชื่อ - นามสกุล (ของผู้ขาย)</h2>

                            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="firstName">ชื่อจริง</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder='ตัวอย่าง : สมชาย' />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="lastName">นามสกุล</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder='ตัวอย่าง : สว่าง' />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="lastName">เบอร์โทรที่ติดต่อได้</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder='ตัวอย่าง : 0900000000' />
                                </div>
                            </div>

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>2. เลือกเกม หรือ บัญชีอื่นที่จะขาย</h2>
                            <div className="grid gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="accountType">เลือก บัญชีอื่นที่จะขาย</label>
                                    <select required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' name="accountType" id="accountType" value={formData.accountType} onChange={handleInputChange}>
                                        <option disabled selected value="">เลือกบัญชีที่จะขาย</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Rov (Arena of Valor)">Rov (Arena of Valor)</option>
                                        <option value="TFT (Teamfight Tactics)">TFT (Teamfight Tactics)</option>
                                        <option value="FreeFire">FreeFire</option>
                                        <option value="เกมเศรษฐี">เกมเศรษฐี</option>
                                        <option value="Dark Hunter">Dark Hunter</option>
                                        <option value="Line Ranger">Line Ranger</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>3. เลือกช่องทางชำระเงิน</h2>

                            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="paymentMethod">เลือก ช่องทางชำระเงิน</label>
                                    <select required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                                        <option disabled selected value="">เลือกช่องทางชำระเงิน</option>
                                        <option value="ธนาคาร">ธนาคาร</option>
                                        <option value="ทรูวอลเล็ต">ทรูวอลเล็ต</option>
                                        <option value="พร้อมเพย์">พร้อมเพย์</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="accountNumber">เลขบัญชี</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="accountNumber" id="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder='ตัวอย่าง : ธนาคารให้ใส่เลขบัญชี(ชื่อธนาคาร) , ทรูวอเลทใส่เบอร์ , พร้อมเพย์ใส่เบอร์' />
                                </div>
                            </div>

                            {/* <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>4. กรอก Username</h2>

                            <div className="grid gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="username">Username</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} placeholder='ตัวอย่าง : Test001' />
                                </div>
                            </div> */}

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>4. กรอก วัน / เดือน / ปี (ที่ขาย)</h2>

                            <div className="grid gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="saleDate">วัน / เดือน / ปี (ที่ขาย)</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="date" name="saleDate" id="saleDate" value={formData.saleDate} onChange={handleInputChange} placeholder='ตัวอย่าง : 26/06/2566' />
                                </div>
                            </div>

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>5. กรอก ชื่อ - นามสกุล (ของผู้ซื้อ)</h2>

                            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="buyerFirstName">ชื่อจริง</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="buyerFirstName" id="buyerFirstName" value={formData.buyerFirstName} onChange={handleInputChange} placeholder='ตัวอย่าง : สมชาย' />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="buyerLastName">นามสกุล</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="buyerLastName" id="buyerLastName" value={formData.buyerLastName} onChange={handleInputChange} placeholder='ตัวอย่าง : สว่าง' />
                                </div>
                            </div>

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <h2 className='text-lg'>6. กรอก จำนวนเงิน</h2>

                            <div className="grid gap-4 mt-4">
                                <div className="grid gap-2">
                                    <label htmlFor="buyerFirstName">ราคาสินค้า</label>
                                    <input required className='h-[45px] rounded-xl border-0 outline-none px-4 text-slate-800' type="text" name="refund" id="refund" value={formData.refund} onChange={handleInputChange} placeholder='ตัวอย่าง : 1000' />
                                </div>
                            </div>

                            <div className="w-full h-[3px] bg-gradient-to-r from-slate-400/0 to-slate-800 my-4"></div>

                            <div className="lg:flex gap-4">
                                <button type="submit" className="w-full h-[55px] bg-blue-600 text-slate-100 rounded-xl mt-4">บันทึกข้อมูล</button>
                                <div className="w-full">
                                    <PDFDownloadLink className="py-3 px-5 rounded-xl cursor-pointer bg-blue-800/40 text-2xl text-blue-200 w-full text-center my-4 block" document={<MyPDFComponent formData={formData} />} fileName={`${formData.fileName}.pdf`}>
                                        {({ blob, url, loading, error }) =>
                                            loading ? 'กำลังโหลด...' : 'ดาวน์โหลด PDF'
                                        }
                                    </PDFDownloadLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
