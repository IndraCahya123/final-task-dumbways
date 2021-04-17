import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import { APIURL } from '../api/integration';

import TopPage from '../components/macro/TopPage';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';

function TemplatePreview() {
    const { templateId, uniqueLink } = useParams();

    const history = useHistory();

    const linkApi = `/brand/${templateId}/${uniqueLink}`

    //get brand
    const {
        data: brands,
        isFetching: load
    } = useQuery("getBrandCache", async () => {
        const res = await APIURL.get(linkApi);
        return res.data.data.link
    })

    const changeBg = (templateId) => {
        switch (templateId) {
            case "1":
                return {
                    background: "#fff",
                    height: "calc(100vh - 64px)"
                }
            case "2":
                return {
                    background: "#B4D2DB",
                    height: "calc(100vh - 64px)"
                }
        
            default:
                break;
        }
    }

    const getTemplate = (templateId) => {
        switch (templateId) {
            case "1":
                return (
                    <>
                        {load ? "loading.." : <Template1 brand={brands} />}
                    </>
                );
            case "2":
                return (
                    <>
                        {load ? "loading.." : <Template2 brand={brands} />}
                    </>
                );
        
            default:
                break;
        }
    }

    return (
        <div style={{ width: "100%", position: 'relative' }}>
            <TopPage menu="Preview Template" />
            <div className="d-flex w-100 justify-content-center align-items-center" style={changeBg(templateId)}>
                {getTemplate(templateId)}
            </div>
            <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
                <button type="button" className="btn btn-dark" style={{ background: "#FF9F00", border: "none" }} onClick={() => history.push("/my-link")}>Go Back</button>
            </div>
        </div>
    )
}

export default TemplatePreview
