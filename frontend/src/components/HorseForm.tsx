// src/components/HorseForm.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { createHorse, getHorseById, updateHorse } from "../api/horseApi";
import { Horse, HorseRequest } from "../types/Horse";

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
  officePony: string;
};

type NumericField = Exclude<
  keyof HorseFormData,
  "showName" | "tagged" | "officePony"
>;

type ReferenceEntity = {
  id: number;
  name?: string;
  [key: string]: any;
};

type ReferenceField = {
  key: NumericField;
  label: string;
  endpoint: string;
  optionLabel?: (item: ReferenceEntity) => string;
};

const REFERENCE_FIELDS: ReferenceField[] = [
  { key: "manufacturerId", label: "Manufacturer", endpoint: "/api/manufacturers" },
  { key: "moldId", label: "Mold", endpoint: "/api/molds", optionLabel: (item) => `${item.name} (${item.manufacturer?.name ?? "Unknown maker"})` },
  { key: "scaleId", label: "Scale", endpoint: "/api/scales" },
  { key: "modelId", label: "Model", endpoint: "/api/models" },
  { key: "breedId", label: "Breed", endpoint: "/api/breeds" },
  { key: "breedTypeId", label: "Breed Type", endpoint: "/api/breed-types" },
  { key: "colorId", label: "Color", endpoint: "/api/colors" },
  { key: "patternId", label: "Pattern", endpoint: "/api/patterns" },
  { key: "genderId", label: "Gender", endpoint: "/api/genders" },
  { key: "conditionId", label: "Condition", endpoint: "/api/conditions" },
  { key: "locationId", label: "Location", endpoint: "/api/locations" },
  {
    key: "trackingId",
    label: "Tracking",
    endpoint: "/api/tracking",
    optionLabel: (item) =>
      `Tracking #${item.id} · Purchase $${item.purchasePrice ?? 0}`,
  },
];

const EMPTY_FORM: HorseFormData = {
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
};

const horseToForm = (horse: Horse): HorseFormData => ({
  showName: horse.showName ?? "",
  tagged: horse.tagged,
  manufacturerId: horse.manufacturer.id,
  moldId: horse.mold.id,
  scaleId: horse.scale.id,
  modelId: horse.model.id,
  breedId: horse.breed.id,
  breedTypeId: horse.breedType.id,
  colorId: horse.color.id,
  patternId: horse.pattern.id,
  genderId: horse.gender.id,
  conditionId: horse.condition.id,
  locationId: horse.location.id,
  trackingId: horse.tracking.id,
  officePony: horse.officePony ?? "",
});

const HorseForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const horseId = id ? Number(id) : null;
  const isEditMode = horseId !== null && !Number.isNaN(horseId);
  const navigate = useNavigate();

  const [form, setForm] = useState<HorseFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [loadingHorse, setLoadingHorse] = useState<boolean>(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [referenceData, setReferenceData] = useState<
    Record<NumericField, ReferenceEntity[]>
  >(() => {
    const empty = {} as Record<NumericField, ReferenceEntity[]>;
    REFERENCE_FIELDS.forEach((field) => {
      empty[field.key] = [];
    });
    return empty;
  });
  const [referenceLoading, setReferenceLoading] = useState(true);

  useEffect(() => {
    if (!isEditMode || horseId === null) {
      setLoadingHorse(false);
      return;
    }
    setLoadingHorse(true);
    getHorseById(horseId)
      .then((horse) => setForm(horseToForm(horse)))
      .catch(() => setError("Failed to load horse details"))
      .finally(() => setLoadingHorse(false));
  }, [horseId, isEditMode]);

  useEffect(() => {
    if (id && !isEditMode) {
      setError("Invalid horse id.");
    }
  }, [id, isEditMode]);

  useEffect(() => {
    let isMounted = true;
    setReferenceLoading(true);
    Promise.all(
      REFERENCE_FIELDS.map(async ({ key, endpoint }) => {
        const response = await axios.get<ReferenceEntity[]>(endpoint);
        return [key, response.data] as const;
      }),
    )
      .then((entries) => {
        if (!isMounted) return;
        setReferenceData((prev) => {
          const next = { ...prev };
          entries.forEach(([key, data]) => {
            next[key] = data;
          });
          return next;
        });
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load reference data");
        }
      })
      .finally(() => {
        if (isMounted) setReferenceLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const upd = <K extends keyof HorseFormData>(key: K, value: HorseFormData[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  const parseSelectValue = (v: string) => (v === "" ? "" : Number(v));

  const getNumber = (key: NumericField): number => {
    const value = form[key];
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }
    const label =
      REFERENCE_FIELDS.find((f) => f.key === key)?.label ?? key.toString();
    throw new Error(`Please provide a valid ${label.toLowerCase()}.`);
  };

  const buildPayload = (): HorseRequest => ({
    tagged: form.tagged,
    manufacturerId: getNumber("manufacturerId"),
    moldId: getNumber("moldId"),
    scaleId: getNumber("scaleId"),
    modelId: getNumber("modelId"),
    breedId: getNumber("breedId"),
    breedTypeId: getNumber("breedTypeId"),
    colorId: getNumber("colorId"),
    patternId: getNumber("patternId"),
    genderId: getNumber("genderId"),
    conditionId: getNumber("conditionId"),
    locationId: getNumber("locationId"),
    trackingId: getNumber("trackingId"),
    showName: form.showName.trim(),
    officePony: form.officePony ? form.officePony : null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingHorse) return;
    setSaving(true);
    setError(null);

    let payload: HorseRequest;
    try {
      payload = buildPayload();
    } catch (validationError) {
      setSaving(false);
      setError(
        validationError instanceof Error
          ? validationError.message
          : "Please complete all required fields.",
      );
      return;
    }

    try {
      if (isEditMode && horseId !== null) {
        await updateHorse(horseId, payload);
      } else {
        await createHorse(payload);
      }
      navigate("/horses");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Error saving horse";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 rounded-2xl shadow-lg bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {isEditMode ? "Edit Horse" : "Add Horse"}
        </h2>
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => navigate("/horses")}
        >
          Back to list
        </button>
      </div>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {referenceLoading || loadingHorse ? (
        <p>
          {referenceLoading ? "Loading reference data..." : "Loading horse details..."}
        </p>
      ) : (
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

          {REFERENCE_FIELDS.map(({ key, label, optionLabel }) => (
            <div key={key}>
              <label className="block text-sm font-medium">{label}</label>
              <select
                className="mt-1 w-full rounded border p-2 bg-white"
                value={form[key] === "" ? "" : String(form[key])}
                onChange={(e) => upd(key, parseSelectValue(e.target.value))}
                required
              >
                <option value="">{`Select ${label}`}</option>
                {referenceData[key].map((option) => (
                  <option key={option.id} value={option.id}>
                    {optionLabel
                      ? optionLabel(option)
                      : option.name ?? `ID ${option.id}`}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="col-span-2 flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={() => navigate("/horses")}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEditMode
                  ? "Update Horse"
                  : "Create Horse"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HorseForm;
