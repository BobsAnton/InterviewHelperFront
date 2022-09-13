import { CandidateTechnicalField } from './candidateTechnicalFieldType';
import { Interview } from './interviewType';

export interface Candidate {
	name: string;
	skills: CandidateTechnicalField[];
	interviews: Interview[];
};