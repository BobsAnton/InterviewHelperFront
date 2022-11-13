import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from './hooks';

import { selectCurrentEmail } from '../features/auth/authSlice';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const Navbar = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const currentEmail = useAppSelector(selectCurrentEmail);

  const onExit = () => {
    localStorage.removeItem("token");
    setOpenDialog(false);
    navigate('/login');
  };
  
  const handleOpenDialog = () => {	setOpenDialog(true); };
	const handleCloseDialog = () => { setOpenDialog(false);	};

  return (
    <>
      <AppBar position='static' title="Interview Helper" sx={{ backgroundColor: '#424242' }} >
        <Toolbar variant="dense">
          <Typography variant='h4' sx={{ color: "#f28159", marginRight: 1, fontWeight: "bold" }}>
            <PeopleAlt />
          </Typography>
          <Tabs variant="scrollable" scrollButtons="auto" value={false}>
            { localStorage.getItem("token") ? (
              <>
                <Tab label="Вопросы и области" sx={{ color: "white" }} component={Link} to={'/questions'} />
                <Tab label="Кандидаты" sx={{ color: "white" }} component={Link} to={'/candidates'}/>
                <Tab label="Интервью" sx={{ color: "white" }} component={Link} to={'/interviews'}/>
                <Tab label="Новое Интервью" sx={{ color: "white" }} component={Link} to={'/new-interview'}/>
                <Tab label={ `Выйти: ` + currentEmail } sx={{ textDecoration: "underline", color: "white" }} onClick={handleOpenDialog}/>
              </>
            ) : (
              <>
                <Typography variant='h6' mt={1} sx={{ color: "white"}}>
                  Interview Helper
                </Typography>
              </>
            ) }
          </Tabs>
        </Toolbar>
      </AppBar>
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to log out?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onExit} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}