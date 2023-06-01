import React from "react";
import { FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { setIsLogout, setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import FbsLogoSm from "../svg/FbsLogoSm";
import ModalLogout from "./modals/ModalLogout";
import DemoMode from "./DemoMode";
import { isDemoMode } from "../helpers/functions-general";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  const handleLogout = () => {
    dispatch(setIsLogout(true));
  };

  const name =
    store.credentials.data.role_is_developer === 1
      ? store.credentials.data.user_system_name.split(" ")[0]
      : store.credentials.data.user_other_name.split(" ")[0];

  return (
    <>
      <div
        className={`${
          isDemoMode === "1" ? "border-b-2 !border-[#f09a02] " : ""
        }  fixed z-30 bg-white w-full flex justify-between items-center h-16 px-3 border-solid border-b-2 border-primary print:hidden`}
      >
        <div className="flex items-center ">
          <span>
            <FbsLogoSm />
          </span>
          <h1 className="pl-5">ONLINE PAYROLL</h1>
        </div>
        <div className="flex justify-between items-center gap-3">
          <FaUserCircle className="w-9 h-9 text-gray-500 hidden md:block" />
          <div className="hidden md:block leading-normal">
            <h4 className="text-primary capitalize">
              Hi <span>{name},</span>
            </h4>
            <span>{store.credentials.data.role_name}</span>
          </div>
          <span className="border-l-2 h-12 border-primary"></span>
          <div
            className="hidden md:block btn-action-table"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="w-5 h-5 hidden md:block " />
          </div>
          <span className="btn-action-table md:hidden" onClick={handleShow}>
            {store.isShow ? <FaTimes /> : <GiHamburgerMenu />}
          </span>
        </div>
      </div>
      {isDemoMode === "1" && <DemoMode />}
      {store.isLogout && <ModalLogout />}
    </>
  );
};

export default Header;
