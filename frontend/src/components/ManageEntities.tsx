import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/httpClient";

interface Entity {
  id: number;
  name?: string; // optional to support more complex types
}

interface ManageEntitiesProps<T extends Entity> {
  endpoint: string;
  title: string;
  getName?: (item: T) => string; // optional — fallback is item.name
}

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";
const secondaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";

export function ManageEntities<T extends Entity>({
  endpoint,
  title,
  getName = (item: T) => item.name ?? `ID ${item.id}`, // default fallback
}: ManageEntitiesProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<T | null>(null);
  const [addName, setAddName] = useState("");
  const [editName, setEditName] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const res = await apiClient.get<T[]>(endpoint);
      setItems(res.data);
    } catch (err) {
      setError(`Failed to fetch from ${endpoint}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async () => {
    if (!addName.trim()) return;
    try {
      const res = await apiClient.post<T>(endpoint, { name: addName.trim() });
      setItems([...items, res.data]);
      setAddName("");
    } catch {
      setError("Failed to add item");
    }
  };

  const handleSelect = (item: T) => {
    setSelected(item);
    setEditName(item.name ?? "");
  };

  const handleUpdate = async () => {
    if (!selected) return;
    try {
      const res = await apiClient.put<T>(`${endpoint}/${selected.id}`, {
        ...selected,
        name: editName.trim(),
      });
      setItems((prev) =>
        prev.map((item) => (item.id === res.data.id ? res.data : item)),
      );
      setSelected(null);
      setEditName("");
    } catch {
      setError("Failed to update item");
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
              <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            </div>
            <Link to="/admin" className={`${secondaryButtonClasses} whitespace-nowrap`}>
              ← Back to Admin
            </Link>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Add new records or edit existing entries below. Selections populate the
            edit panel automatically.
          </p>
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
                Existing entries
              </h3>
              {loading && (
                <span className="text-sm text-slate-500">Loading…</span>
              )}
            </div>
            {items.length === 0 && !loading ? (
              <p className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-500">
                No entries yet. Add your first one below.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70">
                {items.map((item) => {
                  const isSelected = selected?.id === item.id;
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center justify-between px-4 py-3 text-sm ${
                        isSelected ? "bg-white" : "bg-transparent"
                      }`}
                    >
                      <span className="font-medium text-slate-800">
                        {getName(item)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={`text-sm font-semibold transition ${
                          isSelected ? "text-blue-700" : "text-blue-600 hover:text-blue-700"
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
              <h3 className="text-base font-semibold text-slate-900">Add new</h3>
              <p className="mt-1 text-sm text-slate-600">
                Provide a name and tap add to create a new record.
              </p>
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder={`New ${title.toLowerCase()} name`}
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`${primaryButtonClasses} w-full`}
                >
                  Add {title}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Edit entry</h3>
              {selected ? (
                <>
                  <p className="mt-1 text-sm text-slate-600">
                    Updating <span className="font-semibold">{getName(selected)}</span>
                  </p>
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={inputClasses}
                    />
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
                        onClick={() => setSelected(null)}
                        className={secondaryButtonClasses}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="mt-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-500">
                  Select an entry from the list to start editing.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
