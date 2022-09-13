import { createSlice } from '@reduxjs/toolkit';
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

const interviewsSlice = createSlice({
	name: "interviews",
	initialState: initialState,
	reducers: {}
});

export const selectAllInterviews = (state: RootState) => state.interviews;

export default interviewsSlice.reducer;