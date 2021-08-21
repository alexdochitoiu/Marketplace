import { ActionType, IAction, IState } from "./types";

const initialAppState: IState = {
  productsViewMode: "grid",
  productsSortBy: "default",
};

export default function (state = initialAppState, action: IAction): IState {
  console.log(action);
  switch (action.type) {
    case ActionType.CHANGE_PRODUCT_VIEW_MODE:
    case ActionType.CHANGE_PRODUCT_SORT_BY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
