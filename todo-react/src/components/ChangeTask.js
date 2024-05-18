import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Update } from './Options';
import { useDispatch } from 'react-redux';
import { getApi } from '../redux/reducer/toDoApp';

function ChangeTask({ info }) {
    const [changeTask, setChangeTask] = useState(info.task);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const handleChange = () => {
        Update(changeTask)
        handleClose()
        dispatch(getApi())
    }
    return (
        <>
            <Dropdown.Item variant="primary" onClick={handleShow}>Update</Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input placeholder='Change Task' className='w-100 rounded-2 p-1' value={changeTask} onChange={(e) => setChangeTask(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleChange} className='w-50 m-auto'>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeTask;