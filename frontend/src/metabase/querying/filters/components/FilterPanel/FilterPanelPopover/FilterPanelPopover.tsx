import { useMemo, useState } from "react";

import { Popover } from "metabase/ui";
import * as Lib from "metabase-lib";

import { FilterPicker } from "../../FilterPicker";
import { FilterPill } from "../FilterPill";
import { LYRIC_CONSTANTS } from "../../../../../../lyric-constants";

interface FilterPanelPopoverProps {
  query: Lib.Query;
  stageIndex: number;
  filter: Lib.FilterClause;
  filterIndex: number;
  onChange: (query: Lib.Query) => void;
}

export function FilterPanelPopover({
  query,
  stageIndex,
  filter,
  filterIndex,
  onChange,
}: FilterPanelPopoverProps) {
  const [isOpened, setIsOpened] = useState(false);

  const filterInfo = useMemo(
    () => Lib.displayInfo(query, stageIndex, filter),
    [query, stageIndex, filter],
  );

  const handleChange = (newFilter: Lib.Clause | Lib.SegmentMetadata) => {
    onChange(Lib.replaceClause(query, stageIndex, filter, newFilter));
    setIsOpened(false);
  };

  const handleRemove = () => {
    onChange(Lib.removeClause(query, stageIndex, filter));
    setIsOpened(false);
  };

  if (filterInfo?.longDisplayName?.includes(LYRIC_CONSTANTS.LYRIC_SCENARIO_ID_LABEL)) {
    return null;
  }

  return (
    <Popover
      opened={isOpened}
      position="bottom-start"
      transitionProps={{ duration: 0 }}
      onChange={setIsOpened}
    >
      <Popover.Target>
        <FilterPill
          onClick={() => setIsOpened((isOpened) => !isOpened)}
          onRemoveClick={handleRemove}
        >
          {filterInfo.longDisplayName}
        </FilterPill>
      </Popover.Target>
      <Popover.Dropdown data-testid="filter-picker-dropdown">
        <FilterPicker
          query={query}
          stageIndex={stageIndex}
          filter={filter}
          filterIndex={filterIndex}
          onSelect={handleChange}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
