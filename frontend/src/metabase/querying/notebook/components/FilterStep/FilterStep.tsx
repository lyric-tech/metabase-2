import { useMemo } from "react";
import { t } from "ttag";

import ErrorBoundary from "metabase/ErrorBoundary";
import { FilterPicker } from "metabase/querying/filters/components/FilterPicker";
import * as Lib from "metabase-lib";

import type { NotebookStepProps } from "../../types";
import { ClauseStep } from "../ClauseStep";
import { LYRIC_CONSTANTS } from "../../../../../lyric-constants";

export function FilterStep({
  query,
  step,
  color,
  isLastOpened,
  readOnly,
  updateQuery,
}: NotebookStepProps) {
  const { stageIndex } = step;

  const filters = useMemo(
    () => Lib.filters(query, stageIndex),
    [query, stageIndex],
  );

  const renderFilterName = (filter: Lib.FilterClause) =>
    Lib.displayInfo(query, stageIndex, filter).longDisplayName;

  const handleAddFilter = (clause: Lib.Filterable) => {
    const nextQuery = Lib.filter(query, stageIndex, clause);
    updateQuery(nextQuery);
  };

  const handleUpdateFilter = (
    targetClause: Lib.FilterClause,
    newClause: Lib.Filterable,
  ) => {
    const nextQuery = Lib.replaceClause(
      query,
      stageIndex,
      targetClause,
      newClause,
    );
    updateQuery(nextQuery);
  };

  const handleReorderFilter = (
    sourceClause: Lib.FilterClause,
    targetClause: Lib.FilterClause,
  ) => {
    const nextQuery = Lib.swapClauses(
      query,
      stageIndex,
      sourceClause,
      targetClause,
    );
    updateQuery(nextQuery);
  };

  const handleRemoveFilter = (clause: Lib.FilterClause) => {
    const nextQuery = Lib.removeClause(query, stageIndex, clause);
    updateQuery(nextQuery);
  };

  const filtersWithoutLyricScenarioId = filters?.filter(filterItem => {
    const filterName = renderFilterName(filterItem);
    if (filterName?.includes(LYRIC_CONSTANTS.LYRIC_SCENARIO_ID_LABEL)) {
      return false;
    }
    return true;
  });

  return (
    <ErrorBoundary>
      <ClauseStep
        items={filtersWithoutLyricScenarioId}
        initialAddText={t`Add filters to narrow your answer`}
        readOnly={readOnly}
        color={color}
        isLastOpened={isLastOpened}
        renderName={renderFilterName}
        renderPopover={({ item: filter, index, onClose }) => (
          <FilterPopover
            query={query}
            stageIndex={stageIndex}
            filter={filter}
            filterIndex={index}
            onAddFilter={handleAddFilter}
            onUpdateFilter={handleUpdateFilter}
            onClose={onClose}
            readOnly={readOnly}
          />
        )}
        onReorder={handleReorderFilter}
        onRemove={handleRemoveFilter}
      />
    </ErrorBoundary>
  );
}

interface FilterPopoverProps {
  query: Lib.Query;
  stageIndex: number;
  filter?: Lib.FilterClause;
  filterIndex?: number;
  onAddFilter: (filter: Lib.Filterable) => void;
  onUpdateFilter: (
    targetFilter: Lib.FilterClause,
    nextFilter: Lib.Filterable,
  ) => void;
  onClose?: () => void;
  readOnly?: boolean;
}

function FilterPopover({
  query,
  stageIndex,
  filter,
  filterIndex,
  onAddFilter,
  onUpdateFilter,
  onClose,
  readOnly,
}: FilterPopoverProps) {
  return (
    <FilterPicker
      query={query}
      stageIndex={stageIndex}
      filter={filter}
      filterIndex={filterIndex}
      onSelect={(newFilter) => {
        if (filter) {
          onUpdateFilter(filter, newFilter);
        } else {
          onAddFilter(newFilter);
        }
      }}
      onClose={onClose}
      readOnly={readOnly}
    />
  );
}
