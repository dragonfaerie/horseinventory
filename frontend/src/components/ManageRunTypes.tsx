import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageRunTypes: React.FC = () => {
  return <ManageEntities endpoint="/api/run-types" title="Run Types" />;
};

export default ManageRunTypes;
