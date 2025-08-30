import { RouteParams } from "@/types";

const screenDisplayNameMap: Partial<Record<keyof RouteParams, string>> = {
  ReportSelection: "Selecionar OS",
  ReportPages: "Páginas",
  ReportQuestions: "Questões",
  ReportOptions: "Opções",
};

export const getScreenDisplayName = <RouteName extends keyof RouteParams>(
  routeName: RouteName
): string => {
  return screenDisplayNameMap[routeName] ?? routeName;
};
