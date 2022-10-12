import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TechnicalField } from '../../types/models/technicalFieldType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

interface TechnicalFieldsState {
	technicalFields: Array<TechnicalField>;
	status: Status;
	error: Error;
};

const initialState: TechnicalFieldsState = {
	technicalFields: [],
	status: 'idle',
	error: null
};

export const fetchTechnicalFields = createAsyncThunk('technicalFields/fetchTechnicalFields', async () => {
	return (await fetch('http://localhost:8081/technical-fields')).json();
});

export const addNewTechnicalField = createAsyncThunk('technicalFields/addNewTechnicalField', async (newTechnicalField: TechnicalField) => {
	return (await fetch('http://localhost:8081/technical-fields', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(newTechnicalField)
	})).json();
});

export const updateTechnicalField = createAsyncThunk('technicalFields/updateTechnicalField', async (technicalFieldToUpdate: TechnicalField) => {
	return (await fetch(`http://localhost:8081/technical-fields/${technicalFieldToUpdate.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(technicalFieldToUpdate)
	})).json();
});

export const deleteTechnicalField = createAsyncThunk('technicalFields/deleteTechnicalField', async (technicalFieldToDelete: TechnicalField) => {
	return (await fetch(`http://localhost:8081/technical-fields/${technicalFieldToDelete.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(technicalFieldToDelete)
	})).json();
});

const technicalFieldsSlice = createSlice({
	name: "technicalFields",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// fetchTechnicalFields
			.addCase(fetchTechnicalFields.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchTechnicalFields.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.technicalFields = action.payload;
			})
			.addCase(fetchTechnicalFields.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// addNewTechnicalField
			.addCase(addNewTechnicalField.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(addNewTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.technicalFields.push(action.payload);
			})
			.addCase(addNewTechnicalField.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// updateTechnicalField
			.addCase(updateTechnicalField.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(updateTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				let i = state.technicalFields.findIndex((x => x.id == action.payload.id));
				state.technicalFields[i].name = action.payload.name;
				state.technicalFields[i].order = action.payload.order;
			})
			.addCase(updateTechnicalField.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			})
			// deleteTechnicalField
			.addCase(deleteTechnicalField.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(deleteTechnicalField.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				state.technicalFields = state.technicalFields.filter(technicalField => technicalField.id !== action.payload.id)
			})
			.addCase(deleteTechnicalField.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'failed';
			});
	}
});

export const selectAllTechnicalFields = (state: RootState) => state.technicalFields;

export default technicalFieldsSlice.reducer;