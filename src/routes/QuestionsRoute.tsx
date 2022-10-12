import React from 'react';
import { reset } from 'redux-form';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { addNewTechnicalField, selectAllTechnicalFields } from '../features/technicalFields/technicalFieldsSlice';
import { TechnicalFieldsTable } from '../features/technicalFields/TechnicalFieldsTable';
import TechnicalFieldForm from '../features/technicalFields/TechnicalFieldForm';

import { addNewQuestion } from '../features/questions/questionsSlice';
import { QuestionsTable } from '../features/questions/QuestionsTable';
import QuestionForm from '../features/questions/QuestionForm';

import Grid from '@mui/material/Grid';

export const QuestionsRoute = () => {
	const dispatch = useAppDispatch();
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	const onSubmitAddNewTechnicalField = async (values: any) => {
		await dispatch(addNewTechnicalField({ id: '', name: values.name, order: Number(values.order) }));
		dispatch(reset('TechnicalFieldForm'));
	};

	const onSubmitAddNewQuestion = async (values: any) => {
		await dispatch(addNewQuestion({ id: '', name: values.name, description: values.description, complexity: values.complexity, technicalField: technicalFields.technicalFields.find(x => x.id === values.technicalFieldId)}));
		dispatch(reset('QuestionForm'));
	};

	return (
		<Grid container>
			<Grid item xs={4} sx={{ padding: 1 }}>
		  		<TechnicalFieldsTable/>
		  		<TechnicalFieldForm onSubmit={onSubmitAddNewTechnicalField}/>
			</Grid>
			<Grid item xs={8} sx={{ padding: 1 }}>
		  		<QuestionsTable/>
		  		<QuestionForm onSubmit={onSubmitAddNewQuestion}/>
			</Grid>
	  	</Grid>
	);
};