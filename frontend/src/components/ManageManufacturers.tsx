import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Manufacturer {
  id: number;
  name: string;
}

const ManageManufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<Manufacturer | null>(null);
    const [addName, setAddName] = useState<string>('');
    const [editName, setEditName] = useState<string>('');

  useEffect(() => {
    fetch('/api/manufacturers')
      .then((res) => res.json())
      .then(setManufacturers);
  }, []);

const handleSelect = (man: Manufacturer) => {
  setSelected(man);
  setEditName(man.name);
};

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get<Manufacturer[]>('/api/manufacturers');
      setManufacturers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load manufacturers');
      setLoading(false);
    }
  };


const handleUpdate = () => {
  if (!selected) return;
  fetch(`/api/manufacturers/${selected.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...selected, name: editName }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    })
    .then((updated) => {
      setManufacturers((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
      setSelected(null);
      setEditName('');
    })
    .catch((err) => alert(err.message));
};

const handleAdd = async () => {
  if (!addName.trim()) return;
  try {
    const response = await axios.post<Manufacturer>('/api/manufacturers', {
      name: addName.trim(),
    });
    setManufacturers([...manufacturers, response.data]);
    setAddName('');
  } catch (err) {
    setError('Failed to add manufacturer');
  }
};

  return (
    <div>
      <h2>Manage Manufacturers</h2>

      <ul>
        {manufacturers.map((man) => (
          <li key={man.id}>
            {man.name}{' '}
            <button onClick={() => handleSelect(man)}>Edit</button>
          </li>
        ))}
      </ul>

<input
  type="text"
  placeholder="New manufacturer name"
  value={addName}
  onChange={(e) => setAddName(e.target.value)}
/>
<button onClick={handleAdd}>Add</button>

{selected && (
  <div>
    <h3>Editing: {selected.name}</h3>
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
};

export default ManageManufacturers;
