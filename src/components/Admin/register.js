import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
  
const Register = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
    return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
        <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
                <Item>
                <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
                />
                </Item>
               
            </Grid>
            <Grid item xs={8} lg={12}>
                <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
                />
            </Grid>
            <Grid item xs={8} lg={12}>
                <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
                />
            </Grid>
        </Grid>  
        </div>

    </Box>
    )
}
export default Register;