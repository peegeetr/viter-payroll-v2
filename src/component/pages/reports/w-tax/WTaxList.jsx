import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { numberWithCommas } from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";

const WTaxList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div className="relative text-center">
        <div className=" overflow-x-auto z-0">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th className="min-w-[10rem]">Name</th>
                <th className="min-w-[10rem]">Department</th>
                <th>
                  Total
                  <br />
                  Compensation
                </th>
                <th className="min-w-[9rem]">
                  Less Non Taxable
                  <br /> Compensation
                </th>
                <th>
                  13th Month &
                  <br /> Other Benefits
                </th>
                <th className="min-w-[9rem]">
                  Employee Share
                  <br />
                  (SSS, PHIC, PGBG)
                </th>
                <th className="min-w-[9rem]">
                  Total Non Taxable
                  <br /> Compensation
                </th>
                <th className="min-w-[5rem]">Tax With Held</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1.</td>
                <td>cyrene, lumabas</td>
                <td>IT</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
              </tr>
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WTaxList;
