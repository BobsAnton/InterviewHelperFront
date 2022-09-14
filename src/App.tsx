import React from 'react';

import { TechnicalFieldsTable } from './features/technicalFields/TechnicalFieldsTable';
import { AddTechnicalFieldForm } from './features/technicalFields/AddTechnicalFieldForm';

import { QuestionsTable } from './features/questions/QuestionsTable';
import { AddQuestionForm } from './features/questions/AddQuestionForm';

import Box from '@mui/material/Box';

const App = () => {
  return (
    <>
      <Box display="flex" sx={{  justifyContent: 'center' }}>
        <Box display="flex" flexDirection="column">
          <TechnicalFieldsTable/>
          <AddTechnicalFieldForm/>
        </Box>
        <Box display="flex" flexDirection="column" sx={{ marginLeft: 1 }}>
          <QuestionsTable/>
          <AddQuestionForm/>
        </Box>
      </Box>
    </>
  )
}

export default App