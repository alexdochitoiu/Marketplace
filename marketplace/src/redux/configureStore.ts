// import { createStore, applyMiddleware } from "redux";
// import thunkMiddleware from "redux-thunk";
// import reducer from "./reducer";

// const store = createStore(
//   reducer,
//   applyMiddleware(thunkMiddleware),
// );

// export default store;

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishlist"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
  let persistor = persistStore(store as any);
  return { store, persistor };
};
