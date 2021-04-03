import { useState } from 'react';

import TopPage from '../components/macro/TopPage';

import CreateLink from '../components/macro/CreateLink';

import Template1 from '../images/Phone.png';

function Template() {
    const [component, changeComponent] = useState({
        addLink: false,
        template: 0,
    })

    const changeToAddLink = (templateId) => {
        changeComponent({
            addLink: true,
            template: templateId
        });
    }

    return (
        <div style={{ width: "100%" }}>
            <TopPage menu="Template" />
            {!component.addLink ? 
                <div className="d-flex flex-wrap h-100 p-3" style={{
                    background: "#E5E5E5"
                }}>
                    <div className="template-1">
                        <button type="button" className="btn" onClick={() => changeToAddLink(1)}>
                            <img
                                src={Template1}
                                alt="Template 1"
                            />
                        </button>
                    </div>
                </div>
                :
                <CreateLink template={component.template} dispatch={changeComponent} />
            }
        </div>
    )
}

export default Template
