import React from "react";

import { Question } from "../../types/models/questionType";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const QuestionInfo = (question: Question) => {
	return (
		<Card sx={{ marginTop: 1, padding: 1 }}>
			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Id</Typography>
			<Typography variant="body1" gutterBottom>{question.id}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Name</Typography>
			<Typography variant="body1" gutterBottom>{question.name}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Technical field</Typography>
			<Typography variant="body1" gutterBottom>{question.technicalField.name}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Complexity</Typography>
			<Typography variant="body1" gutterBottom>{question.complexity}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Description</Typography>
			<Typography variant="body1" gutterBottom>{question.description}</Typography>
		</Card>
	);
};