export type USERS = {
  id: string;
  username: string;
  password: string;
  active: boolean;
};

export type ITEM = {
  name: string;
  ratio: number;
  quantity: number;
  id: number;
};

export type SESSION = {
  id: string;
  items: Array<ITEM>;
  archive: boolean;
  name: string;
  createdBy: string;
  form: Array<string>;
  limit: number;
};

export type CUSTOMER = {
  [key: string]: any;
  id: string;
  item: null | number;
  limit: number;
};
