import { createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import RootReducer from "../reducer/index";

const Store = createStore(RootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default Store;
