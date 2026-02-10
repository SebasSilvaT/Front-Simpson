import React from 'react';
import './CharacterCard.css'; // Reusing styles for now

const EpisodeCard = ({ episode }) => {
    if (!episode) return null;

    const {
        name,
        season,
        episode_number,
        airdate,
        synopsis,
        image_path
    } = episode;

    // Construct image URL
    const imageUrl = image_path
        ? `https://cdn.thesimpsonsapi.com/500${image_path}`
        : null;

    return (
        <div className="character-card episode-card"> {/* reusing card style */}
            <div className="card-header">
                <h3>{name}</h3>
                <span className="status-badge">S{season} E{episode_number}</span>
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
                    <p><strong>Aired:</strong> {airdate}</p>
                    <p className="description">{synopsis}</p>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;
