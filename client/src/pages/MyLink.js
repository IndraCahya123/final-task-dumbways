import { useState, useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Badge, Form } from 'react-bootstrap';
import swal from 'sweetalert';

import { APIURL } from '../api/integration';
import { BASE_URL } from '../api/baseUniqeLink';

import { TemplateContext } from '../contexts/templateContext';

import TopPage from '../components/macro/TopPage';
import EditLink from '../components/macro/EditLink';

import Trash from '../images/trash.png';
import Edit from '../images/pencil.png';
import Preview from '../images/visibility.png';
import Loupe from '../images/loupe.png';

function MyLink() {
    const [editLink, changeToEdit] = useContext(TemplateContext);

    const {
        data: myLinks,
        refetch
    } = useQuery('myLinksCache', async () => {
        const res = await APIURL.get("/my-links");
        return res.data.data.links
    });

    const [filterLink, setFilterLink] = useState("");

    let links = [];

    for (let i = 0; i < myLinks?.length; i++) {
        links.push(myLinks[i])
    }

    const filterLinkOnChange = (e) => {
        setFilterLink(e.target.value);
    }

    const filter = () => {
        const link = links.filter(item => {
            return (
                item.title.toLowerCase().includes(filterLink)
            );
        });

        return (
            link.map(item => {
                return <LinkCard link={item} refetch={refetch} changeToEdit={changeToEdit} />
            })
        );
    }

    const [sortView, setSortView] = useState("");

    const onChangeSort = (e) => {
        setSortView(e.target.value);
    }

    const sortByView = () => {
        if (sortView == "asc") {
            const sorted = links.sort((a, b) => {
                return a.viewCount - b.viewCount
            });

            return (
            sorted.map(link => {
                return <LinkCard link={link} refetch={refetch} changeToEdit={changeToEdit} />
                })
            );
        } else if (sortView == "desc") {
            const sorted = links.sort((a, b) => {
                return b.viewCount - a.viewCount
            });

            return (
            sorted.map(link => {
                return <LinkCard link={link} refetch={refetch} changeToEdit={changeToEdit} />
                })
            );
        } else {
            return (
                links.map(link => {
                return <LinkCard link={link} refetch={refetch} changeToEdit={changeToEdit} />
            }))
        }
    }

    return (
        <div style={{
            width: "100%"
        }}>
            <TopPage menu="My Links" />
            <div className="d-flex flex-column" style={{
                background: "#E5E5E5",
                height: "calc(100vh - 64px)"
            }}>
                {!editLink.editLinkState ?
                <div style={{ padding: 50 }}>
                    <div className="search d-flex" style={{ marginBottom: 55 }}>
                        <div className="total-links">
                            <span style={{ fontFamily: "'Times New Roman'", fontSize: 24, marginRight: 10 }}>All Links</span>
                            <span>
                                <Badge style={{ background: "#FF9F00" }}>{ links.length }</Badge>
                            </span>
                        </div>
                        <div className="search-bar d-flex align-items-center justify-content-end" style={{ width: "85%" }}>
                            <img
                                src={Loupe}
                                alt="Search Icon"
                                width="24px"
                                height="24px"
                                style={{ marginRight: 15 }}
                            />
                            <Form>
                                <Form.Control placeholder="Search Link" value={filterLink} onChange={(e) => filterLinkOnChange(e)} />
                            </Form>
                        </div>
                    </div>
                    <div className="d-flex">
                        <Form.Label>Sort by : </Form.Label>
                        <Form.Control as="select" name="sortView" style={{ borderBottom: "none", width: 150 }} onChange={(e) => onChangeSort(e)}>
                            {sortView == "" ? <option selected disabled>Views</option> : <option value="">Clear</option>}
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </Form.Control>
                    </div>
                    <div>
                        {
                            filterLink == "" ?
                            sortByView() :
                            filter()
                        }
                    </div>
                </div>
            :
            <EditLink refetch={refetch} />
            }
            </div>
        </div>
    )
}

const LinkCard = (props) => {
    const brandId = props.link.id;

    //delete brand
    const onDelete = () => {
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
                    deleteBrand.mutate();
                    swal("Delete Success", "Success to Delete Your Brand", "success",
                        {
                            buttons: {
                            confirm: {text: "OK", className: "sweet-yellow"}
                        }
                        })
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

    const deleteBrand = useMutation(async () => {
        await APIURL.delete(`/brand/${brandId}`);
        props.refetch()
    })

    const addView = useMutation(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        let view = props.link.viewCount;
        view += 1;

        const data = {
            viewCount: view
        }

        const body = JSON.stringify(data);

        await APIURL.patch(`brandView/${brandId}`, body, config)

        history.push(previewLink)
    });

    const previewLink = `/preview/${props.link.templateId}/${props.link.uniqueLink}`
    const history = useHistory();

    return (
        <div className="d-flex w-100 justify-content-between mb-4">
            <div className="d-flex">
                <img
                    src={props.link.image}
                    alt="Brand Image"
                    width="70px"
                    height="70px"
                />
                <div className="d-flex flex-column justify-content-between p-2 ml-4">
                    <span style={{
                        fontFamily: "'Times New Roman'",
                        fontSize: 18,
                        fontWeight: "bolder"
                    }}>{props.link.title}</span>
                    <span className="text-secondary" style={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 200
                    }}>{ `${BASE_URL}/${props.link.templateId}/${props.link.uniqueLink}` }</span>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <span>{ props.link.viewCount }</span>
                <span className="text-secondary" >Views</span>
            </div>
            <div className="d-flex align-items-center" >
                <button type="button" className="btn btn-dark" style={{
                    background: "none",
                    marginRight: 15
                }}
                    onClick={() => props.changeToEdit({
                        type: "EDIT_LINK",
                        payload: {
                            link: props.link,
                            templateId: props.link.templateId
                        }
                    })}
                >
                    <img 
                        src={Edit}
                        alt="action icon"
                    />
                </button>
                <button type="button" className="btn btn-dark" style={{
                    background: "none",
                    marginRight: 15
                }}
                    onClick={() => addView.mutate()}
                >
                    <img 
                        src={Preview}
                        alt="action icon"
                    />
                </button>
                <button type="button" className="btn btn-dark" style={{
                    background: "none",
                    marginRight: 15
                }}
                    onClick={() => onDelete()}
                >
                    <img 
                        src={Trash}
                        alt="action icon"
                    />
                </button>
            </div>
        </div>
    );
}

export default MyLink
