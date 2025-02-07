import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { apiUrl } from './ApiUrl';
// import QRCode from 'qrcode.react'; 

export default function Form() {

    let [allInputs, setAllInputs] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    const [errors, setErrors] = useState({});
    // const [errorMessage, setErrorMessage] = useState(""); // To store the error message
    // const [showError, setShowError] = useState(false);  // Flag to control showing error message

    // Regular Expressions for validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
    const messageRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;


    let { id } = useParams();
    let handleFormData = (e) => {
        e.preventDefault();


        let validationError = {};

        if (!nameRegex.test(allInputs.name)) {
            validationError.name = "please enter name..."
        }

        if (!emailRegex.test(allInputs.email)) {
            validationError.email = "please enter valid email id..."
        }
        if (!phoneRegex.test(allInputs.phone)) {
            validationError.phone = "please enter valid phone number...."
        }
        if (!messageRegex.test(allInputs.message)) {
            validationError.message = "Message should be at least 3 characters long...."
        }

        if (Object.keys(validationError).length > 0) {
            setErrors(validationError);
            setTimeout(() => {
                setErrors({})
            }, 2000);
            return;
        }


        axios.post(`${apiUrl}insertData`, allInputs)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                if (finalRes.success) {
                    setAllInputs({
                        name: "",
                        email: "",
                        phone: "",
                        message: ""
                    })
                }
                alert(finalRes.message)
            })
    }

    let inputValue = (event) => {
        let obj = { ...allInputs }
        obj[event.target.name] = event.target.value
        setAllInputs(obj)
    }
    useEffect(() => {

        if (id !== undefined) {
            axios.get(`${apiUrl}updateFormData/${id}`)
                .then((res) => res.data)
                .then((final) => {
                    setAllInputs({
                        name: final.name,
                        email: final.email,
                        phone: final.phone,
                        message: final.message
                    });
                })
        }
        else{
            setAllInputs({
                name: "",
                email: "",
                phone: "",
                message: ""
            })
        }
    }, [id])



    return (
        <>
            <section className='form-page'>
                <div className='form-inner'>
                    <form action="" className='form-width' onSubmit={handleFormData} >
                        <p style={{ color: "white", fontSize: "20px", marginBottom: "20px" }}>Add Data</p>
                        <div className='form-div'>
                            {<p>{errors.name}</p>}
                            <div className="form-div-1">
                                <label htmlFor="">Name : -</label>
                                <input type="text" placeholder='write name...' name='name' onChange={inputValue} value={allInputs.name} />
                            </div>
                        </div>
                        <div className='form-div'>

                            {<p>{errors.email}</p>}
                            <div className="form-div-1">
                                <label htmlFor="">Email : -</label>
                                <input type="text" placeholder='write email...' name='email' onChange={inputValue} value={allInputs.email} />
                            </div>
                        </div>
                        <div className='form-div'>
                            {<p>{errors.phone}</p>}


                            <div className="form-div-1">

                                <label htmlFor="">Phone : -</label>
                                <input type="text" placeholder='write phone number...' name='phone' onChange={inputValue} value={allInputs.phone} />
                            </div>
                        </div>
                        <div className='form-div'>
                            {<p>{errors.message}</p>}


                            <div className="form-div-1">
                                <label htmlFor="">Message : -</label>
                                <input type="text" placeholder='write message...' name='message' onChange={inputValue} value={allInputs.message} />

                            </div>
                        </div>
                        <button className='save'>save Data</button>
                        <Link to={'/view-form-data'}>
                            <button className='save'>View Data</button>
                        </Link>
                    </form>
                </div>
            </section>
        </>
    )
}

