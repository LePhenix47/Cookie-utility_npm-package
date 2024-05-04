export type CookieType<TValue = any> = {
  name: string;
  value: TValue;
};

export type CookieOptions = {
  expires?: Date | string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};
