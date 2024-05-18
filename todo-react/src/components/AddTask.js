import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getApi } from "../redux/reducer/toDoApp";

const AddTask = () => {
    const dispatch = useDispatch()
    const [valueAddTask, setValueAddTask] = useState({ task: '', isFavorite: false, taskId: 0, isDone: false })

    const [showTask, setShowTask] = useState(false);
    const handleCloseTask = () => setShowTask(false);
    const handleShowTask = () => setShowTask(true);

    const addTask = () => {
        try {
            axios.post('http://192.168.178.66:4000/todo', valueAddTask, { headers: { Authorization: localStorage.getItem('token') } })
                .then(() => {
                    console.log('Task Has Been Created')
                    dispatch(getApi())
                    setValueAddTask({ task: '', isFavorite: false, taskId: 0, isDone: false })
                    handleCloseTask()
                })
                .catch((err) => console.error(err.response.data))
        } catch (err) { console.log(err) }
    }
    const handelAddTask = () => {
        let setId = Math.floor(Math.random() * 100000000000000)
        return (setId)
    }
    return (
        <>
            <button className='position-fixed bottom-0 w-50 btn btn-info fs-5 mb-2' onClick={handleShowTask}> <FontAwesomeIcon icon={faPlus} /> ADD Task</button>
            <Modal show={showTask} onHide={handleCloseTask}>
                <Modal.Header closeButton>
                    <Modal.Title>Task To Do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder='Please Enter Your Task' className='border-success rounded-2 p-2 w-100' onChange={(e) => setValueAddTask({ ...valueAddTask, task: e.target.value, taskId: handelAddTask() })} />
                    <label htmlFor="addToYouFavorite" className='mx-2'>Add To Your Favorite</label>
                    <input type="checkbox" name="addToYouFavorite" onClick={(e) => setValueAddTask({ ...valueAddTask, isFavorite: e.target.checked })} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addTask}>
                        ADD Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default AddTask