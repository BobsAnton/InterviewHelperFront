import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllInterviews, fetchInterviews } from './interviewsSlice';
import { DeleteInterviewButton } from './DeleteInterviewButton';

import { interviewDateToString } from '../../types/models/interviewType';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export const InterviewsTable = () => {
	const dispatch = useAppDispatch();

	const interviews = useAppSelector(selectAllInterviews);
	const status = useAppSelector(state => state.interviews.status);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchInterviews());
		}
	}, [status, dispatch]);

	const orderedInterviews = interviews.interviews.slice().sort((a, b) => a.status.localeCompare(b.status));

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
						  <TableCell>Candidate field</TableCell>
						  <TableCell align="center">Date</TableCell>
						  <TableCell align="center">Status</TableCell>
						  <TableCell align="center">Review</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedInterviews.map((interview) => (
						  <TableRow key={interview.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row">{interview.candidate.name}</TableCell>
							  <TableCell align="center">{interviewDateToString(interview)}</TableCell>
							  <TableCell align="center">{interview.status}</TableCell>
							  <TableCell align="center">{interview.review}</TableCell>
							  <TableCell align="center"><DeleteInterviewButton {...interview}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};