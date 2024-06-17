import React from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyPDFComponent from './MyPDFComponent';

function App() {
  return (
    <>
      <div>
        <h1>Generate PDF with React</h1>
        <PDFDownloadLink document={<MyPDFComponent />} fileName="my_document.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'กำลังโหลด...' : 'ดาวน์โหลด PDF'
          }
        </PDFDownloadLink>
      </div>

      {/* <PDFViewer width="1000" height="900"> abse
        <MyPDFComponent />
      </PDFViewer> */}
    </>
  )
}

export default App

