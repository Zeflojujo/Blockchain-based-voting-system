import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>

    <ListItemButton>
      {/* <ListItemText primary="Dashboard" /> */}
      <Link to='/admin/dashboard' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
      
        <ListItemIcon>
        <DashboardIcon/>
        </ListItemIcon>
        Dashboard
      </Link>
    </ListItemButton>

    <ListItemButton>
      {/* <ListItemText primary="Phase" /> */}
      <Link to='/admin/phase' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        Phase
      </Link>
    </ListItemButton>
    
    <ListItemButton>
      
      {/* <ListItemText primary="Registration" /> */}
      <Link to='/admin/listPresident' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        President
      </Link>
    </ListItemButton>

    <ListItemButton>
      
      {/* <ListItemText primary="Registration" /> */}
      <Link to='/admin/listGovernor' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        Governor
      </Link>
    </ListItemButton>

    <ListItemButton>
      {/* <ListItemText primary="Registration" /> */}
      <Link to='/admin/listBLs' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        BlockLeader
      </Link>
    </ListItemButton>

    {/* <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Registration" /> */}
      {/* <Link to='/admin/regVoter'>Register Voters</Link>
    </ListItemButton>  */}

    <ListItemButton> 
      {/* <ListItemText primary="Result" />  */}
      <Link to='/admin/Voters' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon> 
         <LayersIcon />
        </ListItemIcon>
          Voters
        </Link>
    </ListItemButton>

    <ListItemButton>
      {/* <ListItemText primary="Winners" />  */}
      <Link to='/admin/winners' style={{ textDecoration: 'none', color: '#333', padding: 0}}>
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon> 
        Winners
      </Link>
    </ListItemButton>


  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>

  </React.Fragment>
);