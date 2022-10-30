import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteTechnicalField } from './technicalFieldsSlice';
import { selectAllQuestions } from '../questions/questionsSlice';
import { selectAllInterviewQuestions } from '../interviewQuestions/interviewQuestionsSlice';
import { selectAllCandidateTechnicalFields } from '../candidateTechnicalFields/candidateTechnicalFieldsSlice';
import { TechnicalField } from "../../types/models/technicalFieldType";
import { fetchAllData } from '../fetchAllData';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteTechnicalFieldButton = (technicalField: TechnicalField) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const questions = useAppSelector(selectAllQuestions);
	const interviewQuestions = useAppSelector(selectAllInterviewQuestions);
	const candidateTechnicalFields = useAppSelector(selectAllCandidateTechnicalFields);
	const status = useAppSelector(state => state.technicalFields.status);

	const onDeleteTechnicalFieldClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteTechnicalField(technicalField));
		await fetchAllData(dispatch);
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = status !== 'loading';
	const questionsNumber = questions.questions.filter(x => x.technicalField.id === technicalField.id).length;
	const candidateTechnicalFieldsNumber = candidateTechnicalFields.candidateTechnicalFields.filter(x => x.technicalField.id === technicalField.id).length;

	let interviewQuestionsNumber = 0;
	questions.questions.filter(x => x.technicalField.id === technicalField.id).forEach(question => {
		interviewQuestionsNumber += interviewQuestions.interviewQuestions.filter(x => x.question.id === question.id).length;
	});

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this technical field: "{technicalField.name}"?<br/>
					{ candidateTechnicalFieldsNumber !== 0  && <> (+ {candidateTechnicalFieldsNumber} candidate skills)<br/></>}
					{ interviewQuestionsNumber !== 0  && <> (+ {interviewQuestionsNumber} interview questions)<br/></>}
					{ questionsNumber !== 0  && <> (+ {questionsNumber} questions)</>}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteTechnicalFieldClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>

	);
};