import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewInterviewQuestion } from './interviewQuestionsSlice';
import { selectAllInterviews } from '../interviews/interviewsSlice';
import { selectAllQuestions } from '../questions/questionsSlice';

import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const AddInterviewQuestionForm = () => {
	const dispatch = useAppDispatch();

	const [grade, setGrade] = useState('');
	const [comment, setComment] = useState('');
	const [interviewId, setInterviewId] = useState('');
	const [questionId, setQuestionId] = useState('');
	
	const error = useAppSelector(state => state.interviewQuestions.error);
	const status = useAppSelector(state => state.interviewQuestions.status);
	const interviews = useAppSelector(selectAllInterviews);
	const questions = useAppSelector(selectAllQuestions);

	const onGradeChanged = (e: React.ChangeEvent<HTMLInputElement>) => setGrade(e.target.value);
	const onCommentChanged = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value);
	const onInterviewIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setInterviewId(e.target.value as string);
	const onQuestionIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setQuestionId(e.target.value as string);
	const onSaveInterviewQuestionClicked = async () => {
		await dispatch(addNewInterviewQuestion({ id: '', grade: Number(grade), comment, interview: interviews.interviews.find(x => x.id === interviewId)!, question: questions.questions.find(x => x.id === questionId)!}));
			
		setGrade('');
		setComment('');
		setInterviewId('');
		setQuestionId('');
	};

	const canSave = [grade, comment, interviewId, questionId].every(Boolean) && status !== 'loading';

	return (
		<Paper sx={{ marginTop: 1, padding: 1 }}>
			{ (error !== null) ? (<Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>) : (<></>) }
			<FormGroup sx={{ marginTop: 3}}>
				<NativeSelect value={interviewId} onChange={onInterviewIdChanged}>
					{ interviews.interviews.map((interview) => (
						<option value={interview.id}>{ interview.candidate.name + ' ' + interview.date }</option>
					)) }
				</NativeSelect>
				
				<NativeSelect sx={{ marginTop: 1 }} value={questionId} onChange={onQuestionIdChanged}>
					{ questions.questions.map((question) => (
						<option value={question.id}>{ question.name }</option>
					)) }
				</NativeSelect>

				<Input sx={{ marginTop: 1 }} placeholder="Grade" type="number" value={grade} onChange={onGradeChanged} />
				
				<TextField sx={{ marginTop: 1 }} variant="standard" label="Comment" multiline maxRows={4} value={comment} onChange={onCommentChanged}/>

				<Button sx={{ marginTop: 3 }} variant="contained" onClick={onSaveInterviewQuestionClicked} disabled={!canSave}>Add Interview-Question</Button>
			</FormGroup>
		</Paper>
	);
};