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
          <Route path='/' element={<ListarPokemons />} />
          <Route path='/createPokemon' element={<CriarPokemon />} />
          <Route path='/editPokemon/:id' element={<EditarPokemon/>}/>
        </Routes>

      </Router>
      
  )
}
export default App;