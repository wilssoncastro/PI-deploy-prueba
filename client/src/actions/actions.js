import axios from 'axios'
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_VG_BY_NAME = 'GET_VG_BY_NAME';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const FILTER_BY_CREATOR = 'FILTER_BY_CREATOR';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const POST_VG = 'POST:VG';
export const RESET_DETAIL = 'RESET_DETAIL';
// export const ORDER_BY_RELEASED = "ORDER_BY_RELEASED"

export const getAllVideogames = () => {
    return (dispatch) => {
        axios(`/videogames`)
            .then(data => {
                return dispatch({
                    type: 'GET_ALL_VIDEOGAMES',
                    payload: data.data
                })
            })
    }
};

// export const getVidegameByGenre = () =>{
//     return (dispatch) => { 
//         fetch("http://localhost:3001/genres")
//         // .then(data => data.json())
//         .then(data =>{
//             return dispatch =({
//                 type: 'GET_ALL_GENRES',
//                 payload: data,
//             })
//         })
//     }
// }

export const getVidegameByGenre = () => {
    return async function (dispatch) {
        try {
            const json = await axios("/genres")
            return dispatch({
                type: "GET_ALL_GENRES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const filterGamesByGenres = (payload) => { // este payload representa el valor de input, es decir el valor de nuestro select
    // console.log(payload)
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}

export const filterByCreator = (payload) => {
    console.log(payload)
    return {
        type: 'FILTER_BY_CREATOR',
        payload
    }
}

export const filterByName = (payload) => {
    console.log(payload)
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const filterByRating = (payload) => {
    console.log(payload)
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {

        var json = await axios.get(`/videogame/${id}`);
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })

    }
}

export const getVgByname = (name) => {
    return (dispatch) => {
        fetch('/videogames?name=' + name)
            .then(data => data.json())
            .then(data => {
                return dispatch({
                    type: 'GET_VG_BY_NAME',
                    payload: data
                })
            })
    }
}

// export const orderByReleased = (payload) =>{
//     return{
//         type: "ORDER_BY_RELEASED",
//         payload
//     }
// }

export const postVG = (payload) => {
    return async function (dispatch) {
        const data = await axios.post("/videogames", payload) // en esta ruta yo quiero hacer el post de lo que le paso por payload
        return data;
    }
}

export const resetDetail = (payload) => {
    return {
        type: 'RESET_DETAIL',
        payload
    }

}