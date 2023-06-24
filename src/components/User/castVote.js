import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Card, CardMedia, CardContent,CardHeader, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import NavBar from './layouts/navBar';
import SideBar from './layouts/SideBar';
import Footer from './layouts/Footer';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Web3 from 'web3';
import voterContractAbi from "../../abi/VoterContract.json";
// import VoterRegistry2 from "../../abi/VoterRegistry.json";
// import CandidatePresident from "../../abi/CandidatePresident.json";
// import CandidateGovernor from "../../abi/CandidateGovernor.json";
// import CandidateBlockLeader from "../../abi/CandidateBlockLeader.json";

import candidateAbi from "../../abi/CandidateContract.json";
import voterAbi from "../../abi/VoterContract.json";
// import contractCastVoteGovernorAbi from "../../abi/CastVote.json";


// import contractAbi from "../../abi/VoterRegistry.json";
import {
    Radio,
    FormControlLabel,
    Button,
    Avatar,
  } from '@mui/material';
  

const drawerWidth = 200;

const networkId = "http://127.0.0.1:7545";
// const networkId = "http://127.0.0.1:8545";
//port 1337

const mdTheme = createTheme();

// const presidentCandidates = [
//     {
//       id: 1,
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       phoneNumber: '123-456-7890',
//       party: 'Party A',
//       image: 'https://example.com/john-doe-image.jpg',
//     },
//   ];
  
 

const RegisterVoter = (props) => {

  const [open, setOpen] = React.useState(true);
  // const [contracts, setContracts] = useState(null);
  const [web3, setWeb3] = useState(null);
  // const [userAccounts, setUserAccounts] = useState("");
  const [governors, setGovernors] = useState([]);
  const [filteredGovernr, setFilteredGovernr] = useState(governors);
  const [presidents, setPresidents] = useState([]);
  const [blockLeaders, setBlockLeaders] = useState([]);
  const [filteredBlockLeades, setFilteredBlockLeades] = useState([]);
  const [voter, setVoter] = useState([]);
  // const [collegeName, setCollegeName] = useState("");

  const [selectedPresidentCandidate, setSelectedPresidentCandidate] = useState(null);
  const [selectedGovernorCandidate, setSelectedGovernorCandidate] = useState(null);
  const [selectedBlockLeaderCandidate, setSelectedBlockLeaderCandidate] = useState(null);

  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleDrawer = () => {
    setOpen(open);
  };

  useEffect(() => {
    console.log('use Effect');
    const init = async () => {

      console.log("hellow it's me again");
      
      if (window.ethereum) {
        try{
          // Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Create a new web3 instance
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          // Get user accounts
          // const accounts = await web3Instance.eth.getAccounts();
          // setUserAccounts(accounts);

          // const abi = candidateAbi.abi;
          // const address = candidateAbi.networks[5777].address;
          // const contract = new web3.eth.Contract(abi, address);
          // const selectedAccount = await web3.eth.getCoinbase();
          // console.log("User address2", selectedAccount);
          // const governorList = await contract.methods.voterViewGovernors(selectedAccount).call();
          // setGovernors(governorList);
          // console.log("candidate governor details: ", governorList);
          
          // console.log("User address", selectedAccount);

        }
        catch(error){
          console.error(`User denied account access `);
          console.log(error.message)
        }
      }else {
          console.error('Please install MetaMask');
      }
    };
    init(); 
    getGovernors();
    // getGovernorss();
    getPresidents();
    getBlockLeaders();
    getVoters();
    // handleFilterGovernor();

  },[voter.collegeName, governors, filteredGovernr, blockLeaders, filteredBlockLeades]);

  // const getGovernors = async () => {
  //   try{

  //     // const web3 = new Web3(networkId);
  //     // const abi = candidateAbi.abi;
  //     // const address = candidateAbi.networks[5777].address;
  //     // const contract = new web3.eth.Contract(abi, address);
  //     // const selectedAccount = await web3.eth.getCoinbase();
  //     // // console.log("User address", selectedAccount);
  //     // const governorList = await contract.methods.voterViewGovernors(selectedAccount).call();
  //     // console.log("hellow world", governorList);

      
  //     // console.log("User address", selectedAccount);


  //     // const web3 = new Web3(networkId);
  //     // const abi = contractAbi.abi;
  //     // const address = contractAbi.networks[5777].address;
  //     // const contract = new web3.eth.Contract(abi, address);
  //     // console.log("umefika hadi hapa?")
  //     // const governorList = await contract.methods.voterViewGovernors("CIVE").call();
  //     // console.log("hellow governor", governorList);

  //     // const blockData = [];

  //     // for(let i=0; i<blockRegNumberKeys.length; i++){
  //     //   const blockRegNumber = blockRegNumberKeys[i];
  //     //   const block = await contract.methods.adminViewGovernors(blockRegNumber).call();
  //     //   blockData.push(block);
  //     //   console.log("blockleader regNumber is: ", block);
  //     // }

  //     // setBlockLeaders(blockData);
  //     // console.log(blockData)

  //   }catch(error){
  //     console.log("error plese fix it before move on. ", error.message);
  //   }
    
  // };

  const getVoters = async () => {
    const abi = voterContractAbi.abi;
    const address = voterContractAbi.networks[5777].address;

    const contract = new web3.eth.Contract(abi, address);
    // setContracts(contractInstance);

    const selectedAccount = await web3.eth.getCoinbase();
    console.log(selectedAccount);
  
    const voter = await contract.methods.viewVoter(selectedAccount).call();
    // voterData.push(voter);
    console.log(voter);
  // console.log(voterData)

  setVoter(voter);

};





const getGovernors = async () => {
  const web3 = new Web3(networkId);
  const abi = candidateAbi.abi;
  const address = candidateAbi.networks[5777].address;
  console.log(address);
  const contract = new web3.eth.Contract(abi, address);
  const governorRegNumberKeys = await contract.methods.getGovernorRegNumber().call();
  console.log(governorRegNumberKeys);
  const governorData = [];

  for (let i = 0; i < governorRegNumberKeys.length; i++) {
    const governorRegNumber = governorRegNumberKeys[i];
    console.log(`The registration number is: ${governorRegNumber}`);
    const governor = await contract.methods.adminViewGovernors(governorRegNumber).call();
    governorData.push(governor);
  }
  console.log(governorData);

  setGovernors(governorData);

  const filteredGovernor = governorData.filter((governor) =>
    governor.collegeName.includes(voter.collegeName)
  );
  console.log("Filtered Governor", filteredGovernor);
  setFilteredGovernr(filteredGovernor);
};

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

    const filteredBlockLeader = blockData.filter((blockLeader) =>
    blockLeader.collegeName.includes(voter.collegeName) && blockLeader.blockNumber.includes(voter.blockNumber)
  );
  console.log("Filtered Governor", filteredBlockLeader);
  setFilteredBlockLeades(filteredBlockLeader);

  }catch(error){
    console.log(error.message);
  }
  
};

//   const getGovernors = async () => {
//     const web3 = new Web3(networkId);
//     const abi = candidateAbi.abi;
//     const address = candidateAbi.networks[5777].address;
//     console.log(address);
//     const contract = new web3.eth.Contract(abi, address);
//     const governorRegNumberKeys = await contract.methods.getGovernorRegNumber().call();
//     console.log(governorRegNumberKeys)
//     const governorData = [];




    
//     for(let i=0; i<governorRegNumberKeys.length; i++){
//       const governorRegNumber = governorRegNumberKeys[i];
//       console.log(`The registration number is: ${governorRegNumber}`);
//       const governor = await contract.methods.adminViewGovernors(governorRegNumber).call();
//       governorData.push(governor);
//     }
//       console.log(governorData)
    
//     setGovernors(governorData);

//     const filteredGovernor = governorData.filter((governor) => (
//       governor.collegeName.includes(voter.collegeName)
//     ));
//     console.log("Filtered Governor" ,filteredGovernor)
//     setFilteredGovernr(filteredGovernor);


    
// };

const getPresidents = async () => {
  const web3 = new Web3(networkId);
  const abi = candidateAbi.abi;
  const address = candidateAbi.networks[5777].address;
  // const selectedAccount = await web3.eth.getCoinbase();
  // console.log("User address", selectedAccount);
  
  const contract = new web3.eth.Contract(abi, address);
  const presidentRegNumberKeys = await contract.methods.getPresidentRegNumber().call();

  const presidentData = [];

  for(let i=0; i<presidentRegNumberKeys.length; i++){
    const presidentRegNumber = presidentRegNumberKeys[i];
    // console.log(`the registration number is: ${voterRegNumber}`);
    const president = await contract.methods.viewPresident(presidentRegNumber).call();
    presidentData.push(president);
    // console.log(president);
  }
  console.log(presidentData)

  setPresidents(presidentData);

};

// const getBlockLeaders = async () => {
//   try{
//     const web3 = new Web3(networkId);
//     const abi = candidateAbi.abi;
//     const address = candidateAbi.networks[5777].address;
//     const contract = new web3.eth.Contract(abi, address);
//     const blockRegNumberKeys = await contract.methods.getBlockLeaderRegNumber().call();

//     const blockData = [];

//     for(let i=0; i<blockRegNumberKeys.length; i++){
//       const blockRegNumber = blockRegNumberKeys[i];
//       const block = await contract.methods.adminViewBlockLeaders(blockRegNumber).call();
//       blockData.push(block);
//     }

//     setBlockLeaders(blockData);

//   }catch(error){
//     console.log(error.message);
//   }
  
// };


// Cast Vote

const handleCastVotePresident = async (event) => {
  try{

    const abi = candidateAbi.abi;
    const address = candidateAbi.networks[5777].address;
    const vAddress = voterAbi.networks[5777].address;

    const contract = new web3.eth.Contract(abi, address);

    const selectedAccount = await web3.eth.getCoinbase();
    console.log("castVote voter address: ",selectedAccount);

    await contract.methods.castVotePresident(selectedPresidentCandidate, vAddress).send({ from: selectedAccount, gas: 1000000 });

    setSuccessMessage("You successfully casting vote for president!");

  }catch(error){
    if(error.message.includes("Voter is not registered")){
      const errorMessage = "Voter is not registeredp!!!";
      setErrorMessage(errorMessage);
      setErrorMessageOpen(true);
    }
    // else if(error.message.includes("You have already registered this Governor.")){
    //   const errorMessage = "Candidate Governor is already registered!!!";
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // }else if (error.message.includes("The registered governor is enough!")) {
    //   const errorMessage = "Error Error! The Registered governor is enough!!!"
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // } else {
    //   setErrorMessage("");
    //   setErrorMessageOpen(false);
    // }
    console.error(error.message);
  }   
}

const handleCastVoteGovernor = async (event) => {
  try{

    const abi = candidateAbi.abi;
    const address = candidateAbi.networks[5777].address;
    const vAddress = voterAbi.networks[5777].address;

    const contract = new web3.eth.Contract(abi, address);

    const selectedAccount = await web3.eth.getCoinbase();
    console.log("castVote voter address: ",selectedAccount);

    await contract.methods.castVoteGovernor(selectedGovernorCandidate, vAddress).send({ from: selectedAccount, gas: 1000000 });



  }catch(error){
    if(error.message.includes("Voter is not registered")){
      const errorMessage = "Voter is not registeredg!!!";
      setErrorMessage(errorMessage);
      setErrorMessageOpen(true);
    }
    // else if(error.message.includes("You have already registered this Governor.")){
    //   const errorMessage = "Candidate Governor is already registered!!!";
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // }else if (error.message.includes("The registered governor is enough!")) {
    //   const errorMessage = "Error Error! The Registered governor is enough!!!"
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // } else {
    //   setErrorMessage("");
    //   setErrorMessageOpen(false);
    // }
    console.error(error.message);
  }   
}

const handleCastVoteBlockLeader = async (event) => {
  try{

    const abi = candidateAbi.abi;
    const address = candidateAbi.networks[5777].address;
    const vAddress = voterAbi.networks[5777].address;

    const contract = new web3.eth.Contract(abi, address);

    const selectedAccount = await web3.eth.getCoinbase();
    console.log("castVote voter address: ",selectedAccount)

    await contract.methods.castVoteBlockLeader(selectedBlockLeaderCandidate, vAddress).send({ from: selectedAccount, gas: 1000000 });



  }catch(error){
    if(error.message.includes("Voter is not registered")){
      const errorMessage = "Voter is not registeredb!!!";
      setErrorMessage(errorMessage);
      setErrorMessageOpen(true);
      window.location.href = "/user/login";

    }
    // else if(error.message.includes("You have already registered this Governor.")){
    //   const errorMessage = "Candidate Governor is already registered!!!";
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // }else if (error.message.includes("The registered governor is enough!")) {
    //   const errorMessage = "Error Error! The Registered governor is enough!!!"
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // } else {
    //   setErrorMessage("");
    //   setErrorMessageOpen(false);
    // }
    console.error(error.message);
  }   
}


// const MyComponent = () => {
//   const [data, setData] = useState([
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//     { id: 3, name: 'Bob' },
//     { id: 4, name: 'Alice' }
//   ]);

//   const filteredData = data.filter(item => item.name.startsWith('J'));

//   return (
//     <div>
//       <h1>Filtered Data:</h1>
//       <ul>
//         {filteredData.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

  const handleVotePresident = () => {
    console.log('President Candidate:', selectedPresidentCandidate);
    console.log('Governor Candidate:', selectedGovernorCandidate);
    console.log('BlockLeader Candidate:', selectedBlockLeaderCandidate);
    
    handleCastVotePresident();
  }
  const handleVoteGovernor = () => {
    console.log('President Candidate:', selectedPresidentCandidate);
    console.log('Governor Candidate:', selectedGovernorCandidate);
    console.log('BlockLeader Candidate:', selectedBlockLeaderCandidate);
    
    handleCastVoteGovernor();
  }
  const handleVoteBlockLeader = () => {
    console.log('President Candidate:', selectedPresidentCandidate);
    console.log('Governor Candidate:', selectedGovernorCandidate);
    console.log('BlockLeader Candidate:', selectedBlockLeaderCandidate);
    
    handleCastVoteBlockLeader();
  }

  const handlePresidentCandidateChange = (event) => {
    setSelectedPresidentCandidate(event.target.value);
  };

  const handleGovernorCandidateChange = (event) => {
    setSelectedGovernorCandidate(event.target.value);
  };

  const handleBlockLeaderCandidateChange = (event) => {
    setSelectedBlockLeaderCandidate(event.target.value);
  };
  

  // const handleVoteSubmit = () => {
  //   // Perform vote submission logic here
  //   console.log('President Candidate:', selectedPresidentCandidate);
  //   console.log('Governor Candidate:', selectedGovernorCandidate);
  // };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const handleErrorSnackbarClose = () => {
    setErrorMessageOpen(false);
  };
  // const handleFilterGovernor = () => {
  //   // const keyword = event.target.value;
  //   const filteredGovernor = governors.filter(governor => governor.collegeName.includes(voter.collegeName));
  //   setFilteredGovernr(filteredGovernor);
  //   console.log("Filtered Governor" ,filteredGovernor)
  // };

  // const filteredGovernor = governors.filter(governor => governor.collegeName.includes(voter.collegeName));
  // console.log("Filtered Governor" ,filteredGovernor)

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

                  



                  <Box sx={{ padding: '1rem' }}>
                    <Typography variant="h6">STUDENT'S ELECTION</Typography>

                    {/* Cast Vote for President position*/}
                  
                    <Box sx={{ marginTop: '2rem' }}>
                    <Typography variant="h6" sx={{ fontStyle: 'italic' }}>Federal Election</Typography>

                      <Grid container spacing={2} sx={{ display: 'column', alignItems: 'center' }}>
                        
                        <Card sx={{ margin: '1rem' }}>
                              <CardHeader
                                  title={
                                    <Typography variant="subtitle2" component="div">
                                      {`FEDERAL PRESIDENT`}
                                    </Typography>
                                  }
                              /> 
                                <Divider sx={{ marginY: '0.5rem' }} />
                                {presidents.map((president, index) => (
                                <Grid key={index} item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'left' }}>
                              <Box sx={{ display: 'flex', alignItems: 'left' }}>
                              
                              <CardMedia
                                component="img"
                                sx={{ width: '30%' }} 
                                height="200"
                                image="https://example.com/professional-image.jpg"
                                alt="Professional"
                              />
                              <CardContent sx={{ width: '1000px', flexGrow: 1, paddingTop: 0  }}>

                                <FormControlLabel
                                        value={president.firstName}
                                        
                                        label={
                                          <Box sx={{ display: 'subtitle1', alignItems: 'center' }}>
                                            <Avatar src={president.image} sx={{ marginRight: '0.5rem' }} />
                                            <div>
                                              <Typography variant="body1" sx={{ marginRight: '0.5rem' }}>
                                                Name: {president.firstName} {president.lastName}
                                              </Typography>
                                              <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div" >
                                                College: {president.collegeName}
                                              </Typography>
                                              <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div">
                                                Program: {president.programName}
                                              </Typography>
                                              <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div">
                                                RegNo. : {president.regNo}
                                              </Typography>
                                            </div>
                                            <Divider/>
                                          </Box>
                                        }
                                        control={
                                          <Radio
                                            color="primary"
                                            checked={selectedPresidentCandidate === president.regNo}
                                            onChange={handlePresidentCandidateChange}
                                            value={president.regNo}
                                            style={{position: "relative",left: "0px"}}
                                          />
                                        }
                                        sx={{ display: 'flex', marginBottom: '0.5rem' }}
                                      />
                              </CardContent>
                              
                              </Box>
                              </Grid>
                              ))}
                            </Card>    
                        
                      </Grid>
                    </Box>
                    <Box sx={{ marginTop: '1rem' }}>
                      <Button variant="contained" color="success" onClick={handleVotePresident}>
                        Vote
                      </Button>
                    </Box>



                    
                    {/* federal castVote for governor */}
                    
                    <Box sx={{ marginTop: '2rem' }}>

                    {/* // const MyComponent = () => { */}
                    {/* //   const [data, setData] = useState([
                    //     { id: 1, name: 'John' },
                    //     { id: 2, name: 'Jane' },
                    //     { id: 3, name: 'Bob' },
                    //     { id: 4, name: 'Alice' }
                    //   ]);

                    //   const filteredData = data.filter(item => item.name.startsWith('J'));

                    //   return (
                    //     <div>
                    //       <h1>Filtered Data:</h1>
                    //       <ul>
                    //         {filteredData.map(item => ( */}
                    {/* //           <li key={item.id}>{item.name}</li>
                    //         ))}
                    //       </ul>
                    //     </div>
                    //   );
                    // }; */}
                    <Typography variant="h6" sx={{ fontStyle: 'italic' }}>College Election</Typography>

                      <Grid container spacing={2} sx={{ display: 'column', alignItems: 'center' }}>
                        
                        <Card sx={{ margin: '1rem' }}>
                              <CardHeader
                                  title={
                                    <Typography variant="subtitle2" component="div">
                                      {`COLLEGE GOVERNOR`}
                                    </Typography>
                                  }
                              /> 
                              
                                <Divider sx={{ marginY: '0.5rem' }} />
                                {filteredGovernr.map((governor, index) => (
                                <Grid key={index} item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'left' }}>
                                  
                                  <Box sx={{ display: 'flex', alignItems: 'left' }}>
                                  
                                  <CardMedia
                                    component="img"
                                    sx={{ width: '30%' }} 
                                    height="200"
                                    image="https://example.com/professional-image.jpg"
                                    alt="Professional"
                                  />
                                  <CardContent sx={{ width: '1000px', flexGrow: 1, paddingTop: 0  }}>

                                    <FormControlLabel
                                            value={governor.firstName}
                                            
                                            label={
                                              <Box sx={{ display: 'subtitle1', alignItems: 'center' }}>
                                                <Avatar src={governor.image} sx={{ marginRight: '0.5rem' }} />
                                                <div>
                                                  <Typography variant="body1" sx={{ marginRight: '0.5rem' }}>
                                                    Name: {governor[0]} {governor.lastName}
                                                  </Typography>
                                                  <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div" >
                                                    College: {governor[2]}
                                                  </Typography>
                                                  <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div">
                                                    Program: {governor[3]}
                                                  </Typography>
                                                  <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div">
                                                    RegNo. : {governor[5]}
                                                  </Typography>
                                                </div>
                                                <Divider/>
                                              </Box>
                                            }
                                            control={
                                              <Radio
                                                color="primary"
                                                checked={selectedGovernorCandidate === governor.regNo}
                                                onChange={handleGovernorCandidateChange}
                                                value={governor.regNo}
                                                style={{position: "relative",left: "0px"}}
                                              />
                                            }
                                            sx={{ display: 'flex', marginBottom: '0.5rem' }}
                                          />
                                  </CardContent>
                                  
                                  </Box>
                                </Grid>
                              ))}
                            </Card>    
                        
                      </Grid>
                    </Box>
                    <Box sx={{ marginTop: '1rem' }}>
                      <Button variant="contained" color="success" onClick={handleVoteGovernor}>
                        Vote
                      </Button>
                    </Box>


                    {/* Cast Vote for BlockLeaders position*/}
                    <Box sx={{ marginTop: '2rem' }}>
                    <Typography variant="h6" sx={{ fontStyle: 'italic' }}>BlockLeader Election [College of Informatics and Virtual Education]</Typography>

                      <Grid container spacing={2} sx={{ display: 'column', alignItems: 'center' }}>
                        
                        <Card sx={{ margin: '1rem' }}>
                              <CardHeader
                                  title={
                                    <Typography variant="subtitle2" component="div">
                                      {`COLLEGE BLOCKLEADER`}
                                    </Typography>
                                  }
                              /> 
                                <Divider sx={{ marginY: '0.5rem' }} />
                                {blockLeaders.map((blockLeader, index) => (
                                <Grid key={index} item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'left' }}>
                              <Box sx={{ display: 'flex', alignItems: 'left' }}>
                              
                              <CardMedia
                                component="img"
                                sx={{ width: '30%' }} 
                                height="200"
                                image="https://example.com/professional-image.jpg"
                                alt="Professional"
                              />
                              <CardContent sx={{ width: '1000px', flexGrow: 1, paddingTop: 0  }}>

                                <FormControlLabel
                                        value={blockLeader.firstName}
                                        
                                        label={
                                          <Box sx={{ display: 'subtitle1', alignItems: 'center' }}>
                                            <Avatar src={filteredBlockLeades.image} sx={{ marginRight: '0.5rem' }} />
                                            <div>
                                              <Typography variant="body1" sx={{ marginRight: '0.5rem' }}>
                                                Name: {blockLeader.firstName} {blockLeader.lastName}
                                              </Typography>
                                              <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div" >
                                                College: {blockLeader.collegeName}
                                              </Typography>
                                              <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div">
                                                Program: {blockLeader.programName}
                                              </Typography>
                                              <Typography variant="body2" sx={{ marginRight: '0.5rem' ,display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem'}} component="div">
                                                RegNo. : {blockLeader.regNo}
                                              </Typography>
                                            </div>
                                            <Divider/>
                                          </Box>
                                        }
                                        control={
                                          <Radio
                                            color="primary"
                                            checked={selectedBlockLeaderCandidate === blockLeader[5]}
                                            onChange={handleBlockLeaderCandidateChange}
                                            value={blockLeader[5]}
                                            style={{position: "relative",left: "0px"}}
                                          />
                                        }
                                        sx={{ display: 'flex', marginBottom: '0.5rem' }}
                                      />
                              </CardContent>
                              
                              </Box>
                              </Grid>
                              ))}
                            </Card>    
                        
                      </Grid>
                    </Box>
                    
                    <Box sx={{ marginTop: '1rem' }}>
                      <Button variant="contained" color="success" onClick={handleVoteBlockLeader}>
                        Vote
                      </Button>
                    </Box>
                  </Box>

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