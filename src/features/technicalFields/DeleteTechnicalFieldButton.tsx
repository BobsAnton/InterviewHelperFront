import React, { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { deleteTechnicalField } from './technicalFieldsSlice';
import { TechnicalField } from "../../types/models/technicalFieldType";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteTechnicalFieldButton = (technicalField: TechnicalField) => {
	const dispatch = useAppDispatch();

	const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const onDeleteTechnicalFieldClicked = async () => {
		try {
			setAddRequestStatus('pending');
			await dispatch(deleteTechnicalField(technicalField));
		}
		catch(err) {
			console.error('Failed to remove the technicalField: ', err);
		} finally {
			setAddRequestStatus('idle');
		}
	};

	const canSave = addRequestStatus === 'idle';

	return (
		<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={onDeleteTechnicalFieldClicked} disabled={!canSave}>
			Delete
		</Button>
	);
};