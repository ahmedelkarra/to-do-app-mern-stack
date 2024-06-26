import axios from "axios";
import ChangeTask from "./ChangeTask";



let getData = []


const getChoise = (ele) => {
    console.log(ele);
    return getData = ele
}

const OptionsUpdate = () => {
    return (
        <div>
            <ChangeTask info={getData} />
        </div>
    )
}

const Update = async (task) => {
    const id = getData.taskId
    console.log(getData);
    await axios.patch(`https://to-do-app-mern-bf0eb3deb0e2.herokuapp.com/options/${id}`, { changeTask: task || getData.task, type: `task` }, { headers: { Authorization: localStorage.getItem('token') } })
        .then((e) => {
            console.log(e)
        })
        .catch((err) => console.error(err))
    return
}

const toDone = async () => {
    const id = getData.taskId
    let statusIsDone = false
    getData.isDone ? statusIsDone = false : statusIsDone = true
    await axios.patch(`https://to-do-app-mern-bf0eb3deb0e2.herokuapp.com/options/${id}`, { isDone: statusIsDone, type: 'isDone' }, { headers: { Authorization: localStorage.getItem('token') } })
        .then((e) => console.log("Done To"))
        .catch((err) => console.error(err))
}

const Delete = async () => {
    const id = getData.taskId
    await axios.delete(`https://to-do-app-mern-bf0eb3deb0e2.herokuapp.com/options/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then((e) => console.log(e))
        .catch((err) => console.error(err))
    console.log(getData);
}


export { Delete, Update, toDone, getChoise, OptionsUpdate }
