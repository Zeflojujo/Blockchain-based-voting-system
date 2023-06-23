import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NavBar from './layouts/navBar';
import SideBar from './layouts/SideBar';
import Footer from './layouts/Footer';
// import { useTheme } from '@mui/material/styles';
import ScheduleIcon from "@material-ui/icons/Schedule";
import Tablee from './table';
import { AuthContext } from './AuthProvider';

//user Details table

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TimeChart from './chart';

// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  root: {
    padding: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1),
  },
  infoContainer1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.success.light,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1),
  },
  infoContainer2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1),
  },
  icon: {
    fontSize: "48px",
    marginBottom: theme.spacing(1),
  },
}));
          
const drawerWidth = 200;

const mdTheme = createTheme();

const Dashboard = (props) => {
  const classes = useStyles();
  const { voter } = useContext(AuthContext);


  // const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

// Example data - Replace with your actual data
const startTime = new Date("2023-05-12T08:00:00Z");
const endTime = new Date("2023-05-12T18:00:00Z");
const remainingTime = endTime - Date.now(); // Calculate remaining time in milliseconds

// Format remaining time for display
const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <NavBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>
        <SideBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }} >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              <Grid item xs={12}>

                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>

                    <h1>Dashboard</h1>
                   
                  {/* body details of the specific component */}

                      <Paper className={classes.root}>
                        <Typography variant="h6" className={classes.heading}>
                          Election Schedule
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.infoContainer1}>
                              <ScheduleIcon className={classes.icon} />
                              <Typography variant="h6">Start Time</Typography>
                              <Typography variant="body1">
                                {startTime.toLocaleString()} {/* Adjust the format as needed */}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.infoContainer2}>
                              <ScheduleIcon className={classes.icon} />
                              <Typography variant="h6">End Time</Typography>
                              <Typography variant="body1">
                                {endTime.toLocaleString()} {/* Adjust the format as needed */}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.infoContainer}>
                              <ScheduleIcon className={classes.icon} />
                              <Typography variant="h6">Remaining Time</Typography>
                              <Typography variant="body1">
                                {days} days, {hours} hours, {minutes} minutes
                              </Typography>
                            </div>
                          </Grid>
                          {/* Add more Grid items for additional content */}
                        </Grid>
                      </Paper>
                      {/* {voter && (
                        <div>
                          <p>Voter Address: {voter.voterAddress}</p>
                          <p>First Name: {voter.firstName}</p>
                          <p>Last Name: {voter.lastName}</p>
                          <p>College Name: {voter.collegeName}</p>
                          <p>Program Name: {voter.programName}</p>
                          <p>Registration Number: {voter.regNo}</p>
                          <p>Year of Study: {voter.yearOfStudy}</p>
                          <p>Block Number: {voter.blockNumber}</p>
                          <p>Gender: {voter.gender}</p>
                        </div>
                      )} */}

                      {/* <Tablee voter={voter} /> */}

                    {/* <TimeChart startTime={startTime} endTime={endTime} /> */}
                </Paper>
                

               </Grid> 
             </Grid>

             <Footer sx={{ pt: 4 }} />
           </Container>
         </Box>
       </Box>
    </ThemeProvider>
  );
  
}

export default Dashboard;


