import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const middlewares = [thunk];
export default createStore(reducer, applyMiddleware(...middlewares))