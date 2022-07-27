import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import './landing.css'

export default function Landing(){
    function handleClick(e){
        
    }
    return(
        <div className="App">
            <h1 className="hola"> BIENVENIDOS! </h1>
            <Link to='/home'>
                <button className="inicio">Ingresar</button>
            </Link>
        </div>
    )
}
// import { getAllVideogames } from "../../../actions/actions";
// import { useSelector,useDispatch } from "react-redux";
// const dispatch = useDispatch();
// const  videogames  = useSelector((state)=> {
// return state.videogames;
// })
// useEffect(()=> {
// dispatch(getAllVideogames())
// },[dispatch])
// console.log(videogames);