import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllCandidates } from './candidatesSlice';
import { selectAllCandidateTechnicalFields } from '../candidateTechnicalFields/candidateTechnicalFieldsSlice';
import { selectAllInterviews } from '../interviews/interviewsSlice';
import { DeleteCandidateButton } from './DeleteCandidateButton';
import { fetchAllData } from '../fetchAllData';

import { interviewDateToString } from '../../types/models/interviewType';

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
			(async () => await fetchAllData(dispatch))();
		}
	}, [status, dispatch]);

	const orderedCandidates = candidates.candidates.slice().sort((a, b) => {
		const datesA = interviews.interviews.filter(interview => interview.candidate.id === a.id).map(x => x.date).sort((date1, date2) => new Date(date1).valueOf() - new Date(date2).valueOf());
		const datesB = interviews.interviews.filter(interview => interview.candidate.id === b.id).map(x => x.date).sort((date1, date2) => new Date(date1).valueOf() - new Date(date2).valueOf());
		
		let lastInterviewDateA = datesA[datesA.length - 1];
		let lastInterviewDateB = datesB[datesB.length - 1];

		lastInterviewDateA = lastInterviewDateA !== undefined ? lastInterviewDateA : new Date();
		lastInterviewDateB = lastInterviewDateB !== undefined ? lastInterviewDateB : new Date();

		return new Date(lastInterviewDateB).valueOf() - new Date(lastInterviewDateA).valueOf();
	});

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
						  <TableRow key={candidate.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row"><Link style={{textDecoration: "underline", color: 'black'}} to={candidate.id}>{candidate.name}</Link></TableCell>
							  <TableCell align="center">{candidateTechnicalFields.candidateTechnicalFields.filter(candidateTechnicalField => candidateTechnicalField.candidate.id === candidate.id).map(candidateTechnicalField => candidateTechnicalField.technicalField.name).join(', ')}</TableCell>
							  <TableCell align="center">{interviews.interviews.filter(interview => interview.candidate.id === candidate.id).sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()).map(interview => interviewDateToString(interview)).join(', ')}</TableCell>
							  <TableCell align="center"><DeleteCandidateButton {...candidate}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};