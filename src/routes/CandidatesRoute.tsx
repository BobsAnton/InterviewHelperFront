import React from 'react';
import { reset } from 'redux-form';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectAllTechnicalFields } from '../features/technicalFields/technicalFieldsSlice';

import { addNewCandidate, selectAllCandidates } from '../features/candidates/candidatesSlice';
import { CandidatesTable } from '../features/candidates/CandidatesTable';
import CandidateForm from '../features/candidates/CandidateForm';

import { addNewCandidateTechnicalField } from '../features/candidateTechnicalFields/candidateTechnicalFieldsSlice';
import { CandidateTechnicalFieldsTable } from '../features/candidateTechnicalFields/CandidateTechnicalFieldsTable';
import AddCandidateTechnicalFieldForm from '../features/candidateTechnicalFields/AddCandidateTechnicalFieldForm';

import { fetchAllData } from '../features/fetchAllData';

import Grid from '@mui/material/Grid';

export const CandidatesRoute = () => {
	const dispatch = useAppDispatch();
	const candidates = useAppSelector(selectAllCandidates);
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	const onSubmitAddNewCandidate = async (values: any) => {
		await dispatch(addNewCandidate({ id: '', name: values.name }));
		await fetchAllData(dispatch);
		dispatch(reset('CandidateForm'));
	};

	const onSubmitAddNewCandidateTechnicalField = async (values: any) => {
		await dispatch(addNewCandidateTechnicalField({ id: '', candidate: candidates.candidates.find(x => x.id === values.candidateId)!, technicalField: technicalFields.technicalFields.find(x => x.id === values.technicalFieldId)!}));
		await fetchAllData(dispatch);
		dispatch(reset('AddCandidateTechnicalFieldForm'));
	};

	return (
		<Grid container>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<CandidatesTable/>
              	<CandidateForm onSubmit={onSubmitAddNewCandidate}/>
			</Grid>
			<Grid item xs={4} sx={{ padding: 1 }}>
				<CandidateTechnicalFieldsTable/>
              	<AddCandidateTechnicalFieldForm onSubmit={onSubmitAddNewCandidateTechnicalField}/>
			</Grid>
	  	</Grid>
	);
};