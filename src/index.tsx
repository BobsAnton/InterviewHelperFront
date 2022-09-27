import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from './app/store';
import { Provider } from 'react-redux';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from "./app/ErrorPage";
import { QuestionsRoute } from "./routes/QuestionsRoute";
import { InterviewsRoute } from "./routes/InterviewsRoute";
import { CandidatesRoute } from "./routes/CandidatesRoute";
import { NewInterviewRoute } from "./routes/NewInterviewRoute";

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
			path: "candidates",
			element: <CandidatesRoute />
		},
		{
			path: "interviews",
			element: <InterviewsRoute />
		},
		{
			path: "new-interview",
			element: <NewInterviewRoute />
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