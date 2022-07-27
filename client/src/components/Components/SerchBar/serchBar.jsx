import React from "react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getVgByname } from "../../../actions/actions";
import '../SerchBar/serchBar.css'

export const SerchBar = () => {
    const dispatch = useDispatch();
    const[name,setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value) // setea que lo que escribamos aqui va a convertirse en el foco de busqueda de nuestro onCLick
    }

    function handleClick(e){
        e.preventDefault();
        if(name!== ""){
        dispatch(getVgByname(name))
        
        } else {
          alert('Ingrese un VideoJuego valido')
        }
    }


    return(
        <div className="pilas">
            <input className="input" type="text"  placeholder="...busca aqui" onChange={e => {handleInputChange(e)}}/>
            <button className="botonsito" type="submit" onClick={e => {handleClick(e)}}>Buscar</button>
        </div>
    )
}