import React, { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../api/api';
import { Character } from '../types/types';
import '../styles/App.css';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <h1>Rick & Morty Characters</h1>
      <div className="characters-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
