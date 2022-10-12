import React from 'react';

import { Navbar } from './app/Navbar';
import { Outlet } from "react-router-dom";

import Grid from '@mui/material/Grid';

const App = () => {
  return (
		<Grid container>
      <Grid item xs={2}/>
      <Grid item xs={8}>
        <Navbar />
        <div className="App">
          <Outlet />
        </div>
      </Grid>
      <Grid item xs={2}/>
    </Grid>
  )
}

export default App