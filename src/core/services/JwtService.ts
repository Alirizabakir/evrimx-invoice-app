const ID_TOKEN_KEY = "id_token" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

/**
 * @description get invoices form localStorage
 */
export const getInvoice = (): string | null => {
  return window.localStorage.getItem("invoices");
};

/**
 * @description save invoices into localStorage
 * @param value
 */
export const saveInvoice = (value: any): void => {
  window.localStorage.setItem("invoices", value);
};

/**
 * @description remove invoices form localStorage
 */
export const destroyInvoice = (): void => {
  window.localStorage.removeItem("invoices");
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getInvoice,
  saveInvoice,
  destroyInvoice,
};
