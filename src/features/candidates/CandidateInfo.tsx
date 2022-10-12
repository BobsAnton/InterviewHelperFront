import React from "react";

import { Candidate } from "../../types/models/candidateType";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const CandidateInfo = (candidate: Candidate) => {
	return (
		<Card sx={{ marginTop: 1, padding: 1 }}>
			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Id</Typography>
			<Typography variant="body1" gutterBottom>{candidate.id}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Name</Typography>
			<Typography variant="body1" gutterBottom>{candidate.name}</Typography>
		</Card>
	);
};