import React from "react";
import { reduxForm,	Field } from "redux-form";

import { useAppSelector } from '../../app/hooks';
import { renderTextField } from "../../app/reduxFormElements";

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const validate = (values: any) => {
	const errors: any = {};

	if (!values.username)
	{
		errors.username = "Required";
	}

	if (!values.email)
	{
		errors.email = "Required";
	}

	if (!values.password1)
	{
		errors.password1 = "Required";
	}

	if (!values.password2)
	{
		errors.password2 = "Required";
	}

	if (values.password1 !== values.password2)
	{
		errors.password2 = "Password1 must match password2";
	}

	return errors;
};

export const RegistrationForm = (props: any) => {
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.auth.error);

	return (
		<form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3 }}>
					<Field name="username" component={renderTextField} label="User name"/>

					<Field name="email" component={renderTextField} label="Email" sx={{ marginTop: 1 }}/>

					<Field name="password1" component={renderTextField} label="Password 1" type="password" sx={{ marginTop: 1 }}/>

					<Field name="password2" component={renderTextField} label="Password 2" type="password" sx={{ marginTop: 1 }}/>

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>Sign Up</Button>
				</FormGroup>
			</Paper>
		</form>
	);
}

export default reduxForm({
	form: "RegistrationForm",
	validate,
	enableReinitialize: true
})(RegistrationForm);