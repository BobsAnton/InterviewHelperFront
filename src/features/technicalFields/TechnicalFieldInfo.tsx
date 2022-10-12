import React from "react";

import { TechnicalField } from "../../types/models/technicalFieldType";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const TechnicalFieldInfo = (technicalField: TechnicalField) => {
	return (
		<Card sx={{ marginTop: 1, padding: 1 }}>
			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Id</Typography>
			<Typography variant="body1" gutterBottom>{technicalField.id}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Name</Typography>
			<Typography variant="body1" gutterBottom>{technicalField.name}</Typography>

			<Typography variant="caption" display="block" sx={{ backgroundColor: '#C0C0C0' }} gutterBottom>Order</Typography>
			<Typography variant="body1" gutterBottom>{technicalField.order}</Typography>
		</Card>
	);
};