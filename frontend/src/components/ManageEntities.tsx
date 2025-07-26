import React, { useEffect, useState } from "react";
import axios from "axios";

interface Entity {
  id: number;
  name?: string; // optional to support more complex types
}

interface ManageEntitiesProps<T extends Entity> {
  endpoint: string;
  title: string;
  getName?: (item: T) => string; // optional — fallback is item.name
}

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

  const fetchItems = async () => {
    try {
      const res = await axios.get<T[]>(endpoint);
      setItems(res.data);
    } catch (err) {
      setError(`Failed to fetch from ${endpoint}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleAdd = async () => {
    if (!addName.trim()) return;
    try {
      const res = await axios.post<T>(endpoint, { name: addName.trim() });
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
      const res = await axios.put<T>(`${endpoint}/${selected.id}`, {
        ...selected,
        name: editName,
      });
      setItems((prev) =>
        prev.map((item) => (item.id === res.data.id ? res.data : item)),
      );
      setSelected(null);
      setEditName("");
    } catch {
      alert("Failed to update item");
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {getName(item)}{" "}
            <button onClick={() => handleSelect(item)}>Edit</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder={`New ${title.toLowerCase()} name`}
        value={addName}
        onChange={(e) => setAddName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      {selected && (
        <div>
          <h3>Editing: {getName(selected)}</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setSelected(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
