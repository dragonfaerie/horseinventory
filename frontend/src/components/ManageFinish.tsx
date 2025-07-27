import React from "react";
import { ManageEntities } from "./ManageEntities";

const ManageFinish: React.FC = () => {
  return <ManageEntities endpoint="/api/finishes" title="Finish" />;
};

export default ManageFinish;
