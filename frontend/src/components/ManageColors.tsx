import React from 'react';
import { ManageEntities } from './ManageEntities';

const ManageColors: React.FC = () => {
  return (
    <ManageEntities
      endpoint="/api/colors"
      title="Colors"
    />
  );
};

export default ManageColors;
