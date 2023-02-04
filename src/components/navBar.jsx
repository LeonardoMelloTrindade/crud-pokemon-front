import React from 'react'
import Nav from 'react-bootstrap/Nav';

export default function NavBar() {
    return (
        <div className='d-flex align-items-start'>

            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Item>
                    <Nav.Link href='/'>
                       Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" href='/createPokemon'>
                        Criar Pokemon
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" href='/showPokemon'>
                        Ver Pokemons
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
