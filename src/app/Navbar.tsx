import React from 'react';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import PeopleAlt from '@mui/icons-material/PeopleAlt';

export const Navbar = () => {
  return (
    <AppBar position='static' title="Interview Helper" sx={{ backgroundColor: '#424242' }} >
      <Toolbar variant="dense">
        <Typography variant='h4' sx={{ color: "#f28159", marginRight: 1, fontWeight: "bold" }}>
          <PeopleAlt />
        </Typography>
        <Tabs variant="scrollable" scrollButtons="auto">
          <Tab label="Вопросы и области" sx={{ color: "white" }}/>
          <Tab label="Кандидаты" sx={{ color: "white" }}/>
          <Tab label="Интервью" sx={{ color: "white" }}/>
          <Tab label="Новое Интервью" sx={{ color: "white" }}/>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}