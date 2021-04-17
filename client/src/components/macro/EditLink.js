import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap';
import swal from 'sweetalert';

import { APIURL } from '../../api/integration';

import { TemplateContext } from '../../contexts/templateContext';
import { ModalContext } from '../../contexts/modalContext';

import FileButtonBrand from '../micro/FileButtonBrand';
import FileLinkEdit from '../micro/FileLinkEdit';
import ModalTemplate from '../modal/ModalTemplate';

import Template1 from '../../images/Phone.png';
import Template2 from '../../images/Phone1.png';
import Template3 from '../../images/Phone2.png';
import Template4 from '../../images/Phone3.png';
import Trash from '../../images/trash.png';

function EditLink(props) {
    const history = useHistory();

    const [modalTemplate, setModalTemplate] = useContext(ModalContext);

    //get edited link from context
    const [getLink, changeLink] = useContext(TemplateContext);
    const selectedLink = getLink.editedLink;
    const brandId = selectedLink.id;

    //brand form
    const [brandForm, setBrandForm] = useState({
        titleBrand: "",
        description: "",
        imageBrand: null,
        templateId: selectedLink.templateId,
        links: []
    });

    const {
        data: brand,
        isFetching: load,
        refetch
    } = useQuery("getBrandToEditCache", async () => {
        const res = await APIURL.get(`brand/${selectedLink.id}`);

        setBrandForm({
            ...brandForm,
            titleBrand: res.data.data.link.title,
            description: res.data.data.link.description,
            imageBrand: res.data.data.link.image,
            links: res.data.data.link.links
        })
    })

    const onChangeDetail = (e) => {
        const tempForm = { ...brandForm };
        tempForm[e.target.name] =
            e.target.type === "file" ? e.target.files[0] : e.target.value;
        setBrandForm(tempForm);
    }

    const [imgBrandPreview, setImageBrandPreview] = useState({
        preview: selectedLink.image,
    })

    const onChangeImgBrandPreview = (e) => {
        const file = e.target.files[0]

        setImageBrandPreview({
            preview: URL.createObjectURL(file),
        })
    }

    const handleLinkChange = (e) => {
        const index = parseInt(e.target.dataset.index);
        const length = brandForm.links.length;
        setBrandForm({
            ...brandForm,
            links: [
                ...brandForm.links.slice(0, index),
                {
                ...brandForm.links[index],
                [e.target.name]:
                    e.target.type !== 'file' ? e.target.value : e.target.files[0],
                },
                ...brandForm.links.slice(index + 1, length),
            ],
        });
    };

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

    const updateBrand = useMutation(async () => {
        const body = new FormData();
    
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        body.append("title", brandForm.titleBrand);
        body.append("description", brandForm.description);
        body.append("image", brandForm.imageBrand);
        body.append("templateId", brandForm.templateId);
        body.append("unique", selectedLink.uniqueLink);

        await APIURL.patch(`brand/${brandId}`, body, config);
        for (let i = 0; i < brandForm.links.length; i++) {
            updateLinks.mutate(brandForm.links[i])
        }

        onUpdate();
    });

    const updateLinks = useMutation(async (links) => {
        const body = new FormData();
        
        const config = {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        };

        body.append("title", links.title);
        body.append("url", links.url);
        body.append("image", links.image);

        await APIURL.patch(`/link/${links.id}`, body, config);

        onUpdate();
    });

    const addLink = useMutation(async () => {
        const body = new FormData();
        
        const config = {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        };

        body.append("uniqueLink", selectedLink.uniqueLink);

        await APIURL.post("/link", body, config);

        refetch();
    });

    const onUpdate = () => {
        if (updateBrand.isError || updateLinks.isError) {
            swal("Error", "Sorry, there's some error while update", "warning", {
                buttons: {
                    confirm: {text: "OK", className: "sweet-yellow"}
                }
            })
                .then(() => {
                    history.push('/my-link')
                    changeLink({type: "MAIN_ROUTE"})
                })
        } else {
            swal("Success", "You success to update your link", "success", {
                buttons: {
                    confirm: {text: "OK", className: "sweet-yellow"}
                }
            })
                .then(() => {
                    props.refetch();
                    history.push('/my-link')
                    changeLink({type: "MAIN_ROUTE"})
                })
        }
    }

    const onDeleteLink = (id) => {
        swal("Are you sure want to delete this brand ?", {
            buttons: {
                ok: {
                    text: "Yes",
                    value: "yes",
                    className: "sweet-danger"
                },
                no: {
                    text: "No",
                    value: "no",
                    className: "sweet-no-bg"
                }
            }
        }).then(value => {
            switch (value) {
                case "yes":
                    deleteLink.mutate(id);
                    if (deleteLink.isError) {
                        swal("Error", "Sorry, there's some error while update", "warning", {
                            buttons: {
                                confirm: {text: "OK", className: "sweet-yellow"}
                            }
                        })
                    } else {
                        swal("Success", "You success to delete your link", "success", {
                            buttons: {
                                confirm: {text: "OK", className: "sweet-yellow"}
                            }
                        }).then(() => props.refetch())
                    }
                    break;
                case "no":
                    swal("Delete Brand Cancel", "Your brand not deleted", "info",
                        {
                            buttons: {
                                confirm: { text: "OK", className: "sweet-yellow" }
                            }
                        });
                    break;
                default:
                    break;
            }
        })
    }

    const deleteLink = useMutation(async (id) => {
        await APIURL.delete(`/link/${id}`);
        refetch()
    })

    return (
        <div className="d-flex flex-column p-4" style={{
            background: "#E5E5E5",
            height: "calc(100vh - 64px)",
            position: 'relative'
        }}>
            {load ? "Loading" :
            <>    
                <div className="top d-flex justify-content-between align-items-center" style={{ marginBottom: 40 }}>
                    <span style={{ fontFamily: "'Times New Roman'", fontWeight: "bold", fontSize: 30 }}>Edit Link</span>
                    <div>
                        <button type="button" className="btn btn-dark" style={{ backgroundColor: "#FF9F00", border: "none", marginRight: 15 }} onClick={() => updateBrand.mutate()}>Update Link</button>
                        <button type="button" className="btn btn-dark" style={{ background: "#FF9F00", border: "none" }} onClick={() => changeLink({type: "MAIN_ROUTE"})}>Go Back</button>
                    </div>
                </div>
                <div className="content d-flex justify-content-between w-100">
                    <div className="form-addLink d-flex flex-column" style={{ height: 400, overflow: "auto", background: "#fff", padding: 20, borderRadius: 10}}>
                        <Form encType="multipart/form-data">
                            <Form.Row>
                                <Col className="d-flex align-items-center" style={{ marginBottom: 15 }}>
                                    {
                                        imgBrandPreview?.preview == null ? <span style={{ marginRight: 20, textAlign: "center" }}>Image <br /> Preview</span> :
                                    
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
                                <Form.Control value={brandForm.titleBrand} name="titleBrand" onChange={ (e) => onChangeDetail(e) }  />
                            </Form.Row>
                            <Form.Row className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={brandForm.description} name="description" onChange={ (e) => onChangeDetail(e) }  />
                            </Form.Row>
                        </Form>
                    </div>
                    <div className="form-links d-flex flex-column" style={{ height: 400, width: 350, overflow: "auto", background: "#fff", padding: 20, borderRadius: 10, marginLeft: 40}}>
                        <Form>
                            <Form.Row className="mb-3">
                                <div className="d-flex w-100 justify-content-between aling-items-center mb-3">
                                    <p style={{ fontFamily: "'Times New Roman'", fontWeight: "bold", fontSize: 30, marginBottom: 3 }}>Links</p>
                                    <button type="button" className="btn btn-dark" style={{ color: "#FF9F00", background: "none", border: "none", fontWeight: 'bolder' }} onClick={() => addLink.mutate()} > &#x2B; New link</button>
                                </div>
                                {brandForm.links.map((item, index) => {
                                    return (
                                        <>
                                            <div className="d-flex flex-column w-100 p-2 mb-2" style={{ borderRadius: 5, backgroundColor: "#E5E5E5" }}>
                                                <div>
                                                    <Form>
                                                        <Form.Row>
                                                            <Col md="9">
                                                                <FileLinkEdit image={item.image} index={index} onChange={handleLinkChange} />
                                                            </Col>
                                                            <Col className="d-flex justify-content-end align-items-start">
                                                                <button type="button" className="btn btn-dark" style={{ background: "none", border: "none" }} onClick={() => onDeleteLink(item.id)}>
                                                                    <img
                                                                        src={Trash}
                                                                        alt="Delete icon"
                                                                        width="24px"
                                                                        height="24px"
                                                                    />
                                                                </button>
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Control name="title" data-index={index} value={item.title} onChange={e => handleLinkChange(e)} />
                                                                <Form.Control name="url" data-index={index} value={item.url} onChange={e => handleLinkChange(e)} />
                                                            </Col>
                                                        </Form.Row>
                                                    </Form>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </Form.Row>
                        </Form>
                    </div>
                    <div className="template-preview">
                        {templatePreview(brandForm.templateId)}
                    </div>
                </div>
            </>
            }
            <ModalTemplate changeTemplate={setBrandForm} setTemplate={brandForm} />
        </div>
    )
}

function FileButtonLink(props) {
    const link = (e) => {
        props.onChangeLink(e);
        props.previewLink(e);
    }
    
    return (
        <div>
            <input type="file" id="actual-btn1" name="imageLink" onChange={e => {
                link(e)
            }} hidden />
            <label id="file-button" for="actual-btn1">
                Upload Image
            </label>
        </div>
    );
    
}

export default EditLink
