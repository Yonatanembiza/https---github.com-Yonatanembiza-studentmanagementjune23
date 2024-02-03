// UpdateSection.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateSection = () => {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch details of the section with the given id from the API
    fetch(`http://localhost:5004/api/v1/sections/${id}`)
      .then(response => response.json())
      .then(data => setSection(data))
      .catch(error => console.error('Error fetching section details:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to update the section using a PUT request to the API
    const updatedSection = {
      name: "DS",
      term: 2,
      academicYear: 2023
    };

    fetch(`http://localhost:5004/api/v1/sections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSection),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Section updated successfully:', data);
        navigate(`/section/${id}`);
      })
      .catch(error => console.error('Error updating section:', error));
  };

  return (
    <div>
      <h2>Update Section</h2>
      {section ? (
        <form onSubmit={handleSubmit}>
          {/* Form fields for updating the section */}
          <label>Name:</label>
          <input
            type="text"
            value={section.name}
            onChange={(e) => setSection({ ...section, name: e.target.value })}
          />
          <label>Term:</label>
          <input
            type="number"
            value={section.term}
            onChange={(e) => setSection({ ...section, term: parseInt(e.target.value, 10) })}
          />
          <label>Academic Year:</label>
          <input
            type="number"
            value={section.academicYear}
            onChange={(e) => setSection({ ...section, academicYear: parseInt(e.target.value, 10) })}
          />
          <button type="submit">Update Section</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateSection;
