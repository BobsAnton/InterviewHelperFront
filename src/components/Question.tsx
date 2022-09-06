import React from 'react';

function Question(props: any) {
	return <li>{ props.name } ({ props.complexity }): { props.technicalField.name }</li>;
}

export default Question;