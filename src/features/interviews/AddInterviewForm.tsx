import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewInterview } from './interviewsSlice';
import { selectAllCandidates } from '../candidates/candidatesSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const AddInterviewForm = () => {
	const dispatch = useAppDispatch();

	const [candidateId, setCandidateId] = useState('');
	const [date, setDate] = useState<Dayjs | null>(null);
	const [status, setStatus] = useState('Scheduled');
	const [review, setReview] = useState('');
	
	const error = useAppSelector(state => state.interviews.error);
	const interviewsStatus = useAppSelector(state => state.interviews.status);
	const candidates = useAppSelector(selectAllCandidates);

	const onCandidateIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setCandidateId(e.target.value as string);
	const onDateChanged = (newDate: any) => setDate(newDate);
	const onReviewChanged = (e: React.ChangeEvent<HTMLInputElement>) => setReview(e.target.value);
	const onStatusChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as string);
	const onSaveInterviewClicked = async () => {
		await dispatch(addNewInterview({ id: '', date: date?.toDate()!, status, review, candidate: candidates.candidates.find(x => x.id === candidateId)!}));

		setCandidateId('');
		setDate(null);
		setStatus('');
		setReview('');
	};

	const canSave = [candidateId, date, status, review].every(Boolean) && interviewsStatus !== 'loading';

	return (
		<Paper sx={{ marginTop: 1, padding: 1 }}>
			{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
			<FormGroup sx={{ marginTop: 3}}>
				<NativeSelect sx={{ marginBottom: 2 }} value={candidateId} onChange={onCandidateIdChanged}>
					{ candidates.candidates.map((candidate) => (
						<option value={candidate.id}>{ candidate.name }</option>
					)) }
				</NativeSelect>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker label="Date" value={date} onChange={onDateChanged} renderInput={(params) => <TextField {...params} />} />
				</LocalizationProvider>
				
				<NativeSelect sx={{ marginTop: 1 }} value={status} onChange={onStatusChanged}>
					<option value={'Scheduled'}>Scheduled</option>
					<option value={'Canceled'}>Canceled</option>
					<option value={'InProgress'}>In Progress</option>
					<option value={'Completed'}>Completed</option>
				</NativeSelect>

				<TextField sx={{ marginTop: 1 }} variant="standard" label="Review" multiline maxRows={4} value={review} onChange={onReviewChanged}/>
				
				<Button sx={{ marginTop: 3 }} variant="contained" onClick={onSaveInterviewClicked} disabled={!canSave}>Add Interview</Button>
			</FormGroup>
		</Paper>
	);
};