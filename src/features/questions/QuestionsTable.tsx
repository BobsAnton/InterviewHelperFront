import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllQuestions, fetchQuestions } from './questionsSlice';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

export const QuestionsTable = () => {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(selectAllQuestions);
	const questionsStatus = useAppSelector(state => state.questions.status);
	const orderedQuestions = questions.questions.slice().sort((a, b) => a.technicalField.name.localeCompare(b.technicalField.name));

	useEffect(() => {
		if (questionsStatus === 'idle') {
			dispatch(fetchQuestions());
		}
	}, [questionsStatus, dispatch]);

	return (
		<>
		  <TableContainer sx={{ width: 650 }} component={Paper}>
			  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				  <TableHead>
					  <TableRow>
						  <TableCell>Question</TableCell>
						  <TableCell align="right">Technical field</TableCell>
						  <TableCell align="right">Complexity</TableCell>
						  <TableCell align="right">Description</TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedQuestions.map((question) => (
						  <TableRow key={question.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row">{question.name}</TableCell>
							  <TableCell align="right">{question.technicalField.name}</TableCell>
							  <TableCell align="right">{question.complexity}</TableCell>
							  <TableCell align="right">{question.description}</TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};