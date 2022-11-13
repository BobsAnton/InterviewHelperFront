import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Interview } from '../../types/models/interviewType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

interface InterviewsState {
	interviews: Array<Interview>;
	status: Status;
	error: Error;
};

const initialState: InterviewsState = {
	interviews: [],
	status: 'idle',
	error: null
};

export const fetchInterviews = createAsyncThunk('interviews/fetchInterviews', async () => {
	return (await fetch('http://localhost:8081/interviews', {
		headers: {
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		}
	})).json();
});

export const addNewInterview = createAsyncThunk('interviews/addNewInterview', async (newInterview: Interview) => {
	return (await fetch('http://localhost:8081/interviews', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(newInterview)
	})).json();
});

export const updateInterview = createAsyncThunk('interviews/updateInterview', async (interviewToUpdate: Interview) => {
	return (await fetch(`http://localhost:8081/interviews/${interviewToUpdate.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(interviewToUpdate)
	})).json();
});

export const deleteInterview = createAsyncThunk('interviews/deleteInterview', async (interviewToDelete: Interview) => {
	return (await fetch(`http://localhost:8081/interviews/${interviewToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(interviewToDelete)
	})).json();
});

const interviewsSlice = createSlice({
	name: "interviews",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchInterviews.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchInterviews.fulfilled, (state, action) => {
				if (action.payload.error) {
					state.error = action.payload.error;
					state.status = 'failed';
					localStorage.removeItem("token");
				}
				else {
					state.error = null;
					state.status = 'succeeded';
					state.interviews = action.payload;
				}
			})
			.addCase(fetchInterviews.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			.addCase(addNewInterview.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(addNewInterview.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviews.push(action.payload);
			})
			.addCase(addNewInterview.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			.addCase(updateInterview.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(updateInterview.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				let i = state.interviews.findIndex((x => x.id == action.payload.id));
				state.interviews[i].candidate = action.payload.candidate;
				state.interviews[i].date = action.payload.date;
				state.interviews[i].status = action.payload.status;
				state.interviews[i].review = action.payload.review;
			})
			.addCase(updateInterview.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			.addCase(deleteInterview.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(deleteInterview.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.interviews = state.interviews.filter(interview => interview.id !== action.payload.id)
			})
			.addCase(deleteInterview.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			});
	}
});

export const selectAllInterviews = (state: RootState) => state.interviews;

export default interviewsSlice.reducer;