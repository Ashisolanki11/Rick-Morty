// src/components/Filters.tsx
import React from 'react';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div>
      <select name="status" onChange={handleFilterChange}>
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      {/* Add more filters for location, episode, gender, species, type */}
    </div>
  );
};

export default Filters;
