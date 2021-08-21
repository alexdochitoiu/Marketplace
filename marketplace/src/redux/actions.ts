import { ActionType, IAction, IState } from "./types";

export const doChangeProductsViewMode = (
  productsViewMode: IState["productsViewMode"]
): IAction => ({
  type: ActionType.CHANGE_PRODUCT_VIEW_MODE,
  payload: { productsViewMode },
});

export const doChangeProductsSortBy = (
  productsSortBy: IState["productsSortBy"]
): IAction => ({
  type: ActionType.CHANGE_PRODUCT_SORT_BY,
  payload: { productsSortBy },
});
