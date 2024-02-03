// Student.js
import React from 'react';

const Student = ({ student }) => {
  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {student.name}</p>
      <p>GPA: {student.gpa}</p>
    </div>
  );
};

export default Student;
