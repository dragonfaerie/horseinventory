import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageLocations: React.FC = () => {
  return <ManageEntities endpoint="/api/locations" title="Locations" />;
};

export default ManageLocations;
