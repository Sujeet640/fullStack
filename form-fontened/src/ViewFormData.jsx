import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { Link } from 'react-router-dom'
import { apiUrl } from './ApiUrl'

export default function ViewFormData() {
    let [storeData, setStoreData] = useState([])
    let viewFormData = () => {
        axios.get(`${apiUrl}/viewData`)
            .then((res) => res.data)
            .then((finalRes) => {
                setStoreData(finalRes);
            })
    }
    
    let deleteData = (delID) => {
        axios.get(`${apiUrl}deleteFormdata/${delID}`)
            .then((res) => {
                console.log("Deleted successfully", res.data);
                viewFormData(); // Refresh the data after deletion
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
    };
    
    useEffect(() => {
        viewFormData()
    }, [])

    const downloadQRCode = (name, email, phone, message, index) => {
        const canvas = document.createElement('canvas');
        const qrCodeSVG = document.getElementById(`qrCode-${index}`);

        if (!qrCodeSVG) return;

        const svgData = new XMLSerializer().serializeToString(qrCodeSVG);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            canvas.width = 200;
            canvas.height = 200;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 200, 200);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `${name}_QR.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = url;
    };

    return (
        <>
            <section className='viewData'>
                <div className='view-inner'>
                    <h1>View All Data</h1>
                    <Link to={'/'}>
                        <button className='BacktoHome'>Back to Home</button>
                    </Link>
                    <Link to={'/recycle-bin-page'}>
                        <button className='BacktoHome'>Recycle Bin</button>
                    </Link>
                    <table className='tables' cellPadding={1} cellSpacing={0} border={1}>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name.</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Message</th>
                                <th>QR Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                storeData.length > 0
                                    ?
                                    storeData.map((v, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{v.name}</td>
                                                <td>{v.email}</td>
                                                <td>{v.phone}</td>
                                                <td>{v.message}</td>
                                                <td className='qrCode'><QRCode id={`qrCode-${i}`} value={`${v.name}, ${v.email}, ${v.phone}, ${v.message}`} size={50} /> 
                                                <button onClick={()=>downloadQRCode(v.name, v.email, v.phone, v.message, i)}>download</button>
                                                </td>
                                                <td>

                                                    <button className='restore' onClick={()=>deleteData(v._id)}>Delete</button>
                                                      
                                                <Link to={`/${v._id}`}>
                                                    <button className='restore' >Update</button>
                                                </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    "No Data Found"
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

// import axios from 'axios';
// import React, { useEffect, useState, useRef } from 'react';
// import QRCode from 'react-qr-code';
// import { Link } from 'react-router-dom';

// export default function ViewFormData() {
//     let [storeData, setStoreData] = useState([]);

//     const viewFormData = () => {
//         axios.get(`http://127.0.0.1:8000/viewData`)
//             .then((res) => res.data)
//             .then((finalRes) => {
//                 setStoreData(finalRes);
//             });
//     };

//     const deleteData = (delID) => {
//         axios.get(`http://127.0.0.1:8000/deleteFormdata/${delID}`)
//             .then((res) => {
//                 console.log("Deleted successfully", res.data);
//                 viewFormData(); // Refresh the data after deletion
//             })
//             .catch((error) => {
//                 console.error("Error deleting data:", error);
//             });
//     };

//     useEffect(() => {
//         viewFormData();
//     }, []);

//     // Function to download QR code
//     const downloadQRCode = (name, email, phone, message, index) => {
//         const canvas = document.createElement('canvas');
//         const qrCodeSVG = document.getElementById(`qrCode-${index}`);

//         if (!qrCodeSVG) return;

//         const svgData = new XMLSerializer().serializeToString(qrCodeSVG);
//         const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//         const url = URL.createObjectURL(svgBlob);

//         const img = new Image();
//         img.onload = () => {
//             canvas.width = 200;
//             canvas.height = 200;
//             const ctx = canvas.getContext('2d');
//             ctx.drawImage(img, 0, 0, 200, 200);
//             URL.revokeObjectURL(url);

//             const pngUrl = canvas.toDataURL('image/png');
//             const link = document.createElement('a');
//             link.href = pngUrl;
//             link.download = `${name}_QR.png`;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         };
//         img.src = url;
//     };

//     return (
//         <>
//             <section className='viewData'>
//                 <div className='view-inner'>
//                     <h1>View All Data</h1>
//                     <Link to={'/'}>
//                         <button className='BacktoHome'>Back to Home</button>
//                     </Link>
//                     <table className='tables' cellPadding={1} cellSpacing={0} border={1}>
//                         <thead>
//                             <tr>
//                                 <th>Sr No.</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Phone Number</th>
//                                 <th>Message</th>
//                                 <th>QR Code</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {storeData.length > 0 ? (
//                                 storeData.map((v, i) => (
//                                     <tr key={i}>
//                                         <td>{i + 1}</td>
//                                         <td>{v.name}</td>
//                                         <td>{v.email}</td>
//                                         <td>{v.phone}</td>
//                                         <td>{v.message}</td>
//                                         <td className='qrCode'>
//                                             <QRCode id={`qrCode-${i}`} value={`${v.name}, ${v.email}, ${v.phone}, ${v.message}`} size={100} />
//                                             <br />
//                                             <button onClick={() => downloadQRCode(v.name, v.email, v.phone, v.message, i)}>
//                                                 Download
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <button onClick={() => deleteData(v._id)}>Delete</button> |
//                                             <Link to={`/${v._id}`}>
//                                                 <button>Update</button>
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="7">No Data Found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </section>
//         </>
//     );
// }
