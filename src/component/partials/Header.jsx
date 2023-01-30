import React from "react";
import { FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import FbsLogoSm from "../svg/FbsLogoSm";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  return (
    <>
      <div className="fixed z-30 bg-white w-full flex justify-between items-center h-16 px-3 border-solid border-b-2 border-primary">
        <FbsLogoSm />
        <div className="flex justify-between items-center gap-3">
          <FaUserCircle className="w-9 h-9 text-gray-500 hidden md:block" />
          <div className="hidden md:block leading-normal">
            <h4 className="text-primary">
              Hi <span>Mark,</span>
            </h4>
            <span>Developer</span>
          </div>
          <span className="border-l-2 h-12 border-primary"></span>
          <FaSignOutAlt className="w-5 h-5 text-gray-500 mx-5 hidden md:block" />
          <span className="btn-action-table md:hidden" onClick={handleShow}>
            {store.isShow ? <FaTimes /> : <GiHamburgerMenu />}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
