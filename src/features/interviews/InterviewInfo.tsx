import React from "react";

import { Interview } from "../../types/models/interviewType";

import { interviewDateToString } from '../../types/models/interviewType';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const InterviewInfo = (interview: Interview) => {
	return (
		<Card sx={{ marginTop: 1, padding: 1 }}>
			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Id</Typography>
			<Typography variant="body1" gutterBottom>{interview.id}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Candidate field</Typography>
			<Typography variant="body1" gutterBottom>{interview.candidate.name}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Date</Typography>
			<Typography variant="body1" gutterBottom>{interviewDateToString(interview)}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Status</Typography>
			<Typography variant="body1" gutterBottom>{interview.status}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Review</Typography>
			<Typography variant="body1" gutterBottom>{interview.review}</Typography>
		</Card>
	);
};