import React, { useEffect } from "react";
import { 
	reduxForm,
	Field,
	InjectedFormProps,
} from "redux-form";
import { connect } from 'react-redux';

import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { renderTextField, renderSelectField, renderDateTimePicker } from "../../app/reduxFormElements";
import { selectAllCandidates } from '../candidates/candidatesSlice';
import { fetchAllData } from '../fetchAllData';

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

	return errors;
};

const InterviewForm = (props: any) => {
	const dispatch = useAppDispatch();
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.interviews.error);
	const candidates = useAppSelector(selectAllCandidates);

	useEffect(() => {
		(async () => await fetchAllData(dispatch))();
		props.change('candidateId', props.initialValues.candidateId);
		props.change('date', props.initialValues.date);
		props.change('status', props.initialValues.status);
		props.change('review', props.initialValues.review);
	}, [dispatch]);

	return (
		<form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="candidateId" component={renderSelectField} sx={{ marginBottom: 2 }}>
						{ candidates.candidates.map((candidate) => (
							<option key={candidate.id} value={candidate.id}>{ candidate.name }</option>
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
					
					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>{props.initialValues.buttonContent}</Button>
				</FormGroup>
			</Paper>
		</form>
	);
}

const mapStateToProps = (state: RootState, ownProps: any) => {
	const interview = state.interviews.interviews.find(x => x.id === ownProps.interviewId);
	if (interview === undefined) return {
		initialValues: {
			buttonContent: "Start Interview"
		}
	};
	
	return {
		initialValues: {
			buttonContent: "Edit Interview",
			candidateId: interview.candidate.id,
			date: interview.date,
			status: interview.status,
			review: interview.review
		}
	}
}

export default connect(mapStateToProps)(reduxForm({
	form: "InterviewForm",
	validate,
	enableReinitialize: true
})(InterviewForm));