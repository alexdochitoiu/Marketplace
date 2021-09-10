import { ActionType, IAction, ICartItem, IState } from "./types";

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

export const doChangeProductSearchValue = (
  productSearchValue: string
): IAction => ({
  type: ActionType.CHANGE_PRODUCT_SEARCH_VALUE,
  payload: { productSearchValue },
});

export const doChangePriceInterval = (
  priceInterval: [number, number] | null
): IAction => ({
  type: ActionType.CHANGE_PRICE_INTERVAL,
  payload: { priceInterval },
});

export const doChangeMaxPrice = (maxPrice: number): IAction => ({
  type: ActionType.CHANGE_MAX_PRICE,
  payload: { maxPrice },
});

export const doChangeWishlist = (wishlist: string[]): IAction => ({
  type: ActionType.CHANGE_WISHLIST,
  payload: { wishlist },
});

export const doChangeCart = (cart: ICartItem[]): IAction => ({
  type: ActionType.CHANGE_CART,
  payload: { cart },
});