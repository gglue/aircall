import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Button, Card, Grid, SvgIcon} from "@mui/material";
import ArchiveIcon from '@mui/icons-material/Archive';
import PhoneRow from "./PhoneRow.jsx";
import PhoneIcon from "@mui/icons-material/Phone";
import InventoryIcon from "@mui/icons-material/Inventory";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

function Home(){
    const [phoneList, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [archiveMode, setMode] = useState(false);
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
            console.log(res);
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
        <div>
            <Grid container justifyContent="center" alignItems="center" direction="row" className='App'>
                <Grid item xs={12}>
                    {archiveMode ?
                        <Button variant="outlined" fullWidth={true} onClick={() => {resetCall()}}
                                sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                            <SvgIcon component={UnarchiveIcon}/>
                            Un-archive all calls
                        </Button>
                        :
                        <Button variant="outlined" fullWidth={true} onClick={() => {archiveAll()}}
                                sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                            <SvgIcon component={ArchiveIcon}/>
                            Archive all calls
                        </Button>
                    }
                </Grid>
                <Grid item xs = {12}>
                    {loading ? null : printList()}
                </Grid>
            </Grid>
            <Grid container sx={{ position: 'absolute', bottom: 0}}>
                <Grid item xs={6}>
                    <Button variant="outlined" fullWidth={true} onClick={() => {setMode(false)}}
                            sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                        <SvgIcon component={PhoneIcon}/>
                        Call List
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" fullWidth={true} onClick={() => {setMode(true)}}
                            sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                        <SvgIcon component={InventoryIcon}/>
                        Archives
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;