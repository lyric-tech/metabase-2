import { getDashboardHeaderValuePopulatedParameters } from "metabase/dashboard/selectors";
import { useSelector } from "metabase/lib/redux";

import { LYRIC_CONSTANTS } from "../../../../../lyric-constants";
import {
  type DashboardParameterListProps,
  DashboardParameterList as ParameterList,
} from "../../DashboardParameterList";

export function ParametersList(
  props: Omit<DashboardParameterListProps, "parameters">,
) {
  const parameters = useSelector(getDashboardHeaderValuePopulatedParameters);

  const parametersWithoutLyricScenarioId = parameters.filter(
    (parameter) =>
      parameter.name !== LYRIC_CONSTANTS.LYRIC_SCENARIO_ID_LABEL ||
      parameter.slug !== LYRIC_CONSTANTS.LYRIC_SCENARIO_ID,
  );

  return (
    <ParameterList parameters={parametersWithoutLyricScenarioId} {...props} />
  );
}
