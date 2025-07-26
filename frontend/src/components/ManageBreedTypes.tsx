import React from 'react';
import { ManageEntities } from './ManageEntities';

const ManageBreedTypes: React.FC = () => {
  return (
    <ManageEntities
      endpoint="/api/breed-types"
      title="Breed Types"
    />
  );
};

export default ManageBreedTypes;
