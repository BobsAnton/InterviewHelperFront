import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllTechnicalFields } from './technicalFieldsSlice';
import { DeleteTechnicalFieldButton } from './DeleteTechnicalFieldButton';
import { fetchAllData } from '../fetchAllData';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export const TechnicalFieldsTable = () => {
	const dispatch = useAppDispatch();

	const technicalFields = useAppSelector(selectAllTechnicalFields);
	const technicalFieldsStatus = useAppSelector(state => state.technicalFields.status);

	useEffect(() => {
		if (technicalFieldsStatus === 'idle') {
			(async () => await fetchAllData(dispatch))();
		}
	}, [technicalFieldsStatus, dispatch]);

	const orderedTechnicalFields = technicalFields.technicalFields.slice().sort((a, b) => b.order - a.order);

	return (
		<>
		  <TableContainer component={Paper}>
			  <Table size="small" aria-label="a dense table">
				  <TableHead sx={{ backgroundColor: '#C0C0C0' }}>
					  <TableRow>
						  <TableCell>Technical field</TableCell>
						  <TableCell align="center">Order</TableCell>
						  <TableCell align="center"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
					  {orderedTechnicalFields.map((technicalField) => (
						  <TableRow key={technicalField.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							  <TableCell component="th" scope="row"><Link style={{textDecoration: "underline", color: 'black'}} to={'/technicalFields/' + technicalField.id}>{technicalField.name}</Link></TableCell>
							  <TableCell align="center">{technicalField.order}</TableCell>
							  <TableCell align="center"><DeleteTechnicalFieldButton {...technicalField}/></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
		  </TableContainer>
		</>
	  );
};