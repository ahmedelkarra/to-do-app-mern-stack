import React, { useState } from "react";
import { faArrowRightFromBracket, faMagnifyingGlass, faStar, faSun, faUser, } from '@fortawesome/free-solid-svg-icons';
import '../css/ToDoApp.css'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { Button, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { getApi } from "../redux/reducer/toDoApp";



const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isActive = useSelector((state) => state.toDoApp.isActive)
    const allData = useSelector((state) => state.toDoApp.allData)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const makeIcon = () => {
        const fname = allData[0]?.FName
        const lname = allData[0]?.LName
        if (fname && lname) {
            const setAll = fname[0].toLocaleUpperCase() + lname[0].toLocaleUpperCase()
            return (setAll)
        }
    }

    const logOut = () => {
        localStorage.clear()
        navigate('/')
        dispatch(getApi())
    }
    return (
        <>
            <div className='d-flex d-lg-none w-25'>
                <Button variant="primary" onClick={handleShow} className='w-100'>
                    Launch
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <div className='d-lg-none d-flex flex-column justify-content-between align-items-center flex-wrap mt-5'>
                            {isActive && <div className='d-lg-none d-flex w-100 bg-body justify-content-between align-items-center flex-wrap'>
                                <h3 className='fs-5 mx-auto iconName bg-primary rounded-5 text-center text-light mt-1 mt-2 btn'>{makeIcon()}</h3>
                                <h2 className='fs-6 mx-auto text-wrap mt-1 mt-2 text-dark wrapEmail'>{allData[0]?.email}</h2>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='mx-auto mt-2 btn btn-primary p-3 fs-5' />
                            </div>}
                            <div className='d-flex flex-column gap-5 mt-5 w-100'>
                                {isActive && <NavLink to='/tasks'><h2 className='btn btn-outline-success p-3 mx-2'><FontAwesomeIcon icon={faSun} /> My Tasks</h2></NavLink>}
                                {isActive && <h2 className='btn btn-outline-success p-3 mx-2'><FontAwesomeIcon icon={faStar} /> Favorite</h2>}
                                {isActive && <h2 className='btn btn-outline-success p-3 mx-2'><FontAwesomeIcon icon={faUser} /> My Account</h2>}
                                {!isActive && <LoginForm />}
                                {!isActive && <RegisterForm />}
                                {isActive && <h2 className='btn btn-outline-danger p-3 mx-2' onClick={logOut}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></h2>}
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>


            <div className='d-lg-flex d-none mt-5 flex-wrap m-auto w-25'>

                {isActive && <div className='d-lg-flex d-none  bg-body justify-content-between align-items-center flex-wrap w-25 position-fixed top-0'>
                    <h3 className='fs-5 mx-auto iconName bg-primary rounded-5 p-2 text-light mt-2 btn'>{makeIcon()}</h3>
                    <h2 className='fs-6 mx-auto text-wrap mt-2 text-dark wrapEmail'>{allData[0]?.email}</h2>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='mx-auto mt-2 btn btn-primary p-3 fs-5' />
                </div>}

                <div className='d-flex flex-column gap-5 mt-5 w-25 position-fixed top'>
                    {isActive && <NavLink to='/tasks' className='btn btn-outline-success p-3 mx-2' ><FontAwesomeIcon icon={faSun} className='mx-2' /> My Tasks</NavLink>}
                    {isActive && <NavLink to='/favorite' className='btn btn-outline-success p-3 mx-2' ><FontAwesomeIcon icon={faStar} className='mx-2' /> Favorite</NavLink>}
                    {isActive && <NavLink to='/me' className='btn btn-outline-success p-3 mx-2' ><FontAwesomeIcon icon={faUser} className='mx-2' /> My Account</NavLink>}
                    {!isActive && <LoginForm />}
                    {!isActive && <RegisterForm />}
                    {isActive && <h2 className='btn btn-outline-danger p-3 mx-2' onClick={logOut}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} className='mx-2' /></h2>}
                </div>
            </div>
        </>
    )
}


export default Header