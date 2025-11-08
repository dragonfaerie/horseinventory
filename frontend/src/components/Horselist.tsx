import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Horse } from "../types/Horse";
import { getAllHorses } from "../api/horseApi";

const formatCurrency = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") return "—";
  const numeric = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(numeric)) return "—";
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
    <div className="mx-auto mt-6 max-w-6xl px-4 pb-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-100">All Horses</h2>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
            <li
              key={horse.id}
              className="group relative overflow-hidden rounded-[32px] border border-slate-700/60 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-5 text-slate-100 shadow-2xl shadow-indigo-900/40 transition hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-purple-900/40"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.55),_transparent_60%)] opacity-70 transition group-hover:opacity-100" />
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-indigo-200/80">
                    #{horse.id.toString().padStart(4, "0")}
                  </p>
                  <strong className="text-2xl font-semibold">{horse.showName}</strong>
                  <div className="text-sm font-medium text-slate-300">
                    {horse.tagged ? "Tagged" : "Not tagged"}
                  </div>
                </div>
                <Link
                  to={`/horses/${horse.id}/edit`}
                  className="mt-2 inline-flex rounded-full border border-indigo-400/60 px-4 py-1 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/20 md:mt-0"
                >
                  Edit
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                <span className="rounded-full border border-slate-600/70 bg-slate-900/60 px-3 py-1">
                  {horse.scale.name}
                </span>
                <span className="rounded-full border border-slate-600/70 bg-slate-900/60 px-3 py-1">
                  {horse.condition.name}
                </span>
                <span className="rounded-full border border-slate-600/70 bg-slate-900/60 px-3 py-1">
                  {horse.location.name}
                </span>
              </div>
              <dl className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 text-sm text-slate-200 md:grid-cols-2">
                {detailRows.map((row) => (
                  <div key={`${horse.id}-${row.label}`} className="rounded-2xl border border-white/5 bg-white/5 p-3">
                    <dt className="text-xs uppercase tracking-wide text-indigo-200">{row.label}</dt>
                    <dd className="mt-1 text-base text-slate-100">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-600/20 via-sky-500/10 to-purple-500/20 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Purchase</p>
                  <p className="text-lg font-semibold text-slate-50">
                    {formatCurrency(tracking.purchasePrice)}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between text-slate-200">
                  <span>Sell Price</span>
                  <span className="text-slate-50">{formatCurrency(tracking.sellPrice)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HorseList;
