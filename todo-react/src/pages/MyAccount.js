import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi, info } from "../redux/reducer/toDoApp";
import axios from "axios";


const MyAccount = () => {
    const allData = useSelector((state) => state?.toDoApp?.allData || '')
    const [changeAccount, setChangeAccount] = useState({ FName: allData[0]?.FName || '', LName: allData[0]?.LName || '', email: allData[0]?.email || '', oldPassword: '', changePassword: '', confirmChangePassword: '' })
    const dispatch = useDispatch()

    console.log(allData);
    console.log(changeAccount);

    const handleChangeUser = (e) => {
        console.log(e);
        e.preventDefault()
        let statusIsDone = false
        axios.patch(`http://localhost:4000/me/${allData[0]?._id}`, { changeAccount }, { headers: { Authorization: localStorage.getItem('token') } })
            .then((e) => console.log("Done Change"))
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        dispatch(getApi())
    }, [])
    return (
        <form onSubmit={handleChangeUser}>
            <div className="row gap-lg-1 gap-2 mt-3 w-100 justify-content-center">
                <input type="text" placeholder="First Name" className="col-lg-5 col-12 p-2 rounded-2" value={changeAccount.FName} onChange={(e) => setChangeAccount({ ...changeAccount, FName: e.target.value })} />
                <input type="text" placeholder="Last Name" className="col-lg-5 col-12 p-2 rounded-2" value={changeAccount.LName} onChange={(e) => setChangeAccount({ ...changeAccount, LName: e.target.value })} />
                <input type="text" placeholder="Email" className="col-lg-10 col-12 p-2 rounded-2" value={changeAccount.email} onChange={(e) => setChangeAccount({ ...changeAccount, email: e.target.value })} />
                <input type="password" placeholder="Enter Your Old Password" className="col-lg-10 col-12 p-2 rounded-2" onChange={(e) => setChangeAccount({ ...changeAccount, oldPassword: e.target.value })} />
                <input type="password" placeholder="Change Password" className="col-lg-5 col-12 p-2 rounded-2" onChange={(e) => setChangeAccount({ ...changeAccount, changePassword: e.target.value })} />
                <input type="password" placeholder="Confirm Change Password" className="col-lg-5 col-12 p-2 rounded-2" onChange={(e) => setChangeAccount({ ...changeAccount, confirmChangePassword: e.target.value })} />
                <button type="submit" className="col-lg-5 col-12 btn btn-info">Change</button>
            </div>
        </form>
    )
}

export default MyAccount