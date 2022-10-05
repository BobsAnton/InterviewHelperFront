import React from "react";
import { 
	reduxForm,
	Form,
	Field,
	InjectedFormProps,
} from "redux-form";

import { useAppSelector} from '../../app/hooks';
import { renderTextField, renderSelectField, renderDateTimePicker } from "../../app/reduxFormElements";
import { selectAllCandidates } from '../candidates/candidatesSlice';

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

	if (!values.date)
	{
		errors.date = "Required";
	}

	if (!values.status)
	{
		errors.status = "Required";
	}

	if (!values.review)
	{
		errors.review = "Required";
	}

	return errors;
};

const AddInterviewForm = (props: InjectedFormProps) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.interviews.error);
	const candidates = useAppSelector(selectAllCandidates);

	return (
		<Form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="candidateId" component={renderSelectField} sx={{ marginBottom: 2 }}>
						{ candidates.candidates.map((candidate) => (
							<option value={candidate.id}>{ candidate.name }</option>
						)) }
					</Field>

					<Field name="date" component={renderDateTimePicker}/>
					
					<Field name="status" component={renderSelectField} sx={{ marginTop: 1 }}>
						<option value={'Scheduled'}>Scheduled</option>
						<option value={'Canceled'}>Canceled</option>
						<option value={'InProgress'}>In Progress</option>
						<option value={'Completed'}>Completed</option>
					</Field>

					<Field name="review" component={renderTextField} label="Review" variant="standard" multiline maxRows={4} sx={{ marginTop: 1 }}/>
					
					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Add Interview</Button>
				</FormGroup>
			</Paper>
		</Form>
	);
}

export default reduxForm({
	form: "AddInterviewForm",
	validate
})(AddInterviewForm);