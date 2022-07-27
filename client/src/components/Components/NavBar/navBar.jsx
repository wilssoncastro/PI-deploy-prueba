import React, { useState } from "react";
import { filterGamesByGenres,filterByCreator,filterByName, filterByRating } from "../../../actions/actions";
// import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import Paginado from "../Paginado/paginado";

export default function NavBar(){
    const dispatch = useDispatch();
    // const allVg = useSelector((state)=> state.videogames);
    const [orden,setOrden] = useState("")
    const [pagActual,setPagActual] = useState(1)
    // const [pagActual,setPagActual] = useState(1); // Seteamos que nuestra pag actual comience en uno
    // const [vgPP,setVgPP] = useState(15);  //videojuegos por pagina // Seteamos que nuestras pag contengan 15 videojuegos,
    // const IndexUVg =  pagActual * vgPP; // indice del ultimo videojuego
    // const IndexPVg = IndexUVg - vgPP;   // indice del primer videojuego
    // const VgA= allVg.slice(IndexPVg,IndexUVg) ; // videojuegos actuales        
    //                                                     // slice nos permite cortar una porcion del arreglo, en este caso nos devolveria desde,
    //                                                     // el indice 0 al 14 es decir 15 vg, esto se debe a que el metodo slice
    //                                                     // no incluye la posicion de cierre que le asignamos sino una menos.
    // const paginado = (numeroDePagina) =>{
    //     setPagActual(numeroDePagina);
    // }
        
    function HandleFilterByGenres(e){
        dispatch(filterGamesByGenres(e.target.value))
    }

    function HandleFilterByCreator(e){
        dispatch(filterByCreator(e.target.value))
    }

    function HandleFilterByName(e){
        dispatch(filterByName(e.target.value))
        // setPagActual(1);
        setOrden(`Ordenado {e.target.value}`)
    }

    function HandleFilterByRating(e){
        e.preventDefault();
        dispatch(filterByRating(e.target.value))
    }

    return(
        <div>
            <div>Ordenado por Nombre
                <select onChange={e => {HandleFilterByName(e)}}>  {/*Input que permite una selección entre un conjunto de opciones.*/}
                    <option value="all">Todos</option>
                    <option value='asc'>Orden Ascendente</option> {/* Etiqueta ligada a <select>. Permite añadir diferentes opciones al <select> */}
                    <option value='des'>Orden Descendente</option>
                </select>
            </div>
            <div>Ordenado Por Genero
                <select onChange={e =>{ HandleFilterByGenres(e)}}>
                    <option value="all">Todos</option>
                    <option value="RPG">RPG</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Racing">Racing</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Sports">Sports</option>
                    <option value="Action">Action</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Family">Family</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                </select>
            </div>
            <div>Ordenado por Rating
                <select onChange={e => {HandleFilterByRating(e)}}>
                    <option value="all">Todos</option>
                    <option value="asc">Orden Ascendente</option>
                    <option value='des'>Orden Descendente</option>
                </select>
            </div>
            <div>Ordenados por Creador
                <select onChange={e => {HandleFilterByCreator(e)}}>
                    {/* <option value='all'>Todos</option> */}
                    <option value="created">Creados por el Usuario</option>
                    <option value="Api">VideoJuegos existentes</option>
                </select>
            </div>
            {/* <div className="box">
            <Paginado vgPP={vgPP} allVg={allVg.length} paginado={paginado} />
            </div> */}
        </div>    
    )
}



