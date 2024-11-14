import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextapi/AuthContext';

function Header() {

    const nav = useNavigate();
    const {setLogStatus} = useContext(logContext)

    const handleLogout = async () => {
        sessionStorage.clear()
        toast.info("Logout Successfull!!")
        setLogStatus(false)
        nav('/auth')
    }

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="fa-solid fa-diagram-project fa-xl" style={{ color: "#0a0a0a", }} />
                        {' '}
                        Project Fair
                    </Navbar.Brand>
                    <button className="btn btn-danger" style={{ color: "red" }} onClick={handleLogout}>Logout</button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header