import React, { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { deleteQuestion } from './questionsSlice';
import { Question } from "../../types/models/questionType";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteQuestionButton = (question: Question) => {
	const dispatch = useAppDispatch();

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

	const canSave = addRequestStatus === 'idle';

	return (
		<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={onDeleteQuestionClicked} disabled={!canSave}>
			Delete
		</Button>
	);
};