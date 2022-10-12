import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './app/store';
import { ErrorPage } from "./app/ErrorPage";

import App from "./App";

import { QuestionsRoute } from "./routes/QuestionsRoute";
import { InterviewsRoute } from "./routes/InterviewsRoute";
import { CandidatesRoute } from "./routes/CandidatesRoute";
import { NewInterviewRoute } from "./routes/NewInterviewRoute";
import { CandidateEditFormRoute, loader as candidateLoader } from "./routes/EditFormRoutes/CandidateEditFormRoute";
import { InterviewEditFormRoute, loader as interviewLoader } from "./routes/EditFormRoutes/InterviewEditFormRoute";
import { InterviewQuestionEditFormRoute, loader as interviewQuestionLoader } from "./routes/EditFormRoutes/InterviewQuestionEditFormRoute";
import { QuestionEditFormRoute, loader as questionLoader } from "./routes/EditFormRoutes/QuestionEditFormRoute";
import { TechnicalFieldEditFormRoute, loader as technicalFieldLoader } from "./routes/EditFormRoutes/TechnicalFieldEditFormRoute";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <App />,
	  errorElement: <ErrorPage />,
	  children: [
		{
			path: "/",
			element: <QuestionsRoute />
		},
		{
			path: "/questions",
			element: <QuestionsRoute />
		},
		{
			path: "questions/:questionId",
			element: <QuestionEditFormRoute />,
			loader: questionLoader
		},
		{
			path: "technicalFields/:technicalFieldId",
			element: <TechnicalFieldEditFormRoute />,
			loader: technicalFieldLoader
		},
		{
			path: "candidates",
			element: <CandidatesRoute />
		},
		{
			path: "candidates/:candidateId",
			element: <CandidateEditFormRoute />,
			loader: candidateLoader
		},
		{
			path: "interviews",
			element: <InterviewsRoute />
		},
		{
			path: "interviewQuestions/:interviewQuestionId",
			element: <InterviewQuestionEditFormRoute />,
			loader: interviewQuestionLoader
		},
		{
			path: "new-interview",
			element: <NewInterviewRoute />
		},
		{
			path: "interviews/:interviewId",
			element: <InterviewEditFormRoute />,
			loader: interviewLoader
		}
	  ]
	}
  ]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
    	<RouterProvider router={router} />
  	</Provider>
);