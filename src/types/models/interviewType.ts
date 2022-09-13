import { Candidate } from './candidateType';

export interface Interview {
	candidate: Candidate;
	date: Date;
	status: 'Scheduled' | 'Canceled' | 'InProgress' | 'Completed';
	review: string;
};