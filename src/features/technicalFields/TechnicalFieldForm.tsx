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

	if (!values.order)
	{
		errors.order = "Required";
	}

	return errors;
};

const TechnicalFieldForm = (props: any) => {
	const dispatch = useAppDispatch();
	const { handleSubmit, pristine, submitting } = props;
	const error = useAppSelector(state => state.technicalFields.error);

	useEffect(() => {
		props.change('name', props.initialValues.name);
		props.change('order', props.initialValues.order);
	}, [dispatch]);

	return (
		<form>
			<Paper sx={{ marginTop: 1, padding: 1 }}>
				{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
				<FormGroup sx={{ marginTop: 3 }}>
					<Field name="name" component={renderTextField} label="Name"/>

					<Field name="order" component={renderTextField} label="Order" type="number" sx={{ marginTop: 1 }}/>

					<Button sx={{ marginTop: 3 }} variant="contained" onClick={handleSubmit} disabled={pristine || submitting}>{props.initialValues.buttonContent}</Button>
				</FormGroup>
			</Paper>
		</form>
	);
}

const mapStateToProps = (state: RootState, ownProps: any) => {
	const technicalField = state.technicalFields.technicalFields.find(x => x.id === ownProps.technicalFieldId);
	if (technicalField === undefined) return {
		initialValues: {
			buttonContent: "Add Technical Field"
		}
	};
	
	return {
		initialValues: {
			buttonContent: "Edit Technical Field",
			name: technicalField.name,
			order: technicalField.order
		}
	}
}

export default connect(mapStateToProps)(reduxForm({
	form: "TechnicalFieldForm",
	validate,
	enableReinitialize: true
})(TechnicalFieldForm));