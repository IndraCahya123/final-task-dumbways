import { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';

import { ModalContext } from '../../contexts/modalContext';
import { UserContext } from '../../contexts/userContext';
import { MenuContext } from '../../contexts/menuContext';

import ModalLogin from '../modal/ModalLogin';
import ModalRegister from '../modal/ModalRegister';

import Brand from '../../images/Frame.png';
import BrokenLink from '../../images/broken-link.png';
import Profile from '../../images/profile.png';
import Template from '../../images/template.png';
import Logout from '../../images/logout.png';

function MyNavbar() {
    const [stateModalLogin, dispatch] = useContext(ModalContext);
    const [stateUser, userLogout] = useContext(UserContext);

    const history = useHistory();

    return (
        <>
            {stateUser.loginStatus ? 
                <Navbar 
                    style={{
                        width: 330,
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                <Navbar.Brand>
                    <img
                        src={Brand}
                        alt="Brand"
                    />
                </Navbar.Brand>
                <Nav style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 50
                }}>
                    <Nav.Link as={Link} to="/template" className="d-flex align-items-center" style={{ marginBottom: 20 }}>
                        <img 
                            src={Template}
                            alt="link icon"
                        />
                        <span style={{ 
                            marginLeft: 15,
                            fontFamily: "'Nunito Sans'",
                            fontSize: 18,
                            fontWeight: "bolder"
                        }}>Template</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile" className="d-flex align-items-center" style={{ marginBottom: 20 }}>
                        <img 
                            src={Profile}
                            alt="link icon"
                        />
                        <span style={{ 
                            marginLeft: 15,
                            fontFamily: "'Nunito Sans'",
                            fontSize: 18,
                            fontWeight: "bolder"
                        }}>Profile</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/my-link" className="d-flex align-items-center" style={{ marginBottom: 20 }}>
                        <img 
                            src={BrokenLink}
                            alt="link icon"
                        />
                        <span style={{ 
                            marginLeft: 15,
                            fontFamily: "'Nunito Sans'",
                            fontSize: 18,
                            fontWeight: "bolder"
                        }}>My Link</span>
                    </Nav.Link>
                    </Nav>
                    <Nav style={{ position: "absolute", bottom: 30 }}>
                        <Nav.Link onClick={() => {
                            userLogout({ type: "LOGOUT" });
                            history.push("/")
                        }} className="d-flex align-items-center">
                            <img 
                                src={Logout}
                                alt="link icon"
                            />
                            <span style={{ 
                                marginLeft: 15,
                                fontFamily: "'Nunito Sans'",
                                fontSize: 18,
                                fontWeight: "bolder"
                            }}>Logout</span>
                        </Nav.Link>
                    </Nav>
            </Navbar>
                :
            <Navbar className="d-flex justify-content-between" style={{
                backgroundColor: "#E5E5E5",
                width: "100%",
                height: "64px",
                padding: "0 70px"
            }}>
                <Navbar.Brand>
                    <img
                        src={Brand}
                        alt="Brand"
                    />
                </Navbar.Brand>
                <Form Inline>
                    <button type="button" className="btn btn-dark" style={{ padding: "5px 15px", marginRight: 10, background: "none", border: "none", color: "#000", fontWeight: "bolder" }}
                        onClick={() => dispatch({type: "SHOW_LOGIN"}) }
                        >Login</button>
                    <button type="button" className="btn btn-dark" style={{ padding: "5px 15px", backgroundColor: "#FF9F00", border: "none", fontWeight: "bold" }} 
                        onClick={() => dispatch({type: "SHOW_REGISTER"})}
                    >Register</button>
                    <ModalLogin />
                    <ModalRegister />
                </Form>
            </Navbar>
}
        </>
    )
}

export default MyNavbar
