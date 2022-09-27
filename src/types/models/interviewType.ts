import { Candidate } from './candidateType';

export interface Interview {
	id: string;
	candidate: Candidate;
	date: Date;
	status: string; // 'Scheduled' | 'Canceled' | 'InProgress' | 'Completed';
	review: string;
};