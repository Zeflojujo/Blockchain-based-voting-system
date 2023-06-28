import React, { useState, useEffect } from "react";
// import { Modal, Fade, Backdrop, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NavBar from './layouts/navBar';
import SideBar from './layouts/SideBar';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './layouts/Footer';
// import { Snackbar } from '@mui/material';
// import { Alert } from '@mui/material';
// import { styled } from '@mui/styles';
import Web3 from 'web3';
// import contractAbi from "../../abi/CandidateRegistry.json";
// import candidateAbi from "../../abi/CastVote.json";
// import candidateAbi from "../../abi/CandidateContract.json";
import AccessControlAbi from "../../abi/AccessControl.json";
import GovernorAbi from "../../abi/CandidateGovernor.json";
import PresidentAbi from "../../abi/CandidatePresident.json";
import BlockLeaderAbi from "../../abi/CandidateBlockLeader.json";
// import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery } from '@mui/material';
  

const networkId = "http://127.0.0.1:7545";

const drawerWidth = 200;
const theme = createTheme();


const ResultPresident = (props) => {

  const [winnerCandidate, setWinnerCandidate] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [result, setResult] = React.useState(false);
  
  // const [openn, setOpenn] = useState(false);
  // const [contracts, setContracts] = useState(null);
  // const [web3, setWeb3] = useState(null);

  // const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  // const classes = useStyles();
  

  // const handleOpen = () => {
  //   setOpenn(true);
  // };

  // const handleClose = () => {
  //   setOpenn(false);
  // };



  
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
      getResult();
      getWinnerPresident();
    },[]);

    

    const getResult = async () => {
        const web3 = new Web3(networkId);
      const abi = AccessControlAbi.abi;
      const address = AccessControlAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);

      console.log("before publish");

      const result = await contract.methods.getPublished().call();

      console.log(result);

      setResult(result);
    }


    const getWinnerPresident = async () => {
      const web3 = new Web3(networkId);
      const abi = PresidentAbi.abi;
      const address = PresidentAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);

      const abiG = GovernorAbi.abi;
      const addressG = GovernorAbi.networks[5777].address;
      const contractG = new web3.eth.Contract(abiG, addressG);

      const abiB = BlockLeaderAbi.abi;
      const addressB = BlockLeaderAbi.networks[5777].address;
      const contractB = new web3.eth.Contract(abiB, addressB);

      const winnerData = [];

      const winnerPresidentData = await contract.methods.getWinnerPresident().call();
      const winnerGovernorData = await contractG.methods.getWinnerGovernor().call();
      const winnerBlockLeaderData = await contractB.methods.getWinnerBlockLeader().call();
      winnerData.push(winnerPresidentData);
      winnerData.push(winnerGovernorData);
      winnerData.push(winnerBlockLeaderData);
      
      console.log(winnerPresidentData)
      console.log(winnerGovernorData)
      console.log(winnerBlockLeaderData)

      setWinnerCandidate(winnerData);

    };


    const toggleDrawer = () => {
      setOpen(!open);
    };
    
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));


    //Table Structures

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'fullName', headerName: 'Name', width: 200 },
      { field: 'college', headerName: 'College', width: 120 },
      { field: 'position', headerName: 'Position', width: 150 },
      { field: 'voteCount', headerName: 'Vote Count', width: 120 },
      
    ];

    const rows = winnerCandidate.map((block, index) => ({
      id: index + 1,
      fullName: block[0] + " " + block[1],
      college: block[2],
      position: block[3],
      voteCount: block[4],
    }));

    // const columns = [
    //   { field: 'id', headerName: 'ID', width: 90 },
    //   { field: 'firstName', headerName: 'First Name', width: 150 },
    //   { field: 'lastName', headerName: 'Last Name', width: 150 },
    //   { field: 'regNo', headerName: 'Reg No.', width: 150 },
    //   { field: 'voteCount', headerName: 'Vote Count', width: 120 },
    //   { field: 'college', headerName: 'College', width: 120 },
    //   { field: 'program', headerName: 'Program', width: 120 },
    //   { field: 'yearOfStudy', headerName: 'Year Of Study', type: 'number', width: 120 },
    //   { field: 'blockNumber', headerName: 'Block Number', width: 120 },
    //   { field: 'gender', headerName: 'Gender', width: 120 },
    // ];

    // const rows = winnerCandidate.map((block, index) => ({
    //   id: index + 1,
    //   firstName: block.firstName,
    //   lastName: block.lastName,
    //   regNo: block.regNo,
    //   voteCount: block.voteCount,
    //   college: block.collegeName,
    //   program: block.programName,
    //   yearOfStudy: block.yearOfStudy,
    //   blockNumber: block.blockNumber,
    //   gender: block.gender,
    // }));


    // const handleSnackbarClose = () => {
    //   setSuccessMessageOpen(false);
    // };

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
              

              {
                result? 
                <div>
                  <Typography component="h3" variant={isXs ? 'h6' : isSm ? 'h5' : 'h5'}>
                    Overall Results
                  </Typography> 

                  <div style={{marginTop: "15px", height: 300, width: '100%' }}>
                        <DataGrid
                          theme={theme}
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 5 },
                
            },
                          }}
                          pageSizeOptions={[5, 15, 20]}
                          // checkboxSelection
                    />
                    </div>
                  </div>
                
                : <h2 style={{textAlign: "center"}}>Voting is On Progress...</h2>
              }
                  

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

export default ResultPresident;

