import React from 'react';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';

const Footer = (props) => {

    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          &copy;Zeflojujo Ltd: UDOSO E-Voting System 
        {" " + new Date().getFullYear()}
        {'.'}
      </Typography>
    );

}

export default Footer;
      
      
      
      
      