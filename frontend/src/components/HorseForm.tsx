// src/components/HorseForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createHorse, getHorseById, updateHorse } from "../api/horseApi";
import { Horse, HorseRequest } from "../types/Horse";
import apiClient from "../api/httpClient";

type SelectField =
  | "manufacturerId"
  | "moldId"
  | "scaleId"
  | "modelId"
  | "breedId"
  | "breedTypeId"
  | "colorId"
  | "patternId"
  | "genderId"
  | "conditionId"
  | "locationId";

type PlacementField =
  | "firstPlace"
  | "secondPlace"
  | "thirdPlace"
  | "fourthPlace"
  | "fifthPlace";

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
  purchasePrice: string;
  sellPrice: string;
  nanQualified: boolean;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
  fourthPlace: string;
  fifthPlace: string;
  officePony: string;
};

type ReferenceEntity = {
  id: number;
  name?: string;
  [key: string]: any;
};

type ReferenceField = {
  key: SelectField;
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
];

const PLACEMENT_FIELDS: Array<{ key: PlacementField; label: string }> = [
  { key: "firstPlace", label: "First Place" },
  { key: "secondPlace", label: "Second Place" },
  { key: "thirdPlace", label: "Third Place" },
  { key: "fourthPlace", label: "Fourth Place" },
  { key: "fifthPlace", label: "Fifth Place" },
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
  purchasePrice: "",
  sellPrice: "",
  nanQualified: false,
  firstPlace: "",
  secondPlace: "",
  thirdPlace: "",
  fourthPlace: "",
  fifthPlace: "",
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
  purchasePrice: horse.purchasePrice?.toString() ?? "",
  sellPrice: horse.sellPrice?.toString() ?? "",
  nanQualified: horse.nanQualified,
  firstPlace: horse.firstPlace?.toString() ?? "",
  secondPlace: horse.secondPlace?.toString() ?? "",
  thirdPlace: horse.thirdPlace?.toString() ?? "",
  fourthPlace: horse.fourthPlace?.toString() ?? "",
  fifthPlace: horse.fifthPlace?.toString() ?? "",
  officePony: horse.officePony ?? "",
});

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const numberInputClasses = `${inputClasses} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;
const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";
const secondaryButtonClasses =
  "inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";

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
    Record<SelectField, ReferenceEntity[]>
  >(() => {
    const empty = {} as Record<SelectField, ReferenceEntity[]>;
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
        const response = await apiClient.get<ReferenceEntity[]>(endpoint);
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

  const getSelectNumber = (key: SelectField): number => {
    const value = form[key];
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }
    const label =
      REFERENCE_FIELDS.find((f) => f.key === key)?.label ?? key.toString();
    throw new Error(`Please provide a valid ${label.toLowerCase()}.`);
  };

  const parseDecimalField = (value: string, label: string): number => {
    if (!value.trim()) return 0;
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new Error(`${label} must be a number.`);
    }
    return parsed;
  };

  const parseIntegerField = (value: string, label: string): number => {
    if (!value.trim()) return 0;
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      throw new Error(`${label} must be a whole number.`);
    }
    return parsed;
  };

  const buildPayload = (): HorseRequest => ({
    tagged: form.tagged,
    manufacturerId: getSelectNumber("manufacturerId"),
    moldId: getSelectNumber("moldId"),
    scaleId: getSelectNumber("scaleId"),
    modelId: getSelectNumber("modelId"),
    breedId: getSelectNumber("breedId"),
    breedTypeId: getSelectNumber("breedTypeId"),
    colorId: getSelectNumber("colorId"),
    patternId: getSelectNumber("patternId"),
    genderId: getSelectNumber("genderId"),
    conditionId: getSelectNumber("conditionId"),
    locationId: getSelectNumber("locationId"),
    purchasePrice: parseDecimalField(form.purchasePrice, "Purchase price"),
    sellPrice: parseDecimalField(form.sellPrice, "Sell price"),
    nanQualified: form.nanQualified,
    firstPlace: parseIntegerField(form.firstPlace, "First place"),
    secondPlace: parseIntegerField(form.secondPlace, "Second place"),
    thirdPlace: parseIntegerField(form.thirdPlace, "Third place"),
    fourthPlace: parseIntegerField(form.fourthPlace, "Fourth place"),
    fifthPlace: parseIntegerField(form.fifthPlace, "Fifth place"),
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
    <div className="max-w-3xl mx-auto mt-6 rounded-3xl border border-blue-50 bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-slate-900">
          {isEditMode ? "Edit Horse" : "Add Horse"}
        </h2>
        <button
          type="button"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
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
            <label className="block text-sm font-medium text-slate-700">
              Show Name
            </label>
            <input
              className={`${inputClasses} mt-1`}
              value={form.showName}
              onChange={(e) => upd("showName", e.target.value)}
              placeholder="Mr Sparkles"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              checked={form.tagged}
              onChange={(e) => upd("tagged", e.target.checked)}
            />
            Tagged
          </label>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Office Pony (MM/YYYY)
            </label>
            <input
              className={`${inputClasses} mt-1`}
              value={form.officePony}
              onChange={(e) => upd("officePony", e.target.value)}
              placeholder="09/2025"
            />
          </div>

          {REFERENCE_FIELDS.map(({ key, label, optionLabel }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700">
                {label}
              </label>
              <select
                className={`${inputClasses} mt-1 pr-8`}
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

          <div className="col-span-2 mt-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">
                Purchase & Show Tracking
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Per horse
              </span>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Purchase Price
                </label>
                <input
                  type="number"
                  className={`${numberInputClasses} mt-1`}
                  placeholder="0.00"
                  value={form.purchasePrice}
                  onChange={(e) => upd("purchasePrice", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Sell Price
                </label>
                <input
                  type="number"
                  className={`${numberInputClasses} mt-1`}
                  placeholder="0.00"
                  value={form.sellPrice}
                  onChange={(e) => upd("sellPrice", e.target.value)}
                />
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={form.nanQualified}
                  onChange={(e) => upd("nanQualified", e.target.checked)}
                />
                NAN Qualified
              </label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
              {PLACEMENT_FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {label}
                  </label>
                  <input
                    type="number"
                    min={0}
                    className={`${numberInputClasses} mt-1`}
                    value={form[key]}
                    onChange={(e) => upd(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-3">
            <button
              type="button"
              className={secondaryButtonClasses}
              onClick={() => navigate("/horses")}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={primaryButtonClasses}
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
