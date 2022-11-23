import {Button, Grid, Paper, SvgIcon} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import InventoryIcon from "@mui/icons-material/Inventory";
import React from "react";


function Footer(){
    return(
        <Grid container sx={{ position: 'absolute', bottom: 0}}>
            <Grid item xs={6}>
                <Button variant="outlined" fullWidth={true}
                        sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                    <SvgIcon component={PhoneIcon}/>
                    Call List
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined" fullWidth={true}
                        sx={{color: 'black', borderColor: 'gray', textTransform: 'none',}}>
                    <SvgIcon component={InventoryIcon}/>
                    Archives
                </Button>
            </Grid>
        </Grid>
    );
}

export default Footer;
