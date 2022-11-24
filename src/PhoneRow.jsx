import React, {useState} from 'react';
import {Card, Grid, SvgIcon} from "@mui/material";
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import InfoIcon from '@mui/icons-material/Info';
import ArchiveIcon from '@mui/icons-material/Archive';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import axios from "axios";
import {Link} from 'react-router-dom';

function PhoneRow(props){
    let callDate = new Date(props.info.created_at);
    let missed = true;
    let callIcon;
    let callID = props.info.id;
    const [isArchived, setArchived] = useState(props.info.is_archived);
    const [isVisible, setVisible] = useState(true);
    // If miss call, turn text red
    if (props.info.call_type === "missed"){
        missed = false;
    }

    // Determine icon based on direction if not voicemail
    if (props.info.call_type === "voicemail"){
        callIcon = VoicemailIcon;
    }
    else if (props.info.direction === "inbound"){
        callIcon = CallMadeIcon;
    }
    else{
        callIcon = CallReceivedIcon;
    }

    function archiveRow(){
        let uri = "https://aircall-job.herokuapp.com/activities/" + callID;
        axios.post(uri, {
            is_archived: !isArchived
        })
            .then(data => {
                setArchived(!isArchived);
                setVisible(false);
            });
    }

    return(
        isVisible ?
        <Card variant="outlined" sx={{ minWidth: 374, pb: 1, pt: 1}}>
            <Grid container direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}>
                    <b style={{color: missed ? "black" : "red"}}>
                        <SvgIcon component={callIcon} />
                    </b>
                </Grid>
                <Grid item xs={7}>
                    <b style={{color: missed ? "black" : "red"}}>
                        {callIcon === VoicemailIcon ? <h1>Voicemail</h1> : <h1>{props.info.to}</h1>}
                    </b>
                    {missed ?  <h1>by {props.info.from}</h1> : <h1>tried to call on {props.info.via}</h1>}
                </Grid>
                <Grid item xs>
                    <h1>{callDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
                </Grid>
                <Grid item xs>
                    <SvgIcon className="phoneRow" onClick={() => {archiveRow()}} component={isArchived ? UnarchiveIcon : ArchiveIcon} />
                    <Link to="/id" state={{callID: callID}}>
                        <SvgIcon sx={{color: '#1976d2'}} className="phoneRow" component={InfoIcon} />
                    </Link>
                </Grid>

            </Grid>
        </Card>
            : null
    )
}

export default PhoneRow;