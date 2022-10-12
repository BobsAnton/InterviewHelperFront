import React from 'react';
import { reset } from 'redux-form';
import { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Question } from "../../types/models/questionType";

import { updateQuestion, selectAllQuestions } from '../../features/questions/questionsSlice';
import QuestionForm from '../../features/questions/QuestionForm';
import { QuestionInfo } from "../../features/questions/QuestionInfo";
import { selectAllTechnicalFields } from '../../features/technicalFields/technicalFieldsSlice';

import Grid from '@mui/material/Grid';

export async function loader(args: LoaderFunctionArgs) {
	return args.params.questionId;
}

export const QuestionEditFormRoute = () => {
	const dispatch = useAppDispatch();
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	const questionId = useLoaderData() as string;
	const questions = useAppSelector(selectAllQuestions);
	const question = questions.questions.find(x => x.id === questionId) as Question;

	const onSubmitUpdateQuestion = async (values: any, questionId: string) => {
		await dispatch(updateQuestion({ id: questionId, name: values.name, description: values.description, complexity: values.complexity, technicalField: technicalFields.technicalFields.find(x => x.id === values.technicalFieldId)!}));
		dispatch(reset('QuestionForm'));
	};

	return (
		<Grid container>
			<Grid item xs={2}/>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<QuestionInfo {...question}/>
				<QuestionForm questionId={question.id} onSubmit={(values: any) => onSubmitUpdateQuestion(values, question.id)}/>
			</Grid>
			<Grid item xs={2}/>
	  	</Grid>
	);
};