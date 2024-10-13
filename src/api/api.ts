// src/api/api.ts
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/';

// Fetch list of characters with pagination and filtering
export const fetchCharacters = async (page: number = 1, name: string = '', filters: any = {}) => {
  const response = await axios.get(`${API_URL}character`, {
    params: { page, name, ...filters }
  });
  return response.data;
};

// Fetch details of a specific character by ID
export const fetchCharacterDetail = async (id: number) => {
  const response = await axios.get(`${API_URL}character/${id}`);
  return response.data;
};

// Fetch details of a location by URL
export const fetchLocationByUrl = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

// Fetch details of an episode by URL
export const fetchEpisodeByUrl = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export {};
