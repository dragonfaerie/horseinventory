import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/httpClient";

interface Lookup {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
  mold: Lookup;
  runType: Lookup;
  finish: Lookup;
  scale: Lookup;
}

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const selectClasses = `${inputClasses} bg-slate-50`;
const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";
const secondaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";

type SelectValue = number | "";

const ManageModels: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [molds, setMolds] = useState<Lookup[]>([]);
  const [runTypes, setRunTypes] = useState<Lookup[]>([]);
  const [finishes, setFinishes] = useState<Lookup[]>([]);
  const [scales, setScales] = useState<Lookup[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addName, setAddName] = useState("");
  const [addMoldId, setAddMoldId] = useState<SelectValue>("");
  const [addRunTypeId, setAddRunTypeId] = useState<SelectValue>("");
  const [addFinishId, setAddFinishId] = useState<SelectValue>("");
  const [addScaleId, setAddScaleId] = useState<SelectValue>("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editMoldId, setEditMoldId] = useState<SelectValue>("");
  const [editRunTypeId, setEditRunTypeId] = useState<SelectValue>("");
  const [editFinishId, setEditFinishId] = useState<SelectValue>("");
  const [editScaleId, setEditScaleId] = useState<SelectValue>("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [modelRes, moldRes, runRes, finishRes, scaleRes] =
          await Promise.all([
            apiClient.get<Model[]>("/api/models"),
            apiClient.get<Lookup[]>("/api/molds"),
            apiClient.get<Lookup[]>("/api/run-types"),
            apiClient.get<Lookup[]>("/api/finishes"),
            apiClient.get<Lookup[]>("/api/scales"),
          ]);
        setModels(modelRes.data);
        setMolds(moldRes.data);
        setRunTypes(runRes.data);
        setFinishes(finishRes.data);
        setScales(scaleRes.data);
      } catch {
        setError("Unable to load models or supporting lookups.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const lookupLists = useMemo(
    () => [
      { label: "Mold", value: addMoldId, setter: setAddMoldId, data: molds },
      {
        label: "Run type",
        value: addRunTypeId,
        setter: setAddRunTypeId,
        data: runTypes,
      },
      {
        label: "Finish",
        value: addFinishId,
        setter: setAddFinishId,
        data: finishes,
      },
      { label: "Scale", value: addScaleId, setter: setAddScaleId, data: scales },
    ],
    [addFinishId, addMoldId, addRunTypeId, addScaleId, finishes, molds, runTypes, scales],
  );

  const resetAddForm = () => {
    setAddName("");
    setAddMoldId("");
    setAddRunTypeId("");
    setAddFinishId("");
    setAddScaleId("");
  };

  const resetEditForm = () => {
    setEditId(null);
    setEditName("");
    setEditMoldId("");
    setEditRunTypeId("");
    setEditFinishId("");
    setEditScaleId("");
  };

  const renderSelect = (
    label: string,
    value: SelectValue,
    setter: (value: SelectValue) => void,
    options: Lookup[],
  ) => (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => setter(e.target.value ? Number(e.target.value) : "")}
        className={`${selectClasses} mt-1`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );

  const handleAdd = async () => {
    if (
      !addName.trim() ||
      addMoldId === "" ||
      addRunTypeId === "" ||
      addFinishId === "" ||
      addScaleId === ""
    ) {
      setError("Please fill in every field before adding a model.");
      return;
    }

    try {
      await apiClient.post<Model>("/api/models", {
        name: addName.trim(),
        moldId: addMoldId,
        runTypeId: addRunTypeId,
        finishId: addFinishId,
        scaleId: addScaleId,
      });
      const refreshed = await apiClient.get<Model[]>("/api/models");
      setModels(refreshed.data);
      resetAddForm();
      setError(null);
    } catch {
      setError("Unable to add model.");
    }
  };

  const startEdit = (model: Model) => {
    setEditId(model.id);
    setEditName(model.name);
    setEditMoldId(model.mold.id);
    setEditRunTypeId(model.runType.id);
    setEditFinishId(model.finish.id);
    setEditScaleId(model.scale.id);
  };

  const handleUpdate = async () => {
    if (
      !editId ||
      !editName.trim() ||
      editMoldId === "" ||
      editRunTypeId === "" ||
      editFinishId === "" ||
      editScaleId === ""
    ) {
      setError("Please complete every edit field before saving.");
      return;
    }

    try {
      const res = await apiClient.put<Model>(`/api/models/${editId}`, {
        name: editName.trim(),
        mold: { id: editMoldId },
        runType: { id: editRunTypeId },
        finish: { id: editFinishId },
        scale: { id: editScaleId },
      });
      setModels((prev) => prev.map((m) => (m.id === editId ? res.data : m)));
      resetEditForm();
      setError(null);
    } catch {
      setError("Unable to update model.");
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
                Manage Models
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Combine mold, finish, scale, and run type into named catalog
                entries for the rest of the app to use.
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
                Existing models
              </h3>
              {loading && (
                <span className="text-sm text-slate-500">Loading…</span>
              )}
            </div>
            {models.length === 0 && !loading ? (
              <p className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-500">
                No models configured yet. Use the form below to add one.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {models.map((model) => (
                  <li
                    key={model.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-slate-900">
                          {model.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {model.mold.name} · {model.finish.name} ·{" "}
                          {model.scale.name} · {model.runType.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEdit(model)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-blue-50/40 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                Add model
              </h3>
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Model name"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className={inputClasses}
                />
                {lookupLists.map(({ label, value, setter, data }) =>
                  renderSelect(label, value, setter, data),
                )}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`${primaryButtonClasses} w-full`}
                >
                  Add model
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                Edit model
              </h3>
              {editId ? (
                <>
                  <p className="mt-1 text-sm text-slate-600">
                    Editing <span className="font-semibold">{editName}</span>
                  </p>
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={inputClasses}
                    />
                    {renderSelect("Mold", editMoldId, setEditMoldId, molds)}
                    {renderSelect(
                      "Run type",
                      editRunTypeId,
                      setEditRunTypeId,
                      runTypes,
                    )}
                    {renderSelect("Finish", editFinishId, setEditFinishId, finishes)}
                    {renderSelect("Scale", editScaleId, setEditScaleId, scales)}
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
                  Select a model above to populate this form.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManageModels;
