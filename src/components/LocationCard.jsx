import React from 'react';
import './CharacterCard.css'; // Reusing styles

const LocationCard = ({ location }) => {
    if (!location) return null;

    const {
        name,
        town,
        use,
        image_path
    } = location;

    // Construct image URL
    const imageUrl = image_path
        ? `https://cdn.thesimpsonsapi.com/500${image_path}`
        : null;

    return (
        <div className="character-card location-card">
            <div className="card-header">
                <h3>{name}</h3>
                {town && <span className="status-badge">{town}</span>}
            </div>
            <div className="card-body">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="character-image"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/300x200?text=No+Image';
                            e.target.onerror = null;
                        }}
                    />
                )}
                <div className="character-info">
                    {use && <p><strong>Use:</strong> {use}</p>}
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
