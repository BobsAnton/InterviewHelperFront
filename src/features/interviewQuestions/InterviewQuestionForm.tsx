import React, { useEffect } from "react";
import { 
	reduxForm,
	Field,
	InjectedFormProps,
} from "redux-form";
import { connect } from 'react-redux';

import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
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

const InterviewQuestionForm = (props: any) => {
	const dispatch = useAppDispatch();
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.interviewQuestions.error);
	const interviews = useAppSelector(selectAllInterviews);
	const questions = useAppSelector(selectAllQuestions);

	useEffect(() => {
		props.change('interviewId', props.initialValues.interviewId);
		props.change('questionId', props.initialValues.questionId);
		props.change('grade', props.initialValues.grade);
		props.change('comment', props.initialValues.comment);
	}, [dispatch]);

	return (
		<form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="interviewId" component={renderSelectField}>
						{ interviews.interviews.map((interview) => (
							<option key={interview.id} value={interview.id}>{ interview.candidate.name + ' ' + interviewDateToString(interview) }</option>
						)) }
					</Field>
					
					<Field name="questionId" component={renderSelectField} sx={{ marginTop: 1 }}>
						{ questions.questions.map((question) => (
							<option key={question.id} value={question.id}>{ question.name }</option>
						)) }
					</Field>

					<Field name="grade" component={renderTextField} label="Grade" type="number" sx={{ marginTop: 1 }} />
					
					<Field name="comment" component={renderTextField} label="Comment" variant="standard" multiline maxRows={4} sx={{ marginTop: 1 }} />

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>{props.initialValues.buttonContent}</Button>
				</FormGroup>
			</Paper>
		</form>
	);
}

const mapStateToProps = (state: RootState, ownProps: any) => {
	const interviewQuestion = state.interviewQuestions.interviewQuestions.find(x => x.id === ownProps.interviewQuestionId);
	if (interviewQuestion === undefined) return {
		initialValues: {
			buttonContent: "Add Interview-Question"
		}
	};
	
	return {
		initialValues: {
			buttonContent: "Edit Interview-Question",
			interviewId: interviewQuestion.interview.id,
			questionId: interviewQuestion.question.id,
			grade: interviewQuestion.grade,
			comment: interviewQuestion.comment
		}
	}
}

export default connect(mapStateToProps)(reduxForm({
	form: "InterviewQuestionForm",
	validate,
	enableReinitialize: true
})(InterviewQuestionForm));