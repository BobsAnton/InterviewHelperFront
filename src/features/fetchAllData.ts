import { AppDispatch } from '../app/store';

import { fetchTechnicalFields } from './technicalFields/technicalFieldsSlice';
import { fetchCandidateTechnicalFields } from './candidateTechnicalFields/candidateTechnicalFieldsSlice';
import { fetchCandidates } from './candidates/candidatesSlice';
import { fetchInterviews } from './interviews/interviewsSlice';
import { fetchInterviewQuestions } from './interviewQuestions/interviewQuestionsSlice';
import { fetchQuestions } from './questions/questionsSlice';

export const fetchAllData = async (dispatch: AppDispatch) => {
	await dispatch(fetchTechnicalFields());
	await dispatch(fetchCandidateTechnicalFields());
	await dispatch(fetchCandidates());
	await dispatch(fetchInterviews());
	await dispatch(fetchInterviewQuestions());
	await dispatch(fetchQuestions());
};