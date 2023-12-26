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
// import Editform from "../Rearrange/Editform";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import './dashboard.css';




function Gameadd() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logoURL: '',
    offers: '',
    text2: '',
    rating: 1,
    visitURL: '',
    getBonusURL: '',
    gamename:'',
    votes:'',
    ribbontext:''
  });
  const [gameData, setgameData] = useState();
 

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
      votes :'',
      ribbontext:'',
      gamename:''
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
        let GameSortdata= res.data.slice().sort((a, b) => a.displayOrder - b.displayOrder || []) || []
        // .slice().sort((a, b) =>  b.rating - a.rating)|| []
        setgameData(GameSortdata) ; 
      })
      .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    getGamedata()
  }, [open]);

  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  

  const handleClickOpen = (row) => {
    setEditMode(true);
    setEditedRow({ ...row }); // Create a copy of the row to edit
  };

  const handleSave = () => {
    // Find the index of the edited row in gameData
    const index = gameData.findIndex((row) => row.gameId === editedRow.gameId);
    if (index !== -1) {
      // Update the specific row in gameData with the editedRow data
      const updatedGameData = [...gameData];
      updatedGameData[index] = editedRow;
      setgameData(updatedGameData);
      console.log("upadate", editedRow)
      axios.put(`https://game-app-2k9q.onrender.com/api/games/${editedRow._id}`, editedRow)
        .then((response) => {
          console.log('Update successful:', response);
          props.getGamedata();
          props.handleClose(); 
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    }
    setEditMode(false);
    setEditedRow(null);
  };

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
                label="Game Name"
                value={formData.gamename}
                onChange={handleChange}
                name="gamename"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="Text 1"
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
                type="text"
                label="Ribbon Text"
                name='ribbontext'
                value={formData.ribbontext}
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
                type="number"
                label="Votes"
                name='votes'
                value={formData.votes}
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
      <Table aria-label="simple table" className="customTable" >
      <TableHead>
            <TableRow>
              <TableCell>Gaming APP</TableCell>
              <TableCell align="left">BONUS</TableCell>
              <TableCell align="left">OUR RATING</TableCell>
              <TableCell align="left">Votes</TableCell>
              <TableCell align="left">Ribbon Text</TableCell>
              <TableCell align="left">CLAIM BONUS</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {gameData && gameData.map((row) => (
            <TableRow key={row.gameId}>
              <TableCell component="th" scope="row">
              {editMode && editedRow?.gameId === row.gameId ? (<div>
                    <TextField
                      type="text"
                      value={editedRow.logoURL}
                      onChange={(e) => setEditedRow({ ...editedRow, logoURL: e.target.value })}
                      fullWidth
                    />
                  </div>):
                  <a href={row.getBonusURL} target="_blank" rel="noreferrer">
                  <img src={row.logoURL} alt='game' width={'100px'} height={'50px'} />
                </a>}
                
              </TableCell>
              <TableCell align="left">
                {editMode && editedRow?.gameId === row.gameId ? (
                  <div>
                    <TextField
                      type="text"
                      value={editedRow.offers}
                      onChange={(e) => setEditedRow({ ...editedRow, offers: e.target.value })}
                      fullWidth
                    />
                    <br />
                    <TextField
                      type="text"
                      value={editedRow.text2}
                      onChange={(e) => setEditedRow({ ...editedRow, text2: e.target.value })}
                      fullWidth
                      sx={{marginTop:'10px'}}
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant='h5'>{row.offers}</Typography>
                    <Typography variant='body2'>{row.text2}</Typography>
                  </div>
                )}
              </TableCell>
              <TableCell align="left">
                {editMode && editedRow?.gameId === row.gameId ? (
                  <div>
                    <TextField
                      type="text"
                      value={editedRow.rating}
                      onChange={(e) => setEditedRow({ ...editedRow, rating: e.target.value })}
                      
                      fullWidth
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant='body2'>{row.rating}</Typography>
                  </div>
                )}
              </TableCell>
              <TableCell align='left'>  
              {editMode && editedRow?.gameId === row.gameId ? (
                  <div>
                    <TextField
                      type="text"
                      value={editedRow.votes}
                      onChange={(e) => setEditedRow({ ...editedRow, votes: e.target.value })}
                     fullWidth
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant='body2'>{row.votes}</Typography>
                  </div>
                )}</TableCell>
              <TableCell align='left'>
              {editMode && editedRow?.gameId === row.gameId ? (
                  <div>
                    <TextField
                      type="text"
                      value={editedRow.ribbontext}
                      onChange={(e) => setEditedRow({ ...editedRow, ribbontext: e.target.value })}
                      style={{width:'120px'}}
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant='body2'>{row.ribbontext}</Typography>
                  </div>
                )}
                </TableCell> 
              <TableCell align="left">
                {editMode && editedRow?.gameId === row.gameId ? (
                  <div>
                    <TextField
                      type="text"
                      value={editedRow.getBonusURL}
                      onChange={(e) => setEditedRow({ ...editedRow, getBonusURL: e.target.value })}
                      fullWidth
                    />
                    <br />
                    <TextField
                      type="text"
                      value={editedRow.visitURL}
                      onChange={(e) => setEditedRow({ ...editedRow, visitURL: e.target.value })}
                      sx={{marginTop:'10px'}}
                      fullWidth
                    />
                  </div>
                ) : (
                  <div>
                    <Typography ><a href={row.getBonusURL}>Get Bonus</a></Typography>
                    <Typography > <a href={row.visitURL}> Visite&nbsp;{row.gamename}</a></Typography>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {editMode && editedRow?.gameId === row.gameId ? (
                  <IconButton onClick={handleSave}>
                    <SaveOutlinedIcon style={{color:'green', fontSize:'25px'}}/>
                  </IconButton>
                  
                ) : (
                  <IconButton onClick={() => handleClickOpen(row)} >
                    <EditOutlinedIcon  style={{fontSize:'25px'}}/>
                  </IconButton>
                )}
                  <IconButton><DeleteOutlineIcon onClick={() => handleDelete(row)} style={{color:'red',fontSize:'25px'}}/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

  )
}

export default Gameadd