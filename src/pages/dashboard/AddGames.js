import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Grid, Button, Paper, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Editform from "../Rearrange/Editform";


function Gameadd() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logoURL: '',
    offers: '',
    text2: '',
    rating: 1,
    visitURL: '',
    getBonusURL: '',
  });
  const [gameData, setgameData] = useState();
  // const handleLogout = () => {
  //   localStorage.removeItem('adminToken');
  //   navigate('/')
  // };
  const [open, setOpen] = React.useState(false);
  const [formdata, setFormdata] = useState();

  const handleClickOpen = (item) => {
    console.log("items", item)
    setFormdata(item)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add Games
  const handleSubmit = async () => {
    console.log("formData", formData)
    try {
      const response = await axios.post('https://game-app-2k9q.onrender.com/api/games', formData);
      console.log('Game created:', response.data);
      getGamedata()
    } catch (error) {
      console.error('Error creating game:', error);
    }
    setFormData({
      logoURL: '',
      offers: '',
      text2: '',
      rating: 0,
      visitURL: '',
      getBonusURL: '',
    });
  };
  const handleDelete = (row) => {
    console.log(row)
    axios.delete(`https://game-app-2k9q.onrender.com/api/games/${row._id}`)
      .then((response) => {
        console.log(' Delete successful:', response);
        getGamedata()
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  }
  const getGamedata = () => {
    axios.get('https://game-app-2k9q.onrender.com/api/games')
      .then((res) => {
        console.log(res.data);
        setgameData(res.data.slice().sort((a, b) => a.displayOrder - b.displayOrder || []) || []); // Ensure data is an array
      })
      .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    getGamedata()
  }, [open]);



  return (
    <div>
      <div style={{ margin: '10px' }}>
        <Paper elevation={1} sx={{ padding: '10px' }}>
          <Typography sx={{ padding: '10px' }}>Add Games</Typography>


          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="url"
                label="Logo URL"
                value={formData.logoURL}
                onChange={handleChange}
                name="logoURL"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="Offers"
                name='offers'
                value={formData.offers}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="Text 2"
                name='text2'
                value={formData.text2}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label="Rating"
                name='rating'
                inputProps={{
                  min: 1,
                  max: 10,
                  step: 1,
                }}
                value={formData.rating}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="url"
                label="Visit URL"
                name='visitURL'
                value={formData.visitURL}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="url"
                label="Get Bonus URL"
                name='getBonusURL'
                value={formData.getBonusURL}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => handleSubmit()} variant='contained' sx={{ display: 'flex', float: 'right', px: '30px' }}>Save</Button>
            </Grid>

          </Grid>
        </Paper>

      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, fontSize: '20px', fontweight: '600' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Gaming APP</TableCell>
              <TableCell align="left">BONUS</TableCell>
              <TableCell align="left">OUR RATING</TableCell>
              <TableCell align="left">CLAIM BONUS</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData && gameData.map((row) => (
              <TableRow
                key={row.gameId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={row.logoURL} alt='game' />

                </TableCell>
                <TableCell align="left">
                  <h3>{row.offers}</h3>
                  <p>{row.text2}</p></TableCell>
                {/* <TableCell align="right"></TableCell> */}
                <TableCell align="left"> {row.rating}/10</TableCell>
                <TableCell align="left">
                  <a href={row.getBonusURL} style={{ textDecoration: 'none' }}> Get Bonus</a><br />
                  <a href={row.visitURL}>Visite</a></TableCell>
                <TableCell>
                  <IconButton><EditOutlinedIcon onClick={() => handleClickOpen(row)} /></IconButton>
                  <IconButton><DeleteOutlineIcon onClick={() => handleDelete(row)} /></IconButton>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formdata && <Editform open={open} formdata={formdata} handleClose={handleClose} getGamedata={getGamedata} />}
    </div>

  )
}

export default Gameadd