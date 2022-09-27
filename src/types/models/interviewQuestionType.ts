import { Interview } from './interviewType';
import { Question } from './questionType';

export interface InterviewQuestion {
	id: string;
	interview: Interview;
	question: Question;
	grade: number;
	comment: string;
};