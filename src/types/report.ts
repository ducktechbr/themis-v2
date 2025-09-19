type TypeServiceOrderEnum = "I" | "G";

export type Report = {
  address: string;
  document_name: string;
  id_service_order: number;
  local: string;
  status_service_order: string;
  type_service_order: TypeServiceOrderEnum;
  uniorg: string;
  user_id: number;
};
