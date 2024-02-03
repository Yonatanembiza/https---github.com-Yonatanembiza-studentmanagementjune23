// Section.js
import React from 'react';

const Section = ({ section }) => {
  return (
    <div>
      <h2>Section Details</h2>
      <p>Name: {section.name}</p>
      <p>Term: {section.term}</p>
      <p>Academic Year: {section.academicYear}</p>
    </div>
  );
};

export default Section;
