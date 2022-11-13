import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from 'react-redux';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import store from './app/store';

import App from "./App";
import { PrivateRoute } from "./app/PrivateRoute";
import { ErrorPage } from "./app/ErrorPage";

import { LoginPage } from "./routes/LoginPage";
import { QuestionsRoute } from "./routes/QuestionsRoute";
import { InterviewsRoute } from "./routes/InterviewsRoute";
import { CandidatesRoute } from "./routes/CandidatesRoute";
import { NewInterviewRoute } from "./routes/NewInterviewRoute";
import { CandidateEditFormRoute, loader as candidateLoader } from "./routes/EditFormRoutes/CandidateEditFormRoute";
import { InterviewEditFormRoute, loader as interviewLoader } from "./routes/EditFormRoutes/InterviewEditFormRoute";
import { InterviewQuestionEditFormRoute, loader as interviewQuestionLoader } from "./routes/EditFormRoutes/InterviewQuestionEditFormRoute";
import { QuestionEditFormRoute, loader as questionLoader } from "./routes/EditFormRoutes/QuestionEditFormRoute";
import { TechnicalFieldEditFormRoute, loader as technicalFieldLoader } from "./routes/EditFormRoutes/TechnicalFieldEditFormRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<ErrorPage />}>
			<Route path="/login" element={<LoginPage/>} />
			<Route path="/" element={<PrivateRoute><QuestionsRoute /></PrivateRoute>} />
  			<Route path="/questions" element={<PrivateRoute><QuestionsRoute /></PrivateRoute>} />
  			<Route path="questions/:questionId" element={<PrivateRoute><QuestionEditFormRoute /></PrivateRoute>} loader={questionLoader} />
  			<Route path="technicalFields/:technicalFieldId" element={<PrivateRoute><TechnicalFieldEditFormRoute /></PrivateRoute>} loader={technicalFieldLoader}/>
  			<Route path="candidates" element={<PrivateRoute><CandidatesRoute /></PrivateRoute>} />
  			<Route path="candidates/:candidateId" element={<PrivateRoute><CandidateEditFormRoute /></PrivateRoute>} loader={candidateLoader} />
  			<Route path="interviews" element={<PrivateRoute><InterviewsRoute /></PrivateRoute>} />
  			<Route path="interviewQuestions/:interviewQuestionId" element={<PrivateRoute><InterviewQuestionEditFormRoute /></PrivateRoute>} loader={interviewQuestionLoader} />
  			<Route path="new-interview" element={<PrivateRoute><NewInterviewRoute /></PrivateRoute>} />
  			<Route path="interviews/:interviewId" element={<PrivateRoute><InterviewEditFormRoute /></PrivateRoute>} loader={interviewLoader}/>
  		</Route>
	)
  );

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
    	<RouterProvider router={router} />
  	</Provider>
);