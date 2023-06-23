import React, { useState, useEffect } from 'react';
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
import Web3 from 'web3';
import contractAbi from "../../abi/CandidateGovernor.json";
import { useMediaQuery } from '@mui/material';
import {
    Radio,
    FormControlLabel,
    Typography,
    Button,
    Avatar,
  } from '@mui/material';
  
const drawerWidth = 260;
// const networkId = "http://127.0.0.1:7545";
// const networkId = "http://127.0.0.1:8545";

const theme = createTheme();

const presidentCandidates = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      party: 'Party A',
      image: 'https://example.com/john-doe-image.jpg',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '987-654-3210',
      party: 'Party B',
      image: 'https://example.com/jane-smith-image.jpg',
    },
  ];
  
  const governorCandidates = [
    {
      id: 1,
      firstName: 'David',
      lastName: 'Johnson',
      email: 'david.johnson@example.com',
      phoneNumber: '555-123-4567',
      party: 'Party X',
      image: 'https://example.com/david-johnson-image.jpg',
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      phoneNumber: '111-222-3333',
      party: 'Party Y',
      image: 'https://example.com/sarah-williams-image.jpg',
    },
  ];

const RegisterVoter = (props) => {

  const [open, setOpen] = React.useState(true);

    // const [contracts, setContracts] = useState(null);
    const [web3, setWeb3] = useState(null);
  // const [userAccounts, setUserAccounts] = useState("");


  const toggleDrawer = () => {
    setOpen(open);
  };

  useEffect(() => {
    const init = async () => {
      console.log("hellow it's me again");
      if (window.ethereum) {
        try{
          // Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create a new web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get user accounts
          // const accounts = await web3Instance.eth.getAccounts();
          // setUserAccounts(accounts);
        }
        catch(error){
          console.error(`User denied account access `);
        }
      }else {
          console.error('Please install MetaMask');
      }
    };
    
    init(); 
    getGovernors();
  },[]);

  const getGovernors = async () => {
    try{
      // const web3 = new Web3(networkId);
      const abi = contractAbi.abi;
      const address = contractAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);
      const selectedAccount = await web3.eth.getCoinbase();
      console.log("User address", selectedAccount);
      const governorList = await contract.methods.voterViewGovernors(selectedAccount).call();
      console.log("hellow world", governorList);

      
      console.log("User address", selectedAccount);

      // const blockData = [];

      // for(let i=0; i<blockRegNumberKeys.length; i++){
      //   const blockRegNumber = blockRegNumberKeys[i];
      //   const block = await contract.methods.adminViewGovernors(blockRegNumber).call();
      //   blockData.push(block);
      //   console.log("blockleader regNumber is: ", block);
      // }

      // setBlockLeaders(blockData);
      // console.log(blockData)

    }catch(error){
      console.log("error message", error.message);
    }
    
  };

  const [selectedPresidentCandidate, setSelectedPresidentCandidate] = useState(null);
  const [selectedGovernorCandidate, setSelectedGovernorCandidate] = useState(null);

  const handlePresidentCandidateChange = (event) => {
    setSelectedPresidentCandidate(event.target.value);
  };

  const handleGovernorCandidateChange = (event) => {
    setSelectedGovernorCandidate(event.target.value);
  };

  const handleVoteSubmit = () => {
    // Perform vote submission logic here
    console.log('President Candidate:', selectedPresidentCandidate);
    console.log('Governor Candidate:', selectedGovernorCandidate);
  };

  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));

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
          }} >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              
              <Grid item xs={12}>
              <Typography component="h1" variant={isXs ? 'h6' : isSm ? 'h5' : 'h4'}>
               Ballot
              </Typography> 
              
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>

                  



<Box sx={{ padding: '1rem' }}>
      <Typography variant="h6">STUDENT'S ELECTION</Typography>
      <Typography variant="h6">Federal Election</Typography>
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant="subtitle1">President Candidate:</Typography>
        {presidentCandidates.map((candidate) => (
          <Box key={candidate.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <FormControlLabel
              value={candidate.firstName}
              control={
                <Radio
                  color="primary"
                  checked={selectedPresidentCandidate === candidate.firstName}
                  onChange={handlePresidentCandidateChange}
                  value={candidate.firstName}
                />
              }
              label={
                <React.Fragment>
                  <Avatar src={candidate.image} sx={{ marginRight: '0.5rem' }} />
                  <Typography variant="body1">
                    {candidate.firstName} {candidate.lastName}
                  </Typography>
                  <Typography variant="body2">Email: {candidate.email}</Typography>
                  <Typography variant="body2">Phone: {candidate.phoneNumber}</Typography>
                  <Typography variant="body2">Party: {candidate.party}</Typography>
                </React.Fragment>
              }
              sx={{ flex: 1 }}
            />
            {/* <Box>
              <Typography variant="caption">Email: {candidate.email}</Typography>
              <Typography variant="caption">Phone: {candidate.phoneNumber}</Typography>
              <Typography variant="caption">Party: {candidate.party}</Typography>
            </Box> */}
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant="subtitle1">Governor Candidate:</Typography>
        {governorCandidates.map((candidate) => (
          <Box key={candidate.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <FormControlLabel
              value={candidate.firstName}
              control={
                <Radio
                  color="primary"
                  checked={selectedGovernorCandidate === candidate.firstName}
                  onChange={handleGovernorCandidateChange}
                  value={candidate.firstName}
                />
              }
              label={
                <React.Fragment>
                  <Avatar src={candidate.image} sx={{ marginRight: '0.5rem' }} />
                  <Typography variant="body1">
                    {candidate.firstName} {candidate.lastName}
                  </Typography>
                  <Typography variant="body2">Email: {candidate.email}</Typography>
                  <Typography variant="body2">Phone: {candidate.phoneNumber}</Typography>
                  <Typography variant="body2">Party: {candidate.party}</Typography>
                </React.Fragment>
              }
              sx={{ flex: 1 }}
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <Button variant="contained" color="primary" onClick={handleVoteSubmit}>
          Submit Vote
        </Button>
      </Box>
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

export default RegisterVoter;