import React, { useEffect } from "react";
import { 
	reduxForm,
	Field,
	InjectedFormProps,
} from "redux-form";
import { connect } from 'react-redux';

import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
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

const CandidateForm = (props: any) => {
	const dispatch = useAppDispatch();
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.candidates.error);

	useEffect(() => {
		props.change('name', props.initialValues.name);
	}, [dispatch]);

	return (
		<form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3}}>
					<Field name="name" component={renderTextField} label="Name" />

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>{props.initialValues.buttonContent}</Button>
				</FormGroup>
			</Paper>
		</form>
	);
}

const mapStateToProps = (state: RootState, ownProps: any) => {
	const candidate = state.candidates.candidates.find(x => x.id === ownProps.candidateId);
	if (candidate === undefined) return {
		initialValues: {
			buttonContent: "Add Candidate"
		}
	};
	
	return {
		initialValues: {
			buttonContent: "Edit Candidate",
			name: candidate.name
		}
	}
}

export default connect(mapStateToProps)(reduxForm({ 
	form: 'CandidateForm',
	validate,
	enableReinitialize: true
})(CandidateForm));