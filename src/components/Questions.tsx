import React from 'react';
import Question from './Question';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

function Questions() {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
		  const res = await fetch('http://localhost:8081/questions');
		  const questions = await res.json();
		  setData(questions);
		};
	  
		fetchData();
	});

	return (
	  <>
		<TableContainer sx={{ width: 650 }} component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Question</TableCell>
						<TableCell align="right">Technical field</TableCell>
						<TableCell align="right">Complexity</TableCell>
						<TableCell align="right">Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.sort((a, b) => a.technicalField.name.localeCompare(b.technicalField.name)).map((question) => (
						<TableRow key={question.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component="th" scope="row">{question.name}</TableCell>
							<TableCell align="right">{question.technicalField.name}</TableCell>
							<TableCell align="right">{question.complexity}</TableCell>
							<TableCell align="right">{question.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	  </>
	);
}

export default Questions;