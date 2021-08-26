import reducer from "./reducer";

export enum ActionType {
  CHANGE_PRODUCT_VIEW_MODE = "CHANGE_PRODUCT_VIEW_MODE",
  CHANGE_PRODUCT_SORT_BY = "CHANGE_PRODUCT_SORT_BY",
}

export const sortingOptions = [
  { value: "default", label: "Implicit" },
  { value: "asc-price", label: "Pret crescator" },
  { value: "desc-price", label: "Pret descrescator" },
  { value: "newest", label: "Cele mai noi" },
  { value: "sale", label: "La reducere" },
] as const;

export interface IState {
  productsViewMode: "grid" | "list";
  productsSortBy: typeof sortingOptions[number]["value"];
}

export interface IAction {
  type: ActionType;
  payload: any;
}

export type RootState = ReturnType<typeof reducer>;