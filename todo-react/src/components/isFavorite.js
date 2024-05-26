import axios from "axios";


const Isfavorite = (id, state) => {
    let stateFa = state
    if (stateFa) {
        stateFa = false
    } else {
        stateFa = true
    }
    console.log(id)
    const axiosInfo = async () => {
        await axios.post(`https://to-do-app-mern-bf0eb3deb0e2.herokuapp.com/favorite/${id}`, { isFavorite: stateFa }, { headers: { Authorization: localStorage.getItem('token') } })
            .then((e) => console.log(e.data))
            .catch((err) => console.error(err))
    }
    axiosInfo()
}


export default Isfavorite
