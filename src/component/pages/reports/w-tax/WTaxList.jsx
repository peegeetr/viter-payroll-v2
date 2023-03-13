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
              <tr className="text-center">
                <th>#</th>
                <th className="min-w-[10rem] text-left">Name</th>
                <th className="min-w-[10rem] table-border text-left">
                  Department
                </th>
                <th className="min-w-[15rem] table-border">
                  Total Compensation
                </th>
                <th className="min-w-[15rem] table-border">
                  Less Non Taxable Compensation
                </th>
                <th className="min-w-[15rem] table-border">
                  13th Month & Other Benefits
                </th>
                <th className="min-w-[20rem] table-border">
                  Employee Share (SSS, PHIC, PGBG)
                </th>
                <th className="min-w-[20rem] table-border">
                  Total Non Taxable Compensation
                </th>
                <th className="min-w-[10rem] table-border">Tax With Held</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-right">
                <td className="text-center py-[0.7rem]">1.</td>
                <td className="text-left">cyrene, lumabas</td>
                <td className="text-left">IT</td>
                <td className="px-6">{numberWithCommas(1000)}</td>
                <td className="px-6">{numberWithCommas(1000)}</td>
                <td className="px-6">{numberWithCommas(1000)}</td>
                <td className="px-6">{numberWithCommas(1000)}</td>
                <td className="px-6">{numberWithCommas(1000)}</td>
                <td className="px-6">{numberWithCommas(1000)}</td>
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
