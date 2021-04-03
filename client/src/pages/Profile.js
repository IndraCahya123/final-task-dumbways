import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import swal from 'sweetalert';

import { APIURL } from '../api/integration';

import { UserContext } from '../contexts/userContext';

import TopPage from '../components/macro/TopPage';

function Profile() {
    const history = useHistory();

    const [deleteAccount, logout] = useContext(UserContext);

    const [formEdit, setFormEdit] = useState({
        fullname: "",
        email: "",
    });
    
    const {
        data: user,
        isFetching: fetch,
        refetch
    } = useQuery("userCache", async () => {
        const res = await APIURL.get("/user");
        setFormEdit({
            ...formEdit,
            fullname: res.data.data.user.fullname,
            email: res.data.data.user.email,
        });
        return res.data.data
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormEdit({
            ...formEdit,
            [name]: value
        });
    };
    
    const onSubmit = () => {
        if (editProfile.isError) {
            swal("There's error", "error")
        } else {
            swal("Profile Updated").then(() => {
                refetch();
            });
        }
    }

    const onDelete = () => {
        swal("Are you sure want to delete you account ?", {
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
                    deleteProfile.mutate();
                    swal("Delete Success", "Success to Delete Your Account", "success",
                        {
                            buttons: {
                            confirm: {text: "OK", className: "sweet-yellow"}
                        }
                        }).then(() => {
                            logout({
                                type: "LOGOUT"
                            });
                            history.push("/");
                    })
                    break;
                case "no":
                    swal("Delete User Cancel", "Your account not deleted", "info",
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

    const editProfile = useMutation(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = {
            fullname: formEdit.fullname,
            email: formEdit.email
        }

        const body = JSON.stringify(data)
    
        await APIURL.patch(`/user`, body, config);
        refetch();
    });

    const deleteProfile = useMutation(async () => {
        await APIURL.delete(`/user`);
        refetch();
    });
    

    return (
        <div style={{
            width: "100%"
        }}>
            <TopPage menu="My Account" />
            <div className="d-flex flex-column" style={{
                background: "#E5E5E5",
                padding: 50,
                height: "calc(100vh - 64px)"
            }}>
                <p style={{ fontFamily: "'Times New Roman'", fontSize: 30, marginBottom: 40 }}>My Information</p>
                <div className="contact-card" style={{
                    background: "#fff",
                    width: "100%",
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    padding: 20,
                    marginBottom: 40
                }}>
                    <label style={{ color: "#7E7A7A", marginBottom: 20 }}>Fullname</label>
                    <input onChange={(e) => onChange(e)} className="myinput" name="fullname" style={{ borderBottom: "1px solid #7E7A7A", borderTop: "none", borderLeft: "none", borderRight: "none", marginBottom: 40, paddingBottom: 5 }} type="text" value={formEdit.fullname} />
                    <label style={{ color: "#7E7A7A", marginBottom: 20 }}>Email</label>
                    <input onChange={(e) => onChange(e)} className="myinput" name="email" style={{ borderBottom: "1px solid #7E7A7A", borderTop: "none", borderLeft: "none", borderRight: "none", marginBottom: 40, paddingBottom: 5 }} type="email" value={formEdit.email} />
                </div>
                <div className="align-self-end">
                    <button type="button" style={{
                        background: "#FF9F00",
                        marginRight: 15,
                        border: "none",
                        padding: "5px 30px",
                        borderRadius: 10,
                        color: "#fff",
                        fontFamily: "'Times New Roman'",
                        fontWeight: "bolder"
                    }} onClick={() => editProfile.mutate()}>Save Change</button>
                    <button type="button" onClick={() => onDelete()} style={{
                        background: "#FF0000",
                        border: "none",
                        padding: "5px 30px",
                        borderRadius: 10,
                        color: "#fff",
                        fontFamily: "'Times New Roman'",
                        fontWeight: "bolder"
                    }}>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
