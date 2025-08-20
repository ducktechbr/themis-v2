import { useRouteParams } from "@/hooks";

export default function useViewModel() {
  const { refcod } = useRouteParams("ReportQuestions");

  return { refcod };
}
