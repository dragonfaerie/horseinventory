import React, { useState } from "react";

interface HorseFormData {
  name: string;
  manufacturer: string;
  mold: string;
  finish: string;
  color: string;
  scale: string;
  year: number | "";
  purchasePrice: number | "";
  sellPrice: number | "";
  nanQualified: boolean;
  firstPlace: number | "";
  secondPlace: number | "";
  thirdPlace: number | "";
  fourthPlace: number | "";
  fifthPlace: number | "";
  officePony: string; // month/year string
}

const HorseForm: React.FC = () => {
  const [formData, setFormData] = useState<HorseFormData>({
    name: "",
    manufacturer: "",
    mold: "",
    finish: "",
    color: "",
    scale: "",
    year: "",
    purchasePrice: "",
    sellPrice: "",
    nanQualified: false,
    firstPlace: "",
    secondPlace: "",
    thirdPlace: "",
    fourthPlace: "",
    fifthPlace: "",
    officePony: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/horses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Horse saved!");
        setFormData({
          name: "",
          manufacturer: "",
          mold: "",
          finish: "",
          color: "",
          scale: "",
          year: "",
          purchasePrice: "",
          sellPrice: "",
          nanQualified: false,
          firstPlace: "",
          secondPlace: "",
          thirdPlace: "",
          fourthPlace: "",
          fifthPlace: "",
          officePony: "",
        });
      } else {
        alert("Error saving horse");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Add / Update Horse</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Horse Name"
            required
          />
          <Input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
            required
          />
          <Input
            name="mold"
            value={formData.mold}
            onChange={handleChange}
            placeholder="Mold"
          />
          <Input
            name="finish"
            value={formData.finish}
            onChange={handleChange}
            placeholder="Finish"
          />
          <Input
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color"
          />
          <Input
            name="scale"
            value={formData.scale}
            onChange={handleChange}
            placeholder="Scale"
          />
          <Input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
          />
          <Input
            type="number"
            step="0.01"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            placeholder="Purchase Price"
          />
          <Input
            type="number"
            step="0.01"
            name="sellPrice"
            value={formData.sellPrice}
            onChange={handleChange}
            placeholder="Sell Price"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="nanQualified"
              checked={formData.nanQualified}
              onChange={handleChange}
            />
            NAN Qualified
          </label>
          <Input
            type="number"
            name="firstPlace"
            value={formData.firstPlace}
            onChange={handleChange}
            placeholder="First Place"
          />
          <Input
            type="number"
            name="secondPlace"
            value={formData.secondPlace}
            onChange={handleChange}
            placeholder="Second Place"
          />
          <Input
            type="number"
            name="thirdPlace"
            value={formData.thirdPlace}
            onChange={handleChange}
            placeholder="Third Place"
          />
          <Input
            type="number"
            name="fourthPlace"
            value={formData.fourthPlace}
            onChange={handleChange}
            placeholder="Fourth Place"
          />
          <Input
            type="number"
            name="fifthPlace"
            value={formData.fifthPlace}
            onChange={handleChange}
            placeholder="Fifth Place"
          />
          <Input
            name="officePony"
            value={formData.officePony}
            onChange={handleChange}
            placeholder="Office Pony (MM/YYYY)"
          />
          <div className="col-span-2 flex justify-end">
            <Button type="submit">Save Horse</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HorseForm;
