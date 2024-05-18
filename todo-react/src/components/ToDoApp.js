import '../css/ToDoApp.css'
import Header from './Header';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Delete, OptionsUpdate, toDone } from './Options';
import { useDispatch } from 'react-redux';
import { getApi } from '../redux/reducer/toDoApp';


function ToDoApp() {
    const dispatch = useDispatch()
    const handleToDone = () => {
        toDone()
        dispatch(getApi())
    }
    const handleDelete = () => {
        Delete()
        dispatch(getApi())
    }
    return (
        <div className="ToDoApp">
            <div className='perant d-flex text-bg-light justify-content-between'>
                <Header />
                <div className='d-flex flex-column bg-secondary text-bg-dark w-75 justify-content-start align-items-center'>
                    <div className='d-flex justify-content-between align-items-center mt-5 w-100 bg-body-secondary text-dark position-sticky top-0'>
                        <div className='mx-2'>
                            <h2>My Day</h2>
                            <p>{Date()}</p>
                        </div>
                        <DropdownButton id="dropdown-basic-button" title="Options" className='mx-2'>
                            <OptionsUpdate />
                            <Dropdown.Item onClick={handleToDone}>Done Or Not</Dropdown.Item>
                            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ToDoApp;