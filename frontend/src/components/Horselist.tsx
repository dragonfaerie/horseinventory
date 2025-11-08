import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Horse } from "../types/Horse";
import { getAllHorses } from "../api/horseApi";

const formatCurrency = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") return "—";
  const numeric = typeof value === "string" ? Number(value) : value;
  if (typeof numeric !== "number" || Number.isNaN(numeric)) return "—";
  return `$${numeric.toFixed(2)}`;
};

const HorseList: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllHorses()
      .then((data) => setHorses(data))
      .catch(() => setError("Failed to load horses"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading horses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Horses</h2>
        <Link
          to="/horses/new"
          className="inline-flex items-center rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
        >
          + Add Horse
        </Link>
      </div>
      <ul className="space-y-4">
        {horses.map((horse) => {
          const tracking = horse.tracking;
          const detailRows = [
            { label: "Manufacturer", value: horse.manufacturer.name },
            {
              label: "Model",
              value: `${horse.model.name} · Finish: ${horse.model.finish.name} · Run: ${horse.model.runType.name}`,
            },
            {
              label: "Mold",
              value: `${horse.mold.name} (${horse.mold.manufacturer.name})`,
            },
            { label: "Scale", value: horse.scale.name },
            {
              label: "Breed",
              value: `${horse.breed.name}${
                horse.breedType.name ? ` · ${horse.breedType.name}` : ""
              }`,
            },
            {
              label: "Color & Pattern",
              value: `${horse.color.name} · ${horse.pattern.name}`,
            },
            { label: "Gender", value: horse.gender.name },
            { label: "Condition", value: horse.condition.name },
            { label: "Location", value: horse.location.name },
            {
              label: "Tracking",
              value: `#${tracking.id} · Bought ${formatCurrency(tracking.purchasePrice)} · Sold ${formatCurrency(
                tracking.sellPrice,
              )} · NAN Qualified: ${tracking.nanQualified ? "Yes" : "No"}`,
            },
            {
              label: "Placings",
              value: `1st: ${tracking.firstPlace || 0}, 2nd: ${tracking.secondPlace || 0}, 3rd: ${
                tracking.thirdPlace || 0
              }, 4th: ${tracking.fourthPlace || 0}, 5th: ${tracking.fifthPlace || 0}`,
            },
            {
              label: "Office Pony",
              value: horse.officePony && horse.officePony.trim() ? horse.officePony : "—",
            },
          ];

          return (
            <li key={horse.id} className="rounded border p-4 shadow-sm bg-white">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <strong className="text-lg">{horse.showName}</strong>
                  <div className="text-sm text-gray-600">
                    {horse.tagged ? "Tagged" : "Not tagged"}
                  </div>
                </div>
                <Link
                  to={`/horses/${horse.id}/edit`}
                  className="text-blue-600 hover:underline mt-2 md:mt-0"
                >
                  Edit
                </Link>
              </div>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm md:grid-cols-2">
                {detailRows.map((row) => (
                  <div key={`${horse.id}-${row.label}`} className="flex flex-col">
                    <dt className="font-medium text-gray-500">{row.label}</dt>
                    <dd className="text-gray-800">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HorseList;
