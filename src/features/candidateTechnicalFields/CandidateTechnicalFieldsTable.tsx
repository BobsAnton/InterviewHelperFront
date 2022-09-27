import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllCandidateTechnicalFields, fetchCandidateTechnicalFields } from './candidateTechnicalFieldsSlice';
import { DeleteCandidateTechnicalFieldButton } from './DeleteCandidateTechnicalFieldButton';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export const CandidateTechnicalFieldsTable = () => {
	const dispatch = useAppDispatch();

	const candidateTechnicalFields = useAppSelector(selectAllCandidateTechnicalFields);
	const status = useAppSelector(state => state.candidateTechnicalFields.status);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCandidateTechnicalFields());
		}
	}, [status, dispatch]);

	const orderedCandidateTechnicalFields = candidateTechnicalFields.candidateTechnicalFields.slice().sort((a, b) => a.candidate.name.localeCompare(b.candidate.name));

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
						  <TableCell>Candidate field</TableCell>
						  <TableCell align="center">Technical field</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedCandidateTechnicalFields.map((candidateTechnicalField) => (
						  <TableRow key={candidateTechnicalField.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row">{candidateTechnicalField.candidate.name}</TableCell>
							  <TableCell align="center">{candidateTechnicalField.technicalField.name}</TableCell>
							  <TableCell align="center"><DeleteCandidateTechnicalFieldButton {...candidateTechnicalField}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};