import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManagePatterns: React.FC = () => {
  return <ManageEntities endpoint="/api/patterns" title="Patterns" />;
};

export default ManagePatterns;
