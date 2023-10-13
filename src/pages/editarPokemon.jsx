import React from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import NavBar from "../components/navBar";
import { useState, useEffect } from "react";
import PokemonService from "../services/pokemon.service";
import PokeApi from "../services/poke-api.service";
import { useParams } from "react-router-dom";
import BtnDelete from "../components/btnDelete";
import Tipos from "../data/tipos";
import Pokemons from "../data/pokemons";
import { Link } from "react-router-dom";
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
        window.location.href = "/crudPokemonFront";
      }, 1000);
    } catch (error) {
      console.error("Ocorreu um erro ao criar o Pokémon:", error);
    }
  }

  return (
    <>
      <NavBar />
      <main className="containerPrincipal">
        <div className="mt-3-2 bloco">
          <h1 className="titulo">Altere o(a) {pokemon.nome}</h1>
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

            <Link to={"/crudPokemonFront"}>
              <Button className="btn-margin" variant="danger" type="button">
                Cancelar
              </Button>
            </Link>
            <Button className="btn-margin" variant="success" type="submit">
              Editar Pokemon
            </Button>
            {clicked && (
              <Alert key="success" variant="success">
                Pokemon editado com sucesso.
              </Alert>
            )}
          </Form>
        </div>

        <Card className="box-info-pokemon">
          <Card.Img
            variant="top"
            alt="Imagem do Pokemon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`}
          />
          <Card.Body>
            <Card.Title>{pokemon.nome}</Card.Title>
            <Card.Text>
              Tipo do {pokemon.nome}: {pokemon.tipo}
              <hr />
              <div className="d-flex justify-content-center" >
                <BtnDelete id={`${pokemon.pokedex}`} nome={`${pokemon.nome}`} />
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </main>
    </>
  );
}
