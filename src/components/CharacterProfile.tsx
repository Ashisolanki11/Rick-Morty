// src/components/CharacterProfile.tsx
import React, { useEffect, useState } from 'react';
import { fetchCharacterDetail, fetchLocationByUrl, fetchEpisodeByUrl } from '../api/api';
import { Character, Location } from '../types/types';

const CharacterProfile: React.FC<{ id: string }> = ({ id }) => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [origin, setOrigin] = useState<Location | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [episodes, setEpisodes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const characterData = await fetchCharacterDetail(Number(id));
            setCharacter(characterData);

            if (characterData.origin.url) {
                const originData = await fetchLocationByUrl(characterData.origin.url);
                setOrigin(originData);
            }

            if (characterData.location.url) {
                const locationData = await fetchLocationByUrl(characterData.location.url);
                setLocation(locationData);
            }

            const episodePromises = characterData.episode.map(async (url: string) => {
                const episodeData = await fetchEpisodeByUrl(url);
                return episodeData.name;
            });
            const episodeNames = await Promise.all(episodePromises);
            setEpisodes(episodeNames);

            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return character ? (
        <div className="character-profile">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>

            <h3>Origin</h3>
            {origin ? (
                <div>
                    <p>Name: {origin.name}</p>
                    <p>Dimension: {origin.dimension}</p>
                    <p>Residents: {origin.residents.length}</p>
                </div>
            ) : (
                <p>Origin data not available</p>
            )}

            <h3>Current Location</h3>
            {location ? (
                <div>
                    <p>Name: {location.name}</p>
                    <p>Dimension: {location.dimension}</p>
                    <p>Residents: {location.residents.length}</p>
                </div>
            ) : (
                <p>Location data not available</p>
            )}

            <h3>Episodes Featured In</h3>
            <ul>
                {episodes.length > 0 ? (
                    episodes.map((episode, index) => (
                        <li key={index}>{episode}</li>
                    ))
                ) : (
                    <li>No episodes available</li>
                )}
            </ul>
        </div>
    ) : (
        <div>No character found</div>
    );
};

export default CharacterProfile;
