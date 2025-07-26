import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageCondition: React.FC = () => {
  return <ManageEntities endpoint="/api/conditions" title="Conditions" />;
};

export default ManageCondition;
