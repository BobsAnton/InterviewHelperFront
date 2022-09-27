import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteCandidate } from './candidatesSlice';
import { Candidate } from "../../types/models/candidateType";
import { selectAllInterviews } from '../interviews/interviewsSlice';
import { selectAllInterviewQuestions } from '../interviewQuestions/interviewQuestionsSlice';
import { selectAllCandidateTechnicalFields } from '../candidateTechnicalFields/candidateTechnicalFieldsSlice';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteCandidateButton = (candidate: Candidate) => {
	const dispatch = useAppDispatch();

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const interviews = useAppSelector(selectAllInterviews);
	const interviewQuestions = useAppSelector(selectAllInterviewQuestions);
	const candidateTechnicalFields = useAppSelector(selectAllCandidateTechnicalFields);
	const status = useAppSelector(state => state.candidates.status);

	const onDeleteCandidateClicked = async () => {
		setOpenDeleteDialog(false);
		await dispatch(deleteCandidate(candidate));
	};

	const handleOpenDeleteDialog = () => {	setOpenDeleteDialog(true); };
	const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false);	};

	const canSave = status !== 'loading';
	const interviewsNumber = interviews.interviews.filter(x => x.candidate.id === candidate.id).length;
	const candidateTechnicalFieldsNumber = candidateTechnicalFields.candidateTechnicalFields.filter(x => x.candidate.id === candidate.id).length;

	let interviewQuestionsNumber = 0;
	interviews.interviews.filter(x => x.candidate.id === candidate.id).forEach(interview => {
		interviewQuestionsNumber += interviewQuestions.interviewQuestions.filter(x => x.interview.id === interview.id).length;
	});

	return (
		<>
			<Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDeleteDialog} disabled={!canSave}>
				Delete
			</Button>
			<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">
					Delete this candidate: "{candidate.name}"?<br/>
					{ candidateTechnicalFieldsNumber !== 0  && <> (+ {candidateTechnicalFieldsNumber} candidate skills)<br/></>}
					{ interviewQuestionsNumber !== 0  && <> (+ {interviewQuestionsNumber} interview questions)<br/></>}
					{ interviewsNumber !== 0  && <> (+ {interviewsNumber} interviews)</>}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
					<Button onClick={onDeleteCandidateClicked} autoFocus>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};