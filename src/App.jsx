import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import PhoneCall from "./PhoneCall.jsx";
function App(){
    const [archiveMode, setMode] = useState(false);
    return (
        <div className = "container">
            <div className = "container-view">
                <Header/>
                <Routes>
                    <Route path ="/" element={<Home archiveMode={archiveMode}/>}/>
                    <Route path = "/id" element={<PhoneCall />}/>
                </Routes>
                <Footer archiveMode={archiveMode} setMode={setMode}/>
            </div>
        </div>

    );
};

export default App;
