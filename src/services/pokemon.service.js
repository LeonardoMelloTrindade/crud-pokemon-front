import axios from 'axios';

export default class PokemonService {
  async create(nome, tipo, num) {
    return axios.post('http://localhost:3000/pokemon', {
      nome: nome,
      tipo: tipo,
      pokedex: num
    });
  }

  async edit(id, nome, tipo, num) {
    return axios.put(`http://localhost:3000/pokemon/${id}`, {
      nome: nome,
      tipo: tipo,
      pokedex: num
    });
  }

  async listar() {
    return axios.get(`http://localhost:3000/pokemon`);
  }

  async delete(id) {
    return axios.delete(`http://localhost:3000/pokemon/${id}`);
  }
}

