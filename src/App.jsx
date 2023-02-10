import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import React from 'react'
import CriarPokemon from './pages/criarPokemon';
import ListarPokemons from './pages/listarPokemons'
import EditarPokemon from './pages/editarPokemon'
import Menu from './pages/index'

function App() {


  return (
    <div>

      <Router>

        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/createPokemon' element={<CriarPokemon />} />
          <Route path='/showPokemon' element={<ListarPokemons />} /> 
          <Route path='/editPokemon/:id' element={<EditarPokemon/>}/>
        </Routes>

      </Router>

    </div>
  )
}
export default App;