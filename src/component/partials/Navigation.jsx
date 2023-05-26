import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FaClipboardList, FaTasks, FaUsers } from "react-icons/fa";
import {
  GiPayMoney,
  GiBlackBook,
  GiReceiveMoney,
  GiPalmTree,
  GiBookPile,
} from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  setIsLogout,
  setIsSearch,
  setIsShow,
  setStartIndex,
} from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { getUserType } from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleLogout = () => {
    dispatch(setIsLogout(true));
  };

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };

  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <>
      <div className="print:hidden">
        <nav
          className={`${
            store.isShow ? "" : "-translate-x-44"
          } duration-200 ease-in fixed z-20 min-h-full bg-gradient-to-t from-secondary to-primary w-44 md:w-20 md:-translate-x-0 lg:w-44 `}
        >
          <ul className="text-sm mt-16 text-white">
            <li
              className={
                menu === "payroll"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/payroll`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Payroll"
              >
                <GiBlackBook className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Payroll</span>
              </Link>
            </li>
            <li
              className={
                menu === "employee"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/employee`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Employee"
              >
                <HiUserGroup className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Employee</span>
              </Link>
            </li>
            <li
              className={
                menu === "earnings"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/earnings`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Earnings"
              >
                <GiReceiveMoney className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Earnings</span>
              </Link>
            </li>
            <li
              className={
                menu === "deductions"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/deductions`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Deductions"
              >
                <GiPayMoney className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Deductions</span>
              </Link>
            </li>
            <li
              className={
                menu === "pay-type"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/pay-type`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Pay Type"
              >
                <FaClipboardList className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Pay Type</span>
              </Link>
            </li>
            <li
              className={
                menu === "holidays"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/holiday-details`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Holidays"
              >
                <GiPalmTree className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Holidays</span>
              </Link>
            </li>
            <li
              className={
                menu === "reports"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/reports`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Reports"
              >
                <GiBookPile className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Reports</span>
              </Link>
            </li>
            <li
              className={
                menu === "settings"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
              }
            >
              <Link
                to={`${link}/settings`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Settings"
              >
                <AiFillSetting className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Settings</span>
              </Link>
            </li>
            <li
              className={
                menu === "logout"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary md:hidden absolute w-full bottom-0"
              }
              onClick={() => dispatch(setIsSearch(false))}
            >
              <button
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation disabled:cursor-not-allowed"
                onClick={handleLogout}
                data-tooltip="Logout"
              >
                <FaSignOutAlt className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
        <span
          className={`${
            store.isShow ? "" : "-translate-x-full"
          } fixed z-10 w-screen h-screen bg-dark/50 md:hidden`}
          onClick={handleShow}
          // onTouchMoveCapture={handleShow}
        ></span>
      </div>
    </>
  );
};

export default Navigation;
