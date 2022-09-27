import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllInterviewQuestions, fetchInterviewQuestions } from './interviewQuestionsSlice';
import { DeleteInterviewQuestionButton } from './DeleteInterviewQuestionButton';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export const InterviewQuestionsTable = () => {
	const dispatch = useAppDispatch();

	const interviewQuestions = useAppSelector(selectAllInterviewQuestions);
	const status = useAppSelector(state => state.interviewQuestions.status);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchInterviewQuestions());
		}
	}, [status, dispatch]);

	const orderedInterviewQuestions = interviewQuestions.interviewQuestions.slice().sort((a, b) => a.interview.candidate.name.localeCompare(b.interview.candidate.name));

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
						  <TableCell>Interview</TableCell>
						  <TableCell align="center">Question</TableCell>
						  <TableCell align="center">Grade</TableCell>
						  <TableCell align="center">Comment</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedInterviewQuestions.map((interviewQuestion) => (
						  <TableRow key={interviewQuestion.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row">{interviewQuestion.interview.candidate.name + ' ' + interviewQuestion.interview.date}</TableCell>
							  <TableCell align="center">{interviewQuestion.question.name}</TableCell>
							  <TableCell align="center">{interviewQuestion.grade}</TableCell>
							  <TableCell align="center">{interviewQuestion.comment}</TableCell>
							  <TableCell align="center"><DeleteInterviewQuestionButton {...interviewQuestion}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};