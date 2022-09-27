import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InterviewQuestion } from '../../types/models/interviewQuestionType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

import { deleteQuestion } from '../questions/questionsSlice';
import { deleteInterview } from '../interviews/interviewsSlice';

interface InterviewQuestionsState {
	interviewQuestions: Array<InterviewQuestion>;
	status: Status;
	error: Error;
};

const initialState: InterviewQuestionsState = {
	interviewQuestions: [],
	status: 'idle',
	error: null
};

export const fetchInterviewQuestions = createAsyncThunk('interviewQuestions/fetchInterviewQuestions', async () => {
	return (await fetch('http://localhost:8081/interview-questions')).json();
});

export const addNewInterviewQuestion = createAsyncThunk('interviewQuestions/addNewInterviewQuestion', async (newInterviewQuestion: InterviewQuestion) => {
	return (await fetch('http://localhost:8081/interview-questions', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(newInterviewQuestion)
	})).json();
});

export const deleteInterviewQuestion = createAsyncThunk('interviewQuestions/deleteInterviewQuestion', async (interviewQuestionToDelete: InterviewQuestion) => {
	return (await fetch(`http://localhost:8081/interview-questions/${interviewQuestionToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(interviewQuestionToDelete)
	})).json();
});

const interviewQuestionsSlice = createSlice({
	name: "interviewQuestions",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// fetchInterviewQuestions
			.addCase(fetchInterviewQuestions.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchInterviewQuestions.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviewQuestions = state.interviewQuestions.concat(action.payload);
			})
			.addCase(fetchInterviewQuestions.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// addNewInterviewQuestion
			.addCase(addNewInterviewQuestion.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(addNewInterviewQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviewQuestions.push(action.payload);
			})
			.addCase(addNewInterviewQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteInterviewQuestion
			.addCase(deleteInterviewQuestion.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(deleteInterviewQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviewQuestions = state.interviewQuestions.filter(interviewQuestion => interviewQuestion.id !== action.payload.id)
			})
			.addCase(deleteInterviewQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteQuestion
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviewQuestions = state.interviewQuestions.filter(interviewQuestion => interviewQuestion.question.id !== action.payload.id)
			})
			// deleteInterview
			.addCase(deleteInterview.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviewQuestions = state.interviewQuestions.filter(interviewQuestion => interviewQuestion.interview.id !== action.payload.id)
			});
	}
});

export const selectAllInterviewQuestions = (state: RootState) => state.interviewQuestions;

export default interviewQuestionsSlice.reducer;