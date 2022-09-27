import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllCandidates, fetchCandidates } from './candidatesSlice';
import { selectAllCandidateTechnicalFields } from '../candidateTechnicalFields/candidateTechnicalFieldsSlice';
import { selectAllInterviews } from '../interviews/interviewsSlice';
import { DeleteCandidateButton } from './DeleteCandidateButton';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export const CandidatesTable = () => {
	const dispatch = useAppDispatch();

	const candidates = useAppSelector(selectAllCandidates);
	const candidateTechnicalFields = useAppSelector(selectAllCandidateTechnicalFields);
	const interviews = useAppSelector(selectAllInterviews);
	const status = useAppSelector(state => state.candidates.status);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCandidates());
		}
	}, [status, dispatch]);

	const orderedCandidates = candidates.candidates.slice().sort((a, b) => a.name.localeCompare(b.name));

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
						  <TableCell>Candidate name</TableCell>
						  <TableCell align="center">Skills</TableCell>
						  <TableCell align="center">Interviews</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedCandidates.map((candidate) => (
						  <TableRow key={candidate.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row">{candidate.name}</TableCell>
							  <TableCell align="center">{candidateTechnicalFields.candidateTechnicalFields.filter(candidateTechnicalField => candidateTechnicalField.candidate.id === candidate.id).length}</TableCell>
							  <TableCell align="center">{interviews.interviews.filter(interview => interview.candidate.id === candidate.id).length}</TableCell>
							  <TableCell align="center"><DeleteCandidateButton {...candidate}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};