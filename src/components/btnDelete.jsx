import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import PokemonService from '../services/pokemon.service';

export default function btnDelete(props) {

    const id = props.param1;
    const [show, setShow] = useState(false);
    const [clicked, setClicked] = useState(false);
    const pokemonService = new PokemonService();
    const [deletado, setDeletado] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deletarPokemon = async () => {
        const result = await pokemonService.delete(id);
        console.log(result);
        setShow(false);
        setDeletado(true);
    };

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                <BsTrash />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletando {props.param2}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que vai excluir esse Pokemon?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-warning" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deletarPokemon}>
                        Deletar
                    </Button>
                    {/*clicked && <Alert key="danger" variant="danger">Pokemon deletado com sucesso.</Alert>*/}
                </Modal.Footer>
            </Modal>

            <Modal
                size="sm"
                show={deletado}
                onHide={() => setDeletado(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Pokemon Deletado
                    </Modal.Title>
                </Modal.Header>
                {/*<Modal.Body>...</Modal.Body>*/}
            </Modal>
        </>
    );
}