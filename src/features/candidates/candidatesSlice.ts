import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', async () => {
	return (await fetch('http://localhost:8081/candidates')).json();
});

export const addNewCandidate = createAsyncThunk('candidates/addNewCandidate', async (newCandidate: Candidate) => {
	return (await fetch('http://localhost:8081/candidates', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(newCandidate)
	})).json();
});

export const deleteCandidate = createAsyncThunk('candidates/deleteCandidate', async (candidateToDelete: Candidate) => {
	return (await fetch(`http://localhost:8081/candidates/${candidateToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(candidateToDelete)
	})).json();
});

const candidatesSlice = createSlice({
	name: "candidates",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// fetchCandidates
			.addCase(fetchCandidates.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchCandidates.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidates = state.candidates.concat(action.payload);
			})
			.addCase(fetchCandidates.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// addNewCandidate
			.addCase(addNewCandidate.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(addNewCandidate.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidates.push(action.payload);
			})
			.addCase(addNewCandidate.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteCandidate
			.addCase(deleteCandidate.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(deleteCandidate.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload.id)
			})
			.addCase(deleteCandidate.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			});
	}
});

export const selectAllCandidates = (state: RootState) => state.candidates;

export default candidatesSlice.reducer;