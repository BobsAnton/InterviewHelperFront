import React from 'react';
import { reset } from 'redux-form';
import { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { TechnicalField } from "../../types/models/technicalFieldType";

import { updateTechnicalField, selectAllTechnicalFields } from '../../features/technicalFields/technicalFieldsSlice';
import TechnicalFieldForm from '../../features/technicalFields/TechnicalFieldForm';
import { TechnicalFieldInfo } from "../../features/technicalFields/TechnicalFieldInfo";

import Grid from '@mui/material/Grid';

export async function loader(args: LoaderFunctionArgs) {
	return args.params.technicalFieldId;
}

export const TechnicalFieldEditFormRoute = () => {
	const dispatch = useAppDispatch();

	const technicalFieldId = useLoaderData() as string;
	const technicalFields = useAppSelector(selectAllTechnicalFields);
	const technicalField = technicalFields.technicalFields.find(x => x.id === technicalFieldId) as TechnicalField;

	const onSubmitUpdateTechnicalField = async (values: any, technicalFieldId: string) => {
		await dispatch(updateTechnicalField({ id: technicalFieldId, name: values.name, order: Number(values.order) }));
		dispatch(reset('TechnicalFieldForm'));
	};

	return (
		<Grid container>
			<Grid item xs={2}/>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<TechnicalFieldInfo {...technicalField}/>
				<TechnicalFieldForm technicalFieldId={technicalField.id} onSubmit={(values: any) => onSubmitUpdateTechnicalField(values, technicalField.id)}/>
			</Grid>
			<Grid item xs={2}/>
	  	</Grid>
	);
};