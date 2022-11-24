import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Button, Grid, SvgIcon} from "@mui/material";
import ArchiveIcon from '@mui/icons-material/Archive';
import PhoneRow from "./PhoneRow.jsx";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import {motion} from "framer-motion/dist/framer-motion";

function Home(props){
    // This state holds all the calls from the API
    const [phoneList, setList] = useState([]);

    // This state is used to display a placeholder element to wait for the useEffect() get request to finish
    const [loading, setLoading] = useState(true);

    // This variable is used to determine what viewing mode (Viewing either the call list or archives)
    const archiveMode = props.archiveMode;

    // At startup, load all calls from API into the list and let site know we're done loading
    useEffect(() => {
        axios.get('https://aircall-job.herokuapp.com/activities')
        .then(res => {
            setList(res.data);
            setLoading(false);
        })
    }, [archiveMode]); // Only call function again when changing display modes

    // Takes the call list and creates a component for each call
    function printList(){
        return(
            phoneList.map(phoneCall => (
                // Only display calls that follow the current display mode
                phoneCall.is_archived == archiveMode
                    ? (<Grid item xs = {12}><PhoneRow info={phoneCall}/> </Grid>)
                    : null
            ))
        )
    }

    // Sets all the calls in the API to non-archived
    function resetCall(){
        axios.get('https://aircall-job.herokuapp.com/reset').then(res => {
            setLoading(true); // Empties the view
        })
    }

    // Sets all the calls in the API to archived
    function archiveAll(){
        phoneList.map(phoneCall => {
            let uri = "https://aircall-job.herokuapp.com/activities/" + phoneCall.id;
            axios.post(uri, {
                is_archived : true
            })
        })
        setLoading(true); // Empties the view
    }

    return(
        <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0 }} transition={{delay:0.2}}>
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
        </motion.div>
    );
}

export default Home;