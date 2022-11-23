import React from 'react';
import {Card, Grid, SvgIcon} from "@mui/material";
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import InfoIcon from '@mui/icons-material/Info';
import ArchiveIcon from '@mui/icons-material/Archive';
import VoicemailIcon from '@mui/icons-material/Voicemail';
function PhoneRow(props){
    let callDate = new Date(props.info.created_at);
    let missed = true;
    let callIcon;

    // If miss call, turn text red
    if (props.info.call_type === "missed"){
        missed = false;
    }

    // Determine icon based on direction if not voicemail
    if (props.info.call_type === "voicemail"){
        callIcon = VoicemailIcon;
    }
    else if (props.info.direction === "inbound"){
        callIcon = CallReceivedIcon;
    }
    else{
        callIcon = CallMadeIcon;
    }
    return(
        <Card variant="outlined" sx={{ minWidth: 374}}>
            <Grid container direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                <Grid item xs={8}>
                    <b style={{color: missed ? "black" : "red"}}>
                        <SvgIcon component={callIcon} />
                        {props.info.from}
                    </b>
                    {callIcon === VoicemailIcon ?  <h1>Voicemail</h1> : <h1>tried to call on {props.info.to}</h1>}
                </Grid>
                <Grid item xs>
                    <h1>{callDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
                </Grid>
                <Grid item xs>
                    <SvgIcon component={ArchiveIcon} />
                    <SvgIcon component={InfoIcon} />
                </Grid>

            </Grid>
        </Card>
    )
}

export default PhoneRow;