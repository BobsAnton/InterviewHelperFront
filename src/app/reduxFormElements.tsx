import React from "react";
import { 
	WrappedFieldInputProps,
	WrappedFieldMetaProps 
} from "redux-form";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const renderTextField = ({label, input, meta, ...custom}: { label: string, input: WrappedFieldInputProps, meta: WrappedFieldMetaProps, custom: any }) => {
	return (
		<TextField placeholder={label} helperText={meta.touched && meta.error ? meta.error : ''} error={meta.touched && meta.error} {...input} {...custom} variant="standard" />
	);
};

export const renderSelectField = ({label, input, meta, children, ...custom}: { label: string, input: WrappedFieldInputProps, meta: WrappedFieldMetaProps, children: any, custom: any }) => {
	return (
		<FormControl error={meta.touched && meta.error}>
			<NativeSelect {...input} {...custom}>
				{children}
	  		</NativeSelect>
      	</FormControl>
	);
}

export const renderDateTimePicker = ({label, input, meta, ...custom}: { label: string, input: WrappedFieldInputProps, meta: WrappedFieldMetaProps, custom: any }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DateTimePicker label={label} {...input} {...custom} renderInput={(params) => <TextField {...params} helperText={meta.touched && meta.error ? meta.error : ''} error={meta.touched && meta.error} />} />
		</LocalizationProvider>
	);
}