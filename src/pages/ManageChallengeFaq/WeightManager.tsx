import { useState } from "react";

interface WeightManagerProps {
  faq: { id: number; weight: number };
  updateWeight: (id: number, weight: number) => void;
}

const WeightManager: React.FC<WeightManagerProps> = ({ faq, updateWeight }) => {
  const [weight, setWeight] = useState<number>(faq.weight);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Math.max(0, Math.min(100, Number(e.target.value))); // Ensuring weight is between 0-100
    setWeight(value);
    updateWeight(faq.id, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold" htmlFor={`weight-${faq.id}`}>
        Weight <span className="text-red-500">*</span>
      </label>
      <input
        className="bg-gray-100 w-full px-4 py-3 rounded-xl outline-none focus:border-pri-color border border-gray-300 shadow-sm"
        type="number"
        id={`weight-${faq.id}`}
        value={weight}
        onChange={handleWeightChange}
      />
    </div>
  );
};

export default WeightManager;
