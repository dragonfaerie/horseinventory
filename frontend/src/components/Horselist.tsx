import React, { useEffect, useState } from "react";
import { Horse } from "../types/Horse";
import { getAllHorses } from "../api/horseApi";

const HorseList: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllHorses()
      .then((data) => setHorses(data))
      .catch((err) => setError("Failed to load horses"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading horses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Horses</h2>
      <ul>
        {horses.map((horse) => (
          <li key={horse.id}>
            <strong>{horse.showName}</strong>
            {" — "}Mold: {horse.mold.name} ({horse.mold.manufacturer.name})
            {", "}Scale: {horse.scale.name}
            {", "}Finish: {horse.model.finish.name}
            {", "}Run: {horse.model.runType.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorseList;
