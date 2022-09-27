import { Candidate } from './candidateType';
import { TechnicalField } from './technicalFieldType';

export interface CandidateTechnicalField {
	id: string;
	candidate: Candidate;
	technicalField: TechnicalField;
};