export default class PokemonService {
  post(pokedex, nome, tipo) {
    const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];

    const newPokemon = {
      pokedex: pokedex,
      nome: nome,
      tipo: tipo
    };

    pokemons.push(newPokemon);
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
    return newPokemon;
  }

  put(pokedex, nome, tipo, novoPokedex) {
    const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    console.log(pokedex)
    const index = pokemons.findIndex((pokemon) => pokemon.pokedex == pokedex);
    console.log(index)

    if (index !== -1) {
      pokemons[index].nome = nome;
      pokemons[index].tipo = tipo;
      pokemons[index].pokedex = novoPokedex;

      localStorage.setItem('pokemons', JSON.stringify(pokemons));

      return pokemons[index];
    }

    return null; 
  }

  get() {
    return JSON.parse(localStorage.getItem('pokemons')) || [];
  }

  delete(pokedex) {
    const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    const index = pokemons.findIndex((pokemon) => pokemon.pokedex == pokedex);

    if (index !== -1) {
      pokemons.splice(index, 1);
      localStorage.removeItem('pokemons');
      localStorage.setItem('pokemons', JSON.stringify(pokemons));
  
      return true;
    }
  
    return false; 
  }
  
  

  search(pokedex) {
    const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    const foundPokemon = pokemons.find((pokemon) => pokemon.pokedex == pokedex);
    return foundPokemon || null;
  }
}


