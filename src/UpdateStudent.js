// UpdateStudent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch details of the student with the given id from the API
    fetch(`http://localhost:5004/api/v1/students/${id}`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.error('Error fetching student details:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to update the student using a PUT request to the API
    const updatedStudent = {
      name: "Updated Name",
      gpa: 4.0,
    };

    fetch(`http://localhost:5004/api/v1/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Student updated successfully:', data);
        navigate('/students');
      })
      .catch(error => console.error('Error updating student:', error));
  };

  return (
    <div>
      <h2>Update Student</h2>
      {student ? (
        <form onSubmit={handleSubmit}>
          {/* Form fields for updating the student */}
          <label>Name:</label>
          <input
            type="text"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
          <label>GPA:</label>
          <input
            type="number"
            value={student.gpa}
            onChange={(e) => setStudent({ ...student, gpa: parseFloat(e.target.value) })}
          />
          <button type="submit">Update Student</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateStudent;
