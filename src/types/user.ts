export type User = {
  id: number;
  entitie_id: number;
  idlocal: number | null;
  user_group_id: number;
  document: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  assinatura: string | null;
  create_at?: string;
  last_date_login: string | null;
  matricula: string | null;
  device_token: string;
  status_user: number;
  latitude?: number;
  longitude?: number;
};

export type SignInResponse = {
  data?: User[];
  status: boolean;
  error?: string;
};

export class OutdatedVersionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OutdatedVersionError";
  }
}
