import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import InventoryIcon from "@mui/icons-material/Inventory";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";


function Footer(props){
    // Variables used to help redirect
    const location = useLocation();
    const navigate = useNavigate();

    // Changes the viewing mode and if not on home page, go to home page
    const handleChange = (e, newValue) =>{
        e.preventDefault();
        props.setMode(newValue);
        if (!(location.pathname === '/')) navigate('/');
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