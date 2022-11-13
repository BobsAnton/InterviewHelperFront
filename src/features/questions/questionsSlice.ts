import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Question } from '../../types/models/questionType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

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
	return (await fetch('http://localhost:8081/questions', {
		headers: {
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		}
	})).json();
});

export const addNewQuestion = createAsyncThunk('questions/addNewQuestion', async (newQuestion: Question) => {
	return (await fetch('http://localhost:8081/questions', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(newQuestion)
	})).json();
});

export const updateQuestion = createAsyncThunk('questions/updateQuestion', async (questionToUpdate: Question) => {
	return (await fetch(`http://localhost:8081/questions/${questionToUpdate.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(questionToUpdate)
	})).json();
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (questionToDelete: Question) => {
	return (await fetch(`http://localhost:8081/questions/${questionToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
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
			.addCase(fetchQuestions.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions = action.payload;
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			.addCase(addNewQuestion.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(addNewQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions.push(action.payload);
			})
			.addCase(addNewQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			.addCase(updateQuestion.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(updateQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				let i = state.questions.findIndex((x => x.id == action.payload.id));
				state.questions[i].name = action.payload.name;
				state.questions[i].description = action.payload.description;
				state.questions[i].complexity = action.payload.complexity;
				state.questions[i].technicalField = action.payload.technicalField;
			})
			.addCase(updateQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			.addCase(deleteQuestion.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.questions = state.questions.filter(question => question.id !== action.payload.id)
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			});
	}
});

export const selectAllQuestions = (state: RootState) => state.questions;

export default questionsSlice.reducer;