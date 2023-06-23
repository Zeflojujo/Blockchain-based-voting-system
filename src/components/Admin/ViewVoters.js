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
import { styled } from '@mui/styles';
import Web3 from 'web3';
// import contractAbi from "../../abi/VoterRegistry.json";
import contractAbi from "../../abi/VoterContract.json";
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
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

const drawerWidth = 260;
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


const ViewVoters = (props) => {
  const classes = useStyles();
  const [Voters, setVoters] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deletedVoter, setDeletedVoter] = useState('');

  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const openDialog = (voterAddress) => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleDel = () => {
    deleteVoter(deletedVoter)
    closeDialog();
  };

  useEffect(() => {
    getVoters();
  },[]);

  const getVoters = async () => {
    const web3 = new Web3(networkId);
    const abi = contractAbi.abi;
    const address = contractAbi.networks[5777].address;
    const contract = new web3.eth.Contract(abi, address);
    const voterRegNumberKeys = await contract.methods.getVoterRegNumbers().call();
    console.log(address);
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

  const deleteVoter = async (addressVot) => {
    const web3 = new Web3(networkId);
    const abi = contractAbi.abi;
    const address = contractAbi.networks[5777].address;
    const contract = new web3.eth.Contract(abi, address);
    const accountss = await web3.eth.getAccounts();
    await contract.methods.deleteVoter(addressVot).send({ from: accountss[0], gas: 1000000 });
    console.log(addressVot, "deleted successfully");
    setSuccessMessage("Voter deleted successfully!!!")
    setSuccessMessageOpen(true); 
    console.log("my account",accountss[0]);
    closeDialog();
  }

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
      { field: 'VoterAddress', headerName: 'voter Address', width: 390 },
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 150 },
      { field: 'regNo', headerName: 'Reg No.', width: 200 },
      { field: 'college', headerName: 'College', width: 120 },
      { field: 'program', headerName: 'Program', width: 120 },
      { field: 'yearOfStudy', headerName: 'Year Of Study', type: 'number', width: 120 },
      { field: 'blockNumber', headerName: 'Block Number', width: 120 },
      { field: 'gender', headerName: 'Gender', width: 120 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 250,
        renderCell: (params) => (
          <div>
            <UpdateButton variant="outlined" color="primary" onClick={() => handleUpdate(params.row.VoterAddress)}>
              Update
            </UpdateButton>
            <DeleteButton variant="outlined" color="warning" onClick={() => handleDelete(params.row.VoterAddress)}>
              Delete
            </DeleteButton>
          </div>
        ),
      },
    ];

    const rows = Voters.map((block, index) => ({
      id: index + 1,
      VoterAddress: block.voterAddress,
      firstName: block.firstName,
      lastName: block.lastName,
      regNo: block.regNo,
      college: block.collegeName,
      program: block.programName,
      yearOfStudy: block.yearOfStudy,
      blockNumber: block.blockNumber,
      gender: block.gender,
    }))

    const handleUpdate = (voterAddress) => {
      // Handle update logic here
      console.log('Update clicked for ID:', voterAddress);
    };
  
    const handleDelete = (voterAddress) => {
      // Handle delete logic here
      openDialog();

      setDeletedVoter(voterAddress);
      console.log('Delete clicked for ID:', voterAddress);
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
            <Typography component="h1" variant={isXs ? 'h6' : isSm ? 'h5' : 'h4'}>
                Table of Registered Voters
              </Typography>  
              <Paper 
                sx={{ 
                  p: isXs || isSm ? 1 : isMd ? 2 : 3, 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}
              >  
                              

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

                  <Snackbar
                    open={successMessageOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <Alert onClose={handleSnackbarClose} severity="success">
                      { successMessage } 
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={errorMessageOpen}
                    autoHideDuration={6000}
                    onClose={handleErrorSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <Alert onClose={handleSnackbarClose} severity="warning">
                      Error Error! The Registered President is enough!
                    </Alert>
                  </Snackbar>

                </Paper>
                  <div>
                    <IconButton onClick={openDialog}>
                      <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                    <Dialog open={isOpen} onClose={closeDialog}>
                      <DialogTitle className={classes.dialogTitle}>Delete Confirmation</DialogTitle>
                      <DialogContent>
                        <Typography variant="body1">
                          
                        </Typography>
                      </DialogContent>
                      <DialogContent>
                        <Typography variant="body1">
                          <h2 style={{textAlign: "center"}}>Are you sure?</h2>
                          <div style={{textAlign: "center"}}>Do you want to delete this Voter?
                          <br/>when you delete this data you can't recover again.</div>
                        </Typography>
                      </DialogContent>
                      <DialogActions >
                        <Button onClick={closeDialog} color="primary" style={{position:"absolute", left: 20}} variant="contained" className={classes.cancelButton}>
                          Cancel
                        </Button>
                        <Button onClick={handleDel} color="warning" variant="contained">
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
              </Grid> 
            </Grid>

            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    
  );
  
}

export default ViewVoters;

