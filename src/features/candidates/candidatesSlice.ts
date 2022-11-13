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
	return (await fetch('http://localhost:8081/candidates', {
		headers: {
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		}
	})).json();
});

export const addNewCandidate = createAsyncThunk('candidates/addNewCandidate', async (newCandidate: Candidate) => {
	return (await fetch('http://localhost:8081/candidates', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(newCandidate)
	})).json();
});

export const updateCandidate = createAsyncThunk('candidates/updateCandidate', async (candidateToUpdate: Candidate) => {
	return (await fetch(`http://localhost:8081/candidates/${candidateToUpdate.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(candidateToUpdate)
	})).json();
});

export const deleteCandidate = createAsyncThunk('candidates/deleteCandidate', async (candidateToDelete: Candidate) => {
	return (await fetch(`http://localhost:8081/candidates/${candidateToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8',
			'Authorization':
				`JWT ${localStorage.getItem("token")}`
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
			.addCase(fetchCandidates.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchCandidates.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidates = action.payload;
			})
			.addCase(fetchCandidates.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
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
			.addCase(updateCandidate.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(updateCandidate.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				let i = state.candidates.findIndex((x => x.id == action.payload.id));
				state.candidates[i].name = action.payload.name;
			})
			.addCase(updateCandidate.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
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