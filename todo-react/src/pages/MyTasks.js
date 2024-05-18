import React, { useEffect, useState } from "react";
import AddTask from '../components/AddTask';
import { useDispatch, useSelector } from "react-redux";
import { getApi, info } from "../redux/reducer/toDoApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isfavorite from "../components/isFavorite";
import { getChoise } from "../components/Options";



const MyTasks = () => {
    const allData = useSelector((state) => state.toDoApp.allData)
    const dispatch = useDispatch()


    console.log(allData);
    const handleChoise = (ele) => {
        getChoise(ele)
        // dispatch(getApi())
    }

    const reRender = (id, fa) => {
        isfavorite(id, fa)
        dispatch(getApi())
    }
    return (
        <>
            {allData[0]?.toDo?.map((ele, index) => {
                return (
                    <div className='row gap-2 bg-dark-subtle w-100 mb-5 mt-1 justify-content-center align-items-center' key={index}>
                        <input type="radio" name="task" id="" className='inputRadio col-4' onClick={() => {handleChoise(ele)}} />
                        <h2 className='wrapText fs-5 col-4'>{ele?.task}</h2>
                        {ele.isFavorite ? <FontAwesomeIcon icon="fa-solid fa-star" onClick={() => reRender(ele.taskId, ele.isFavorite)} className="icon btn text-warning border-0 col-4 fs-4" /> : <FontAwesomeIcon icon="fa-regular fa-star" onClick={() => reRender(ele.taskId, ele.isFavorite)} className="icon btn text-light border-0 col-4 fs-4" />}
                        {ele.isDone ? <p className='fs-5 col-12 text-bg-success w-75 text-center rounded-2'>Done</p> : <p className='fs-5 col-10 text-bg-danger w-75 text-center rounded-2'>Not Done</p>}
                    </div>
                )
            })}
            <AddTask />
        </>
    )
}

export default MyTasks