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
	const response = await fetch('http://localhost:8081/questions');
	const questions = await response.json();
	return questions;
});

const questionsSlice = createSlice({
	name: "questions",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchQuestions.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.questions = state.questions.concat(action.payload);
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export const selectAllQuestions = (state: RootState) => state.questions;

export default questionsSlice.reducer;