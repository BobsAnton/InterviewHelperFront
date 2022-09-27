import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteCandidateTechnicalField } from './candidateTechnicalFieldsSlice';
import { CandidateTechnicalField } from "../../types/models/candidateTechnicalFieldType";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteCandidateTechnicalFieldButton = (candidateTechnicalField: CandidateTechnicalField) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	
	const status = useAppSelector(state => state.candidateTechnicalFields.status);

	const onDeleteCandidateTechnicalFieldClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteCandidateTechnicalField(candidateTechnicalField));
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = status !== 'loading';

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this candidate skill: "{candidateTechnicalField.candidate.name} ↔ {candidateTechnicalField.technicalField.name}"?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteCandidateTechnicalFieldClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};