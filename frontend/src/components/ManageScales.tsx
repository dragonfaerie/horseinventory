import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageScales: React.FC = () => {
  return <ManageEntities endpoint="/api/scales" title="Scales" />;
};

export default ManageScales;
