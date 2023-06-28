import React from 'react';
import { styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';


const NavBar = ({drawerWidth, open, toggleDrawer}) => {

    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.success.main,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    const handleRegister = () => {
        localStorage.removeItem('sessionId');
        window.location.href = '/';
      }
    

    return (
        <AppBar position="absolute" open={open} >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >

            {/* //menu icon */}
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              
            >
              <MenuIcon />
            </IconButton> */}


            {/* <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            </Typography> */}

            <IconButton color="white">
              <Button 
              color="success"
              type="submit"
              variant="contained"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
                border: '1px solid #fff'
              }}
              onClick={handleRegister}>
                Back</Button> 
            </IconButton>
            
            
          </Toolbar>
          </AppBar>
    )
}

export default NavBar;
      
      
      
      
      