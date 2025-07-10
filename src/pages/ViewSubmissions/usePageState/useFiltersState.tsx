import { useState } from "react";

export default function useFiltersState() {
  const [currentStage, setCurrentStage] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const listSort = ["Newest", "Popular"];

  const stage = [
    "All",
    "Open for submission",
    "Judging",
    "Voting",
    "Successful",
    "Coming soon",
    "Saved challenges",
  ];

  const toggleSort = (sortItem: string) => {
    setSortBy(sortItem);
  };
  const toggleStage = (stage: string) => {
    setCurrentStage(stage);
  };

  return {
    currentStage,
    setCurrentStage,
    sortBy,
    setSortBy,
    listSort,
    stage,
    toggleSort,
    toggleStage,
  };
}
