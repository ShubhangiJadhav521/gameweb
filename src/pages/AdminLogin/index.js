import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
   
    try {
      const response = await axios.post('https://game-app-back.onrender.com/auth/login', credentials);
      const { token, status } = response.data;

      if (status == 'Success') {
        localStorage.setItem('adminToken', token);
        toast.success('Login Successful', {
          autoClose: 2000, 
          position: 'bottom-right', 
        });
        setTimeout(() => {
          navigate('/mainlayout/dashboard')
        }, 2000);
        
      }else{
        toast.error('Invalid Credentials', {
          autoClose: 2000, 
          position: 'top-right', 
        });
      }

    } catch (error) {
    
      console.error('Login error:', error);
    }
    setCredentials({
      username: '',
      password: '',
    });
  };


  return (
    <LoginContainer>
      <Paper elevation={1} sx={{ padding: '30px', alignItems: 'center' }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4">Admin Login</Typography>
        </Box>

        <Box sx={{ minWidth: 300 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="username"
                variant="outlined"
                fullWidth
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Paper>
      <ToastContainer/>
    </LoginContainer>
   
  );
};

export default LoginForm;
