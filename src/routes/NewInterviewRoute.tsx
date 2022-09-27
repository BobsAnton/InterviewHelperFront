import React from 'react';

import { InterviewsTable } from '../features/interviews/InterviewsTable';
import { AddInterviewForm } from '../features/interviews/AddInterviewForm';

import Grid from '@mui/material/Grid';

export const NewInterviewRoute = () => {
	return (
		<Grid container>
			<Grid item xs={12} sx={{ padding: 1 }}>
				<InterviewsTable/>
              	<AddInterviewForm/>
			</Grid>
	  	</Grid>
	);
};