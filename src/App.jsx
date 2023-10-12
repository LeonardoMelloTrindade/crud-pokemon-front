import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import CriarPokemon from './pages/criarPokemon';
import ListarPokemons from './pages/listarPokemons';
import EditarPokemon from './pages/editarPokemon';

function App() {


  return (

      <Router>
 
        <Routes>
          <Route path='/crud-pokemon-front' element={<ListarPokemons />} />
          <Route path='/crud-pokemon-front/createPokemon' element={<CriarPokemon />} />
          <Route path='/crud-pokemon-front/editPokemon/:id' element={<EditarPokemon/>}/>
        </Routes>

      </Router>
      
  )
}
export default App;