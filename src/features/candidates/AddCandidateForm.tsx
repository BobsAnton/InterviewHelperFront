import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewCandidate } from './candidatesSlice';
import { selectAllCandidateTechnicalFields } from '../candidateTechnicalFields/candidateTechnicalFieldsSlice';
import { selectAllInterviews } from '../interviews/interviewsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const AddCandidateForm = () => {
	const dispatch = useAppDispatch();

	const [name, setName] = useState('');
	
	const error = useAppSelector(state => state.candidates.error);
	const status = useAppSelector(state => state.candidates.status);
	const candidateTechnicalFields = useAppSelector(selectAllCandidateTechnicalFields);
	const interviews = useAppSelector(selectAllInterviews);

	const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const onSaveCandidateClicked = async () => {
		await dispatch(addNewCandidate({ id: '', name }));
		setName('');
	};

	const canSave = [name].every(Boolean) && status !== 'loading';

	return (
		<Paper sx={{ marginTop: 1, padding: 1 }}>
			{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
			<FormGroup sx={{ marginTop: 3}}>
				<Input placeholder="Name" value={name} onChange={onNameChanged} />
				
				<Button sx={{ marginTop: 3 }} variant="contained" onClick={onSaveCandidateClicked} disabled={!canSave}>Add Candidate</Button>
			</FormGroup>
		</Paper>
	);
};