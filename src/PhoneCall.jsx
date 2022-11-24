import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Grid, Paper, SvgIcon, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ArchiveIcon from "@mui/icons-material/Archive";
import {motion} from "framer-motion/dist/framer-motion";
function PhoneCall(){
    // These variables are used to get to prop parameters from the parent component to see which call to get from API
    const location = useLocation();
    const {callID} = location.state;

    // This variable is used to redirect user
    const navigate = useNavigate();

    // This state is used to hold the call information
    const [callInfo, setInfo] = useState(null);

    // This state is used to display a placeholder element to wait for the useEffect() get request to finish
    const [loading, setLoading] = useState(true);

    // This state is used to determine the status of archive/unarchive button
    const [isArchived, setArchive] = useState(false);

    // This variable is used to determine the color of callee if it's a missed call
    let missed = true;

    // At startup, load specific call from API into the state and let site know we're done loading
    useEffect(() => {
        axios.get('https://aircall-job.herokuapp.com/activities/' + callID)
            .then(res => {
                setInfo(res.data);
                setLoading(false);
                setArchive(res.data.is_archived);
            })
    }, []);

    // Redirect back to home page when user clicks back button
    function handleClick(e){
        e.preventDefault();
        navigate('/');
    }

    // Archives or Unarchived the current call, and changes the function of the button to the opposite after
    function flipStatus(){
        axios.post('https://aircall-job.herokuapp.com/activities/' + callID, {
            is_archived: !isArchived
        })
            .then(data => {
                setArchive(!isArchived);
            });
    }

    // Create component for the call
    function printInfo(){
        let callDate = new Date(callInfo.created_at);
        if (callInfo.call_type === "missed"){
            missed = false;
        }
        else if (callInfo.call_type === "voicemail"){
            callInfo.to = "Voicemail";
        }
        return (
            <Grid container alignItems="center" direction="row" className='App' rowSpacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' variant="h5" gutterBottom>
                    <h1 style={{color: missed ? "black" : "red"}}>{callInfo.to}</h1>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Typography variant="subtitle1">&nbsp;&nbsp;&nbsp;{callDate.toISOString().split('T')[0]}</Typography>
                        <Typography variant="body1">&nbsp;&nbsp;&nbsp;{callDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} <b>{callInfo.direction} call</b></Typography>
                        <Typography variant="body1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{callInfo.duration / 60} minutes {callInfo.duration % 60} seconds</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Typography variant="subtitle1">&nbsp;&nbsp;&nbsp;Caller</Typography>
                        <Typography variant="body1">&nbsp;&nbsp;&nbsp;{callInfo.from}</Typography>
                        <Typography variant="body1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;via {callInfo.via} seconds</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {isArchived ?
                        <Button fullWidth={true} onClick={() => {flipStatus()}} sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                            <SvgIcon component={UnarchiveIcon}/>
                            Un-archive call
                        </Button>
                        :
                        <Button fullWidth={true} onClick={() => {flipStatus()}} sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                            <SvgIcon component={ArchiveIcon}/>
                            Archive call
                        </Button>
                    }
                </Grid>
            </Grid>
        )
    }
    return(
        <motion.div key="phone" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0 }} transition={{delay:0.2}}>
            <Grid container alignItems="center" direction="row" className='App'>
                <Grid item xs={12}>
                    <Button onClick={handleClick} sx={{color: '#1976d2', borderColor: 'gray', textTransform: 'none'}}>
                        <SvgIcon component={ArrowBackIosIcon}/>
                        Back
                    </Button>
                </Grid>
                {loading ? null : printInfo()}
            </Grid>
        </motion.div>
    );
}

export default PhoneCall;