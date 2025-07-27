import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageGenders: React.FC = () => {
  return <ManageEntities endpoint="/api/genders" title="Genders" />;
};

export default ManageGenders;
