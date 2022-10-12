import React from "react";

import { InterviewQuestion } from "../../types/models/interviewQuestionType";

import { interviewDateToString } from '../../types/models/interviewType';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const InterviewQuestionInfo = (interviewQuestion: InterviewQuestion) => {
	return (
		<Card sx={{ marginTop: 1, padding: 1 }}>
			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Id</Typography>
			<Typography variant="body1" gutterBottom>{interviewQuestion.id}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Interview</Typography>
			<Typography variant="body1" gutterBottom>{interviewQuestion.interview.candidate.name + interviewDateToString(interviewQuestion.interview)}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Question</Typography>
			<Typography variant="body1" gutterBottom>{interviewQuestion.question.name}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Grade</Typography>
			<Typography variant="body1" gutterBottom>{interviewQuestion.grade}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Comment</Typography>
			<Typography variant="body1" gutterBottom>{interviewQuestion.comment}</Typography>
		</Card>
	);
};