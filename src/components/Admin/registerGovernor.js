import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import NavBar from './layout/navBar';
import SideBar from './layout/SideBar';
import Footer from './layout/Footer';
import Web3 from 'web3';
import contractAbi from "../../abi/CandidateRegistry.json";


const networkId = "http://127.0.0.1:7545";

const drawerWidth = 260;
const mdTheme = createTheme();


const RegisterGovernor = (props) => {

  const [contracts, setContracts] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(0);
  const [regNo, setRegNo] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [gender, setGender] = useState("");

  const [open, setOpen] = useState(true);


  useEffect(() => {
    const init = async () => {
      try{
          const web3Instance = new Web3(networkId);
          setWeb3(web3Instance);

          const abi = contractAbi.abi;
          const address = contractAbi.networks[5777].address;

          const contractInstance = new web3Instance.eth.Contract(abi, address);
          setContracts(contractInstance);

      }catch(error){
          console.log("there is a problem on this transation")
      }

    };
    init(); 
  },[]);

  const handleRegisterGovernor = async (event) => {
    event.preventDefault();
    const accountss = await web3.eth.getAccounts();
    await contracts.methods.registerGovernor(name, college, program, yearOfStudy, regNo, blockNumber, gender).send({ from: accountss[0], gas: 1000000 });
  }
  
  const toggleDrawer = () => {
    setOpen(!open);
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
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Typography component="h1" variant="h4">
                  Candidate Registration
                </Typography>
              <Grid item xs={12}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>

                 {/* <Orders /> */}

                  <Box
                    sx={{
                      marginTop: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Register Gonvernor Here
                    </Typography> 
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} lg={6}>
                          <TextField
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoComplete="family-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                          <TextField
                            required
                            fullWidth
                            id="collegeName"
                            label="College Name"
                            name="collegeName"
                            autoComplete="family-name"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                          <TextField
                            required
                            fullWidth
                            id="programName"
                            label="Program Name"
                            name="programName"
                            autoComplete="family-name"
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                          <TextField
                            required
                            fullWidth
                            id="yearOfStudy"
                            label="YearOfStudy"
                            name="yearOfStudy"
                            autoComplete="family-name"
                            value={yearOfStudy}
                            onChange={(e) => setYearOfStudy(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                          <TextField
                            autoComplete="given-name"
                            name="Reg No."
                            required
                            fullWidth
                            id="Reg No."
                            label="Reg No."
                            autoFocus
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                          <TextField
                            autoComplete="given-name"
                            name="blockNumber"
                            required
                            fullWidth
                            id="blockNumber"
                            label="Block Number"
                            autoFocus
                            value={blockNumber}
                            onChange={(e) => setBlockNumber(e.target.value)}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6} lg={6}>
                           <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </Grid>

                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegisterGovernor}
                      >
                        Register 
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

export default RegisterGovernor;
