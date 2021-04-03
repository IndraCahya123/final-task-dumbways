import { useContext } from 'react';

import { ModalContext } from '../contexts/modalContext';

import Template from './Template';
import Profile from './Profile';

import bg from '../images/Bg.png';
import phone from '../images/Phone.png';
import pc from '../images/PC.png';

function Landing() {
    const [modal, setModal] = useContext(ModalContext);

    const showLogin = () => {
        setModal({
            type: "SHOW_LOGIN"
        })
    }

    return (
        <>
            <div style={{ height: "calc(100vh - 64px)", backgroundColor: "#FF9F00", backgroundImage: `url(${bg})`, padding: "80px 90px" }}>
                <div className="content-wrapper d-flex">
                    <div className="left d-flex flex-column" style= {{  }}>
                        <span style={{ fontFamily: "'Times New Roman'", color: "#fff", fontSize: 63 }}>The Only Link <br/> You’ll Ever Need</span>
                        <span style={{ fontFamily: "'Times New Roman'", color: "#fff", fontSize: 18, width: "75%", letterSpacing: 2, marginTop: 20 }}>Add a link for your Social Bio and optimize your social media traffic.</span>
                        <span style={{ fontFamily: "'Times New Roman'", color: "#fff", fontSize: 18, letterSpacing: 2, marginTop: 30 }}>safe, fast and easy to use</span>
                        <button className="btn btn-dark" style={{ backgroundColor: "#000", color: "#fff", fontFamily: "'Times New Roman'", fontSize: 18, width: 250, marginTop: 50 }} onClick={() => showLogin()}
                        >Get Started For Free</button>
                    </div>
                    <div className="right d-flex">
                        <img src={phone} alt="Landng icon" height="350px" style={{ position: "relative", left: 40, top: 60, zIndex: 99 }} />
                        <img src={pc} alt="Landng icon" height="400px" style={{ position: "relative", right: 50, zIndex: 90 }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing
