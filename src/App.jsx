import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import {Button, Grid, SvgIcon} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

function App(){
  return (
        <div className = "container">
            <div className = "container-view">
                <Header/>
                <Routes>
                    <Route path ="/" element={<Home/>}></Route>
                </Routes>
            </div>
        </div>

  );
};

export default App;
