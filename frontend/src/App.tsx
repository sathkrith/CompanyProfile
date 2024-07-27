import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className='backg'>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route element={<NotFound/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;