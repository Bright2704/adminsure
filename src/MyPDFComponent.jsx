import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// นำเข้าฟอนต์ที่รองรับภาษาไทย
import THSarabunNew from '/fonts/THSarabunNew.ttf';
import THSarabunNewBold from '/fonts/THSarabunNew Bold.ttf';

// กำหนดฟอนต์
Font.register({
    family: 'THSarabunNew',
    fonts: [
        { src: THSarabunNew, fontWeight: 'normal' },
        { src: THSarabunNewBold, fontWeight: 'bold' },
    ],
});


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    heading: {
        fontSize: 20,
        marginBottom: 30,
        fontFamily: 'THSarabunNew',
        fontWeight: '600',
        textAlign: "center"
    },
    content: {
        fontSize: 16,
        fontFamily: 'THSarabunNew',
        marginBottom: "20px"
        // textIndent: '30px'
    },
    contentCenter: {
        fontSize: 16,
        fontFamily: 'THSarabunNew',
        textIndent: '40px',
        textAlign: "center",
        marginTop: "20px"
    },
    image: {
        width: '325.039px',
        height: '204.094px',
        margin: "0 auto",
        marginBottom: "20px",
        // objectFit: "fit"
    },
    flexDirection: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
    }
});


function MyPDFComponent({ formData }) {
    
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>สัญญาประกันการขาย</Text>
                        <View style={styles.flexDirection}>
                            <Image
                                style={styles.image}
                                src={formData.fileID}
                            />
                            <Image
                                style={styles.image}
                                src={formData.fileDetail}
                            />
                        </View>
                        <Text style={styles.content}>
                            ข้าพเจ้า ชื่อ {formData.firstName} นามสกุล {formData.lastName} ( ผู้ขาย ) 
                        </Text>
                        <Text style={styles.content}>
                            ขายสินค้าให้ ชื่อ {formData.buyerFirstName} นามสกุล {formData.buyerLastName} ( ผู้ซื้อ )
                        </Text>
                        <Text style={styles.content}>
                            เบอร์โทรที่ติดต่อได้ ของผู้ขาย : {formData.phoneNumber}
                        </Text>
                        <Text style={styles.content}>
                            ได้ทำการ ขาย บัญชีโซเชียล/ไอดีเกม : {formData.accountType}
                        </Text>
                        <Text style={styles.content}>
                            ช่องทางการชำระเงิน ( {formData.paymentMethod} )
                        </Text>
                        <Text style={styles.content}>
                            ชื่อบัญชีรับเงิน ชื่อ {formData.firstName} นามสกุล {formData.lastName} เลขบัญชี {formData.accountNumber}
                        </Text>
                        <Text style={styles.content}>
                            หากบัญชีโซเชียลหรือไอดีเกมมีปัญหาและไม่สามารถใช้งานได้
                        </Text>
                        <Text style={styles.content}>
                            ยินดีคืนเงิน {formData.refund} บาท
                        </Text>
                        {/* <Text style={styles.content}>
                            หากไม่ทำตามสัญญานี้ยินดีให้ดำเนินคดีตามกฎหมาย
                        </Text>
                        <Text style={styles.content}>
                            Username : {formData.username}
                        </Text> */}
                        <Text style={styles.content}>
                            ปี/เดือน/วัน ที่ขาย : {formData.saleDate}
                        </Text>
                        <Text style={styles.content}>
                            ระยะเวลาที่รับประกัน : (ตลอดชีพ)
                        </Text>
                        {/* <Text style={styles.content}>
                            โดยผ่านกลางกับแอดมิน แทน
                        </Text> */}
                        <Text style={styles.contentCenter}>
                            *** ใช้บัตรประจำตัวจริงเท่านั้น ผู้ขายสามารถปิดเลข 13 หลักได้ ***
                        </Text>
                        <Text style={{ position: "absolute", bottom: '0', right: '0', color: "rgba(0,0,0,0.25)", fontFamily: 'THSarabunNew', }}>
                            แบบฟอร์มนี้สร้างขึ้นเพื่อทำให้การซื้อขายบนโลกออนไลน์ปลอดภัยมากยิ่งขึ้นโดยแอดมินบอส
                        </Text>
                    </View>
                </Page>
            </Document>
        </>
    )
}

export default MyPDFComponent
