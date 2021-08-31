import { ActionType, IAction, IState } from "./types";

const initialAppState: IState = {
  productsViewMode: "grid",
  productsSortBy: "default",
  productSearchValue: "",
  priceInterval: null,
  maxPrice: 5000,
  wishlist: [],
};

export default function (state = initialAppState, action: IAction): IState {
  switch (action.type) {
    case ActionType.CHANGE_PRODUCT_VIEW_MODE:
    case ActionType.CHANGE_PRODUCT_SORT_BY:
    case ActionType.CHANGE_PRODUCT_SEARCH_VALUE:
    case ActionType.CHANGE_PRICE_INTERVAL:
    case ActionType.CHANGE_MAX_PRICE:
    case ActionType.CHANGE_WISHLIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
