import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';

import { APIURL, setAuthToken } from '../../api/integration';

import { ModalContext } from '../../contexts/modalContext';
import { UserContext } from '../../contexts/userContext';

function ModalRegister() {
    const [state, dispatch] = useContext(ModalContext);
    const [stateUser, dispatchUser] = useContext(UserContext);

    const history = useHistory();

    const changeToLogin = () => {
        dispatch({ type: "CHANGE_TO_LOGIN" });
    }

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        fullname: ''
    });

    const handleFormRegisterChange = event => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const closeModal = () => dispatch({ type: "CLOSE_REGISTER" });

    const handleRegisterSubmit = (res) => {
        console.log(res);
        dispatchUser({
            type: "REGISTER",
            payload: res.data.data
        })

        closeModal();

        setAuthToken(res.data.data.user.token);

        swal("Your Registration Success", "success", {
            buttons: {
                confirm: {text: "OK", className: "sweet-yellow"}
            }
        }).then(() => history.push("/template"));
    }

    const userRegister = useMutation("userRegister", async () => {
        const header = {
            headers: {
            "Content-Type": "application/json",
            },
        };
    
        const body = JSON.stringify({
            email : formValues.email,
            password: formValues.password,
            fullname: formValues.fullname
        });

        const response = await APIURL.post("/register", body, header);

        handleRegisterSubmit(response)
    });

    return (
        <Modal
            show={state.showedRegister}
            onHide={
                () => dispatch({ type: "CLOSE_REGISTER" })
            }
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Modal.Title id="contained-modal-title-vcenter" className="mb-4" style={{ color: "#000", fontFamily: "'Abhaya Libre'", fontWeight: "900", fontSize: 36, letterSpacing: 2 }}>
                    Register
                </Modal.Title>
                {userRegister.isError && <p className="text-danger mb-2">{ userRegister.error?.response?.data?.message }</p> }
                <Form>
                    <Form.Group controlId="emailLogin">
                        <Form.Control className="auth" type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleFormRegisterChange} />
                    </Form.Group>
                    <Form.Group controlId="passwordLogin">
                        <Form.Control className="auth" type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleFormRegisterChange} />
                    </Form.Group>
                    <Form.Group controlId="fullname">
                        <Form.Control className="auth" type="text" name="fullname" placeholder="Full Name" value={formValues.fullname} onChange={handleFormRegisterChange} />
                    </Form.Group>
                    
                    <Button
                    variant="dark"
                    onClick={() => userRegister.mutate()}
                    style={{ width: "100%", marginTop: 20, backgroundColor: "#FF9F00", border: "none" }}
                    {...userRegister.isLoading ? "disabled" : null}>
                    {userRegister.isLoading ? "Wait.." : "Register"}
                    </Button>
                </Form>
                <p style={{ color: "#B1B1B1", fontFamily: "'Nunito Sans'", textAlign: "center", marginTop: 10, marginBottom: 0 }}>Already Have an Account ? <span style={{ fontWeight: "Bolder", cursor: "pointer" }} onClick={changeToLogin}>Login</span></p>
            </Modal.Body>
        </Modal>
    );
}

export default ModalRegister;