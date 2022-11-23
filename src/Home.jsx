import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

function Home(){
    const [phoneList, setList] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://aircall-job.herokuapp.com/activities')
        .then(res => {
            console.log(res.data)
        })

    });
    return(
        <nav className="Home">
            Some activities should be here
        </nav>
    );
}

export default Home;