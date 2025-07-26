import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageBreeds: React.FC = () => {
  return <ManageEntities endpoint="/api/breeds" title="Breeds" />;
};

export default ManageBreeds;
