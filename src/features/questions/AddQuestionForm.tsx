import React from "react";
import { 
	reduxForm,
	Form,
	Field,
	InjectedFormProps,
} from "redux-form";

import { useAppSelector } from '../../app/hooks';
import { renderTextField, renderSelectField } from "../../app/reduxFormElements";
import { selectAllTechnicalFields } from '../technicalFields/technicalFieldsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const validate = (values: any) => {
	const errors: any = {};

	if (!values.name)
	{
		errors.name = "Required";
	}

	if (!values.technicalFieldId)
	{
		errors.technicalFieldId = "Required";
	}

	if (!values.complexity)
	{
		errors.complexity = "Required";
	}

	if (!values.description)
	{
		errors.description = "Required";
	}

	return errors;
};

const AddQuestionForm = (props: InjectedFormProps) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.questions.error);
	const technicalFields = useAppSelector(selectAllTechnicalFields);

	return (
		<Form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="name" component={renderTextField} label="Name"/>

					<Field name="technicalFieldId" component={renderSelectField} sx={{ marginTop: 1 }}>
						{ technicalFields.technicalFields.map((technicalField) => (
							<option value={technicalField.id}>{ technicalField.name }</option>
						)) }
					</Field>

					<Field name="complexity" component={renderSelectField} sx={{ marginTop: 1 }}>
						<option value={'Low'}>Low</option>
						<option value={'BelowAverage'}>Below average</option>
						<option value={'Average'}>Average</option>
						<option value={'AboveAverage'}>Above average</option>
						<option value={'High'}>High</option>
						<option value={'VeryHigh'}>Very high</option>
					</Field>
					
					<Field name="description" component={renderTextField} label="Description" sx={{ marginTop: 1 }} variant="standard" multiline maxRows={4}/>

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Add Question</Button>
				</FormGroup>
			</Paper>
		</Form>
	);
}

export default reduxForm({
	form: "AddQuestionForm",
	validate
})(AddQuestionForm);