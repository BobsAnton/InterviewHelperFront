import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteInterview } from './interviewsSlice';
import { Interview } from "../../types/models/interviewType";
import { selectAllInterviewQuestions } from '../interviewQuestions/interviewQuestionsSlice';

import { interviewDateToString } from '../../types/models/interviewType';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteInterviewButton = (interview: Interview) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const interviewQuestions = useAppSelector(selectAllInterviewQuestions);
	const status = useAppSelector(state => state.interviews.status);

	const onDeleteInterviewClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteInterview(interview));
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = status !== 'loading';
	const interviewQuestionsNumber = interviewQuestions.interviewQuestions.filter(x => x.interview.id === interview.id).length;

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this interview: "{interview.candidate.name + ' ' + interviewDateToString(interview)}"?<br/>
					{ interviewQuestionsNumber !== 0  && <> (+ {interviewQuestionsNumber} interview questions)</>}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteInterviewClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};