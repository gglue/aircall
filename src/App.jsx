import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./Header.jsx";

function App(){
  return (
    <div className='App'>
        <div className = "container">
            <div className = "container-view">
                <Header/>
                <Routes>
                    <Route path ="/" element={<Home/>}></Route>
                </Routes>
            </div>
        </div>
    </div>
  );
};

export default App;
