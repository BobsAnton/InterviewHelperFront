import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllInterviewQuestions } from './interviewQuestionsSlice';
import { DeleteInterviewQuestionButton } from './DeleteInterviewQuestionButton';
import { fetchAllData } from '../fetchAllData';

import { interviewDateToString } from '../../types/models/interviewType';

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
			(async () => await fetchAllData(dispatch))();
		}
	}, [status, dispatch]);

	const orderedInterviewQuestions = interviewQuestions.interviewQuestions.slice().sort((a, b) => {
		let interviewDateA = a.interview.date;
		let interviewDateB = b.interview.date;

		interviewDateA = interviewDateA !== undefined ? interviewDateA : new Date();
		interviewDateB = interviewDateB !== undefined ? interviewDateB : new Date();

		return new Date(interviewDateB).valueOf() - new Date(interviewDateA).valueOf();
	});

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
					  	  <TableCell align="center">Question</TableCell>
						  <TableCell align="center">Interview</TableCell>
						  <TableCell align="center">Grade</TableCell>
						  <TableCell align="center">Comment</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedInterviewQuestions.map((interviewQuestion) => (
						  <TableRow key={interviewQuestion.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row"><Link style={{textDecoration: "underline", color: 'black'}} to={'/interviewQuestions/' + interviewQuestion.id}>{interviewQuestion.question.name}</Link></TableCell>
							  <TableCell align="center">Interview: {interviewQuestion.interview.candidate.name + interviewDateToString(interviewQuestion.interview)}</TableCell>
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