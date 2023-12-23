import { useEffect} from 'react';
import {useNavigate} from "react-router-dom";


// material-ui
import {
  Grid,
  Typography
} from '@mui/material';

// project import
import  AddGames from './AddGames';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
}) 

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Add Games</Typography>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

    

      {/* row 3 */}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          
          <Grid item />
        </Grid>
       
          <AddGames />
      
      </Grid>
     
    </Grid>
  );
};

export default DashboardDefault;
