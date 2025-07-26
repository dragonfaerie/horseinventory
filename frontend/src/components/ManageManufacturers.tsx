import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageManufacturers: React.FC = () => {
  return <ManageEntities endpoint="/api/manufacturers" title="Manufacturers" />;
};

export default ManageManufacturers;
