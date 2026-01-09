import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Leader = () => {

    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);
    console.log(leaderboard); // Log the leaderboard to see what it is

    useEffect(() => {
        axios.get('http://localhost:5002/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
            })
            .catch(error => {
                setError('Failed to load leaderboard');
                console.error('There was an error fetching the leaderboard!', error);
            });
    }, []);
    
    return (
        <div>
            {error && <div className="error">{error}</div>}
            {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                <ul>
                    {leaderboard.map((entry, index) => (
                        <li key={index}>
                            {entry.username}: {entry.wpm} WPM
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No leaderboard data available</p>
            )}
        </div>
    );
}


export default Leader;