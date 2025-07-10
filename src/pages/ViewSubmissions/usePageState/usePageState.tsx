import useData from "./useData";
import useFiltersState from "./useFiltersState";
import useMenuItems from "./useMenuItems";
import useSelectionState from "./useSelectionState";

export default function usePageState(challengeId: number) {
  const filtersState = useFiltersState();
  const { currentStage, sortBy } = filtersState;

  const selectionState = useSelectionState({ currentStage, sortBy });

  const data = useData(challengeId, { currentStage, sortBy });

  const menuItems = useMenuItems(selectionState.selected);

  return { data, menuItems, filtersState, selectionState };
}
