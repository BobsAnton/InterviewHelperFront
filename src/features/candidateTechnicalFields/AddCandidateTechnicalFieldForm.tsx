import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewCandidateTechnicalField } from './candidateTechnicalFieldsSlice';
import { selectAllCandidates } from '../candidates/candidatesSlice';
import { selectAllTechnicalFields } from '../technicalFields/technicalFieldsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const AddCandidateTechnicalFieldForm = () => {
	const dispatch = useAppDispatch();

	const [candidateId, setCandidateId] = useState('');
	const [technicalFieldId, setTechnicalFieldId] = useState('');
	
	const error = useAppSelector(state => state.candidateTechnicalFields.error);
	const status = useAppSelector(state => state.candidateTechnicalFields.status);
	const candidates = useAppSelector(selectAllCandidates);
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	const onCandidateIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setCandidateId(e.target.value as string);
	const onTechnicalFieldIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setTechnicalFieldId(e.target.value as string);
	const onSaveCandidateTechnicalFieldClicked = async () => {
		await dispatch(addNewCandidateTechnicalField({ id: '', candidate: candidates.candidates.find(x => x.id === candidateId)!, technicalField: technicalFields.technicalFields.find(x => x.id === technicalFieldId)!}));
			
		setCandidateId('');
		setTechnicalFieldId('');
	};

	const canSave = [candidateId, technicalFieldId].every(Boolean) && status !== 'loading';

	return (
		<Paper sx={{ marginTop: 1, padding: 1 }}>
			{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
			<FormGroup sx={{ marginTop: 3}}>
				<NativeSelect value={candidateId} onChange={onCandidateIdChanged}>
					{ candidates.candidates.map((candidate) => (
						<option value={candidate.id}>{ candidate.name }</option>
					)) }
				</NativeSelect>

				<NativeSelect sx={{ marginTop: 1 }} value={technicalFieldId} onChange={onTechnicalFieldIdChanged}>
					{ technicalFields.technicalFields.map((technicalField) => (
						<option value={technicalField.id}>{ technicalField.name }</option>
					)) }
				</NativeSelect>
				
				<Button sx={{ marginTop: 3 }} variant="contained" onClick={onSaveCandidateTechnicalFieldClicked} disabled={!canSave}>Add Candidate-TechnicalField</Button>
			</FormGroup>
		</Paper>
	);
};