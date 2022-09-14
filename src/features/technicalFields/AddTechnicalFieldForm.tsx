import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewTechnicalField } from './technicalFieldsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const AddTechnicalFieldForm = () => {
	const dispatch = useAppDispatch();

	const [name, setName] = useState('');
	const [order, setOrder] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const error = useAppSelector(state => state.technicalFields.error);

	const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const onOrderChanged = (e: React.ChangeEvent<HTMLInputElement>) => setOrder(e.target.value);
	const onSaveTechnicalFieldClicked = async () => {
		try {
			setAddRequestStatus('pending');

			await dispatch(addNewTechnicalField({ name, order: Number(order) }));
			
			setName('');
			setOrder('');
		}
		catch(err) {
			console.error('Failed to save the technicalField: ', err);
		} finally {
			setAddRequestStatus('idle');
		}
	};

	const canSave = [name, order].every(Boolean) && addRequestStatus === 'idle';

	return (
		<Paper sx={{ marginTop: 1, padding: 1 }}>
			{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
			<FormGroup sx={{ marginTop: 3 }}>
				<Input placeholder="Name" value={name} onChange={onNameChanged} />

				<Input sx={{ marginTop: 1 }} placeholder="Order" type="number" value={order} onChange={onOrderChanged} />
				
				<Button sx={{ marginTop: 3 }} variant="contained" onClick={onSaveTechnicalFieldClicked} disabled={!canSave}>Add Technical Field</Button>
			</FormGroup>
		</Paper>
	);
};