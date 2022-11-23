import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import {Button, Grid, SvgIcon} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import Footer from "./Footer.jsx";

function App(){
  return (
        <div className = "container">
            <div className = "container-view">
                <Header/>
                <Routes>
                    <Route path ="/" element={<Home/>}></Route>
                </Routes>
                <Footer/>
            </div>
        </div>

  );
};

export default App;
