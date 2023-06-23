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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './layout/Footer';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { styled } from '@mui/styles';
import Web3 from 'web3';
// import contractAbi from "../../abi/CandidateBlockLeader.json";
import candidateAbi from "../../abi/CandidateContract.json";
import { Modal, Fade, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const networkId = "http://127.0.0.1:7545";
// const networkId = "http://127.0.0.1:8545";

const drawerWidth = 200;
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.error.contrastText,
  },
  deleteIcon: {
    color: theme.palette.error.contrastText,
  },
  cancelButton: {
    color: theme.palette.primary.main,
  },
}));

const UpdateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.contrastText,
  borderColor: theme.palette.error.main,
  backgroundColor: theme.palette.error.main,
}));

// const UpdateButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.primary.main,
//   borderColor: theme.palette.primary.main,
// }));

// const DeleteButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.error.main,
//   borderColor: theme.palette.error.main,
// }));


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("The first name is required")
    .min(3, "The first name must be at least 3 characters long")
    .max(20, "The first name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z]*$/,
      "firstName can contain letters only"
    ),

  lastName: Yup.string()
    .required("The last name is required")
    .min(3, "The last name must be at least 3 characters long")
    .max(20, "The last name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z]*$/,
      "lastName can contain letters only"
    ),
    
  college: Yup.string()
    .required(
      "The college name is required"
    ),
  program: Yup.string()
    .required("The program name is required")
    .min(3, "The program name must be at least 3 characters long")
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
    .required("Registration number is required")
    .matches(
      /^[a-zA-Z]*$/,
      "Gender can only contain letters"
    ),
  blockNumber: Yup.string()
    .required("Block number is required"),
});


const ResultBlockLeader = (props) => {
  const classes = useStyles();
  const [blockLeaders, setBlockLeaders] = useState([]);
  const [open, setOpen] = React.useState(true);

  const [web3, setWeb3] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(null);    
  const [regNo, setRegNo] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [gender, setGender] = useState("");

  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deletedBlockLeader, setDeletedBlockLeader] = useState('');

  const [openn, setOpenn] = useState(false);

  const handleOpen = () => {
    setOpenn(true);
  };

  const handleClose = () => {
    setOpenn(false);
  };

  const openDialog = (voterAddress) => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleDel = () => {
    deleteBlockLeader(deletedBlockLeader)
    closeDialog();
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
    getBlockLeaders();
  },[]);


  const handleRegisterVoter = async (event) => {
    try{

      const abi = candidateAbi.abi;
      const address = candidateAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);

      const selectedAccount = await web3.eth.getCoinbase();
      console.log(selectedAccount)
      
      await contract.methods.registerBlockLeader(firstName, lastName, college, program, yearOfStudy, regNo, blockNumber).send({ from: selectedAccount, gas: 1000000 });
      
      setSuccessMessage("BlockLeader is registered successfully!");
      setSuccessMessageOpen(true);
      window.location.href="/admin/listBLs";

      setFirstName("");
      setLastName("");
      setCollege("");
      setProgram("");
      setYearOfStudy(null);
      setRegNo("");
      setBlockNumber("");
      setGender("");
      // const encodedFunctionCall = await contracts.methods.registerBlockLeader(firstName, lastName, college, program, yearOfStudy, regNo, blockNumber, gender).encodeABI();
      

      // Encode the function call using the contract method and parameters
      // const encodedFunctionCall = contract.methods.registerVoter(voterName, voterAddress, voterAge).encodeABI();

      // Create a raw transaction object
      // const rawTransaction = {
      //   from: 'fe3b557e8fb62b89f4916b721be55ceb828dbd73',
      //   to: 'DE87AF9156a223404885002669D3bE239313Ae33',
      //   gas: 1000000,
      //   gasPrice: 210000,
      //   data: encodedFunctionCall
      // };

      // Sign the raw transaction with the private key
      // const signedTransaction = web3.eth.accounts.signTransaction(rawTransaction, '8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');

            
      
      // web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      //   .on('receipt', function(receipt) {
      //     console.log('Transaction receipt:', receipt);
      //     // Handle the receipt or any other necessary logic
      //     setSuccessMessageOpen(true);

      //     setFirstName("");
      //     setLastName("");
      //     setCollege("");
      //     setProgram("");
      //     setYearOfStudy(null);
      //     setRegNo("");
      //     setBlockNumber("");
      //     setGender("");

      //   })
      //   .on('error', function(error) {
      //     console.error('Error occurred:', error);
      //     // Handle the error appropriately
      //   });

    }catch(error){
      if(error.message.includes("Only admin can perform this action")){
        const errorMessage = "Only admin can perform this action";
        setErrorMessage(errorMessage);
        setErrorMessageOpen(true);
        window.location.href = "/admin/auth";

      }
      else if(error.message.includes("You have already registered this blockLeader.")){
        const errorMessage = "BlockLeader is already registered";
        setErrorMessage(errorMessage);
        setErrorMessageOpen(true);
      }else {
        setErrorMessage("");
        setErrorMessageOpen(false);
      }
      console.error(error.message);
    }   
  }

  const getBlockLeaders = async () => {
    try{
      const web3 = new Web3(networkId);
      const abi = candidateAbi.abi;
      const address = candidateAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);
      const blockRegNumberKeys = await contract.methods.getBlockLeaderRegNumber().call();

      const blockData = [];

      for(let i=0; i<blockRegNumberKeys.length; i++){
        const blockRegNumber = blockRegNumberKeys[i];
        const block = await contract.methods.adminViewBlockLeaders(blockRegNumber).call();
        blockData.push(block);
      }

      setBlockLeaders(blockData);

    }catch(error){
      console.log(error.message);
    }
    
  };

  const deleteBlockLeader = async (regNumber) => {
    try{
      const web3 = new Web3(networkId);
      const abi = candidateAbi.abi;
      const address = candidateAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);
      const accountss = await web3.eth.getAccounts();
      const result = await contract.methods.deleteBlockLeader(regNumber).send({ from: accountss[0], gas: 1000000 });
      console.log(regNumber, "deleted successfully");
      setSuccessMessage("BlockLeader deleted successfully!!!");
      setSuccessMessageOpen(true); 
      console.log(result);

    }catch(error){
      console.log(error.message)
    }
  }

  const formik = useFormik({
    initialValues: {
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


  //Table Structures

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'regNo', headerName: 'Reg No.', width: 150 },
    { field: 'voteCount', headerName: 'Vote Count', width: 120 },
    { field: 'college', headerName: 'College', width: 120 },
    { field: 'program', headerName: 'Program', width: 120 },
    { field: 'yearOfStudy', headerName: 'Year Of Study', type: 'number', width: 120 },
    { field: 'blockNumber', headerName: 'Block Number', width: 120 },
    { field: 'position', headerName: 'Position', width: 150},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <div>
          <UpdateButton variant="outlined" color="primary" onClick={() => handleUpdate(params.row.regNo)}>
            Update
          </UpdateButton>
          <DeleteButton variant="outlined" color="secondary" onClick={() => handleDelete(params.row.regNo)}>
            Delete
          </DeleteButton>
        </div>
      ),
    },
  ];

  const rows = blockLeaders.map((block, index) => ({
    id: index + 1,
    firstName: block.firstName,
    lastName: block.lastName,
    regNo: block.regNo,
    voteCount: block.voteCount,
    college: block.collegeName,
    program: block.programName,
    yearOfStudy: block.yearOfStudy,
    blockNumber: block.blockNumber,
    position: block.position,
  }))

  const handleUpdate = (regNumber) => {
    // Handle update logic here
    console.log('Update clicked for ID:', regNumber);
  };

  const handleDelete = (regNumber) => {
    // Handle delete logic here
    // deleteBlockLeader(regNumber);
    console.log('Delete clicked for ID:', regNumber);
    openDialog();
    setDeletedBlockLeader(regNumber);
  };



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
            paddingLeft: isXs ? '16px' : isSm ? '20px' : isMd ? '24px' : isLg ? '28px' : '32px',
            paddingRight: isXs ? '16px' : isSm ? '20px' : isMd ? '24px' : isLg ? '28px' : '32px',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: isXs || isSm ? 2 : isMd ? 4 : 6, mb: isXs || isSm ? 2 : isMd ? 4 : 6 }}>
            <Grid container spacing={isXs || isSm ? 1 : isMd ? 2 : 3}>
              
            <Grid item xs={12}>

              <Paper 
                sx={{ 
                  p: isXs || isSm ? 1 : isMd ? 2 : 3, 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}
              >     
              <Typography component="h1" variant={isXs ? 'h6' : isSm ? 'h5' : 'h4'}>
                Registered BlockLeaders
              </Typography>              
                    <Button
                        // style={{ width: 300, ml: 10}}
                        type="submit"
                        variant="contained"
                        onClick={handleOpen}
                        sx={{
                          marginTop: isXs || isSm ? 2 : isMd ? 3 : 4,
                          width: isXs || isSm ? "180px": isMd ? "200px": "250px",
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                    >   
                        
                        <Typography 
                          sx={{
                            fontSize: isXs ? '12px' : isSm ? '13px' :isMd ? '16px' : '18px'
                          }}
                        >
                          {/* <AddIcon/>   */}
                          Add BlockLeader  
                        </Typography>                 
                    </Button>

                      <Grid
                        sx={{ 
                          mt: isXs || isSm ? 2 : isMd ? 2 : 2, 
                         }}
                      >
                        <Modal
                          open={openn}
                          onClose={handleClose}
                          closeAfterTransition
                        >
                          <Fade in={openn}>

                            <Box
                              sx={{ 
                                m: isXs? '20px' : isSm ? '90px' : isMd ? '100px' : '150px',
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
                                    <Typography component="h1" variant={isXs ? 'h6' : isSm ? 'h5' : 'h4'}>
                                      Candidate Registration
                                    </Typography>

                                {/* <Orders /> */}

                                  <Box
                                    sx={{
                                      marginTop: isXs || isSm ? 2 : isMd ? 3 : 4,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                      <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant={isXs ? 'h6' : isSm ? 'h5' : 'h4'}>
                                      Register Block Leader Here
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

                                      </Grid>
                                        <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
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
                                          Woop woop! { successMessage }
                                      </Alert>
                                    </Snackbar>

                                    <Snackbar
                                      open={errorMessageOpen}
                                      autoHideDuration={10000}
                                      onClose={handleErrorSnackbarClose}
                                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    >
                                      <Alert onClose={handleSnackbarClose} severity="warning">
                                      Error Error! {errorMessage}!
                                      </Alert>
                                    </Snackbar>

                                    {/* </Box> */}                           
                                  </Box>
                                </Paper>
                              </Grid> 
                            </Grid>

                            </Box>
                          </Fade>
                        </Modal>
                      </Grid>

                  {/* body details of the specific component */}

                  <div style={{ height: 650, width: '100%' }}>
                        <DataGrid
                          theme={theme}
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 10 },
                            },
                          }}
                          pageSizeOptions={[10, 15, 20]}
                          checkboxSelection
                  />
                  </div>

                </Paper>
                
              </Grid> 
            </Grid>
            <div>
                    <IconButton onClick={openDialog}>
                      <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                    <Dialog open={isOpen} onClose={closeDialog}>
                      <DialogTitle className={classes.dialogTitle}>Delete Confirmation</DialogTitle>
                      <DialogContent>
                        <Typography variant="body1">
                          <h2 style={{textAlign: "center"}}>Are you sure?</h2>
                          <div style={{textAlign: "center"}}>Do you want to delete this blockLeader?
                          <br/>when you delete this data you can't recover again.</div>
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={closeDialog} color="primary" style={{position:"absolute", left: 20}} variant="contained" className={classes.cancelButton}>
                          Cancel
                        </Button>
                        <Button onClick={handleDel} color="warning" variant="contained">
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
  
}

export default ResultBlockLeader;

