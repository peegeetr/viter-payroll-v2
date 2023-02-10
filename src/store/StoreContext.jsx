import React from "react";
import { StoreReducer } from "./StoreReducer";

const initVal = {
  error: false,
  info: false,
  success: false,
  isSave: false,
  isShow: false,
  isConfirm: false,
  isRestore: false,
  isAdd: false,
  isFinish: false,
  isSearch: false,
  startIndex: 0,
  isCreatePassSuccess: false,
  isForgetPassSuccess: false,
  isAdminForgetPassSuccess: false,
  isLogin: false,
  isLogout: false,
  credentials: {},
};

const StoreContext = React.createContext();

const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
