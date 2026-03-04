export interface UserChange {
  username?: string | null;
  email?: string | null;
  old_password?: string | null;
  password_hash?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  is_active?: boolean | null;
  phone?: string | null;
}
