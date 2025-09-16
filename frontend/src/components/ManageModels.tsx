import React, { useEffect, useState } from "react";
import axios from "axios";

interface Mold {
  id: number;
  name: string;
}
interface RunType {
  id: number;
  name: string;
}
interface Finish {
  id: number;
  name: string;
}
interface Scale {
  id: number;
  name: string;
}
interface Model {
  id: number;
  name: string;
  mold: Mold;
  runType: RunType;
  finish: Finish;
  scale: Scale;
}

export default function ManageModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [molds, setMolds] = useState<Mold[]>([]);
  const [runTypes, setRunTypes] = useState<RunType[]>([]);
  const [finishes, setFinishes] = useState<Finish[]>([]);
  const [scales, setScales] = useState<Scale[]>([]);

  const [addName, setAddName] = useState("");
  const [addMoldId, setAddMoldId] = useState<number | "">("");
  const [addRunTypeId, setAddRunTypeId] = useState<number | "">("");
  const [addFinishId, setAddFinishId] = useState<number | "">("");
  const [addScaleId, setAddScaleId] = useState<number | "">("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editMoldId, setEditMoldId] = useState<number | "">("");
  const [editRunTypeId, setEditRunTypeId] = useState<number | "">("");
  const [editFinishId, setEditFinishId] = useState<number | "">("");
  const [editScaleId, setEditScaleId] = useState<number | "">("");

  useEffect(() => {
    const fetchData = async () => {
      const [modelRes, moldRes, runRes, finishRes, scaleRes] =
        await Promise.all([
          axios.get("/api/models"),
          axios.get("/api/molds"),
          axios.get("/api/run-types"),
          axios.get("/api/finishes"),
          axios.get("/api/scales"),
        ]);
      setModels(modelRes.data);
      setMolds(moldRes.data);
      setRunTypes(runRes.data);
      setFinishes(finishRes.data);
      setScales(scaleRes.data);
    };
    fetchData();
  }, []);

  const renderSelect = (
    label: string,
    value: number | "",
    onChange: (val: number | "") => void,
    options: { id: number; name: string }[],
  ) => (
    <>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </>
  );

  const handleAdd = async () => {
    if (
      !addName ||
      !addMoldId ||
      !addRunTypeId ||
      !addFinishId ||
      !addScaleId
    ) {
      alert("Please fill out all fields.");
      return;
    }

    console.log(typeof addMoldId, addMoldId);
    try {
      await axios.post<Model>("/api/models", {
        name: addName.trim(),
        moldId: addMoldId,
        runTypeId: addRunTypeId,
        finishId: addFinishId,
        scaleId: addScaleId,
      });
      const updated = await axios.get<Model[]>("/api/models");
      setModels(updated.data);
      setAddName("");
      setAddMoldId("");
      setAddRunTypeId("");
      setAddFinishId("");
      setAddScaleId("");
    } catch (e) {
      alert("Error adding model");
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

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditMoldId("");
    setEditRunTypeId("");
    setEditFinishId("");
    setEditScaleId("");
  };

  const handleUpdate = async () => {
    if (
      !editId ||
      !editName ||
      !editMoldId ||
      !editRunTypeId ||
      !editFinishId ||
      !editScaleId
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await axios.put<Model>(`/api/models/${editId}`, {
        name: editName.trim(),
        mold: { id: editMoldId },
        runType: { id: editRunTypeId },
        finish: { id: editFinishId },
        scale: { id: editScaleId },
      });

      setModels(models.map((m) => (m.id === editId ? res.data : m)));
      cancelEdit();
    } catch (e) {
      alert("Error updating model");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Add New Model</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <input
          type="text"
          placeholder="Model Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
        {renderSelect("Mold", addMoldId, setAddMoldId, molds)}
        {renderSelect("Run Type", addRunTypeId, setAddRunTypeId, runTypes)}
        {renderSelect("Finish", addFinishId, setAddFinishId, finishes)}
        {renderSelect("Scale", addScaleId, setAddScaleId, scales)}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add Model
      </button>

      <h2 className="text-xl font-bold mt-6 mb-2">Existing Models</h2>
      {models.map((model) =>
        editId === model.id ? (
          <div key={model.id} className="border p-2 mb-2 bg-yellow-100">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            {renderSelect("Mold", editMoldId, setEditMoldId, molds)}
            {renderSelect(
              "Run Type",
              editRunTypeId,
              setEditRunTypeId,
              runTypes,
            )}
            {renderSelect("Finish", editFinishId, setEditFinishId, finishes)}
            {renderSelect("Scale", editScaleId, setEditScaleId, scales)}
            <div className="mt-2">
              <button
                className="bg-green-600 text-white px-2 py-1 mr-2"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-2 py-1"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div key={model.id} className="border p-2 mb-2">
            <strong>{model.name}</strong> — {model.mold.name},{" "}
            {model.finish.name}, {model.scale.name}, {model.runType.name}
            <div className="mt-1">
              <button
                className="bg-blue-500 text-white px-2 py-1"
                onClick={() => startEdit(model)}
              >
                Edit
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
