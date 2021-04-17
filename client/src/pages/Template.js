import { useState, useContext } from 'react';

import { TemplateContext } from '../contexts/templateContext';

import TopPage from '../components/macro/TopPage';

import CreateLink from '../components/macro/CreateLink';

import Template1 from '../images/Phone.png';
import Template2 from '../images/Phone1.png';
import Template3 from '../images/Phone2.png';
import Template4 from '../images/Phone3.png';

function Template() {
    const [addLinkState, setAddlinkState] = useContext(TemplateContext);

    return (
        <div style={{ width: "100%" }}>
            <TopPage menu="Template" />
            {!addLinkState.addLinkState ? 
                <div className="d-flex flex-wrap p-3" style={{
                    background: "#E5E5E5",
                    overflow: "auto",
                    height: "calc(100vh - 64px)",
                    margin: "0 auto",
                }}>
                    <div className="template-1">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => {
                            setAddlinkState({
                                type: "ADD_LINK",
                                payload: {
                                    templateId: 1
                                }
                            })
                        }}>
                            <img
                                src={Template1}
                                alt="Template 1"
                            />
                        </button>
                    </div>
                    <div className="template-2">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => {
                            setAddlinkState({
                                type: "ADD_LINK",
                                payload: {
                                    templateId: 2
                                }
                            })
                        }}>
                            <img
                                src={Template2}
                                alt="Template 2"
                            />
                        </button>
                    </div>
                    <div className="template-3">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => {
                            setAddlinkState({
                                type: "ADD_LINK",
                                payload: {
                                    templateId: 3
                                }
                            })
                        }}>
                            <img
                                src={Template3}
                                alt="Template 3"
                            />
                        </button>
                    </div>
                    <div className="template-4">
                        <button type="button" className="btn btn-dark p-0" style={{ background: "none", border: "none" }} onClick={() => {
                            setAddlinkState({
                                type: "ADD_LINK",
                                payload: {
                                    templateId: 4
                                }
                            })
                        }}>
                            <img
                                src={Template4}
                                alt="Template 4"
                            />
                        </button>
                    </div>
                </div>
                :
                <CreateLink template={addLinkState.templateId} changeTemplate={setAddlinkState} />
            }
        </div>
    )
}

export default Template
