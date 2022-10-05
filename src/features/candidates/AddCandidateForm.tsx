import React from "react";
import { 
	reduxForm,
	Form,
	Field,
	InjectedFormProps,
} from "redux-form";

import { useAppSelector } from '../../app/hooks';
import { renderTextField } from "../../app/reduxFormElements";

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

	return errors;
};

const AddCandidateForm = (props: InjectedFormProps) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.candidates.error);

	return (
		<Form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="name" component={renderTextField}  label="Name" />

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Add Candidate</Button>
				</FormGroup>
			</Paper>
		</Form>
	);
}

export default reduxForm({
	form: "AddCandidateForm",
	validate
})(AddCandidateForm);