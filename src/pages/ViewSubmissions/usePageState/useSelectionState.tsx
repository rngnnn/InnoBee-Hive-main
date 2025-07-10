import { useEffect, useState } from "react";

type challengeId = number;

export default function useSelectionState(filters: {
  currentStage: string;
  sortBy: string;
}) {
  const { currentStage, sortBy } = filters;
  const [selected, setSelected] = useState<challengeId[]>([]);

  useEffect(() => {
    // each time filters are updated, reset selection
    setSelected([]);
  }, [currentStage, sortBy]);

  const toggleSelection = (id: challengeId) => {
    setSelected((selected) => {
      const currentIndex = selected.findIndex((x) => x === id);
      if (currentIndex === -1) {
        // add
        return [...selected, id];
      }
      // remove
      return selected.filter((x) => x !== id);
    });
  };

  return { selected, setSelected, toggleSelection };
}
