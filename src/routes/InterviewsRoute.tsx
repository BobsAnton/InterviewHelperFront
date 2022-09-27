import React from 'react';

import { InterviewQuestionsTable } from '../features/interviewQuestions/InterviewQuestionsTable';
import { AddInterviewQuestionForm } from '../features/interviewQuestions/AddInterviewQuestionForm';

import Grid from '@mui/material/Grid';

export const InterviewsRoute = () => {
	return (
		<Grid container>
			<Grid item xs={12} sx={{ padding: 1 }}>
				<InterviewQuestionsTable/>
              	<AddInterviewQuestionForm/>
			</Grid>
	  	</Grid>
	);
};