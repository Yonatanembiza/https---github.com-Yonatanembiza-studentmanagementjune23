// SectionDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteStudent from './DeleteStudent';
// import DeleteStudent from './DeleteStudent';

const SectionDetails = () => {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch details of the section with students from the API
    fetch(`http://localhost:5004/api/v1/sections/${id}`)
      .then(response => response.json())
      .then(data => {
        setSection(data) 
        console.log(data)})
      .catch(error => console.error('Error fetching section details:', error));

    // Fetch all students from the API
    fetch('http://localhost:5004/api/v1/students')
      .then(response => response.json())
      .then(data => setAllStudents(data))
      .catch(error => console.error('Error fetching all students:', error));
  }, [id]);

  const handleRemoveSelectedStudents = () => {
    // Implement logic to remove selected students from the section using a DELETE request to the API
    const promises = selectedStudents.map(studentId =>
      fetch(`http://localhost:5004/api/v1/sections/${id}/students/${studentId}`, {
        method: 'DELETE',
      })
    );

    Promise.all(promises)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        // Update the local state with the modified section
        setSection(data[data.length - 1]); // Assuming the last response contains the updated section
        console.log('Selected students removed from section:', data);
        setSelectedStudents([]);
      })
      .catch(error => console.error('Error removing selected students from section:', error));
  };

  const handleAddStudent = (studentId) => {
    // Implement logic to add a student to the section using a PUT request to the API
    fetch(`http://localhost:5004/api/v1/sections/${id}/students/${studentId}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        // Update the local state with the modified section
        setSection(data);
        console.log('Student added to section:', data);
      })
      .catch(error => console.error('Error adding student to section:', error));
  };

  return (
    <div>
      <h2>Section Details</h2>
      {section ? (
        <div>
          <p>Name: {section.name}</p>
          <p>Term: {section.term}</p>
          <p>Academic Year: {section.academicYear}</p>
          <h3>Students:</h3>
          <ul>
            {section.students.map(student => (
              <li key={student.id}>
                {student.name} - GPA: {student.gpa}
                <DeleteStudent sectionId={id} studentId={student.id} setSection={setSection} />
              </li>
            ))}
          </ul>
          {/* Add button to navigate to the UpdateSection component */}
          <button onClick={handleRemoveSelectedStudents}>Remove Selected Students</button>

          {/* Dropdown to select a student and add to the section */}
          <label>Select a student:</label>
          <select onChange={(e) => setSelectedStudents([...selectedStudents, e.target.value])}>
            <option value="">Select a student</option>
            {allStudents.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <button onClick={() => handleAddStudent(selectedStudents[selectedStudents.length - 1])}>
            Add
          </button>

          {/* Back button to navigate back to the displayed Sections page */}
          <button onClick={() => navigate('/')}>&lt; Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SectionDetails;
