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
              to={`${devNavUrl}/admin/overview`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Overviews"
            >
              <MdDashboard className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Overviews</span>
            </Link>
          </li>
          <li
            className={
              menu === "attendance"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/attendance`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Attendance"
            >
              <FaCalendarCheck className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Attendance</span>
            </Link>
          </li>
          <li
            className={
              menu === "leaves"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/leaves`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Leaves"
            >
              <FaCalendarAlt className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Leaves</span>
            </Link>
          </li>
          <li
            className={
              menu === "overtime"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/overtime`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Overtime"
            >
              <FaBusinessTime className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Overtime</span>
            </Link>
          </li>
          <li
            className={
              menu === "approval"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/approval`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Approval"
            >
              <FaUserCheck className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Approval</span>
            </Link>
          </li>
          <li
            className={
              menu === "task"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/task`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Task"
            >
              <FaTasks className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Task</span>
            </Link>
          </li>
          <li
            className={
              menu === "employees"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/employees`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Employees"
            >
              <FaUsers className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Employees</span>
            </Link>
          </li>
          <li
            className={
              menu === "my-info"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/my-info`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="My Info"
            >
              <FaInfoCircle className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">My Info</span>
            </Link>
          </li>
          <li
            className={
              menu === "evaluation"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/evaluation`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Evaluation"
            >
              <FaNewspaper className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Evaluation</span>
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
