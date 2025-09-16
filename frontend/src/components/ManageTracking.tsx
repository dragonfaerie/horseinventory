import React, { useState, useEffect } from "react";
import Tracking from "../types/Tracking";
import axios from "axios";

const ManageTracking: React.FC = () => {
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [nanQualified, setNanQualified] = useState(false);
  const [firstPlace, setFirstPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");
  const [fourthPlace, setFourthPlace] = useState("");
  const [fifthPlace, setFifthPlace] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Tracking[]>("/api/tracking")
      .then((res) => setTrackings(res.data))
      .catch(() => setError("Failed to fetch tracking data"));
  }, []);

  const handleAdd = async () => {
    try {
      const payload = {
        purchasePrice: parseFloat(purchasePrice) || 0,
        sellPrice: parseFloat(sellPrice) || 0,
        nanQualified,
        firstPlace: parseInt(firstPlace) || 0,
        secondPlace: parseInt(secondPlace) || 0,
        thirdPlace: parseInt(thirdPlace) || 0,
        fourthPlace: parseInt(fourthPlace) || 0,
        fifthPlace: parseInt(fifthPlace) || 0,
      };

      const res = await axios.post<Tracking>("/api/tracking", payload);
      setTrackings([...trackings, res.data]);

      // reset fields
      setPurchasePrice("");
      setSellPrice("");
      setNanQualified(false);
      setFirstPlace("");
      setSecondPlace("");
      setThirdPlace("");
      setFourthPlace("");
      setFifthPlace("");
    } catch {
      setError("Failed to add tracking");
    }
  };

  return (
    <div>
      <h2>Manage Tracking</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sell Price"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={nanQualified}
            onChange={(e) => setNanQualified(e.target.checked)}
          />
          NAN Qualified
        </label>
        <input
          type="number"
          placeholder="First Place"
          value={firstPlace}
          onChange={(e) => setFirstPlace(e.target.value)}
        />
        <input
          type="number"
          placeholder="Second Place"
          value={secondPlace}
          onChange={(e) => setSecondPlace(e.target.value)}
        />
        <input
          type="number"
          placeholder="Third Place"
          value={thirdPlace}
          onChange={(e) => setThirdPlace(e.target.value)}
        />
        <input
          type="number"
          placeholder="Fourth Place"
          value={fourthPlace}
          onChange={(e) => setFourthPlace(e.target.value)}
        />
        <input
          type="number"
          placeholder="Fifth Place"
          value={fifthPlace}
          onChange={(e) => setFifthPlace(e.target.value)}
        />

        <button onClick={handleAdd}>Add Tracking</button>
      </div>

      <ul className="mt-4">
        {trackings.map((t) => (
          <li key={t.id}>
            Purchase: ${t.purchasePrice} | Sell: ${t.sellPrice} | NAN:{" "}
            {t.nanQualified ? "Yes" : "No"} | Placements: {t.firstPlace}-
            {t.secondPlace}-{t.thirdPlace}-{t.fourthPlace}-{t.fifthPlace}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTracking;
