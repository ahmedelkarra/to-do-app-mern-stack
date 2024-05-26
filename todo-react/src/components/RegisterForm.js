import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const RegisterForm = () => {
    const [registerValue, setRegisterValue] = useState({ email: "", pass: "", passConfirm: '', FName: "", LName: "" })
    const [showRegister, setShowRegister] = useState(false);
    const [scheckPass, setCheckPass] = useState(false)
    const [handelError, setHandelError] = useState('')

    const handleCloseRegister = () => {
        setShowRegister(false);
        setCheckPass(false);
        setRegisterValue({ email: "", pass: "", passConfirm: '', FName: "", LName: "" })
    }
    const handleShowRegister = () => setShowRegister(true);


    const register = async (e) => {
        e.preventDefault()
        if (registerValue.pass === registerValue.passConfirm && registerValue.pass.length !== 0 && registerValue.passConfirm.length !== 0) {
            await axios.post('https://to-do-app-mern-bf0eb3deb0e2.herokuapp.com/register', registerValue)
                .then((e) => {
                    console.log(e.data)
                    handleCloseRegister()
                })
                .catch((err) => {
                    setHandelError(err.response.data)
                    setCheckPass(true)
                })
        } else {
            setHandelError('The Password Is Not Same')
            setCheckPass(true)
        }
    }
    return (
        <>
            < h2 className='btn btn-success p-3 mx-2' onClick={() => handleShowRegister()}> <FontAwesomeIcon icon={faUserPlus} className='mx-2' /> Register</h2 >
            <Modal show={showRegister} onHide={handleCloseRegister}>
                <form onSubmit={register}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='row gap-2'>
                        {scheckPass && <h3 className="col-12 text-bg-danger text-center fs-5">{handelError}</h3>}
                        <input type="text" placeholder='First Name' className='col border-success rounded-2 p-2 w-100' onChange={(e) => setRegisterValue({ ...registerValue, FName: e.target.value.toLowerCase() })} required />
                        <input type="text" placeholder='Last Name' className='col border-success rounded-2 p-2 w-100' onChange={(e) => setRegisterValue({ ...registerValue, LName: e.target.value.toLowerCase() })} />
                        <input type="email" placeholder='Email' className='col-12 border-success rounded-2 p-2 w-100' onChange={(e) => setRegisterValue({ ...registerValue, email: e.target.value.toLowerCase() })} />
                        <input type="password" placeholder='password' className='col border-success rounded-2 p-2 w-100' onChange={(e) => setRegisterValue({ ...registerValue, pass: e.target.value })} />
                        <input type="password" placeholder='Confirm password' className='col border-success rounded-2 p-2 w-100' onChange={(e) => setRegisterValue({ ...registerValue, passConfirm: e.target.value })} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" className='m-auto'>
                            Register
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}


export default RegisterForm
