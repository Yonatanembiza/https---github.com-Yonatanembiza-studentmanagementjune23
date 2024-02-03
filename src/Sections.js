// Sections.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Section from './Section';

const Sections = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch sections with students from the API
    fetch('http://localhost:5004/api/v1/sections')
      .then(response => response.json())
      .then(data => {setSections(data)
    console.log(data)})
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

  return (
    <div>
      <h2>Sections</h2>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <Link to={`/section/${section.id}`}>
              {section.name} - Term {section.term} - Academic Year {section.academicYear}
            </Link>
          </li>
        ))}
      </ul>

      {/* Example: Display details of the first section */}
      {sections.length > 0 && <Section section={sections[0]} />}
    </div>
  );
};

export default Sections;
