import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewQuestion } from './questionsSlice';
import { selectAllTechnicalFields } from '../technicalFields/technicalFieldsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const AddQuestionForm = () => {
	const dispatch = useAppDispatch();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [complexity, setComplexity] = useState('Average');
	const [technicalFieldName, setTechnicalFieldName] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('idle');
	
	const error = useAppSelector(state => state.questions.error);
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const onDescriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
	const onComplexityChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setComplexity(e.target.value as string);
	const onTechnicalFieldNameChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setTechnicalFieldName(e.target.value as string);
	const onSaveQuestionClicked = async () => {
		try {
			setAddRequestStatus('pending');

			await dispatch(addNewQuestion({ name, description, complexity, technicalField: { name: technicalFieldName, order: 0 }}));
			
			setName('');
			setDescription('');
			setComplexity('');
			setTechnicalFieldName('');
		}
		catch(err) {
			console.error('Failed to save the question: ', err);
		} finally {
			setAddRequestStatus('idle');
		}
	};

	const canSave = [name, description, complexity, technicalFieldName].every(Boolean) && addRequestStatus === 'idle';

	return (
		<Paper sx={{ marginTop: 1, padding: 1  }}>
			{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
			<FormGroup sx={{ marginTop: 3}}>
				<Input placeholder="Name" value={name} onChange={onNameChanged} />

				<TextField sx={{ marginTop: 1 }} variant="standard" label="Description" multiline maxRows={4} value={description} onChange={onDescriptionChanged}/>
				
				<NativeSelect sx={{ marginTop: 1 }} value={technicalFieldName} onChange={onTechnicalFieldNameChanged}>
					{ technicalFields.technicalFields.map((technicalField) => (
						<option value={technicalField.name}>{ technicalField.name }</option>
					)) }
				</NativeSelect>
				
				<NativeSelect sx={{ marginTop: 1 }} value={complexity} onChange={onComplexityChanged}>
					<option value={'Low'}>Low</option>
					<option value={'BelowAverage'}>Below average</option>
					<option value={'Average'}>Average</option>
					<option value={'AboveAverage'}>Above average</option>
					<option value={'High'}>High</option>
					<option value={'VeryHigh'}>Very high</option>
				</NativeSelect>
				
				<Button sx={{ marginTop: 3 }} variant="contained" onClick={onSaveQuestionClicked} disabled={!canSave}>Add Question</Button>
			</FormGroup>
		</Paper>
	);
};