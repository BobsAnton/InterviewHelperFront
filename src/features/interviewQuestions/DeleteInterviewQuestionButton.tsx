import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteInterviewQuestion } from './interviewQuestionsSlice';
import { InterviewQuestion } from "../../types/models/interviewQuestionType";

import { interviewDateToString } from '../../types/models/interviewType';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteInterviewQuestionButton = (interviewQuestion: InterviewQuestion) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const status = useAppSelector(state => state.interviewQuestions.status);

	const onDeleteInterviewQuestionClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteInterviewQuestion(interviewQuestion));
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
					Delete this interview question: "{interviewQuestion.interview.candidate.name + ' ' + interviewDateToString(interviewQuestion.interview)} ↔ {interviewQuestion.question.name}"?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteInterviewQuestionClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};