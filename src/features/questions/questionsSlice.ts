import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Question } from '../../types/models/questionType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

import { deleteTechnicalField } from '../technicalFields/technicalFieldsSlice';

interface QuestionsState {
	questions: Array<Question>;
	status: Status;
	error: Error;
};

const initialState: QuestionsState = {
	questions: [],
	status: 'idle',
	error: null
};

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
	return (await fetch('http://localhost:8081/questions')).json();
});

export const addNewQuestion = createAsyncThunk('questions/addNewQuestion', async (newQuestion: Question) => {
	return (await fetch('http://localhost:8081/questions', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify({ ...newQuestion, technicalFieldName: newQuestion.technicalField.name })
	})).json();
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (questionToDelete: Question) => {
	return (await fetch('http://localhost:8081/questions', {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(questionToDelete)
	})).json();
});

const questionsSlice = createSlice({
	name: "questions",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// fetchQuestions
			.addCase(fetchQuestions.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions = state.questions.concat(action.payload);
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// addNewQuestion
			.addCase(addNewQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions.push(action.payload);
			})
			.addCase(addNewQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteQuestion
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions = state.questions.filter(question => question.name !== action.payload.name)
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteTechnicalField
			.addCase(deleteTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions = state.questions.filter(question => question.technicalField.name !== action.payload.name)
			});
	}
});

export const selectAllQuestions = (state: RootState) => state.questions;

export default questionsSlice.reducer;