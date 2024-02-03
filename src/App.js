// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sections from './Sections';
// import SectionDetails from './SectionDetails';
import UpdateSection from './UpdatSection';
import Students from './Students';
// import Sections from './Sections';
import SectionDetails from './SectionDetails';
// import UpdateSection from './UpdateSection';
// import Students from './Students';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sections />} />
        <Route path="/section/:id" element={<SectionDetails />} />
        <Route path="/section/:id/update" element={<UpdateSection />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </Router>
  );
};

export default App;
