import React from 'react';

import { TechnicalFieldsTable } from '../features/technicalFields/TechnicalFieldsTable';
import { AddTechnicalFieldForm } from '../features/technicalFields/AddTechnicalFieldForm';

import { QuestionsTable } from '../features/questions/QuestionsTable';
import { AddQuestionForm } from '../features/questions/AddQuestionForm';

import Grid from '@mui/material/Grid';

export const QuestionsRoute = () => {
	return (
		<Grid container>
			<Grid item xs={4} sx={{ padding: 1 }}>
		  		<TechnicalFieldsTable/>
		  		<AddTechnicalFieldForm/>
			</Grid>
			<Grid item xs={8} sx={{ padding: 1 }}>
		  		<QuestionsTable/>
		  		<AddQuestionForm/>
			</Grid>
	  	</Grid>
	);
};