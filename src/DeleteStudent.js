// DeleteStudent.js
import React from 'react';

const DeleteStudent = ({ sectionId, studentId, setSection }) => {
  const handleDeleteStudent = () => {
    // Implement logic to delete a student from the section using a DELETE request to the API
    fetch(`http://localhost:5004/api/v1/sections/${sectionId}/students/${studentId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Update the local state with the modified section
        setSection(data);
        console.log('Student removed from section:', data);
      })
      .catch(error => console.error('Error removing student from section:', error));
  };

  return (
    <button onClick={handleDeleteStudent}>Remove</button>
  );
};

export default DeleteStudent;
