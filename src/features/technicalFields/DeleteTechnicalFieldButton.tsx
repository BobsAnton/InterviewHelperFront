import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteTechnicalField } from './technicalFieldsSlice';
import { selectAllQuestions } from '../questions/questionsSlice';
import { TechnicalField } from "../../types/models/technicalFieldType";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteTechnicalFieldButton = (technicalField: TechnicalField) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const questions = useAppSelector(selectAllQuestions);
	const status = useAppSelector(state => state.technicalFields.status);

	const onDeleteTechnicalFieldClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteTechnicalField(technicalField));
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = status !== 'loading';
	const questionsNumber = questions.questions.filter(x => x.technicalField.id === technicalField.id).length;

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this technical field: {technicalField.name}{ questionsNumber !== 0  && <> (+ {questionsNumber} questions)</>}?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteTechnicalFieldClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>

	);
};