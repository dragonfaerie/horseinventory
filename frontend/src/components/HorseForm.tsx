// src/components/HorseForm.tsx
import React, { useState } from "react";

type HorseFormData = {
  showName: string;
  tagged: boolean;
  manufacturerId: number | "";
  moldId: number | "";
  scaleId: number | "";
  modelId: number | "";
  breedId: number | "";
  breedTypeId: number | "";
  colorId: number | "";
  patternId: number | "";
  genderId: number | "";
  conditionId: number | "";
  locationId: number | "";
  trackingId: number | "";
  officePony: string; // MM/YYYY or free text
};

const HorseForm: React.FC = () => {
  const [form, setForm] = useState<HorseFormData>({
    showName: "",
    tagged: false,
    manufacturerId: "",
    moldId: "",
    scaleId: "",
    modelId: "",
    breedId: "",
    breedTypeId: "",
    colorId: "",
    patternId: "",
    genderId: "",
    conditionId: "",
    locationId: "",
    trackingId: "",
    officePony: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upd = (k: keyof HorseFormData, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  const toNum = (v: string) => (v === "" ? "" : Number(v));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        tagged: form.tagged,
        manufacturerId: form.manufacturerId,
        moldId: form.moldId,
        scaleId: form.scaleId,
        modelId: form.modelId,
        breedId: form.breedId,
        breedTypeId: form.breedTypeId,
        colorId: form.colorId,
        patternId: form.patternId,
        genderId: form.genderId,
        conditionId: form.conditionId,
        locationId: form.locationId,
        trackingId: form.trackingId,
        showName: form.showName.trim(),
        officePony: form.officePony || null,
      };
      const res = await fetch("/api/horses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      // success: clear the form
      setForm({
        showName: "",
        tagged: false,
        manufacturerId: "",
        moldId: "",
        scaleId: "",
        modelId: "",
        breedId: "",
        breedTypeId: "",
        colorId: "",
        patternId: "",
        genderId: "",
        conditionId: "",
        locationId: "",
        trackingId: "",
        officePony: "",
      });
      alert("Horse saved!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error saving horse");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 rounded-2xl shadow-lg bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Add / Update Horse</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="col-span-2">
          <label className="block text-sm font-medium">Show Name</label>
          <input
            className="mt-1 w-full rounded border p-2"
            value={form.showName}
            onChange={(e) => upd("showName", e.target.value)}
            placeholder="Mr Sparkles"
            required
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.tagged}
            onChange={(e) => upd("tagged", e.target.checked)}
          />
          Tagged
        </label>

        <div>
          <label className="block text-sm font-medium">
            Office Pony (MM/YYYY)
          </label>
          <input
            className="mt-1 w-full rounded border p-2"
            value={form.officePony}
            onChange={(e) => upd("officePony", e.target.value)}
            placeholder="09/2025"
          />
        </div>

        {/* IDs — swap to dropdowns later once you’ve got the options handy */}
        {[
          ["manufacturerId", "Manufacturer ID"],
          ["moldId", "Mold ID"],
          ["scaleId", "Scale ID"],
          ["modelId", "Model ID"],
          ["breedId", "Breed ID"],
          ["breedTypeId", "Breed Type ID"],
          ["colorId", "Color ID"],
          ["patternId", "Pattern ID"],
          ["genderId", "Gender ID"],
          ["conditionId", "Condition ID"],
          ["locationId", "Location ID"],
          ["trackingId", "Tracking ID"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              className="mt-1 w-full rounded border p-2"
              inputMode="numeric"
              value={form[key as keyof HorseFormData] as any}
              onChange={(e) =>
                upd(key as keyof HorseFormData, toNum(e.target.value))
              }
              placeholder="e.g. 1"
            />
          </div>
        ))}

        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Horse"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HorseForm;
