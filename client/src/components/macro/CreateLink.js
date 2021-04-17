import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Col } from "react-bootstrap";
import { useMutation } from 'react-query';
import swal from 'sweetalert';
import uniqueString from 'unique-string';

import { ModalContext } from '../../contexts/modalContext';
import { TemplateContext } from '../../contexts/templateContext';

import { APIURL } from '../../api/integration';

import FileButtonLink from '../micro/FileButtonLink';
import FileButtonBrand from '../micro/FileButtonBrand';
import ModalTemplate from '../modal/ModalTemplate';

import Template1 from '../../images/Phone.png';
import Template2 from '../../images/Phone1.png';
import Template3 from '../../images/Phone2.png';
import Template4 from '../../images/Phone3.png';
import DefaultImage from '../../images/defaultImg.png';

function CreateLink(props) {
    const history = useHistory();

    const [modalTemplate, setModalTemplate] = useContext(ModalContext);
    const [setTemplate, changeTemplate] = useContext(TemplateContext);

    const [form, setForm] = useState({
        titleDetail: "",
        description: "",
        imageBrand: null,
        templateId: setTemplate.templateId,
        links: []
    });
console.log(form.templateId);
    const { titleDetail, description, imageBrand, links } = form;

    const templatePreview = (id) => {
        switch (id) {
            case 1:
                return (
                    <>
                        <button type="button" className="btn btn-dark" style={{ background: "none", border: "none" }} onClick={() => setModalTemplate({type: "SHOW_TEMPLATE"})} >
                            <img
                                src={Template1}
                                alt="Template 1"
                            />
                        </button>
                    </>
                );
            case 2:
                return (
                    <>
                        <button type="button" className="btn btn-dark" style={{ background: "none", border: "none" }} onClick={() => setModalTemplate({type: "SHOW_TEMPLATE"})} >
                            <img
                                src={Template2}
                                alt="Template 2"
                            />
                        </button>
                    </>
                );
            case 3:
                return (
                    <>
                        <button type="button" className="btn btn-dark" style={{ background: "none", border: "none" }} onClick={() => setModalTemplate({type: "SHOW_TEMPLATE"})} >
                            <img
                                src={Template3}
                                alt="Template 3"
                            />
                        </button>
                    </>
                );
            case 4:
                return (
                    <>
                        <button type="button" className="btn btn-dark" style={{ background: "none", border: "none" }} onClick={() => setModalTemplate({type: "SHOW_TEMPLATE"})} >
                            <img
                                src={Template4}
                                alt="Template 4"
                            />
                        </button>
                    </>
                );
        
            default:
                break;
        }
    } 

    const [link, setLink] = useState({
        titleLink: "",
        url: "",
        imageLink: null,
    });

    const [imgLinkPreview, setImageLinkPreview] = useState({
        preview: DefaultImage,
    })

    const [imgBrandPreview, setImageBrandPreview] = useState({
        preview: DefaultImage,
    })

    const { titleLink, url, imageLink } = link;

    const onChangeDetail = (e) => {
        const tempForm = { ...form };
        tempForm[e.target.name] =
            e.target.type === "file" ? e.target.files[0] : e.target.value;
        setForm(tempForm);
    }

    const onChangeLink = (e) => {
        const tempForm = { ...link };
        tempForm[e.target.name] =
            e.target.type === "file" ? e.target.files[0] : e.target.value;
        setLink(tempForm);
    }

    const onChangeImgLinkPreview = (e) => {
        const file = e.target.files[0]

        setImageLinkPreview({
            preview: URL.createObjectURL(file),
        })
    }

    const onChangeImgBrandPreview = (e) => {
        const file = e.target.files[0]

        setImageBrandPreview({
            preview: URL.createObjectURL(file),
        })
    }

    const addLink = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            links: [
                ...form.links,
                {
                    ...link
                },
            ]
        });
        setLink({
            titleLink: "",
            url: "",
            image: null
        })
        setImageLinkPreview({
            preview: null
        })
    }
    
    const addDetailLink = useMutation(async () => {
        const body = new FormData();
        const uniqueLink = uniqueString();
    
        const config = {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        };

        body.append("title", form.titleDetail);
        body.append("description", form.description);
        body.append("image", form.imageBrand);
        body.append("templateId", form.templateId);
        body.append("unique", uniqueLink)

        const addUniqueLink = form.links.map(link => {
            return {
                ...link,
                uniqueKeyLink: uniqueLink,
            }
        });
    
        await APIURL.post("/brand", body, config);

        for (let i = 0; i < addUniqueLink.length; i++) {
            addLinks.mutate(addUniqueLink[i])
        }
        
    });

    const addLinks = useMutation(async (links) => {
        const body = new FormData();
        
        const config = {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        };

        body.append("uniqueKeyLink", links.uniqueKeyLink);
        body.append("title", links.titleLink);
        body.append("url", links.url);
        body.append("image", links.imageLink);

        await APIURL.post("/links", body, config);

        successAddLink();
    });

    const successAddLink = () => {
        if (addLinks.isError) {
            swal("There's error", "error", "warning", {
                buttons: {
                    OK: {
                        text: "OK",
                        className: "sweet-danger"
                    }
                }
            })
        } else {
            swal("Success", "Your link added successfully", "success", {
                buttons: {
                    OK: {
                        text: "OK",
                        className: "sweet-yellow"
                    }
                }
            }).then(() => {
                setForm({
                    titleDetail: "",
                    description: "",
                    image: null,
                    templateId: 0,
                    links: []
                });
                history.push("/my-link")
            })
        }
    }

    return (
        <div className="d-flex flex-column" style={{
            background: "#E5E5E5",
            height: "calc(100vh - 64px)",
            position: 'relative',
            padding: "20px 40px 20px 70px"
        }}>
            <div className="top d-flex justify-content-between align-items-center" style={{ marginBottom: 50 }}>
                <span style={{ fontFamily: "'Times New Roman'", fontWeight: "bold", fontSize: 30 }}>Create Link</span>
                <div>
                    {titleDetail == "" || description == "" || imageBrand == null || links.lenght < 2 ?
                        <button type="button" className="btn btn-dark" style={{ backgroundColor: "#FF9F00", border: "none", marginRight: 20 }} disabled>Publish Link</button>
                        :
                        <button type="button" className="btn btn-dark" style={{ backgroundColor: "#FF9F00", border: "none", marginRight: 20 }} onClick={() => addDetailLink.mutate()}>Publish Link</button>
                    }
                    <button type="button" className="btn btn-dark" style={{ background: "#FF9F00", border: "none" }} onClick={() => changeTemplate({type: "MAIN_ROUTE"})}>Go Back</button>
                </div>
            </div>
            <div className="content d-flex justify-content-between">
                <div className="form-addLink d-flex flex-column" style={{ height: 450, overflow: "auto", background: "#fff", padding: 20, borderRadius: 10}}>
                    <Form encType="multipart/form-data">
                        <Form.Row>
                            <Col className="d-flex align-items-center" style={{ marginBottom: 15 }}>
                                {
                                    imgBrandPreview.preview == null ? <span style={{ marginRight: 20, textAlign: "center" }}>Image <br /> Preview</span> :
                                
                                        <img
                                            src={imgBrandPreview.preview}
                                            alt="Link Image Preview"
                                            width="50px"
                                            height="50px"
                                            style={{ marginRight: 15 }}
                                        />
                                }
                                <FileButtonBrand onChangeBrand={onChangeDetail} previewBrand={onChangeImgBrandPreview}/>
                            </Col>
                        </Form.Row>
                        <Form.Row className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={form.titleDetail} name="titleDetail" onChange={ (e) => onChangeDetail(e) }  />
                        </Form.Row>
                        <Form.Row className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={form.description} name="description" onChange={ (e) => onChangeDetail(e) }  />
                        </Form.Row>
                        <Form.Row className="mb-3">
                                {form.links.length == 0 ? <p className="text-danger">Please add min. 2 links</p> : form.links.map((item, index) => {
                                    return (
                                        <>
                                            <div className="d-flex w-100 p-2 mb-2" style={{ borderRadius: 5, backgroundColor: "#E5E5E5" }}>
                                                <div style={{ marginTop: 3 }}>
                                                    <span>{ index + 1 }. &nbsp;</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span style={{ fontFamily: "'Times New Roman'", fontSize: 20, marginBottom: 5 }}>{ item.titleLink }</span>
                                                    <span>{item.url}</span>
                                                    <span>{item.imageLink?.name}</span>
                                                </div>
                                            </div>
                                        </>
                                    );
                            })}
                        </Form.Row>
                    </Form>
                    <div style={{ position: 'relative', background: "#E5E5E5", borderRadius: 5, padding: "5px 10px" }}>
                        {titleLink == "" || url == "" || imageLink == null ? 
                            <button type="button" className="btn btn-dark" style={{ position: 'absolute', right: 0, color: "#FF9F00", background: "none", border: "none", fontWeight: 'bolder' }} onClick={(e) => addLink(e)} disabled> &#x2B; Add link</button> 
                            :
                            <button type="button" className="btn btn-dark" style={{ position: 'absolute', right: 0, color: "#FF9F00", background: "none", border: "none", fontWeight: 'bolder' }} onClick={(e) => addLink(e)} > &#x2B; Add link</button>
                        }
                        
                        <Form encType="multipart/form-data" style={{ marginTop: 40 }}>
                            <Form.Row className="mb-2">
                                <Col>
                                    <Form.Label>Title Link</Form.Label>
                                    <Form.Control value={link.titleLink} name="titleLink" onChange={ (e) => onChangeLink(e) }  />
                                </Col>
                                <Col>
                                    <Form.Label>Url Link</Form.Label>
                                    <Form.Control value={link.url} name="url" onChange={ (e) => onChangeLink(e) }  />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col className="d-flex align-items-center justify-content-end" style={{ marginTop: 15 }}>
                                    {
                                        imgLinkPreview.preview == null ? <span style={{ marginRight: 20, textAlign: "center" }}>Image <br /> Preview</span> :
                                    
                                            <img
                                                src={imgLinkPreview.preview}
                                                alt="Link Image Preview"
                                                width="50px"
                                                height="50px"
                                                style={{ marginRight: 15 }}
                                            />
                                    }
                                    <FileButtonLink onChangeLink={onChangeLink} previewLink={onChangeImgLinkPreview} />
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
                <div className="template-preview" style={{ marginRight: 120 }}>
                    {templatePreview(form.templateId)}
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
                
            </div>
            <ModalTemplate changeTemplate={setForm} setTemplate={form} />
        </div>
    )
}

export default CreateLink
