import React from 'react';
import { reset } from 'redux-form';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectAllCandidates } from '../features/candidates/candidatesSlice';

import { addNewInterview } from '../features/interviews/interviewsSlice';
import { InterviewsTable } from '../features/interviews/InterviewsTable';
import AddInterviewForm from '../features/interviews/AddInterviewForm';

import Grid from '@mui/material/Grid';

export const NewInterviewRoute = () => {
	const dispatch = useAppDispatch();
	const candidates = useAppSelector(selectAllCandidates);

	const onSubmitAddNewInterview = async (values: any) => {
		await dispatch(addNewInterview({ id: '', date: values.date?.toDate()!, status: values.status, review: values.review, candidate: candidates.candidates.find(x => x.id === values.candidateId)!}));
		dispatch(reset('AddInterviewForm'));
	};

	return (
		<Grid container>
			<Grid item xs={12} sx={{ padding: 1 }}>
				<InterviewsTable/>
              	<AddInterviewForm onSubmit={onSubmitAddNewInterview}/>
			</Grid>
	  	</Grid>
	);
};