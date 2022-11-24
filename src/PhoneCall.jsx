import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Grid, Paper, SvgIcon, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ArchiveIcon from "@mui/icons-material/Archive";
function PhoneCall(){
    const location = useLocation();
    const navigate = useNavigate();
    const {callID} = location.state;
    const [callInfo, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isArchived, setArchive] = useState(false);
    let missed = true;

    useEffect(() => {
        axios.get('https://aircall-job.herokuapp.com/activities/' + callID)
            .then(res => {
                setInfo(res.data);
                setLoading(false);
                setArchive(res.data.is_archived);
            })
    }, []);

    function handleClick(e){
        e.preventDefault();
        navigate('/');
    }

    function flipStatus(){
        axios.post('https://aircall-job.herokuapp.com/activities/' + callID, {
            is_archived: !isArchived
        })
            .then(data => {
                setArchive(!isArchived);
            });
    }
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
                        <Typography variant="body1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{callInfo.duration} seconds</Typography>
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
        <Grid container alignItems="center" direction="row" className='App'>
            <Grid item xs={12}>
                <Button onClick={handleClick} sx={{color: '#1976d2', borderColor: 'gray', textTransform: 'none'}}>
                    <SvgIcon component={ArrowBackIosIcon}/>
                    Back
                </Button>
            </Grid>
            {loading ? null : printInfo()}
        </Grid>
    );
}

export default PhoneCall;