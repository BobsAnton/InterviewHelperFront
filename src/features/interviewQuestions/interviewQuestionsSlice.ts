import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InterviewQuestion } from '../../types/models/interviewQuestionType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

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
	return (await fetch('http://localhost:8081/interview-questions', {
		headers: {
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		}
	})).json();
});

export const addNewInterviewQuestion = createAsyncThunk('interviewQuestions/addNewInterviewQuestion', async (newInterviewQuestion: InterviewQuestion) => {
	return (await fetch('http://localhost:8081/interview-questions', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(newInterviewQuestion)
	})).json();
});

export const updateInterviewQuestion = createAsyncThunk('interviewQuestions/updateInterviewQuestion', async (interviewQuestionToUpdate: InterviewQuestion) => {
	return (await fetch(`http://localhost:8081/interview-questions/${interviewQuestionToUpdate.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(interviewQuestionToUpdate)
	})).json();
});

export const deleteInterviewQuestion = createAsyncThunk('interviewQuestions/deleteInterviewQuestion', async (interviewQuestionToDelete: InterviewQuestion) => {
	return (await fetch(`http://localhost:8081/interview-questions/${interviewQuestionToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
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
			.addCase(fetchInterviewQuestions.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchInterviewQuestions.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviewQuestions = action.payload;
			})
			.addCase(fetchInterviewQuestions.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
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
			.addCase(updateInterviewQuestion.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(updateInterviewQuestion.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				let i = state.interviewQuestions.findIndex((x => x.id == action.payload.id));
				state.interviewQuestions[i].interview = action.payload.interview;
				state.interviewQuestions[i].question = action.payload.question;
				state.interviewQuestions[i].grade = action.payload.grade;
				state.interviewQuestions[i].comment = action.payload.comment;
			})
			.addCase(updateInterviewQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
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
			});
	}
});

export const selectAllInterviewQuestions = (state: RootState) => state.interviewQuestions;

export default interviewQuestionsSlice.reducer;