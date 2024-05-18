import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApi } from "../redux/reducer/toDoApp";
import { useDispatch } from "react-redux";

const LoginForm = () => {
    const [status, setStatus] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({ email: '', pass: '', remember: false })

    const [showLogin, setShowLogin] = useState(false);
    const [scheckPass, setCheckPass] = useState(false)
    const [handelError, setHandelError] = useState('')

    const handleCloseLogin = () => {
        setInputValue({ email: '', pass: '', remember: false })
        setCheckPass(false)
        setShowLogin(false);
    }
    const handleShowLogin = () => setShowLogin(true);

    const login = async (e) => {
        e.preventDefault()
        await axios.post('http://192.168.178.66:4000/login', inputValue)
            .then((info) => {
                setCheckPass(true)
                console.log(info.data.TOKEN);
                localStorage.setItem('token', info.data.TOKEN)
                setHandelError('')
                handleCloseLogin()
                navigate('/tasks')
                setStatus(true)
            })
            .catch((err) => {
                console.log(err.response.data);
                setCheckPass(true)
                setHandelError(err.response.data)
            })
    }

    useEffect(() => {
        dispatch(getApi())
        setStatus(false)
    }, [status])
    return (
        <>
            <h2 className='btn btn-primary p-3 mx-2' onClick={handleShowLogin}><FontAwesomeIcon icon={faRightToBracket} /> Login</h2>
            <Modal show={showLogin} onHide={handleCloseLogin}>
                <form onSubmit={login}>
                    <Modal.Header closeButton>
                        <Modal.Title>Task To Do</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='row gap-2'>
                        {scheckPass && <h3 className="col-12 text-bg-danger text-center fs-5">{handelError}</h3>}
                        <input type="email" placeholder='Please Enter Email' className='border-success rounded-2 p-2 w-100' onChange={(e) => setInputValue({ ...inputValue, email: e.target.value.toLowerCase() })} required />
                        <input type="password" placeholder='Please Enter Password' className='border-success rounded-2 p-2 w-100' onChange={(e) => setInputValue({ ...inputValue, pass: e.target.value.toLowerCase() })} required />
                        <div>
                            <label htmlFor="remember" className='ms-2'>Remember Me</label>
                            <input type="checkbox" name="remember" className='ms-2' onClick={(e) => setInputValue({ ...inputValue, remember: e.target.checked })} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" className='m-auto'>
                            Login
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default LoginForm