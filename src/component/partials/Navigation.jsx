import React from "react";
import { AiFillSetting } from "react-icons/ai";
import {
  FaBusinessTime,
  FaCalendarAlt,
  FaCalendarCheck,
  FaEye,
  FaInfoCircle,
  FaNewspaper,
  FaTasks,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  return (
    <>
      <nav
        className={`${
          store.isShow ? "" : "-translate-x-44"
        } duration-200 ease-in fixed z-20 min-h-full bg-gradient-to-t from-secondary to-primary w-44 md:w-20 md:-translate-x-0 lg:w-44`}
      >
        <ul className="text-sm mt-16 text-white">
          <li
            className={
              menu === "overview"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/payroll`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Overviews"
            >
              <MdDashboard className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/employee`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Employee"
            >
              <FaCalendarCheck className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/earnings`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Earnings"
            >
              <FaCalendarAlt className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/deductions`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Deductions"
            >
              <FaBusinessTime className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/pay-type`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Pay Type"
            >
              <FaUserCheck className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/holidays`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Holidays"
            >
              <FaTasks className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/reports`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Reports"
            >
              <FaUsers className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
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
              to={`${devNavUrl}/admin/settings`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Settings"
            >
              <AiFillSetting className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Settings</span>
            </Link>
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
    </>
  );
};

export default Navigation;
