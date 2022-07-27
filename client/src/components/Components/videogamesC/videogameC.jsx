import React from "react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getVidegameByGenre,postVG } from "../../../actions/actions";
import { Link,Navigate,useNavigate } from "react-router-dom";
import '../videogamesC/videogamesC.css'

function validate(state){
    const error={}
  
    if(!state.name){
      error.name ='El nombre del videojuego es necesario.'
    }else if(state.name.length < 3 || state.name.length > 35){
      error.name ='El nombre del videojuego debe contener entre 3 a 35 caracteres'
    }
    if(!state.description){
      error.description ='La descripción es necesaria'
    }
    if(!state.rating){
      error.rating ='La valoracion es necesaria'
    }else if(state.rating < 0 || state.rating > 5){
      error.rating ='La valoracion otorgada debe estar entre uno (1) y cinco (5)'
    }
    if(!/^[1-5]+$/.test(state.rating)){
      error.rating = "la valoracion no puede contener una letra"
    }
    if(state.genres.length === 0){
      error.genres ='Debe seleccionar al menos un(1) genero'
    }
    if(state.platform.length === 0){
      error.platform ='Debe seleccionar al menos una (1) plataforma'
  
    }
  
    return error
  }
  
  
  export const Creator = () => {
    let platformss = [
        "PC","PlayStation","Xbox","Nintendo Switch","iOS", "Android","Nintendo","PS Vita","PSP","Wii","Game Boy","Atari","SEGA","PS5","PS4","PS3","PS2","PS1",
    ];
    const [button,setButton]=useState(true)
    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres)
    const [input,setInput]=useState({
      name:'',
      description:'',
      rating:'',
      released:'',
      genres:[],
      platform:[]
    })
    const [error,setError]=useState({
      name:'',
      description:'',
      rating:'',
      genres:'',
    })
  useEffect(()=>{
    dispatch(getVidegameByGenre())
  },[dispatch])
  
  const handleChange=(e)=>{
    e.preventDefault()
      setInput(prevState=>{
        const newState={
        ...input,
        [e.target.name]:e.target.value
      };
  
      setError(validate(newState))
    
    return newState
    })
    
    if(Object.keys(error).length){ //te devuelve un array con las keys del objeto,entonces ahi pregunto si ese array tiene length (hay algo en el objeto) -> entonces hay errores -> deshabilita el boton
    setButton(false)}
  }
  const handleSelectP=(e)=>{
    e.preventDefault()
    if(!input.platform.includes(e.target.value)){
      setInput({
        ...input,
        platform:[...input.platform,e.target.value]
      })}else{
        console.log('Plataforma ya agregada.')
      }
      console.log(input)
  }
  const handleSelect=(e)=>{
    e.preventDefault()
    if(!input.genres.includes(e.target.value)){
    setInput({
      ...input,
      genres:[...input.genres,e.target.value]
    })}else{
      console.log('genero ya agregado!')
    }
  }
  const handleDeleteGenre=(e)=>{
    setInput({
      ...input,
      genres:input.genres.filter((g) => g!==e )
    })
  }
  const handleDeletePlat=(e)=>{
    setInput({
      ...input,
      platform:input.platform.filter((g) => g!==e )
    })
  }
  
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!input.name||!input.rating||!input.description||!input.platform || !input.genres){
      return alert('Complete los campos vacios.')
    }
    // input.name=input.name.charAt().toUpperCase()+input.name.slice(1)
    dispatch(postVG(input))
    setInput({
      name:'',
      description:'',
      rating:'',
      released:'',
      genres:[],
      platform:[]
    })
    alert('Videojuego Creado!')
  }
  
    return (
      <div className="non">
        <div>
        <Link to='/home'><button className='back-button'>Regresar</button></Link>
        </div>
        <h1 className="title">Crea tu propio Juego!</h1>
        <div>
        <form onSubmit={e=>handleSubmit(e)}>
          <div className="nom">
            <label className="label">Name: </label>
            <input className="input"
            onChange={e=>handleChange(e)}
            type='text'
            value={input.name}
            name='name'
            />
            <span>{error?.name ||''}</span>
          </div>
          
          <div className="nom">
            <label className="label">Description: </label>
            <textarea className="input"
            onChange={e=>handleChange(e)}
            type='text'
            value={input.description}
            name='description'
            />
            <span>{error?.description ||''}</span>
          </div>
          
          <div className="nom">
            <label className="label" >Rating: </label>
            <input className="input"
            onChange={e=>handleChange(e)}
            type='number'
            value={input.rating}
            name='rating'
            />
            <span className='error'>{error?.rating ||''}</span>
  
            </div>
          
  
            <div className="nom">
            <label className="label">Released: </label>
            <input className="input"
            onChange={e=>handleChange(e)}
            type='date'
            value={input.released}
            name='released'
            />
            </div>
            <div className="nom">
            <label className="label">Background_image: </label>
            <input className="input"
            onChange={e=>handleChange(e)}
            type='text'
            value={input.background_image}
            name='background_image'
            placeholder='Image URL '
            />
            </div>
            <br/>
            <div className="nom">
              <label className="label">Genres:</label>
              <select className="input" onChange={e=>handleSelect(e)}>
                <option >select...</option>
              {genres.map((g,i)=>{
                return(<option key={i} value={g.name}>{g.name}</option>
              )})}
              </select> 
            <span>{error?.genres ||''}</span>
  
            </div>
            <br/>
            <div className="nom">
            <label className="label">platform:</label>
              <select className="input" onChange={e=>handleSelectP(e)}>
              <option hidden>select...</option>
            {platformss.map((p,i)=>{
              return(
                
                <option
                key={i}
                value={p}
                name='platform'
                >{p}</option>
                
                )
              })}
              </select>
            <span>{error?.platform ||''}</span>
  
            </div>
  
              <div className="nom">
                <button className="btn" type='submit' disabled={button}>Crea tu Videojuego</button>
              </div>
            
        </form>
              <div className="nom">
            <br/>
                <span>Genres selected:</span>
                  {input.genres.map((g,i)=>{
                    return (<div key={i} className="igual">
                      <div>
                      <p>{g}</p>
                      <button onClick={()=>handleDeleteGenre(g)}>x</button>
                      </div>
                    </div>
                    )
                  })}
              </div>
              <br/>
              <div className="nom">
                <span>platform selected:</span>
  
                {input.platform.map((p,i)=>{
                  return (<div key={i} className="igual">
                    <div className="all">
                      <button onClick={()=>handleDeletePlat(p)}>x</button>
                      <p>{p}</p>
                    </div>
                  </div>)
                })}
              </div>
          </div>
        </div>
    )
  }