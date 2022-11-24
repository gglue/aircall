import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import InventoryIcon from "@mui/icons-material/Inventory";
import React from "react";


function Footer(props){
    const handleChange = (e, newValue) =>{
        e.preventDefault();
        props.setMode(newValue);
    }
    return(
        <BottomNavigation sx={{ position: 'absolute', right: 100, bottom: 0, borderTop: 1}} value={props.archiveMode} showLabels onChange={handleChange}>
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
    );
}

export default Footer;