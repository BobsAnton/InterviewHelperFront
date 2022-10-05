import React from "react";
import { 
	reduxForm,
	Form,
	Field,
	InjectedFormProps,
} from "redux-form";

import { useAppSelector } from '../../app/hooks';
import { renderTextField, renderSelectField } from "../../app/reduxFormElements";
import { selectAllInterviews } from '../interviews/interviewsSlice';
import { selectAllQuestions } from '../questions/questionsSlice';
import { interviewDateToString } from '../../types/models/interviewType';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const validate = (values: any) => {
	const errors: any = {};

	if (!values.interviewId)
	{
		errors.interviewId = "Required";
	}

	if (!values.questionId)
	{
		errors.questionId = "Required";
	}

	if (!values.grade)
	{
		errors.grade = "Required";
	}

	if (!values.comment)
	{
		errors.comment = "Required";
	}

	return errors;
};

const AddInterviewQuestionForm = (props: InjectedFormProps) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.interviewQuestions.error);
	const interviews = useAppSelector(selectAllInterviews);
	const questions = useAppSelector(selectAllQuestions);

	return (
		<Form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="interviewId" component={renderSelectField}>
						{ interviews.interviews.map((interview) => (
							<option value={interview.id}>{ interview.candidate.name + ' ' + interviewDateToString(interview) }</option>
						)) }
					</Field>
					
					<Field name="questionId" component={renderSelectField} sx={{ marginTop: 1 }}>
						{ questions.questions.map((question) => (
							<option value={question.id}>{ question.name }</option>
						)) }
					</Field>

					<Field name="grade" component={renderTextField} label="Grade" type="number" sx={{ marginTop: 1 }} />
					
					<Field name="comment" component={renderTextField} label="Comment" variant="standard" multiline maxRows={4} sx={{ marginTop: 1 }} />

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Add Interview-Question</Button>
				</FormGroup>
			</Paper>
		</Form>
	);
}

export default reduxForm({
	form: "AddInterviewQuestionForm",
	validate
})(AddInterviewQuestionForm);