import { useJudgingCriteriaData } from "./JudgingCriteriaContext";

export default function WeightManager({ criterion }) {
  const { updateWeight, totalWeight } = useJudgingCriteriaData();

  const remainingWeight = 100 - totalWeight + criterion.criteriaWeight.weight;

  const handleWeightChange = (id, value) => {
    if (value === "") {
      updateWeight(id, 0);
    } else {
      const weight = Number(value);
      if (weight >= 0 && weight <= remainingWeight) {
        updateWeight(id, weight);
      }
    }
  };

  return (
    <input
      type="text"
      placeholder={`Enter value from 0 - ${remainingWeight}`}
      value={criterion.criteriaWeight.weight}
      className="bg-gray-100 w-full px-4 py-4 rounded-xl outline-none focus:border-pri-color border-1 mt-2"
      onInput={(e) => {
        const value = Math.max(
          0,
          Math.min(remainingWeight, Number(e.target.value))
        );
        handleWeightChange(criterion.criteriaWeight.id, value);
      }}
    />
  );
}
