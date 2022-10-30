import React from 'react';
import { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Candidate } from "../../types/models/candidateType";

import { updateCandidate, selectAllCandidates } from '../../features/candidates/candidatesSlice';
import CandidateForm from '../../features/candidates/CandidateForm';
import { CandidateInfo } from "../../features/candidates/CandidateInfo";
import { fetchAllData } from '../../features/fetchAllData';

import Grid from '@mui/material/Grid';

export async function loader(args: LoaderFunctionArgs) {
	return args.params.candidateId;
}

export const CandidateEditFormRoute = () => {
	const dispatch = useAppDispatch();

	const candidateId = useLoaderData() as string;
	const candidates = useAppSelector(selectAllCandidates);
	const candidate = candidates.candidates.find(x => x.id === candidateId) as Candidate;

	const onSubmitUpdateCandidate = async (values: any, candidateId: string) => {
		await dispatch(updateCandidate({ id: candidateId, name: values.name }));
		await fetchAllData(dispatch);
	};

	return (
		<Grid container>
			<Grid item xs={2}/>
			<Grid item xs={8} sx={{ padding: 1 }}>
				<CandidateInfo {...candidate}/>
				<CandidateForm candidateId={candidate.id} onSubmit={(values: any) => onSubmitUpdateCandidate(values, candidate.id)}/>
			</Grid>
			<Grid item xs={2}/>
	  	</Grid>
	);
};