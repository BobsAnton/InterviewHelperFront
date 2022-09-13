import { Interview } from './interviewType';
import { Question } from './questionType';

export interface InterviewQuestion {
	interview: Interview;
	question: Question;
	grade: number;
	comment: string;
};