import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { ModalContext } from '../../contexts/modalContext';
import { TemplateContext } from '../../contexts/templateContext';

import Template1 from '../../images/Phone.png';
import Template2 from '../../images/Phone1.png';
import Template3 from '../../images/Phone2.png';
import Template4 from '../../images/Phone3.png';

function ModalTemplate(props) {
    const [state, dispatch] = useContext(ModalContext);
    const [template, setTemplate] = useContext(TemplateContext);

    const changeTemplate = (id) => {
        setTemplate({
            type: "SET_NEW_TEMPLATE",
            payload: {
                templateId: id
            }
        });

        props.changeTemplate({
            ...props.setTemplate,
            templateId: id
        });

        dispatch({
            type: "CLOSE_TEMPLATE"
        })
    }

    return (
        <Modal
            show={state.showedTemplate}
            onHide={
                () => dispatch({ type: "CLOSE_TEMPLATE" })
            }
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Modal.Title id="contained-modal-title-vcenter" className="mb-4" style={{ color: "#000", fontFamily: "'Abhaya Libre'", fontWeight: "900", fontSize: 36, letterSpacing: 2 }}>
                    Change Template
                </Modal.Title>
                <div className="d-flex flex-wrap p-3">
                    <div className="template-1">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => changeTemplate(1)} >
                            <img
                                src={Template1}
                                alt="Template 1"
                            />
                        </button>
                    </div>
                    <div className="template-2">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => changeTemplate(2)} >
                            <img
                                src={Template2}
                                alt="Template 2"
                            />
                        </button>
                    </div>
                    <div className="template-3">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => changeTemplate(3)} >
                            <img
                                src={Template3}
                                alt="Template 3"
                            />
                        </button>
                    </div>
                    <div className="template-4">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => changeTemplate(4)} >
                            <img
                                src={Template4}
                                alt="Template 4"
                            />
                        </button>
                    </div>
                </div>
                <div className="change-template-action w-100 d-flex justify-content-end">
                    <button type="button" className="btn btn-dark" style={{ background: "#FF0000", border: "none", marginRight: 15 }} onClick ={() => dispatch({type: "CLOSE_TEMPLATE"})}>Close</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalTemplate;