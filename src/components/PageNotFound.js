
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: theme.spacing(2),
  },
  errorCode: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: '5rem',
    },
  },
  message: {
    fontSize: '1.5rem',
    textAlign: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
  },
  button: {
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h1" className={classes.errorCode}>
        404
      </Typography>
      <Typography variant="h5" className={classes.message}>
        Oops! The page you're looking for could not be found.
      </Typography>
      <Button variant="contained" style={{marginTop: 10, textAlign: "center"}} color="primary" href="/" className={classes.button}>
        Go Back to Homepage
      </Button>
    </Box>
  );
};

export default PageNotFound;


