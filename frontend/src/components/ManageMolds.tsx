import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Manufacturer {
  id: number;
  name: string;
}

interface Mold {
  id: number;
  name: string;
  manufacturer: Manufacturer;
}

const ManageMolds: React.FC = () => {
  const [molds, setMolds] = useState<Mold[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [addName, setAddName] = useState('');
  const [addManufacturerId, setAddManufacturerId] = useState<number | ''>('');
  const [selected, setSelected] = useState<Mold | null>(null);
  const [editName, setEditName] = useState('');
  const [editManufacturerId, setEditManufacturerId] = useState<number | ''>('');

  useEffect(() => {
    axios.get('/api/molds').then((res) => setMolds(res.data));
  axios.get('/api/manufacturers').then((res) => {
    console.log('Loaded manufacturers:', res.data); // 👈 ADD THIS
    setManufacturers(res.data);
  });
  }, []);

const handleAdd = async () => {
  if (!addName.trim() || !addManufacturerId || typeof addManufacturerId !== 'number') {
    alert('Please provide both a name and manufacturer.');
    return;
  }

  try {
    const res = await axios.post<Mold>('/api/molds', {
      name: addName.trim(),
      manufacturerId: addManufacturerId,
    });
    setMolds([...molds, res.data]);
    setAddName('');
    setAddManufacturerId('');
  } catch {
    alert('Failed to add mold');
  }
};

  const handleSelect = (mold: Mold) => {
    setSelected(mold);
    setEditName(mold.name);
    setEditManufacturerId(mold.manufacturer.id);
  };

const handleUpdate = async () => {
  if (!selected || !editManufacturerId) return;
  try {
    const res = await axios.put<Mold>(`/api/molds/${selected.id}`, {
      name: editName,
      manufacturerId: editManufacturerId,
    });
    setMolds((prev) =>
      prev.map((m) => (m.id === res.data.id ? res.data : m))
    );
    setSelected(null);
    setEditName('');
    setEditManufacturerId('');
  } catch {
    alert('Failed to update mold');
  }
};


  return (
    <div>
      <h2>Manage Molds</h2>

      <ul>
        {molds.map((m) => (
          <li key={m.id}>
            {m.name} ({m.manufacturer.name})
            <button onClick={() => handleSelect(m)}>Edit</button>
          </li>
        ))}
      </ul>

      <h3>Add Mold</h3>
      <input
        type="text"
        placeholder="Mold name"
        value={addName}
        onChange={(e) => setAddName(e.target.value)}
      />
      <select
        value={addManufacturerId}
        onChange={(e) => {
          const value = e.target.value;
            setAddManufacturerId(value ? Number(value) : '');

        }}
      >
        <option value="">Select Manufacturer</option>
        {manufacturers.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>Add</button>

      {selected && (
        <div>
          <h3>Editing: {selected.name}</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <select
            value={editManufacturerId}
            onChange={(e) => setEditManufacturerId(Number(e.target.value))}
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setSelected(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ManageMolds;

