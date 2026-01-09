import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TypingTest.css';


const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const { wpm, mistakes, accuracy } = location.state || {};

  useEffect(() => {
    document.body.className = 'typing-test-body';
    return () => {document.body.className = '';};
    }, []);

  const saveGame = async () => {
    const username = localStorage.getItem('username');

    if (!username) {
      alert('You need to be logged in to save your result.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, wpm, mistakes, accuracy }),
      });

      if (response.ok) {
        navigate('/home/leader');
      } else {
        const text = await response.text();
        console.error('Error saving result:', text);
        alert('Failed to save result to leaderboard.');
      }
    } catch (error) {
      console.error('Error saving result:', error);
      alert('Server error while saving result.');
    }
  }

  return (
    <div className='wrapper'>
      <h1 className='heading'>Results</h1>
      <div className="content-box">
        <div className="typing-text">
          <p className='res'>Here are your results!<br />Would you like to save it to the leaderboards?</p>
        </div>
        <div className="content">
             <ul className="result-details">
              <li><p>WPM:</p> <span>{wpm}</span></li>
              <li><p>Mistakes:</p> <span>{mistakes}</span></li>
              <li><p>Accuracy (%):</p> <span>{accuracy}</span></li>
              <li><button onClick={saveGame}>Save</button></li>
            </ul>
          </div>
      </div>
    </div>  
  );
};

export default Results;
