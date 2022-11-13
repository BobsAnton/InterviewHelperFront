import React from "react";
import { reduxForm, Field } from "redux-form";

import { useAppSelector } from '../../app/hooks';
import { renderTextField } from "../../app/reduxFormElements";

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const validate = (values: any) => {
	const errors: any = {};

	if (!values.email)
	{
		errors.email = "Required";
	}

	if (!values.password)
	{
		errors.password = "Required";
	}

	return errors;
};

export const LoginForm = (props: any) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.auth.error);

	return (
		<form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3 }}>
					<Field name="email" component={renderTextField} label="Email"/>

					<Field name="password" component={renderTextField} label="Password" type="password" sx={{ marginTop: 1 }}/>

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Sign In</Button>
				</FormGroup>
			</Paper>
		</form>
	);
}

export default reduxForm({
	form: "LoginForm",
	validate,
	enableReinitialize: true
})(LoginForm);