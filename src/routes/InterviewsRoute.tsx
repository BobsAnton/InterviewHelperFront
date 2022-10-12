import React from 'react';
import { reset } from 'redux-form';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectAllInterviews } from '../features/interviews/interviewsSlice';

import { selectAllQuestions } from '../features/questions/questionsSlice';

import { addNewInterviewQuestion } from '../features/interviewQuestions/interviewQuestionsSlice';
import { InterviewQuestionsTable } from '../features/interviewQuestions/InterviewQuestionsTable';
import InterviewQuestionForm from '../features/interviewQuestions/InterviewQuestionForm';

import Grid from '@mui/material/Grid';

export const InterviewsRoute = () => {
	const dispatch = useAppDispatch();
	const interviews = useAppSelector(selectAllInterviews);
	const questions = useAppSelector(selectAllQuestions);

	const onSubmitAddNewInterviewQuestion = async (values: any) => {
		await dispatch(addNewInterviewQuestion({ id: '', grade: Number(values.grade), comment: values.comment, interview: interviews.interviews.find(x => x.id === values.interviewId)!, question: questions.questions.find(x => x.id === values.questionId)!}));
		dispatch(reset('InterviewQuestionForm'));
	};

	return (
		<Grid container>
			<Grid item xs={12} sx={{ padding: 1 }}>
				<InterviewQuestionsTable/>
              	<InterviewQuestionForm onSubmit={onSubmitAddNewInterviewQuestion}/>
			</Grid>
	  	</Grid>
	);
};