import React, { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { deleteQuestion } from './questionsSlice';
import { Question } from "../../types/models/questionType";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteQuestionButton = (question: Question) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const onDeleteQuestionClicked = async () => {
		try {
			setAddRequestStatus('pending');
			await dispatch(deleteQuestion(question));
		}
		catch(err) {
			console.error('Failed to remove the question: ', err);
		} finally {
			setAddRequestStatus('idle');
		}
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = addRequestStatus === 'idle';

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this question: {question.name}?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteQuestionClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};