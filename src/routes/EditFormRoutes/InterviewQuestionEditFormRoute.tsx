import React from 'react';
import { reset } from 'redux-form';
import { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { InterviewQuestion } from "../../types/models/interviewQuestionType";

import { updateInterviewQuestion, selectAllInterviewQuestions } from '../../features/interviewQuestions/interviewQuestionsSlice';
import InterviewQuestionForm from '../../features/interviewQuestions/InterviewQuestionForm';
import { InterviewQuestionInfo } from "../../features/interviewQuestions/InterviewQuestionInfo";
import { selectAllInterviews } from '../../features/interviews/interviewsSlice';
import { selectAllQuestions } from '../../features/questions/questionsSlice';

import Grid from '@mui/material/Grid';

export async function loader(args: LoaderFunctionArgs) {
	return args.params.interviewQuestionId;
}

export const InterviewQuestionEditFormRoute = () => {
	const dispatch = useAppDispatch();

	const interviews = useAppSelector(selectAllInterviews);
	const questions = useAppSelector(selectAllQuestions);

	const interviewQuestionId = useLoaderData() as string;
	const interviewQuestions = useAppSelector(selectAllInterviewQuestions);
	const interviewQuestion = interviewQuestions.interviewQuestions.find(x => x.id === interviewQuestionId) as InterviewQuestion;

	const onSubmitUpdateInterviewQuestion = async (values: any, interviewQuestionId: string) => {
		await dispatch(updateInterviewQuestion({ id: interviewQuestionId, grade: Number(values.grade), comment: values.comment, interview: interviews.interviews.find(x => x.id === values.interviewId)!, question: questions.questions.find(x => x.id === values.questionId)!}));
	};

	return (
		<Grid container>
			<Grid item xs={2}/>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<InterviewQuestionInfo {...interviewQuestion}/>
				<InterviewQuestionForm interviewQuestionId={interviewQuestion.id} onSubmit={(values: any) => onSubmitUpdateInterviewQuestion(values, interviewQuestion.id)}/>
			</Grid>
			<Grid item xs={2}/>
	  	</Grid>
	);
};