import React from "react";
import { Link, useLocation } from "react-router-dom";
import { setStartIndex } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { getUserType } from "../helpers/functions-general";

const BreadCrumbs = ({ param = "", name = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const location = useLocation();

  let currentLink = "";

  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const crumbs = location.pathname
    .replace("-", " ")
    .replace("/v2", "")
    .replace("/system", "")
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, key) => {
      currentLink += `/${crumb.replace(" ", "-")}`;
      return (
        <li
          className="text-primary after:mr-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none print:hidden"
          key={key}
          onClick={() => dispatch(setStartIndex(0))}
        >
          <Link
            to={`${link}${currentLink}${param}`}
            className="mr-2 text-base font-medium hover:text-primary capitalize"
          >
            {`${crumb.replace("-", " ").replace("view", `${name}`)}`}

            {/* {name !== ""
              ? `${crumb.replace("view", `${name}`)}`
              : `${crumb.replace("-", " ")}`} */}
          </Link>
        </li>
      );
    });

  return (
    <>
      <ul className="my-2 flex items-center">
        {/* <span className="mr-1 text-primary">
          {crumbs.length === 1 ? "" : <AiFillSetting />}
        </span> */}
        {crumbs.length === 1 ? "" : crumbs}
      </ul>
    </>
  );
};

export default BreadCrumbs;
