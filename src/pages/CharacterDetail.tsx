import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterDetail, fetchLocationByUrl, fetchEpisodeByUrl } from '../api/api';
import { Character, Location } from '../types/types';
//import './CharacterDetail.css'; // Make sure to create and import a CSS file for styling

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [origin, setOrigin] = useState<Location | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [episodes, setEpisodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const characterData = await fetchCharacterDetail(parseInt(id));
        setCharacter(characterData);

        if (characterData.origin.url) {
          const originData = await fetchLocationByUrl(characterData.origin.url);
          setOrigin(originData);
        }

        if (characterData.location.url) {
          const locationData = await fetchLocationByUrl(characterData.location.url);
          setLocation(locationData);
        }

        const episodePromises = characterData.episode.map((episodeUrl: string) =>
          fetchEpisodeByUrl(episodeUrl)
        );
        const episodeData = await Promise.all(episodePromises);
        const episodeNames = episodeData.map((episode) => episode.name);
        setEpisodes(episodeNames);
      } catch (error) {
        console.error('Error fetching character details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!character) return <div className="no-character">No character found</div>;

  return (
    <div className="character-detail">
      <img src={character.image} alt={character.name} className="character-detail-image" />
      <h1 className="character-detail-name">{character.name}</h1>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>

      <h2>Origin:</h2>
      {origin ? (
        <div className="character-detail-origin">
          <p><strong>Name:</strong> {origin.name}</p>
          <p><strong>Dimension:</strong> {origin.dimension}</p>
          <p><strong>Residents:</strong> {origin.residents.length}</p>
        </div>
      ) : (
        <p>Unknown</p>
      )}

      <h2>Location:</h2>
      {location ? (
        <div className="character-detail-location">
          <p><strong>Name:</strong> {location.name}</p>
          <p><strong>Dimension:</strong> {location.dimension}</p>
          <p><strong>Residents:</strong> {location.residents.length}</p>
        </div>
      ) : (
        <p>Unknown</p>
      )}

      <h2>Episodes:</h2>
      <ul className="character-detail-episodes">
        {episodes.map((episode, index) => (
          <li key={index}>{episode}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
