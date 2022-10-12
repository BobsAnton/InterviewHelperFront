import React from 'react';
import { reset } from 'redux-form';
import { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Interview } from "../../types/models/interviewType";

import { updateInterview, selectAllInterviews } from '../../features/interviews/interviewsSlice';
import InterviewForm from '../../features/interviews/InterviewForm';
import { InterviewInfo } from "../../features/interviews/InterviewInfo";
import { selectAllCandidates } from '../../features/candidates/candidatesSlice';

import Grid from '@mui/material/Grid';

export async function loader(args: LoaderFunctionArgs) {
	return args.params.interviewId;
}

export const InterviewEditFormRoute = () => {
	const dispatch = useAppDispatch();
	const candidates = useAppSelector(selectAllCandidates);

	const interviewId = useLoaderData() as string;
	const interviews = useAppSelector(selectAllInterviews);
	const interview = interviews.interviews.find(x => x.id === interviewId) as Interview;

	const onSubmitUpdateInterview = async (values: any, interviewId: string) => {
		await dispatch(updateInterview({ id: interviewId, date: values.date?.toDate()!, status: values.status, review: values.review, candidate: candidates.candidates.find(x => x.id === values.candidateId)!}));
		dispatch(reset('InterviewForm'));
	};

	return (
		<Grid container>
			<Grid item xs={2}/>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<InterviewInfo {...interview}/>
				<InterviewForm interviewId={interview.id} onSubmit={(values: any) => onSubmitUpdateInterview(values, interview.id)}/>
			</Grid>
			<Grid item xs={2}/>
	  	</Grid>
	);
};