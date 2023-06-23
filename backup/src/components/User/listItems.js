import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>

     <ListItemButton> 
       {/* <ListItemText primary="Dashboard" />  */}
      <Link to='/user/dashboard' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
      
        <ListItemIcon>
        <DashboardIcon/>
        </ListItemIcon> 
          Dashboard
        </Link>
    </ListItemButton>

    {/* <ListItemButton>
      {/* <ListItemText primary="Result" /> */}
      {/* <Link to='/user/regVoter' style={{ textDecoration: 'none', color: '#333', padding: 0}}> */}
        {/* <ListItemIcon> */}
          {/* <LayersIcon /> */}
        {/* </ListItemIcon> */}
        {/* Registration */}
        {/* </Link> */}
    {/* </ListItemButton> */}

    <ListItemButton>
      {/* <ListItemText primary="Phase" /> */}
      <Link to='/user/castVote' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        Cast Vote
        </Link>
    </ListItemButton>
    

    <ListItemButton>
      {/* <ListItemText primary="Winners" />  */}
      <Link to='/user/result' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon> 
        Result
      </Link>
    </ListItemButton>


  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>

  </React.Fragment>
);