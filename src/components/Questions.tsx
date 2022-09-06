import React from 'react';
import Question from './Question';

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
		<h1>Questions:</h1>
		<ul>
		  {data.map((question) => <Question key={question._id} name={question.name} complexity={question.complexity} technicalField={question.technicalField} />)}
		</ul>
	  </>
	);
}

export default Questions;