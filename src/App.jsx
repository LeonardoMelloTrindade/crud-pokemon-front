import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import React from 'react'
import CreatePokemon from './pages/criarPokemon';
import ShowPokemon from './pages/listarPokemons'
import Menu from './pages/index'

function App() {


  return (
    <div>

      <Router>

        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/createPokemon' element={<CreatePokemon />} />
          <Route path='/showPokemon' element={<ShowPokemon />} /> 
        </Routes>

      </Router>

    </div>
  )
}
export default App;