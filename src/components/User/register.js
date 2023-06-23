import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NavBar from './layouts/navBarHome';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './layouts/Footer';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Web3 from 'web3';
// import contractAbi from "../../abi/VoterRegistry.json";
import contractAbi from "../../abi/VoterContract.json";
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useMediaQuery } from '@mui/material';
import { FormHelperText } from '@material-ui/core';

import { useFormik } from "formik";
import * as Yup from "yup";


// const networkId = "http://127.0.0.1:7545";

const drawerWidth = 260;
const theme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("The first name is required")
    .min(3, "The first name must be at least 6 characters long")
    .max(20, "The first name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_.-]*$/,
      "firstName can only contain letters, numbers, hyphens, underscores, and periods"
    ),
  lastName: Yup.string()
    .required("The last name is required")
    .min(3, "The last name must be at least 6 characters long")
    .max(20, "The last name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_.-]*$/,
      "lastName can only contain letters, numbers, hyphens, underscores, and periods"
    ), 
  college: Yup.string()
    .required(
      "The college name is required"
    ),
  program: Yup.string()
    .required("The program name is required")
    .min(3, "The program name must be at least 6 characters long")
    .max(20, "The program name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z.]*$/,
      "programName can only contain letters and periods"
    ),
  yearOfStudy: Yup.string()
    .required("The last name is required")
    .matches(
      /^[a-zA-Z0-9_.-]*$/,
      "lastName can only contain letters, numbers, hyphens, underscores, and periods"
    ),
  regNo: Yup.string()
    .required("Registration number is required")
    .matches(
      /^[A-Za-z]\/[A-Za-z]{1,5}\/\d{4}\/\d{5}$/,
      "Invalid registration number format. Expected format: X/udom/2019/08243"
    ),
  gender: Yup.string()
    .required("Gender is required")
    .matches(
      /^[a-zA-Z]*$/,
      "Gender can only contain letters"
    ),
  blockNumber: Yup.string()
    .required("Block number is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),

  confirmPassword: Yup.string()
    .required("confirmPassword is required")
    .min(8, "confirmPassword must be at least 8 characters long")
});

  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //     "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
  // ),

const RegisterVoter = (props) => {

  const [open, setOpen] = React.useState(false);

  const [web3, setWeb3] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(null);    
  const [regNo, setRegNo] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleRegisterVoter = async (event) => {
    try{
      const abi = contractAbi.abi;
      const address = contractAbi.networks[5777].address;

      const contract = new web3.eth.Contract(abi, address);

      const selectedAccount = await web3.eth.getCoinbase();
      await contract.methods.registerVoter( firstName, lastName, college, program, yearOfStudy, regNo, blockNumber, password, gender).send({ from: selectedAccount, gas: 1000000 });
      setSuccessMessage("Woop woop! Voter is registered successfully!!!");
      setSuccessMessageOpen(true);

      window.location.href="/user/login"

      setConfirmPassword("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setCollege("");
      setProgram("");
      setYearOfStudy(null);
      setRegNo("");
      setBlockNumber("");
      setGender("");
    }catch(error){
      if(error.message.includes("Only admin can perform this action")){
        const errorMessage = "Someone is trying to register voter but fails";
        setErrorMessage(errorMessage);
        setErrorMessageOpen(true);
        }
      if(error.message.includes("Voter is already registered")){
        const errorMessage = "Voter is already registered!!!";
        setErrorMessage(errorMessage);
        setErrorMessageOpen(true);
      }
      if (error.message.includes("Invalid year of Study")) {
        const errorMessage = "Invalid year of Study. Please check your inputs.";
        setErrorMessage(errorMessage);
        setErrorMessageOpen(true);
      } 
       
      console.error('Error:', error.message);

    }
  }

    const formik = useFormik({
      initialValues: {
        voterAddress: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        college: "",
        program: "",
        yearOfStudy: null, 
        regNo: "",
        blockNumber: "",
        gender: ""
      },
      validationSchema: validationSchema,
      onSubmit: handleRegisterVoter,
    });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    formik.handleChange(event);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    formik.handleChange(event);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    formik.handleChange(event);
  };
  
  const handlelastNameChange = (event) => {
    setLastName(event.target.value);
    formik.handleChange(event);
  };
  
  const handleCollegeChange = (event) => {
    setCollege(event.target.value);
    formik.handleChange(event);
  };
  
  const handleProgramChange = (event) => {
    setProgram(event.target.value);
    formik.handleChange(event);
  };
  
  const handleYearOfStudyChange = (event) => {
    setYearOfStudy(event.target.value);
    formik.handleChange(event);
  };
  
  const handleRegNoChange = (event) => {
    setRegNo(event.target.value);
    formik.handleChange(event);
  };
  
  const handleBloclNumberChange = (event) => {
    setBlockNumber(event.target.value);
    formik.handleChange(event);
  };
  
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    formik.handleChange(event);
  };
  
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));


    const handleSnackbarClose = () => {
      setSuccessMessageOpen(false);
    };

    const handleErrorSnackbarClose = () => {
      setErrorMessageOpen(false);
    };
 

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
      
        <CssBaseline />

        <NavBar toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>
        {/* <SideBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/> */}

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
            paddingLeft: isXs ? '16px' : isSm ? '20px' : isMd ? '24px' : isLg ? '28px' : '32px',
            paddingRight: isXs ? '16px' : isSm ? '20px' : isMd ? '24px' : isLg ? '28px' : '32px',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: isXs || isSm ? 2 : isMd ? 4 : 6, mb: isXs || isSm ? 2 : isMd ? 4 : 6 }}>
            <Grid container spacing={isXs || isSm ? 1 : isMd ? 2 : 3}>
            <Grid item xs={12}>

              {/* <Paper 
                sx={{ 
                  p: isXs || isSm ? 1 : isMd ? 2 : 3, 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}
              >                    */}

                      <Grid
                        sx={{ 
                          mt: isXs || isSm ? 2 : isMd ? 4 : 6, 
                         }}
                      > 

                          <Box
                            sx={{ 
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                              {/* Modal Content */}
                            <Grid container spacing={3}>
                               
                              <Grid item xs={12}>

                              
                                <Paper 
                                  sx={{ 
                                    p: isXs || isSm ? 1 : isMd ? 2 : 3, 
                                    display: 'flex', 
                                    flexDirection: 'column' 
                                  }}
                                >

                                  <Box
                                    sx={{
                                      marginTop: isXs || isSm ? 2 : isMd ? 3 : 4,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                                      <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant={isXs ? 'h6' : isSm ? 'h5' : 'h4'}>
                                      Voter Registration Form
                                    </Typography> 

                                    {/* <Box component="form" noValidate sx={{ mt: 3 }}> */}

                                      <form onSubmit={formik.handleSubmit}>

                                    <Grid container spacing={isXs || isSm ? 1 : isMd ? 2 : 3}>
                                      
                                      <Grid item xs={12} sm={6} lg={6}>
                                      
                                        <TextField
                                          // required
                                          fullWidth
                                          id="firstName"
                                          label="First Name"
                                          name="firstName"
                                          autoComplete="family-name"
                                          value={firstName}
                                          onChange={handleFirstNameChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                          helperText={formik.touched.firstName && formik.errors.firstName}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <TextField
                                          // required
                                          fullWidth
                                          id="lastName"
                                          label="Last Name"
                                          name="lastName"
                                          autoComplete="family-name"
                                          value={lastName}
                                          onChange={handlelastNameChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                          helperText={formik.touched.lastName && formik.errors.lastName}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <FormControl variant="outlined" fullWidth
                                        error={formik.touched.college && Boolean(formik.errors.college)}
                                        >
                                        <InputLabel id="college">College Name</InputLabel>
                                        <Select
                                          labelId="college"
                                          id="college"
                                          label="College Name"
                                          name="college"
                                          autoComplete="family-name"
                                          value={college}
                                          onChange={handleCollegeChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.college && Boolean(formik.errors.college)}
                                          helperText={formik.touched.college && formik.errors.college}
                                        >
                                          <MenuItem value={""} disabled>select college name</MenuItem>
                                          <MenuItem value={"CIVE"}>CIVE</MenuItem>
                                          <MenuItem value={"COED"}>COED</MenuItem>
                                          <MenuItem value={"COES"}>COES</MenuItem>
                                          <MenuItem value={"CSBL"}>CSBL</MenuItem>
                                          <MenuItem value={"CHSS"}>CHSS</MenuItem>
                                          <MenuItem value={"CNMS"}>CNMS</MenuItem>
                                          <MenuItem value={"TIBA"}>TIBA</MenuItem>
                                        </Select>
                                        {formik.touched.college && formik.errors.college && (
                                            <FormHelperText error>{formik.errors.college}</FormHelperText>
                                        )}
                                        </FormControl>
                                      </Grid>


                                      <Grid item xs={12} sm={6} lg={6}>
                                        <TextField
                                          // required
                                          fullWidth
                                          id="program"
                                          label="Program Name"
                                          name="program"
                                          autoComplete="family-name"
                                          value={program}
                                          onChange={handleProgramChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.program && Boolean(formik.errors.program)}
                                          helperText={formik.touched.program && formik.errors.program}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <FormControl variant="outlined" fullWidth
                                        error={formik.touched.yearOfStudy && Boolean(formik.errors.yearOfStudy)}
                                        >
                                          <InputLabel id="yearOfStudy">YearOfStudy</InputLabel>
                                          <Select
                                            labelId="yearOfStudy"
                                            id="yearOfStudy"
                                            label="YearOfStudy"
                                            name="yearOfStudy"
                                            autoComplete="family-name"
                                            value={yearOfStudy}  
                                            onChange={handleYearOfStudyChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.yearOfStudy && Boolean(formik.errors.yearOfStudy)}
                                            helperText={formik.touched.yearOfStudy && formik.errors.yearOfStudy}
                                          >
                                            <MenuItem value={null} disabled>select year of study</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                          </Select>
                                          {formik.touched.yearOfStudy && formik.errors.yearOfStudy && (
                                            <FormHelperText error>{formik.errors.yearOfStudy}</FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <TextField
                                          autoComplete="given-name"
                                          name="regNo"
                                          // required
                                          fullWidth
                                          id="regNo"
                                          label="Reg No."
                                          value={regNo}
                                          onChange={handleRegNoChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.regNo && Boolean(formik.errors.regNo)}
                                          helperText={formik.touched.regNo && formik.errors.regNo}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <TextField
                                          autoComplete="given-name"
                                          name="blockNumber"
                                          // required
                                          fullWidth
                                          id="blockNumber"
                                          label="Block Number"
                                          value={blockNumber}
                                          onChange={handleBloclNumberChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.blockNumber && Boolean(formik.errors.blockNumber)}
                                          helperText={formik.touched.blockNumber && formik.errors.blockNumber}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <FormControl 
                                          variant="outlined" 
                                          fullWidth
                                          error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        >
                                          <InputLabel autoFocus id="gender">Gender</InputLabel>
                                          <Select
                                            labelId="gender"
                                            id="gender"
                                            label="gender"
                                            name="gender"
                                            value={gender}  
                                            onChange={handleGenderChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                                            helperText={formik.touched.gender && formik.errors.gender}
                                          >
                                            <MenuItem value={""} disabled>gender type</MenuItem>
                                            <MenuItem value={"MALE"}>MALE</MenuItem>
                                            <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
                                          </Select>
                                          {formik.touched.gender && formik.errors.gender && (
                                            <FormHelperText error>{formik.errors.gender}</FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>

                                      <Grid item xs={12} sm={6} lg={6}>
                                        <TextField
                                          fullWidth
                                          name="password"
                                          label="Password"
                                          type="password"
                                          id="password"
                                          autoComplete="new-password"
                                          value={password}
                                          onChange={handlePasswordChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.password && Boolean(formik.errors.password)}
                                          helperText={formik.touched.password && formik.errors.password}
                                        /> 
                                      </Grid>
                                      <Grid item xs={12} sm={6} lg={6}>
                                        <TextField
                                          fullWidth
                                          name="confirmPassword"
                                          label="Confirm Password"
                                          type="password"
                                          id="confirmPassword"
                                          autoComplete="new-password"
                                          value={confirmPassword}
                                          onChange={handleConfirmPasswordChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        /> 
                                      </Grid>

                                      </Grid>
                                        <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="success"
                                        >
                                        Register 
                                      </Button>

                                    </form>

                                    <Snackbar
                                      open={successMessageOpen}
                                      autoHideDuration={6000}
                                      onClose={handleSnackbarClose}
                                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    >
                                      <Alert onClose={handleSnackbarClose} severity="success">
                                        {successMessage}
                                      </Alert>
                                    </Snackbar>
                                    <Snackbar
                                      open={errorMessageOpen}
                                      autoHideDuration={6000}
                                      onClose={handleErrorSnackbarClose}
                                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    >
                                      <Alert onClose={handleSnackbarClose} severity="warning">
                                        {errorMessage}
                                      </Alert>
                                    </Snackbar>

                                    {/* </Box> */}                           
                                  </Box>
                                </Paper>
                              </Grid> 

                            </Grid>

                          </Box>
                      </Grid> 

                {/* </Paper> */}

              </Grid> 
            </Grid>

            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
  
}

export default RegisterVoter;

