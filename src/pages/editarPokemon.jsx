import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import NavBar from "../components/navBar";
import { useState, useEffect } from "react";
import PokemonService from "../services/pokemon.service";
import PokeApi from "../services/poke-api.service";
import { useParams } from "react-router-dom";
import BtnDelete from "../components/btnDelete";
import Tipos from "../data/tipos";
import Pokemons from "../data/pokemons";
import "./editarPokemon.css";

export default function editarPokemon() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const pokemonService = new PokemonService();
  const pokeApi = new PokeApi();

  useEffect(() => {
    const result = pokemonService.search(id);
    setPokemon(result);
    setNome(pokemon.nome);
    setTipo(pokemon.tipo);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const nomePokemon = nome.toLowerCase();
      const pokemonId = await pokeApi.getPokemon(nomePokemon);

      const result = pokemonService.put(id, nome, tipo, pokemonId.id);
      console.log(result);
      
      setClicked(true);
      setTimeout(() => {
        window.location.href = "/crud-pokemon-front";
      }, 1000);
    } catch (error) {
      console.error("Ocorreu um erro ao criar o Pokémon:", error);
    }
  }

  return (
    <>
      <NavBar />
      <main className="containerPrincipal">
        <div className="pt-2 bloco">
          <h1>Altere o(a) {pokemon.nome}</h1>
        </div>
        <div className="input_Edit">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome do Pokemon</Form.Label>
              <Form.Select
                defaultValue={nome}
                required
                className="bg-light"
                aria-label="Default select example"
                onChange={(e) => setNome(e.target.value)}
              >
                <option value={""}>Escolha o Pokemon</option>
                {Pokemons.map((pokemon) => {
                  return (
                    <option key={pokemon} value={pokemon}>
                      {pokemon}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Label>Tipo do Pokemon</Form.Label>
            <Form.Select
              defaultValue={tipo}
              required
              className="bg-light"
              aria-label="Default select example"
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value={""}>Selecione o tipo</option>
              {Tipos.map((tipo) => {
                return (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                );
              })}
            </Form.Select>

            <Button className="m-3" variant="danger" type="button" href="/crud-pokemon-front">
              Cancelar
            </Button>
            <Button className="m-3" variant="primary" type="submit">
              Editar Pokemon
            </Button>
            {clicked && (
              <Alert key="success" variant="success">
                Pokemon editado com sucesso.
              </Alert>
            )}
          </Form>
        </div>

        <div className="exibindo_Pókemon pt-3 bloco">
          <h4 className="text-center">Nome</h4>
          <p className="text-center">{pokemon.nome}</p>
          <hr />

          <h4 className="text-center">Tipo</h4>
          <p className="text-center">{pokemon.tipo}</p>
          <hr />

          <h4 className="text-center">Imagem</h4>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`}
            style={{ width: "100px", display: "block" }}
            alt=""
          />
          <hr />
          <div className="d-flex justify-content-center">
            <BtnDelete id={`${pokemon.pokedex}`} nome={`${pokemon.nome}`} />
          </div>
        </div>
      </main>
    </>
  );
}
