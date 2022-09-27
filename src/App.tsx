import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './app/Navbar';

import { TechnicalFieldsTable } from './features/technicalFields/TechnicalFieldsTable';
import { AddTechnicalFieldForm } from './features/technicalFields/AddTechnicalFieldForm';

import { QuestionsTable } from './features/questions/QuestionsTable';
import { AddQuestionForm } from './features/questions/AddQuestionForm';

import { CandidatesTable } from './features/candidates/CandidatesTable';
import { AddCandidateForm } from './features/candidates/AddCandidateForm';

import { CandidateTechnicalFieldsTable } from './features/candidateTechnicalFields/CandidateTechnicalFieldsTable';
import { AddCandidateTechnicalFieldForm } from './features/candidateTechnicalFields/AddCandidateTechnicalFieldForm';

import { InterviewQuestionsTable } from './features/interviewQuestions/InterviewQuestionsTable';
import { AddInterviewQuestionForm } from './features/interviewQuestions/AddInterviewQuestionForm';

import { InterviewsTable } from './features/interviews/InterviewsTable';
import { AddInterviewForm } from './features/interviews/AddInterviewForm';

import Grid from '@mui/material/Grid';

const App = () => {
  return (
    <Grid container>
      <Grid item xs={2}/>
      <Grid item xs={8}>
        <BrowserRouter>
          <Navbar />
            <div className="App">
              <Routes>

                <Route path="/" element={
                  <Grid container>
                    <Grid item xs={4} sx={{ padding: 1 }}>
                      <TechnicalFieldsTable/>
                      <AddTechnicalFieldForm/>
                    </Grid>
                    <Grid item xs={8} sx={{ padding: 1 }}>
                      <QuestionsTable/>
                      <AddQuestionForm/>
                    </Grid>
                    <Grid item xs={4} sx={{ padding: 1 }}>
                      <CandidatesTable/>
                      <AddCandidateForm/>
                    </Grid>
                    <Grid item xs={8} sx={{ padding: 1 }}>
                      <InterviewsTable/>
                      <AddInterviewForm/>
                    </Grid>
                    <Grid item xs={4} sx={{ padding: 1 }}>
                      <CandidateTechnicalFieldsTable/>
                      <AddCandidateTechnicalFieldForm/>
                    </Grid>
                    <Grid item xs={8} sx={{ padding: 1 }}>
                      <InterviewQuestionsTable/>
                      <AddInterviewQuestionForm/>
                    </Grid>
                  </Grid>
                } />

              </Routes>
            </div>
          </BrowserRouter>
        </Grid>
      <Grid item xs={2}/>
    </Grid>
  )
}

export default App