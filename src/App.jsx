import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import {Grid} from "@mui/material";

function App(){
  return (
        <div className = "container">
            <div className = "container-view">
                <Header/>
                <Grid container justifyContent="center" direction="row" className='App'>

                <Routes>
                    <Route path ="/" element={<Home/>}></Route>
                </Routes></Grid>
            </div>
        </div>

  );
};

export default App;
