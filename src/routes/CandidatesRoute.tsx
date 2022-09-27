import React from 'react';

import { CandidatesTable } from '../features/candidates/CandidatesTable';
import { AddCandidateForm } from '../features/candidates/AddCandidateForm';

import { CandidateTechnicalFieldsTable } from '../features/candidateTechnicalFields/CandidateTechnicalFieldsTable';
import { AddCandidateTechnicalFieldForm } from '../features/candidateTechnicalFields/AddCandidateTechnicalFieldForm';

import Grid from '@mui/material/Grid';

export const CandidatesRoute = () => {
	return (
		<Grid container>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<CandidatesTable/>
              	<AddCandidateForm/>
			</Grid>
			<Grid item xs={4} sx={{ padding: 1 }}>
				<CandidateTechnicalFieldsTable/>
              	<AddCandidateTechnicalFieldForm/>
			</Grid>
	  	</Grid>
	);
};