
import React from 'react';
import './CharacterCard.css'; // We will create this file for specific card styles

const CharacterCard = ({ character }) => {
    if (!character) return null;

    const {
        name,
        age,
        birthdate,
        gender,
        occupation,
        portrait_path,
        phrases,
        status,
        id
    } = character;

    // Construct image URL: https://thesimpsonsapi.com + portrait_path
    // Some APIs include the starting slash, some don't. Let's handle both or assume one.
    // The prompt says: https://thesimpsonsapi.com + portrait_path
    const imageUrl = `https:cdn.thesimpsonsapi.com/500${portrait_path}`;

    return (
        <div className="character-card">
            <div className="card-header">
                <h2>{name}</h2>
                <span className={`status-badge ${status?.toLowerCase()}`}>{status}</span>
            </div>
            <div className="card-body">
                <img
                    src={imageUrl}
                    alt={name}
                    className="character-image"
                    onError={(e) => {
                        console.warn(`Image failed to load for ${name}: ${imageUrl}`);
                        e.target.src = 'https://placehold.co/300x450?text=No+Image'; // Better fallback
                        e.target.onerror = null;
                    }}
                />
                <div className="character-info">
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>Birthdate:</strong> {birthdate}</p>
                    <p><strong>Gender:</strong> {gender}</p>
                    <p><strong>Occupation:</strong> {occupation}</p>
                </div>
            </div>
            <div className="card-footer">
                <h3>Phrases:</h3>
                <ul className="phrases-list">
                    {phrases && phrases.map((phrase, index) => (
                        <li key={index}>"{phrase}"</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CharacterCard;
