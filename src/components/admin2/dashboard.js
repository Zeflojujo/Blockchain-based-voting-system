import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NavBar from './layout/navBar';
import SideBar from './layout/SideBar';
import Footer from './layout/Footer';
// import { useTheme } from '@mui/material/styles';
import ScheduleIcon from "@material-ui/icons/Schedule";
import TimeChart from './chart';

// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import contractAbi from "../../abi/TimeControl.json";
import Web3 from 'web3';
import { makeStyles } from "@material-ui/core/styles";

const networkId = "http://127.0.0.1:7545";

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

  // const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  // const [web3, setWeb3] = React.useState(true);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [remainingTime, setRemainingTime] = React.useState(true);
  const [time, setTime] = React.useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try{
          // Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create a new web3 instance
          // const web3Instance = new Web3(window.ethereum);
          // setWeb3(web3Instance);

        }
        catch(error){
          console.error(`User denied account access `);
        }
      }else {
          console.error('Please install MetaMask');
      }  
    };
    init(); 
    // getVotingTime();
    getVotingTime();
  },[]);


  const getVotingTime = async () => {
    try {
      const web3 = new Web3(networkId);
      const abi = contractAbi.abi;
      const address = contractAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);
  
      const fetchTimeFromContract = async () => {
        const getTime = await contract.methods.getTime().call();
  
        const convertToTimeFormat = (time) => {
          const days = Math.floor(time / (3600 * 24));
          const hours = Math.floor((time % (3600 * 24)) / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          return `${days} days ${hours.toString().padStart(2, "0")} hours ${minutes
            .toString()
            .padStart(2, "0")} minutes`;
        };
  
        const startTime = convertToTimeFormat(getTime[0]);
        const endTime = convertToTimeFormat(getTime[1]);
        const remainingTime = convertToTimeFormat(getTime[2]);
  
        setStartTime(startTime);
        setEndTime(endTime);
        setRemainingTime(remainingTime);
  
        console.log(startTime);
        console.log(endTime);
        console.log(remainingTime);
      };
  
      // Fetch the time initially
      fetchTimeFromContract();
  
      // Fetch the time every X milliseconds (e.g., 5000 milliseconds = 5 seconds)
      const interval = setInterval(fetchTimeFromContract, 1000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    } catch (error) {
      console.log(error.message);
    }

  };

// Example data - Replace with your actual data
// const startTime = new Date("2023-05-12T08:00:00Z");
// const endTime = new Date("2023-05-12T18:00:00Z");
// const remainingTime = endTime - Date.now(); // Calculate remaining time in milliseconds

// Format remaining time for display
// const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
// const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

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
                                {startTime.toLocaleString()}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.infoContainer2}>
                              <ScheduleIcon className={classes.icon} />
                              <Typography variant="h6">End Time</Typography>
                              <Typography variant="body1">
                                {endTime.toLocaleString()}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.infoContainer}>
                              <ScheduleIcon className={classes.icon} />
                              <Typography variant="h6">Remaining Time</Typography>
                              <Typography variant="body1">
                                {remainingTime.toLocaleString()}
                              </Typography>
                            </div>
                          </Grid>
                          {/* Add more Grid items for additional content */}
                        </Grid>
                      </Paper>

                    {/* <TimeChart /> */}
                    <TimeChart startTime={startTime} endTime={endTime} />
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


