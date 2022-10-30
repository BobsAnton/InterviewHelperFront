import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteQuestion } from './questionsSlice';
import { Question } from "../../types/models/questionType";
import { selectAllInterviewQuestions } from '../interviewQuestions/interviewQuestionsSlice';
import { fetchAllData } from '../fetchAllData';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteQuestionButton = (question: Question) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const interviewQuestions = useAppSelector(selectAllInterviewQuestions);
	const status = useAppSelector(state => state.questions.status);

	const onDeleteQuestionClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteQuestion(question));
		await fetchAllData(dispatch);
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = status !== 'loading';
	const interviewQuestionsNumber = interviewQuestions.interviewQuestions.filter(x => x.question.id === question.id).length;

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this question: "{question.name}"?<br/>
					{ interviewQuestionsNumber !== 0  && <> (+ {interviewQuestionsNumber} interview questions)</>}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteQuestionClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};