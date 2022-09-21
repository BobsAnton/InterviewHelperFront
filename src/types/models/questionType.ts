import { TechnicalField } from './technicalFieldType'

export interface Question {
	id: string;
	name: string;
	description: string;
	complexity: string; // 'Low' | 'BelowAverage' | 'Average' | 'AboveAverage' | 'High' | 'VeryHigh';
	technicalField: TechnicalField
};