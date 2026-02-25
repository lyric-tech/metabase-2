import type { NotebookStep as INotebookStep } from "../../types";

const isNotDataStep = (step: INotebookStep): boolean => step.type !== "data";

const removeJoinButton = (step: INotebookStep): INotebookStep => {
  return {
    ...step,
    actions: step.actions?.filter(action => action.type !== "join") ?? [],
  };
};

export const processSteps = (steps: INotebookStep[]): INotebookStep[] => {
  return steps.filter(isNotDataStep)?.map(removeJoinButton);
};