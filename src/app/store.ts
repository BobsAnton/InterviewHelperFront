import { configureStore } from '@reduxjs/toolkit';

import candidateTechnicalFieldsReducer from '../features/candidateTechnicalFields/candidateTechnicalFieldsSlice';
import candidatesReducer from '../features/candidates/candidatesSlice';
import interviewQuestionsReducer from '../features/interviewQuestions/interviewQuestionsSlice';
import interviewsReducer from '../features/interviews/interviewsSlice';
import questionsReducer from '../features/questions/questionsSlice';
import technicalFieldsReducer from '../features/technicalFields/technicalFieldsSlice';

const store = configureStore({
	reducer: {
		candidates: candidatesReducer,
		candidateTechnicalFields: candidateTechnicalFieldsReducer,
		interviewQuestions: interviewQuestionsReducer,
		interviews: interviewsReducer,
		questions: questionsReducer,
		technicalFields: technicalFieldsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;