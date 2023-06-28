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
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Web3 from 'web3';
import contractAbi from "../../abi/TimeControl.json";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";

// const networkId = "http://127.0.0.1:7545";

const drawerWidth = 200;
const mdTheme = createTheme();

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "48px",
    marginBottom: theme.spacing(1),
    alignItems: "center",
  },
}));

const Phase = (props) => {
  const [open, setOpen] = useState(true);
  // const [contracts, setContracts] = useState('');
  const [web3, setWeb3] = useState('');
  const classes = useStyles();

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [startDay, setStartDay] = useState('');
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');

  const [endDay, setEndDay] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');

  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);

  const calculateTime = async (e) => {
    // e.preventDefault();

    // Combine the individual time components to form the start and end times
    const starttime = await (parseInt(startDay) * 60*60*24) + (parseInt(startHour) * 60 * 60) + (parseInt(startMinute) * 60);
    const endtime = await (parseInt(endDay) * 60*60*24) + (parseInt(endHour) * 60 * 60) + (parseInt(endMinute) * 60);
    // window.location.href = "/admin/dashboard";
    console.log(starttime);
    console.log(endtime);
    console.log(typeof(starttime));
    console.log(typeof(endtime));
    console.log(endtime - starttime);

    setStartTime(starttime); // Update with a new number after a delay

    setEndTime(endtime);

  };

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
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

        }
        catch(error){
          console.error(`User denied account access `);
        }
      }else {
          console.error('Please install MetaMask');
      }

    };
    init(); 
  },[]);

  const clearField = () => {
    setStartDay('');
    setStartHour('');
    setStartMinute('');
    setEndDay('');
    setEndHour('');
    setEndMinute('');
  }

  const handleRegisterVotingTime = async (event) => {
    // event.preventDefault();
    calculateTime();
    try{
      // const accountss = await web3.eth.getAccounts();

      const abi = contractAbi.abi;
      const address = contractAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);

      const selectedAccount = await web3.eth.getCoinbase();
      console.log(selectedAccount)
      await contract.methods.setVotingPeriod(startTime, endTime).send({ from: selectedAccount, gas: 1000000 });

      console.log("AFTER SET VOT TIME");
      // const getTime = await contract.methods.getTime().call();
      // console.log('The time is: ', getTime);
      console.log("time is initiated successfully");
      setSuccessMessageOpen(true);
      clearField();

    }catch(error){
      if (error.message.includes("The voting time is already initiated")) {

        console.log("The voting time is already initiated")
        setErrorMessageOpen(true);
        clearField();

      } 
      console.log(error.message);
    }
  }

  const validationSchema = Yup.object().shape({
    startDay: Yup.string()
      .required("The Day field is required")
      .matches(
        /^[0-9]*$/,
        "Invalid Number"
      ),

    startHour: Yup.string()
      .required("The Hour field is required")
      .matches(
        /^[0-9]*$/,
        "Invalid Number"
      ),

    startMinute: Yup.string()
      .required("The minute field is required")
      .matches(
        /^[0-9]*$/,
        "Invalid Number"
      ),
      
    endDay: Yup.string()
      .required("The day field is required")
      .matches(
        /^[0-9]*$/,
        "Invalid Number"
      ),

    endHour: Yup.string()
      .required("The Hour field is required")
      .matches(
        /^[0-9]*$/,
        "Invalid Number"
      ),

    endMinute: Yup.string()
      .required("The minute field is required")
      .matches(
        /^[0-9]*$/,
        "Invalid Number"
      ),

  });

  const formik = useFormik({
    initialValues: {
      startDay: "",
      startHour: "",
      startMinute: "",
      endDay: null, 
      endHour: "",
      endMinute: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegisterVotingTime,
  });



  const handleStartDayChange = (event) => {
    setStartDay(event.target.value);
    formik.handleChange(event);
  };
  
  const handleStartHourChange = (event) => {
    setStartHour(event.target.value);
    formik.handleChange(event);
  };
  
  const handleStartMinuteChange = (event) => {
    setStartMinute(event.target.value);
    formik.handleChange(event);
  };
  
  const handleEndDayChange = (event) => {
    setEndDay(event.target.value);
    formik.handleChange(event);
  };
  
  const handleEndHourChange = (event) => {
    setEndHour(event.target.value);
    formik.handleChange(event);
  };
  
  const handleEndMinuteChange = (event) => {
    setEndMinute(event.target.value);
    formik.handleChange(event);
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const handleErrorSnackbarClose = () => {
    setErrorMessageOpen(false);
  };


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

                  {/* body details of the specific component */}
                  <h1 sytle="padding: 2">Initiate Voting Phase</h1>

                  <Box
                    sx={{
                      marginTop: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'right',
                    }}
                  >

                    <ScheduleIcon className={classes.icon} />
                    <Typography component="h1" variant="h5">
                      Register Voting Time Here
                    </Typography> 
                    {/* <Box component="form" noValidate sx={{ mt: 3 }}> */}
                      <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} lg={12}>
                          <form onSubmit={formik.handleSubmit}>
                            <label><h2>Set Start Voting Time</h2></label>
                              <div>
                                <TextField
                                  // fullWidth
                                  sx={{ mt: 3, mb: 2 }}
                                  id="startDay"
                                  label="Start Time - Day"
                                  name="startDay"
                                  autoComplete="family-name"
                                  value={startDay}
                                  variant="outlined"
                                  onChange={handleStartDayChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.startDay && Boolean(formik.errors.startDay)}
                                  helperText={formik.touched.startDay && formik.errors.startDay}
                                />

                                <TextField
                                  // fullWidth
                                  sx={{ mt: 3, mb: 2 }}
                                  id="startHour"
                                  label="Start Time - Hour"
                                  name="startHour"
                                  value={startHour}
                                  variant="outlined"
                                  onChange={handleStartHourChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.startHour && Boolean(formik.errors.startHour)}
                                  helperText={formik.touched.startHour && formik.errors.startHour}
                                />
                                          
                                <TextField
                                  // fullWidth
                                  sx={{ mt: 3, mb: 2 }}
                                  id="startMinute"
                                  label="Start Time - Minute"
                                  name="startMinute"
                                  value={startMinute}
                                  variant="outlined"
                                  onChange={handleStartMinuteChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.startMinute && Boolean(formik.errors.startMinute)}
                                  helperText={formik.touched.startMinute && formik.errors.startMinute}
                                />
                              </div>

                              <label><h2>Set End Voting Time</h2></label>
                              <div>
                                <TextField
                                  // fullWidth
                                  sx={{ mt: 3, mb: 2 }}
                                  id="endDay"
                                  label="End Time - Day"
                                  name="endDay"
                                  autoComplete="family-name"
                                  value={endDay}
                                  variant="outlined"
                                  onChange={handleEndDayChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.endDay && Boolean(formik.errors.endDay)}
                                  helperText={formik.touched.endDay && formik.errors.endDay}
                                />

                                <TextField
                                  // fullWidth
                                  sx={{ mt: 3, mb: 2 }}
                                  id="endHour"
                                  label="End Time - Hour"
                                  name="endHour"
                                  value={endHour}
                                  variant="outlined"
                                  onChange={handleEndHourChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.endHour && Boolean(formik.errors.endHour)}
                                  helperText={formik.touched.endHour && formik.errors.endHour}
                                />
                                          
                                <TextField
                                  // fullWidth
                                  sx={{ mt: 3, mb: 2 }}
                                  id="endMinute"
                                  label="End Time - Minute"
                                  name="endMinute"
                                  value={endMinute}
                                  variant="outlined"
                                  onChange={handleEndMinuteChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.endMinute && Boolean(formik.errors.endMinute)}
                                  helperText={formik.touched.endMinute && formik.errors.endMinute}
                                />
                              </div>
                              
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              >
                                Initiate
                              </Button>
                          </form>

                          <Snackbar
                            open={successMessageOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                          >
                            <Alert onClose={handleSnackbarClose} severity="success">
                              Woop woop! Voting time is initiated successfully!
                            </Alert>
                            </Snackbar>

                            <Snackbar
                              open={errorMessageOpen}
                              autoHideDuration={6000}
                              onClose={handleErrorSnackbarClose}
                              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                              <Alert onClose={handleSnackbarClose} severity="warning">
                                Error Error! The Voting time is already initiated!
                              </Alert>
                            </Snackbar>

                        </Grid>

                      </Grid>

                    {/* </Box> */}
                  </Box>

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

export default Phase;