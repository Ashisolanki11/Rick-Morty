import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../types/types';

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div className="character-card" onClick={handleCardClick}>
      <img src={character.image} alt={character.name} className="character-image" />
      <h3 className="character-name">{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};

export default CharacterCard;
