import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { Grid, TextField,Paper } from '@mui/material';
import axios from "axios";

 function AlertDialog(props) {
 
// const {getBonusURL,logoURL, offers, rating, text2, visitURL} = props.formdata
const {
    _id: _id,
    gameId : defaultgameId,
    getBonusURL: defaultGetBonusURL,
    logoURL: defaultLogoURL,
    offers: defaultOffers,
    rating: defaultRating,
    text2: defaultText2,
    visitURL: defaultVisitURL,
  } = props.formdata;

  const [formData, setFormData] = useState({
    _id: _id,
    gameId : defaultgameId,
    getBonusURL: defaultGetBonusURL,
    logoURL: defaultLogoURL,
    offers: defaultOffers,
    rating: defaultRating,
    text2: defaultText2,
    visitURL: defaultVisitURL,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = () => {
    // Compare formData with default values to check for changes
    if (
      Object.keys(formData).some(
        (key) => formData[key] !== props.formdata[key]
      )
    ) {

        axios.put(`https://game-app-2k9q.onrender.com/api/games/${formData._id}`, formData)
        .then((response) => {
          console.log('Update successful:', response);
          props.getGamedata();
          props.handleClose(); 
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    } else {
      console.log('No changes in form data.');
    }
    props.handleClose();
  };

  return (
    <React.Fragment>
  
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         <h3>Edit Games</h3>
        </DialogTitle>
        <DialogContent>
        <Paper elevation={1} sx={{ padding: '10px' }}>
          


          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="url"
                label="Logo URL"
                // defaultValue={logoURL}
                value={formData.logoURL}
                onChange={handleInputChange}
                name="logoURL"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="Offers"
                name='offers'
                // defaultValue={offers}
                value={formData.offers}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="Text 2"
                name='text2'
                // defaultValue={text2}
                value={formData.text2}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="url"
                label="Visit URL"
                name='visitURL'
                // defaultValue={visitURL}
                value={formData.visitURL}
                  onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="url"
                label="Get Bonus URL"
                name='getBonusURL'
                // defaultValue={getBonusURL}
                value={formData.getBonusURL}
                  onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              
            </Grid>

          </Grid>
        </Paper>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSave} variant='contained' >Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default AlertDialog