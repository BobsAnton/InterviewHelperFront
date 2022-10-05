import React from "react";
import { 
	reduxForm,
	Form,
	Field,
	InjectedFormProps,
} from "redux-form";

import { useAppSelector } from '../../app/hooks';
import { renderSelectField } from "../../app/reduxFormElements";
import { selectAllCandidates } from '../candidates/candidatesSlice';
import { selectAllTechnicalFields } from '../technicalFields/technicalFieldsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const validate = (values: any) => {
	const errors: any = {};

	if (!values.candidateId)
	{
		errors.candidateId = "Required";
	}

	if (!values.technicalFieldId)
	{
		errors.technicalFieldId = "Required";
	}

	return errors;
};

const AddCandidateTechnicalFieldForm = (props: InjectedFormProps) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.candidateTechnicalFields.error);
	const candidates = useAppSelector(selectAllCandidates);
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	return (
		<Form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="candidateId" component={renderSelectField}>
						{ candidates.candidates.map((candidate) => (
							<option value={candidate.id}>{ candidate.name }</option>
						)) }
					</Field>
					
					<Field name="technicalFieldId" component={renderSelectField} sx={{ marginTop: 1 }}>
						{ technicalFields.technicalFields.map((technicalField) => (
							<option value={technicalField.id}>{ technicalField.name }</option>
						)) }
					</Field>

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Add Candidate-TechnicalField</Button>
				</FormGroup>
			</Paper>
		</Form>
	);
}

export default reduxForm({
	form: "AddCandidateTechnicalFieldForm",
	validate
})(AddCandidateTechnicalFieldForm);