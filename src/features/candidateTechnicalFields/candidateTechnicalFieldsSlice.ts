import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CandidateTechnicalField } from '../../types/models/candidateTechnicalFieldType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

import { deleteTechnicalField } from '../technicalFields/technicalFieldsSlice';
import { deleteCandidate } from '../candidates/candidatesSlice';

interface CandidateTechnicalFieldsState {
	candidateTechnicalFields: Array<CandidateTechnicalField>;
	status: Status;
	error: Error;
};

const initialState: CandidateTechnicalFieldsState = {
	candidateTechnicalFields: [],
	status: 'idle',
	error: null
};

export const fetchCandidateTechnicalFields = createAsyncThunk('candidateTechnicalFields/fetchCandidateTechnicalFields', async () => {
	return (await fetch('http://localhost:8081/candidate-technical-fields')).json();
});

export const addNewCandidateTechnicalField = createAsyncThunk('candidateTechnicalFields/addNewCandidateTechnicalField', async (newCandidateTechnicalField: CandidateTechnicalField) => {
	return (await fetch('http://localhost:8081/candidate-technical-fields', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(newCandidateTechnicalField)
	})).json();
});

export const deleteCandidateTechnicalField = createAsyncThunk('candidateTechnicalFields/deleteCandidateTechnicalField', async (candidateTechnicalFieldToDelete: CandidateTechnicalField) => {
	return (await fetch(`http://localhost:8081/candidate-technical-fields/${candidateTechnicalFieldToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(candidateTechnicalFieldToDelete)
	})).json();
});

const candidateTechnicalFieldsSlice = createSlice({
	name: "candidateTechnicalFields",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// fetchCandidateTechnicalFields
			.addCase(fetchCandidateTechnicalFields.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchCandidateTechnicalFields.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidateTechnicalFields = state.candidateTechnicalFields.concat(action.payload);
			})
			.addCase(fetchCandidateTechnicalFields.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// addNewCandidateTechnicalField
			.addCase(addNewCandidateTechnicalField.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(addNewCandidateTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidateTechnicalFields.push(action.payload);
			})
			.addCase(addNewCandidateTechnicalField.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteCandidateTechnicalField
			.addCase(deleteCandidateTechnicalField.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(deleteCandidateTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidateTechnicalFields = state.candidateTechnicalFields.filter(candidateTechnicalField => candidateTechnicalField.id !== action.payload.id)
			})
			.addCase(deleteCandidateTechnicalField.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteTechnicalField
			.addCase(deleteTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidateTechnicalFields = state.candidateTechnicalFields.filter(candidateTechnicalField => candidateTechnicalField.technicalField.id !== action.payload.id)
			})
			// deleteCandidate
			.addCase(deleteCandidate.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.candidateTechnicalFields = state.candidateTechnicalFields.filter(candidateTechnicalField => candidateTechnicalField.candidate.id !== action.payload.id)
			});
	}
});

export const selectAllCandidateTechnicalFields = (state: RootState) => state.candidateTechnicalFields;

export default candidateTechnicalFieldsSlice.reducer;