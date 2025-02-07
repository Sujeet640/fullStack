import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from './ApiUrl'

export default function DeletedData() {

    let [deleteData, setDeleteData] = useState([])

    useEffect(() => {
        axios.get(`${apiUrl}viewDeletedata`)
            .then((res) => res.data)
            .then((final) => {
                setDeleteData(final.data);
            })
    }, [])

    let restoreFunction=(id)=>{
        axios.post(`${apiUrl}restoreDeleteItem/${id}`)
        .then((res)=>res.data)
        .then((final)=>{
           setDeleteData(deleteData.filter(item=>item._id!=id))
           alert(final.message);
        })
    }

    let permanentDelete=(id)=>{
        axios.get(`${apiUrl}permanent-delete/${id}`)
        .then((res)=>res.data)
        .then((final)=>{
           setDeleteData(deleteData.filter(item=>item._id!=id))
            alert(final.message)
        })
    }

    return (
        <>
            <section className='viewData'>
                <div className='view-inner'>
                    <h1>Recycle Bin</h1>
                    <Link to={'/'}>
                        <button className='BacktoHome'>Back to Home</button>
                    </Link>
                    <Link to={'/view-form-data'}>
                        <button className='BacktoHome'>Back to view Data</button>
                    </Link>

                    <table className='tables' cellPadding={1} cellSpacing={0} border={1}>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name.</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Message</th>
                                {/* <th>QR Code</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                deleteData.length > 0
                                    ?
                                    deleteData.map((v, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{v.name}</td>
                                                <td>{v.email}</td>
                                                <td>{v.phone}</td>
                                                <td>{v.message}</td>

                                                <td>

                                                    <button className='restore' onClick={()=>restoreFunction(v._id)}>restore</button>
                                                    

                                                    <button className='restore' onClick={()=>permanentDelete(v._id)}>Permanently Delete</button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    ""
                            }




                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

// import axios from "axios";
// import { useEffect, useState } from "react";

// function RecycleBin() {
//     const [deletedData, setDeletedData] = useState([]);

//     useEffect(() => {
//         axios.get(`http://127.0.0.1:8000/viewDeletedata`)
//             .then((res) => res.data)
//             .then((data) => setDeletedData(data.data));
//     }, []);

//     // const restoreData = (id) => {
//     //     fetch(`/api/restore/${id}`, { method: "POST" })
//     //         .then((res) => res.json())
//     //         .then(() => setDeletedData(deletedData.filter(item => item._id !== id)));
//     // };

//     // const deletePermanently = (id) => {
//     //     fetch(`/api/permanent-delete/${id}`, { method: "DELETE" })
//     //         .then((res) => res.json())
//     //         .then(() => setDeletedData(deletedData.filter(item => item._id !== id)));
//     // };

//     return (
//         <div>
//             <h2>Recycle Bin</h2>
//             <ul>
//                 {deletedData.map(item => (
//                     <li key={item._id}>
//                         {item.name} - {item.email}
//                         {/* <button onClick={() => restoreData(item._id)}>Restore</button>
//                         <button onClick={() => deletePermanently(item._id)}>Delete Permanently</button> */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default RecycleBin;
