import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllQuestions } from './questionsSlice';
import { DeleteQuestionButton } from './DeleteQuestionButton';
import { fetchAllData } from '../fetchAllData';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export const QuestionsTable = () => {
	const dispatch = useAppDispatch();

	const questions = useAppSelector(selectAllQuestions);
	const questionsStatus = useAppSelector(state => state.questions.status);

	useEffect(() => {
		if (questionsStatus === 'idle') {
			(async () => await fetchAllData(dispatch))();
		}
	}, [questionsStatus, dispatch]);

	const orderedQuestions = questions.questions.slice().sort((a, b) => a.technicalField.name.localeCompare(b.technicalField.name));

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
						  <TableCell>Question</TableCell>
						  <TableCell align="center">Technical field</TableCell>
						  <TableCell align="center">Complexity</TableCell>
						  <TableCell align="center">Description</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedQuestions.map((question) => (
						  <TableRow key={question.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row"><Link style={{textDecoration: "underline", color: 'black'}} to={'/questions/' + question.id}>{question.name}</Link></TableCell>
							  <TableCell align="center">{question.technicalField.name}</TableCell>
							  <TableCell align="center">{question.complexity}</TableCell>
							  <TableCell align="center">{question.description}</TableCell>
							  <TableCell align="center"><DeleteQuestionButton {...question}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};