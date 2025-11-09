import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tracking } from "../types/Tracking";
import axios from "axios";

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const numberInputClasses = `${inputClasses} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;
const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";
const secondaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";

const ManageTracking: React.FC = () => {
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [nanQualified, setNanQualified] = useState(false);
  const [firstPlace, setFirstPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");
  const [fourthPlace, setFourthPlace] = useState("");
  const [fifthPlace, setFifthPlace] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Tracking[]>("/api/tracking")
      .then((res) => setTrackings(res.data))
      .catch(() => setError("Failed to fetch tracking data"));
  }, []);

  const resetForm = () => {
    setPurchasePrice("");
    setSellPrice("");
    setNanQualified(false);
    setFirstPlace("");
    setSecondPlace("");
    setThirdPlace("");
    setFourthPlace("");
    setFifthPlace("");
  };

  const handleAdd = async () => {
    try {
      const payload = {
        purchasePrice: parseFloat(purchasePrice) || 0,
        sellPrice: parseFloat(sellPrice) || 0,
        nanQualified,
        firstPlace: parseInt(firstPlace) || 0,
        secondPlace: parseInt(secondPlace) || 0,
        thirdPlace: parseInt(thirdPlace) || 0,
        fourthPlace: parseInt(fourthPlace) || 0,
        fifthPlace: parseInt(fifthPlace) || 0,
      };

      const res = await axios.post<Tracking>("/api/tracking", payload);
      setTrackings([...trackings, res.data]);
      resetForm();
    } catch {
      setError("Failed to add tracking");
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-5xl px-4">
      <div className="rounded-3xl border border-blue-50 bg-white shadow-xl">
        <div className="border-b border-blue-50 px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Admin Form
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">Tracking</h2>
            </div>
            <Link to="/admin" className={`${secondaryButtonClasses} whitespace-nowrap`}>
              ← Back to Admin
            </Link>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Capture purchase/sale details and show placements. Totals show below for
            quick reference.
          </p>
        </div>

        <div className="px-6 py-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-blue-50/40 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                Add new tracking entry
              </h3>
              <div className="mt-4 grid gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className={numberInputClasses}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Sell Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className={numberInputClasses}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    checked={nanQualified}
                    onChange={(e) => setNanQualified(e.target.checked)}
                  />
                  NAN Qualified
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      First Place
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={firstPlace}
                      onChange={(e) => setFirstPlace(e.target.value)}
                      className={numberInputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Second Place
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={secondPlace}
                      onChange={(e) => setSecondPlace(e.target.value)}
                      className={numberInputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Third Place
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={thirdPlace}
                      onChange={(e) => setThirdPlace(e.target.value)}
                      className={numberInputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Fourth Place
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={fourthPlace}
                      onChange={(e) => setFourthPlace(e.target.value)}
                      className={numberInputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Fifth Place
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={fifthPlace}
                      onChange={(e) => setFifthPlace(e.target.value)}
                      className={numberInputClasses}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`${primaryButtonClasses} mt-2`}
                >
                  Add Tracking
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                Recent entries
              </h3>
              {trackings.length === 0 ? (
                <p className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-500">
                  No tracking entries yet. Newly added rows will appear here.
                </p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {trackings.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-700"
                    >
                      <p className="font-semibold text-slate-900">
                        Purchase ${t.purchasePrice.toFixed(2)} · Sell $
                        {t.sellPrice.toFixed(2)}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-blue-700">
                        {t.nanQualified ? "NAN Qualified" : "Not NAN Qualified"}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Placements: {t.firstPlace}-{t.secondPlace}-{t.thirdPlace}-
                        {t.fourthPlace}-{t.fifthPlace}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTracking;
