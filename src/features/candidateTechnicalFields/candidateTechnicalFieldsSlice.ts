import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CandidateTechnicalField } from '../../types/models/candidateTechnicalFieldType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

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

const candidateTechnicalFieldsSlice = createSlice({
	name: "candidateTechnicalFields",
	initialState: initialState,
	reducers: {}
});

export const selectAllCandidateTechnicalFields = (state: RootState) => state.candidateTechnicalFields;

export default candidateTechnicalFieldsSlice.reducer;