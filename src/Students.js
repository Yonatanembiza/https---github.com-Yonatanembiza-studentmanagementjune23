// Students.js
import React, { useState, useEffect } from 'react';
import Student from './Student';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from the API
    fetch('http://localhost:5004/api/v1/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Student student={student} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
