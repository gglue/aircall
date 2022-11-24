import React, {useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import PhoneCall from "./PhoneCall.jsx";
import {AnimatePresence} from "framer-motion/dist/framer-motion";
function App(){
    // This state is used to pass the current viewing mode (call list / archive) between child components
    const [archiveMode, setMode] = useState(false);

    // This variable is used to track the current location so animations from framer-motion can work
    const location = useLocation();
    return (
        <div className = "container">
            <div className = "container-view">
                <Header/>
                    <AnimatePresence>
                        <Routes location={location} key={location.key}>
                            <Route path ="/" element={<Home archiveMode={archiveMode}/>}/>
                            <Route path = "/id" element={<PhoneCall />}/>
                        </Routes>
                    </AnimatePresence>
                <Footer archiveMode={archiveMode} setMode={setMode}/>
            </div>
        </div>
    );
};

export default App;
