import Api from "./poke-api";

export default class PokeApi {

  async getPokemon(nome) {
    try {
      const response = await Api.get(`${nome}`,)
      return response.data;
    } catch (error) {
      console.error("Ocorreu um erro ao obter os jogos:", error);
      throw error;
    }
  }

}