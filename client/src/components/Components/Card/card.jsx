import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import '../Card/card.css'

export default function Card({name,released,genres,background_image,rating,id,onClose, createdInDB}){
    const generos = genres[0].name?  genres.map(e => {return e.name}).join(", ") : genres
    // console.log(genres)
    return(
        <div className="contenedor">
            <div className="caja">
                    <div className="nombre">
                        <Link className="por" to={`/videogame/${id}`}>
                            <h3 className='uno' >{name}</h3>
                        </Link>
                    </div>
                    {/* <div>
                        <h4>{released}</h4>
                    </div> */}
                    <div>
                        <h4>
                            {generos}
                        </h4>
                    </div>
                    {/* <div>
                        <h4>{rating}</h4>
                    </div> */}
                    <div>
                        <img src={background_image} alt="imagen no encontrada" width='200px' height='200px' />
                    </div>
            </div>
        </div>
    )
}