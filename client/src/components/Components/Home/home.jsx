import React from "react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllVideogames } from "../../../actions/actions";
import { Link } from "react-router-dom";
import Card from '../Card/card';
import { filterGamesByGenres,filterByCreator,filterByName, filterByRating,orderByReleased } from "../../../actions/actions";
import './home.css'
import Paginado from "../Paginado/paginado";
import { SerchBar } from "../SerchBar/serchBar";

export default function Home(){
    const dispatch = useDispatch();
    const allVg = useSelector((state)=> state.videogames); //nos permite remplazar la función mapStateToProps de modo que podamos acceder directamente en la store de Redux
    // SETEO LOS ESTADOS LOCALES
    const [orden,setOrden] = useState("")
    const [pagActual,setPagActual] = useState(1); // Seteamos que nuestra pag actual comience en uno
    const [vgPP,setVgPP] = useState(15);  //videojuegos por pagina // Seteamos que nuestras pag contengan 15 videojuegos,
    const IndexUVg =  pagActual * vgPP; // indice del ultimo videojuego
    const IndexPVg = IndexUVg - vgPP;   // indice del primer videojuego
    const VgA= allVg.slice(IndexPVg,IndexUVg) ; // videojuegos actuales        
                                                        // slice nos permite cortar una porcion del arreglo, en este caso nos devolveria desde,
                                                        // el indice 0 al 14 es decir 15 vg, esto se debe a que el metodo slice
                                                        // no incluye la posicion de cierre que le asignamos sino una menos.
    const paginado = (numeroDePagina) =>{
        setPagActual(numeroDePagina);
    }
    useEffect(() => {                       //component did mount
        dispatch(getAllVideogames());
    },[dispatch])   // El parámetro debe ser un array con todos los valores de los que dependerá el efecto,
                    // de forma que sólo se ejecutará cuando ese valor cambie.
                    //Si le pasamos un array vacío, eso hará que el efecto no dependa de ningún valor, 
                    // por lo que sólo se ejecutará al montarse y desmontarse el componente.


    function handleClick(e){
        e.preventDefault();
        dispatch(getAllVideogames());
    }

    function HandleFilterByGenres(e){
        dispatch(filterGamesByGenres(e.target.value))
        setPagActual(1);
        // setOrden(`${e.target.value}`)
    }

    function HandleFilterByCreator(e){
        dispatch(filterByCreator(e.target.value))
        setPagActual(1);
        setOrden(`${e.target.value}`)
    }

    function HandleFilterByName(e){
        dispatch(filterByName(e.target.value))
        setPagActual(1);                            // seteo que comience a ordenar desde la primera pagina
        setOrden(`${e.target.value}`)      // seteo que ordene desde que realizo el click
    }

    function HandleFilterByRating(e){
        e.preventDefault();
        dispatch(filterByRating(e.target.value))
        setPagActual(1);
        setOrden(`${e.target.value}`)
    }

    // function handleOrderByReleased(e){
    //     e.preventDefault();
    //     dispatch(orderByReleased(e.target.value))
    //     setPagActual(1);
    //     setOrden(`${e.target.value}`)
    // }

    return(
        <div className="fox">
            <div className="nav">
        <Link to='/videogames'><button className="batsi" > Crea tu VideoJuego </button></Link>
            <h1>Videogames Page</h1>
            <br>
            </br>
            <button className="batsi" onClick={e => {handleClick(e)}}>Reincia tu busqueda</button>
    </div>
    <div className="filtros">
        <div className="bo">
            <label htmlFor="">Ordenado Por Nombre</label><br />
            <select className="bot" onChange={e => {HandleFilterByName(e)}}>  {/*Input que permite una selección entre un conjunto de opciones.*/}
                <option value="all">Todos ↓</option>
                <option value='asc'>Orden Ascendente</option> {/* Etiqueta ligada a <select>. Permite añadir diferentes opciones al <select> */}
                <option value='des'>Orden Descendente</option>
            </select>
        </div>
        {/* <div>
            <label htmlFor="">Ordenado Por Fecha</label><br/>
            <select name="" id="" onChange={e =>{ handleOrderByReleased(e)}}>
                <option value="asc">Orden Ascendente</option>
                <option value='des'>Orden Descendente</option>
            </select>
        </div> */}
        <div className="box">
        <label htmlFor="">Ordenado Por Genero</label><br />
            <select className="bot" onChange={e =>{ HandleFilterByGenres(e)}}>
                <option value="all">Todos ↓</option>
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
                <option value="Board Games">Board Games</option>
                <option value="Card">Card</option>
                <option value="Educational">Educational</option>
            </select>
        </div>
        <div className="box">
        <label htmlFor="">Ordenado por Rating</label><br />
            <select className="bot" onChange={e => {HandleFilterByRating(e)}}>
                <option value="all">Todos ↓</option>
                <option value="asc">Orden Ascendente</option>
                <option value='des'>Orden Descendente</option>
            </select>
        </div>
        <div className="box">
        <label htmlFor="">Ordenados por Creador</label><br />
            <select className="bot" onChange={e => {HandleFilterByCreator(e)}}>
                {/* <option value='all'>Todos</option> */}
                <option value="all">Todos ↓</option>
                <option value="created">Creados por el Usuario</option>
                <option value="Api">VideoJuegos existentes</option>
            </select>
        </div>
    </div>
        <div className="barra">
            <div>
                <Link className="botonsito" to='/'>Volver Atras</Link>
            </div>
        </div>
            <div className="tdo">
                <SerchBar/>
            </div>
            <div>
                <div className="box">
                        <Paginado vgPP={vgPP} allVg={allVg.length} paginado={paginado} />
                    </div>
                    <div className="conteiner">
                    {
                    VgA?.map((e,i) =>{
                        return(
                    <div key={i} className="carta">   {/* funciona como un div pero no ocupa espacio de la pagina */}
                        <Link to={`/home/${e.id}`}></Link>
                        <Card name={e.name}  background_image={e.background_image} genres={e.genres}  id={e.id} />
                    </div>
                    )})
                    }
                    </div>
                </div>
        </div>
    )
}