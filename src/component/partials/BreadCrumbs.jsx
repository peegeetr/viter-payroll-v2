import React from "react";
import { Link, useLocation } from "react-router-dom";
import { setStartIndex } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl, getUserType, UrlAdmin } from "../helpers/functions-general";

const BreadCrumbs = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const location = useLocation();

  let currentLink = "";

  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const crumbs = location.pathname
    .replace("/system", "")
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, key) => {
      currentLink += `${crumb}/`;

      return (
        <li
          className="text-primary after:mr-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none"
          key={key}
          onClick={() => dispatch(setStartIndex(0))}
        >
          <Link
            to={`${link}/${currentLink}`}
            className="mr-2 text-base font-medium hover:text-primary capitalize"
          >
            {crumb}
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
