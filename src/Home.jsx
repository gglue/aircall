import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {BottomNavigation, BottomNavigationAction, Button, Card, Grid, SvgIcon} from "@mui/material";
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

    const handleChange = (e, newValue) =>{
        e.preventDefault();
        setMode(newValue);
    }
    return(
        <div>
            <Grid container justifyContent="center" alignItems="center" direction="row" className='App'>
                <Grid item xs={12}>
                    {archiveMode ?
                        <Button fullWidth={true} onClick={() => {resetCall()}}
                                sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                            <SvgIcon component={UnarchiveIcon}/>
                            Un-archive all calls
                        </Button>
                        :
                        <Button fullWidth={true} onClick={() => {archiveAll()}}
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
            <BottomNavigation sx={{ position: 'absolute', right: 100, bottom: 0, borderTop: 1}} value={archiveMode} showLabels onChange={handleChange}>
                <BottomNavigationAction
                    label="Call List"
                    value={false}
                    icon={<PhoneIcon/>}
                />
                <BottomNavigationAction
                    label="Archives"
                    value={true}
                    icon={<InventoryIcon/>}
                />
            </BottomNavigation>
        </div>
    );
}

export default Home;