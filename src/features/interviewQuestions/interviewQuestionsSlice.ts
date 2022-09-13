import { createSlice } from '@reduxjs/toolkit';
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

const interviewQuestionsSlice = createSlice({
	name: "interviewQuestions",
	initialState: initialState,
	reducers: {}
});

export const selectAllInterviewQuestions = (state: RootState) => state.interviewQuestions;

export default interviewQuestionsSlice.reducer;