import React , {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import contractAbi from "../../abi/VoterRegistry.json";
import contractAdminAuthenticationAbi from "../../abi/AdminAuthentication.json";
import Web3 from 'web3';

import { FormHelperText } from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// const networkId = "http://127.0.0.1:7545";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'@'}
        Blockchain Based Electronic Voting System 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const validationSchema = Yup.object().shape({

  username: Yup.string()
    .required("Username is required"),

  password: Yup.string()
    .required("Password is required")
});



const theme = createTheme();

const SignIn = () => {

  // const [contracts, setContracts] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [userAccounts, setUserAccounts] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [sessionId, setSessionId] = useState("");

  useEffect(() => {

    const init = async () => {
      if (window.ethereum) {
        try{
          // Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create a new web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get user accounts
          const accounts = await web3Instance.eth.getAccounts();
          setUserAccounts(accounts);
        }
        catch(error){
          console.error(`User denied account access `);
        }
      }else {
        console.error('Please install MetaMask');
      }
    };
    init();
  }, []);

  const handleLoginAdmin = async (event) => {
    if (web3 && userAccounts.length > 0) {
      try{
        // const accountss = await web3.eth.getAccounts();

        const abi = contractAdminAuthenticationAbi.abi;
        const address = contractAdminAuthenticationAbi.networks[5777].address;

        const contract = new web3.eth.Contract(abi, address);
        // setContracts(contractInstance);

        const selectedAccount = await web3.eth.getCoinbase();
        const result = await contract.methods.adminAuth(username, password).send({ from: selectedAccount, gas: 1000000 });
        console.log('Data sent to contract successfully');
        console.log(selectedAccount);
        if(result) {
          const sessionId = web3.utils.randomHex(32);
          window.localStorage.setItem('session', sessionId);
          window.location.hash = "/admin/dashboard";
          // setSessionId(sessionId);
          console.log(sessionId);
        }else {
          console.log("Invalid address or password");
        }
      }
      catch(error){
        if(error.message.includes("Only admin can perform this action")){
          const errorMessage = "Please, Login with administrator wallet account";
          setErrorMessage(errorMessage);
        }
        else if(error.message.includes("Please, Login with administrator ethereum account")){
          const errorMessage = "Invalid Username or Password";
          setErrorMessage(errorMessage);
        }
        else if(error.message.includes("Invalid public address")){
          const errorMessage = "Invalid Username or Password";
          setErrorMessage(errorMessage);
        }
        else if(error.message.includes("Invalid password")){
          const errorMessage = "Invalid Username or Password";
          setErrorMessage(errorMessage);
        }
        else if(error.message.includes("username and password cannot be empty")){
          const errorMessage = "username and password cannot be empty";
          setErrorMessage(errorMessage);
        }
        else{
          console.log(error.message);
        }
      }
    }
    
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLoginAdmin,
  });

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    formik.handleChange(event);
  };
  
  const handleAdminUsername = (event) => {
    setUsername(event.target.value);
    formik.handleChange(event);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Administrator/Auth
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMessage
              ? <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert variant="outlined" severity="error">
                    <FormHelperText error>{errorMessage}</FormHelperText>
                  </Alert>
                </Stack>
              : ""
            }
          

            <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  margin="normal"
                  autoComplete="username"
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"
                  value={username}
                  onChange={handleAdminUsername}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;