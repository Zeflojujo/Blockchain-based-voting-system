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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// import { experimentalStyled as styled } from '@mui/material/styles';
import Web3 from 'web3';
import contractAbi from "../../abi/VoterRegistry.json";
import {Link} from 'react-router-dom';


  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));
  

const networkId = "http://127.0.0.1:7545";
// const contractAddress = "0x0Aadb7CFce69c12c8adc877f57D158eAb7d6703a";

const drawerWidth = 260;
const mdTheme = createTheme();


const Result = (props) => {

    const [Voters, setVoters] = useState([]);
    const [open, setOpen] = React.useState(true);
  
    useEffect(() => {
      getVoters();
    },[]);

    const getVoters = async () => {
      const web3 = new Web3(networkId);
      const abi = contractAbi.abi;
      const address = contractAbi.networks[5777].address;
      const contract = new web3.eth.Contract(abi, address);
      const voterRegNumberKeys = await contract.methods.getVoterRegNumbers().call();

      const voterData = [];

      for(let i=0; i<voterRegNumberKeys.length; i++){
        const voterRegNumber = voterRegNumberKeys[i];
        // console.log(`the registration number is: ${voterRegNumber}`);
        const voter = await contract.methods.viewVoter(voterRegNumber).call();
        voterData.push(voter);
        // console.log(voter);
      }
      // console.log(voterData)

      setVoters(voterData);

    };

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
          }} >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            <Typography component="h1" variant="h5">
                List Of Voters
            </Typography> 
              
              {/* <Paper 
                  sx={{ 
                    p: 5, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>
              <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid xs={2} sm={4} md={4}>
                          <Item>Ile</Item>
                        </Grid>
                        </Grid>
                    </Grid>
                  </Box>
              </Paper> */}
              <Grid item xs={12}>

              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}>
                  <IconButton color="inherit">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >                       
                        <Link to='/admin/regVoter'>Add New Voter</Link>
                      </Button>
                    </IconButton>


                  {/* body details of the specific component */}
                  <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Reg No.</TableCell>
                                <TableCell align="left">college</TableCell>
                                <TableCell align="left">Programe</TableCell>
                                <TableCell align="left">Year Of Study</TableCell>
                                <TableCell align="left">Block Number</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {Voters.map((voter) => (
                                <TableRow
                                key={voter.regNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left" component="th" scope="row">{voter.name}</TableCell>
                                <TableCell align="left">{voter.regNo}</TableCell>
                                <TableCell align="left">{voter.collegeName}</TableCell>
                                <TableCell align="left">{voter.programName}</TableCell>
                                <TableCell align="left">{voter.yearOfStudy}</TableCell>
                                <TableCell align="left">{voter.blockNumber}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

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

export default Result;

