import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDetail,resetDetail } from "../../../actions/actions";
import { Link, useParams } from "react-router-dom";
import './details.css'

export const  Detail = () =>{
const dispatch = useDispatch();
const myVgame = useSelector((state) => state.detail);
const {id} = useParams();


useEffect(() => {
    dispatch(getDetail(id));
    return ()=>{
   dispatch(resetDetail())
}
}, [dispatch , id] )


return (
    <body className="td">
      <div className="comp">
        <h1>{myVgame.name}</h1> 
        <img  className="imagen" src={myVgame.background_image} alt= 'Img Not Found' width='300px' height='250px'/>
        <h3>Rating:{myVgame.rating}</h3>
        <h3>Generos:{ myVgame.genres?.map(el => el.name).join('-')}</h3>
        <h3>Fecha de Lanzamiento:{myVgame.released }</h3>
        <h4>Plataformas:</h4>
          <ul>{myVgame.platform ? myVgame.platform.map((e) => e).join(' || ') : ""}</ul>
          <ul>{myVgame.id?.length   ? myVgame.platforms?.map(el => el.name)
        :myVgame.platforms?.map(el=> el.platform.name).join(' || ')}</ul>  
        <h3>Descripción:</h3>
            <p>
                <strong>{myVgame.description_raw || myVgame.description }</strong>
            </p> 
        <Link to='/home'><button className="button">HOME</button></Link>
      </div>
    </body>
)
}