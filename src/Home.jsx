import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Button, Grid, SvgIcon} from "@mui/material";
import ArchiveIcon from '@mui/icons-material/Archive';
import PhoneRow from "./PhoneRow.jsx";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

function Home(props){
    const [phoneList, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const archiveMode = props.archiveMode;
    useEffect(() => {
        axios.get('https://aircall-job.herokuapp.com/activities')
        .then(res => {
            setList(res.data);
            setLoading(false);
        })
    }, [archiveMode]);

    function printList(){
        return(
            phoneList.map(phoneCall => (
                phoneCall.is_archived == archiveMode
                    ? (<Grid item xs = {12}><PhoneRow info={phoneCall}/> </Grid>)
                    : null
            ))
        )
    }

    function resetCall(){
        axios.get('https://aircall-job.herokuapp.com/reset').then(res => {
            setLoading(true);
        })
    }

    function archiveAll(){
        phoneList.map(phoneCall => {
            let uri = "https://aircall-job.herokuapp.com/activities/" + phoneCall.id;
            axios.post(uri, {
                is_archived : true
            })
        })
        setLoading(true);
    }

    return(
        <Grid container justifyContent="center" alignItems="center" direction="row" className='App'>
            <Grid item xs={12}>
                {archiveMode ?
                    <Button fullWidth={true} onClick={() => {resetCall()}} sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                        <SvgIcon component={UnarchiveIcon}/>
                        Un-archive all calls
                    </Button>
                    :
                    <Button fullWidth={true} onClick={() => {archiveAll()}} sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                        <SvgIcon component={ArchiveIcon}/>
                        Archive all calls
                    </Button>
                }
            </Grid>
            {loading ? null : printList()}
        </Grid>
    );
}

export default Home;