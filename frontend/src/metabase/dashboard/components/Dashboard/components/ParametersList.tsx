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
console.log(parameters);
  const parametersWithoutLyricScenarioId = parameters.filter(
    (parameter) =>
      parameter.slug !== LYRIC_CONSTANTS.LYRIC_SCENARIO_ID
  );

  return (
    <ParameterList parameters={parametersWithoutLyricScenarioId} {...props} />
  );
}
