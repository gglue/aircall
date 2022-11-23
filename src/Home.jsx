import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Button, Card, Grid, SvgIcon} from "@mui/material";
import ArchiveIcon from '@mui/icons-material/Archive';
function Home(){
    const [phoneList, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://aircall-job.herokuapp.com/activities')
        .then(res => {
            setList(res.data);
            setLoading(false);
        })
    }, []);

    function printList(){
        console.log(phoneList);

        return(
            phoneList.map(phoneCall => (
                <Grid item xs = {12}>
                    <Card sx={{ minWidth: 275 }}>
                    {phoneCall.from}
                    </Card>
                </Grid>
            ))
        )
    }

    return(
        <nav className="Home">
            <Grid item xs ={12}>
                <Button variant="outlined" sx={{color: 'black', borderColor: 'gray', textTransform: 'none', }}>
                    <SvgIcon component={ArchiveIcon} />
                    Archive all calls
                </Button>
            </Grid>
            <Grid item xs = {12}>
                {loading ? <div>Loading... </div> : printList()}
            </Grid>
        </nav>
    );
}

export default Home;