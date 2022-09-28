import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Candidate } from './candidateType';

export interface Interview {
	id: string;
	candidate: Candidate;
	date: Date;
	status: string; // 'Scheduled' | 'Canceled' | 'InProgress' | 'Completed';
	review: string;
};

export const interviewDateToString = (interview: Interview): string => {
	dayjs.extend(relativeTime);
	return '📅' + dayjs(interview.date).fromNow();
};