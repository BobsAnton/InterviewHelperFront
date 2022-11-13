import React from 'react';
import { reset } from 'redux-form';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../app/hooks';
import LoginForm from '../features/auth/LoginForm';
import RegistrationForm from '../features/auth/RegistrationForm';
import { signUp, signIn } from '../features/auth/authSlice';

import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}	aria-labelledby={`simple-tab-${index}`} {...other}>
		{value === index && (
		  children
		)}
	  </div>
	);
}
  
function a11yProps(index: number) {
	return { 
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	  setValue(newValue);
	};

	const onSubmitSignIn = async (values: any) => {
		await dispatch(signIn({ 
			username: '',
			email: values.email,
			password: values.password
		}));
		dispatch(reset('LoginForm'));
		if (localStorage.getItem("token")) {
			navigate('/');
		}
	};

	const onSubmitSignUp = async (values: any) => {
		await dispatch(signUp({ 
			username: values.username, 
			email: values.email,
			password: values.password1
		}));
		dispatch(reset('RegistrationForm'));
		if (localStorage.getItem("token")) {
			navigate('/');
		}
	};

	return (		
		<Grid container>
			<Grid item xs={3}/>
			<Grid item xs={6} sx={{ padding: 1 }}>
				<Box sx={{ width: '100%' }}>
				  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} variant="fullWidth" onChange={handleChange}>
					  <Tab label="Sign In" {...a11yProps(0)} />
					  <Tab label="Sign Up" {...a11yProps(1)} />
					</Tabs>
				  </Box>
				  <TabPanel value={value} index={0}>
				  	<LoginForm onSubmit={onSubmitSignIn}/>
				  </TabPanel>
				  <TabPanel value={value} index={1}>
				  	<RegistrationForm onSubmit={onSubmitSignUp}/>
				  </TabPanel>
				</Box>
			</Grid>
			<Grid item xs={3}/>
	  	</Grid>
	);
}