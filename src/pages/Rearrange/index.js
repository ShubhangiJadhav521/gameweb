import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from '@mui/material';

import {useNavigate} from "react-router-dom"


function ListSort() {
  const [gameData, setGameData] = useState([]);
  // const [newDataItem, setnewDataItem] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  })

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const reorderItems = (list, startIndex, endIndex) => {
    const newList = [...list];
    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);
    return newList;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== dragOverItem.current) {
      const reorderedData = reorderItems(gameData, dragItem.current, dragOverItem.current);
      setGameData(reorderedData);

      // const dataToSend = reorderedData.map(({ _id, ...rest }) => rest);

      // const dataToSend = reorderedData.map((item) => {
      //   const _id = item._id; // This line assigns the value of item._id to _id
      //   const { _id: removedId, ...rest } = item;
      //   console.log(removedId, _id) // This line removes _id from the rest of the object
      //   return rest;
      // });

      axios.put('https://game-app-2k9q.onrender.com/api/games/reorder', { updatedGameData: reorderedData })
        .then((res) => {
          console.log('Reordering successful:', res.data);
          Getgame();
        })
        .catch((error) => {
          console.error('Error while reordering:', error);
        });
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };


  const Getgame = () => {
    axios.get('https://game-app-2k9q.onrender.com/api/games')
      .then((res) => {
        console.log(res.data);
        setGameData(res.data.slice().sort((a, b) => a.displayOrder - b.displayOrder || [])); // Ensure data is an array
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {

    Getgame()
  }, []);



  return (
    <div className="app">
      {/* <h2>Game List</h2> */}
      <Grid container spacing={2} sx={{ marginRight: '10px',alignItems:'center',display:'flex', }}>
        <Grid item xs={12} sx={{ color: 'black', textAlign: 'center' , justifyContent:'center' }}  >
          <Grid container sx={{marginLeft:'25px'}} >
            <Grid item xs={1}></Grid>
            <Grid item xs={3} >
              <Typography  >Gaming APP</Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography >BONUS</Typography>
            </Grid>

          </Grid>
        </Grid>
      </Grid>

      <div className="list-sort" style={{alignItems:'center',display:'flex', flexDirection:'column'}}>
        {gameData.map((item, index) => (
          <div
            key={index}
            className="list-item"
            draggable="true"
            onDragStart={() => handleDragStart(index)} // Call handleDragStart with the current index
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            style={{
              margin: '8px 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: 'white',
              padding: '10px',
              alignItems: 'center',
              display: 'flex',
              placeContent: 'center',
              justifyContent:'center',
              width: '80%'
            }}
          >
            <Grid container item xs={12} sx={{ alignItems: 'center',textAlign:'center' }} >
              <Grid item xs={12} sm={1} sx={{fontWeight:'900'}}>{index + 1}</Grid>
              <Grid item xs={12} sm={3}>
                <img src={item.logoURL} alt="game" height={'100px'} width={'100px'} />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginLeft: '30px', }}>
                <h3>{item.offers}</h3>
                <p>{item.text2}</p>
              </Grid>

            </Grid>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ListSort;
