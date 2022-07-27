import './App.css';
import { Route, BrowserRouter,Routes } from 'react-router-dom';
import Landing from './components/Components/landing/landing';
import Home from './components/Components/Home/home';
// import { Details } from './components/Components/details.jsx/details';
import { Detail } from './components/Components/details/detail';
import { Creator } from './components/Components/videogamesC/videogameC';



function App() {
  return (<>
  <BrowserRouter>
    {/* <div className='App'> */}
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/videogame/:id' element={<Detail/>}/>
        <Route path='/videogames' element={<Creator/>} />
      </Routes>
    {/* </div> */}
  </BrowserRouter>
</>);
}

export default App;

    // <div className="App">
      
    //   <h1>Henry Videogames</h1>
    // </div>