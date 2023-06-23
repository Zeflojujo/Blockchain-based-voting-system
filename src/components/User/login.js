import React , {useState, useEffect, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import contractAbi from "../../abi/VoterRegistry.json";
import contractAbi from "../../abi/VoterContract.json";
import Web3 from 'web3';
import { AuthContext } from './AuthProvider';

import { FormHelperText } from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// const networkId = "http://127.0.0.1:8545";
// const networkId = "http://127.0.0.1:7545";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        &copy;Zeflojujo Ltd: UDOSO E-Voting System 
      {" " + new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const validationSchema = Yup.object().shape({

  regNo: Yup.string()
    .required("Registration number is required"),

  password: Yup.string()
    .required("Password is required")
});


const theme = createTheme();

const SignIn = () => {
  const { login } = useContext(AuthContext);

  // const [contracts, setContracts] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [voters, setVoters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userAccounts, setUserAccounts] = useState("");

  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  // const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // console.log('hellow world');
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

  //Capture Voter Details during login

  const getVoters = async () => {
      const abi = contractAbi.abi;
      const address = contractAbi.networks[5777].address;

      const contract = new web3.eth.Contract(abi, address);
      // setContracts(contractInstance);

      const selectedAccount = await web3.eth.getCoinbase();
      console.log(selectedAccount);
    
      const voter = await contract.methods.viewVoter(selectedAccount).call();
      // voterData.push(voter);
      console.log(voter);
    // console.log(voterData)

    setVoters(voter);

  };

  const handleLoginVoter = async (event) => {
    if (web3 && userAccounts.length > 0) {
      try{
        // const accountss = await web3.eth.getAccounts();

        const abi = contractAbi.abi;
        const address = contractAbi.networks[5777].address;

        const contract = new web3.eth.Contract(abi, address);
        // setContracts(contractInstance);

        const selectedAccount = await web3.eth.getCoinbase();
        console.log(selectedAccount);
        const result = await contract.methods.voterLogin(regNo, password).send({ from: selectedAccount, gas: 1000000 });
        await getVoters();
        login(voters);
        if(result) {
          const sessionId = web3.utils.randomHex(32);
          window.localStorage.setItem('session', sessionId);
          window.location.hash = "/user/dashboard";
          // setSessionId(sessionId);
          // console.log(sessionId);
        }else {
          console.log("Invalid email or password");
        }
      }
      catch(error){
        if(error.message.includes("Your account is not registered!")){
          const errorMessage = "Your account is not registered!";
          setErrorMessage(errorMessage);
        }
        if(error.message.includes("Invalid registration number")){
          const errorMessage = "Invalid Username or Password";
          setErrorMessage(errorMessage);
        }
        if(error.message.includes("Invalid password")){
          const errorMessage = "Invalid Username or Password";
          setErrorMessage(errorMessage);
        }
        if(error.message.includes("Voter is already registered")){
          const errorMessage = "Voter is already registered";
          setErrorMessage(errorMessage);
        }
        
        console.log(error.message);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      // voterAddress: "",
      password: "",
      regNo: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLoginVoter,
  });

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    formik.handleChange(event);
  };
  
  const handleRegNoChange = (event) => {
    setRegNo(event.target.value);
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
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Voter/Login
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
            {/* <Grid item xs={12} sm={6} lg={6}> */}
                <TextField
                  margin="normal"
                  autoComplete="given-name"
                  name="regNo"
                  fullWidth
                  id="regNo"
                  label="Username(Reg No.)"
                  value={regNo}
                  onChange={handleRegNoChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.regNo && Boolean(formik.errors.regNo)}
                  helperText={formik.touched.regNo && formik.errors.regNo}
              />
            {/* </Grid> */}

            {/* <Grid item xs={12} sm={6} lg={6}> */}
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
              {/* </Grid> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <span>Dont you have account? <a href="/#/user/regVoter" style={{textDecoration: "none", color: '#1d9b39'}}>Create Account</a></span>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='success'
            >
              Sign In
            </Button>
            {/* {voters && (
              <div>
                <p>Voter Address: {voters.voterAddress}</p>
                <p>First Name: {voters.firstName}</p>
                <p>Last Name: {voters.lastName}</p>
                <p>College Name: {voters.collegeName}</p>
                <p>Program Name: {voters.programName}</p>
                <p>Registration Number: {voters.regNo}</p>
                <p>Year of Study: {voters.yearOfStudy}</p>
                <p>Block Number: {voters.blockNumber}</p>
                <p>Gender: {voters.gender}</p>
              </div>
            )} */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;