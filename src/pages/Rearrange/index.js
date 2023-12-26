import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from '@mui/material';

import {useNavigate} from "react-router-dom";
import "../dashboard/dashboard.css";


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
        let GameSortdata= res.data.slice().sort((a, b) => a.displayOrder - b.displayOrder || []) || []
        // .slice().sort((a, b) =>  b.rating - a.rating)|| []
        setGameData(GameSortdata) ; 
        
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {

    Getgame()
  }, []);



  return (
    <div className="app">
    <div className="header">
      <Grid container spacing={2} > 
        <Grid item xs={12} sx={{ color: 'black', textAlign: 'center' }}  >
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={3} >
              <Typography>Gaming APP</Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>BONUS</Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography >RATING</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  
    <div className="list-sort" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      {gameData.map((item, index) => (
        <div
          key={index}
          className="list-item"
          draggable="true"
          onDragStart={() => handleDragStart(index)}
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
            justifyContent: 'center',
            width: '80%'
          }}
        >
          <Grid container item xs={12} sx={{ alignItems: 'center', textAlign: 'center' }} >
            <Grid item xs={12} sm={1} sx={{ fontWeight: '900' }}>{index + 1}</Grid>
            <Grid item xs={12} sm={3}>
              <a href={item.getBonusURL} target="_blank" rel="noreferrer">
                <img src={item.logoURL} alt="game" height={'50px'} width={'100px'} />
              </a>
            </Grid>
            <Grid item xs={12} sm={4} >
              <Typography variant='h5' >{item.offers}</Typography>
              <Typography variant='body2'>{item.text2}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} >
              <Typography variant='h5' >{item.rating}</Typography>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default ListSort;
