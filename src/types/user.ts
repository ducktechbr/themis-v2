export type User = {
  id: number;
  entitie_id: number;
  idlocal: number | null;
  user_group_id: number;
  document: string;
  name: string;
  email: string;
  username: string;
  assinatura: string | null;
  last_date_login: string | null;
  matricula: string | null;
  device_token: string;
  status_user: number;
};
