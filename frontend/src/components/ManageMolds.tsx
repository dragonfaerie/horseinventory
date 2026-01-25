import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/httpClient";

interface Manufacturer {
  id: number;
  name: string;
}

interface Mold {
  id: number;
  name: string;
  manufacturer: Manufacturer;
}

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const selectClasses = `${inputClasses} bg-slate-50`;
const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";
const secondaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";

const ManageMolds: React.FC = () => {
  const [molds, setMolds] = useState<Mold[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addName, setAddName] = useState("");
  const [addManufacturerId, setAddManufacturerId] = useState<number | "">("");

  const [selected, setSelected] = useState<Mold | null>(null);
  const [editName, setEditName] = useState("");
  const [editManufacturerId, setEditManufacturerId] =
    useState<number | "">("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [moldRes, manufacturerRes] = await Promise.all([
          apiClient.get<Mold[]>("/api/molds"),
          apiClient.get<Manufacturer[]>("/api/manufacturers"),
        ]);
        setMolds(moldRes.data);
        setManufacturers(manufacturerRes.data);
      } catch {
        setError("Unable to load molds/manufacturers.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const resetAddForm = () => {
    setAddName("");
    setAddManufacturerId("");
  };

  const resetEditForm = () => {
    setSelected(null);
    setEditName("");
    setEditManufacturerId("");
  };

  const handleAdd = async () => {
    if (
      !addName.trim() ||
      addManufacturerId === "" ||
      typeof addManufacturerId !== "number"
    ) {
      setError("Please provide a name and select a manufacturer.");
      return;
    }

    try {
      const res = await apiClient.post<Mold>("/api/molds", {
        name: addName.trim(),
        manufacturerId: addManufacturerId,
      });
      setMolds((prev) => [...prev, res.data]);
      resetAddForm();
      setError(null);
    } catch {
      setError("Failed to add mold.");
    }
  };

  const handleSelect = (mold: Mold) => {
    setSelected(mold);
    setEditName(mold.name);
    setEditManufacturerId(mold.manufacturer.id);
  };

  const handleUpdate = async () => {
    if (
      !selected ||
      !editName.trim() ||
      editManufacturerId === "" ||
      typeof editManufacturerId !== "number"
    ) {
      setError("Please complete the edit form before saving.");
      return;
    }

    try {
      const res = await apiClient.put<Mold>(`/api/molds/${selected.id}`, {
        name: editName.trim(),
        manufacturerId: editManufacturerId,
      });
      setMolds((prev) =>
        prev.map((mold) => (mold.id === res.data.id ? res.data : mold)),
      );
      resetEditForm();
      setError(null);
    } catch {
      setError("Failed to update mold.");
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
              <h2 className="text-2xl font-semibold text-slate-900">
                Manage Molds
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Link each mold to its manufacturer, then edit existing entries
                as needed.
              </p>
            </div>
            <Link to="/admin" className={`${secondaryButtonClasses} whitespace-nowrap`}>
              ← Back to Admin
            </Link>
          </div>
        </div>

        <div className="px-6 py-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Existing molds
              </h3>
              {loading && (
                <span className="text-sm text-slate-500">Loading…</span>
              )}
            </div>
            {molds.length === 0 && !loading ? (
              <p className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-500">
                No molds yet. Add one using the form below.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70">
                {molds.map((mold) => {
                  const isSelected = selected?.id === mold.id;
                  return (
                    <li
                      key={mold.id}
                      className={`flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between ${
                        isSelected ? "bg-white" : "bg-transparent"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-900">
                          {mold.name}
                        </span>
                        <span className="text-slate-500">
                          {" "}
                          · {mold.manufacturer.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelect(mold)}
                        className={`text-sm font-semibold transition ${
                          isSelected
                            ? "text-blue-700"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        {isSelected ? "Selected" : "Edit"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-blue-50/40 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                Add mold
              </h3>
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Mold name"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className={inputClasses}
                />
                <select
                  value={addManufacturerId}
                  onChange={(e) =>
                    setAddManufacturerId(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  className={selectClasses}
                >
                  <option value="">Select manufacturer</option>
                  {manufacturers.map((manufacturer) => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`${primaryButtonClasses} w-full`}
                >
                  Add mold
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                Edit mold
              </h3>
              {selected ? (
                <>
                  <p className="mt-1 text-sm text-slate-600">
                    Editing <span className="font-semibold">{selected.name}</span>
                  </p>
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={inputClasses}
                    />
                    <select
                      value={editManufacturerId}
                      onChange={(e) =>
                        setEditManufacturerId(
                          e.target.value ? Number(e.target.value) : "",
                        )
                      }
                      className={selectClasses}
                    >
                      <option value="">Select manufacturer</option>
                      {manufacturers.map((manufacturer) => (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className={primaryButtonClasses}
                      >
                        Save changes
                      </button>
                      <button
                        type="button"
                        onClick={resetEditForm}
                        className={secondaryButtonClasses}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="mt-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-500">
                  Select a mold above to populate this form.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManageMolds;
