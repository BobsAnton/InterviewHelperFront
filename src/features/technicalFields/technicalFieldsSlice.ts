import { createSlice } from '@reduxjs/toolkit';
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

const technicalFieldsSlice = createSlice({
	name: "technicalFields",
	initialState: initialState,
	reducers: {}
});

export const selectAllTechnicalFields = (state: RootState) => state.technicalFields;

export default technicalFieldsSlice.reducer;