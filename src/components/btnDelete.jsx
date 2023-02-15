import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import PokemonService from '../services/pokemon.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function btnDelete(props) {

    const id = props.param1;
    const [show, setShow] = useState(false);
    const pokemonService = new PokemonService();
    const notify = () => toast.error("Pokemon Deletado!");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deletarPokemon = async () => {
        const result = await pokemonService.delete(id);
        console.log(result);
        setShow(false);
        notify();
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
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </>
    );
}