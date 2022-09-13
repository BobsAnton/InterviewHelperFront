import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Candidate } from '../../types/models/candidateType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

interface CandidatesState {
	candidates: Array<Candidate>;
	status: Status;
	error: Error;
};

const initialState: CandidatesState = {
	candidates: [],
	status: 'idle',
	error: null
};

const candidatesSlice = createSlice({
	name: "candidates",
	initialState: initialState,
	reducers: {}
});

export const selectAllCandidates = (state: RootState) => state.candidates;

export default candidatesSlice.reducer;