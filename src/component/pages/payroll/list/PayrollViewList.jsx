import React from "react";
import { MdOutlineReceipt } from "react-icons/md";
import { Link } from "react-router-dom";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useFetchDataLoadMore from "../../../custom-hooks/useFetchDataLoadMore";
import useLoadPayroll from "../../../custom-hooks/useLoadPayroll";
import {
  devApiUrl,
  devNavUrl,
  formatDate,
  getUrlParam,
  UrlAdmin,
} from "../../../helpers/functions-general";
import Loadmore from "../../../partials/Loadmore";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const PayrollViewList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const pid = getUrlParam().get("payrollid");
  const search = React.useRef(null);
  const perPage = 10;
  const start = store.startIndex + 1;
  let counter = 0;

  const {
    loading,
    handleLoad,
    totalResult,
    result,
    handleSearch,
    handleChange,
  } = useFetchDataLoadMore(
    `${devApiUrl}/v1/payrollList/limit/${start}/${perPage}/${pid}`,
    `${devApiUrl}/v1/payrollList/${pid}`,
    perPage,
    search
  );

  return (
    <>
      <div className="xs:flex text-primary">
        <p className="mr-8">
          ID : <span className="font-light text-black">{pid}</span>
        </p>
        <p className="mr-8">
          Pay Period :{" "}
          <span className="font-light text-black"> Feb 1 - 15 2023</span>
        </p>
        <p className="">
          Period Work Days: <span className="font-light text-black">11</span>
        </p>
      </div>
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        handleChange={handleChange}
        loading={loading}
        result={result}
        store={store}
        url={`${devApiUrl}/v1/payrollList/search/${pid}/`}
      />

      <div className="relative text-center overflow-x-auto z-0 mb-16">
        {loading && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="w-[15rem]">Employee</th>
              <th className="w-[8rem]">Gross</th>
              <th className="w-[8rem]">Deduction</th>
              <th className="w-[8srem]">Net Pay</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((item, key) => {
                counter++;
                return (
                  <tr key={key}>
                    <td className="text-center">{counter}.</td>
                    <td>{item.payroll_list_employee_name}</td>
                    <td> </td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="flex items-center justify-end gap-1 mr-2">
                        <Link
                          to={`${devNavUrl}/${UrlAdmin}/payroll/list/payslip?payslipid=${item.payroll_list_aid}`}
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Payslip"
                        >
                          <MdOutlineReceipt />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : result === -1 ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            ) : (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!store.isSearch && (
          <Loadmore
            handleLoad={handleLoad}
            loading={loading}
            result={result}
            totalResult={totalResult}
          />
        )}
        <div className="relative text-center overflow-x-auto z-0 w-full lg:w-[30rem] mx-auto mt-8">
          <table>
            <tbody>
              <tr className="bg-gray-200 hover:bg-gray-200 text-primary">
                <td className="w-[15rem]">Payroll Entry - PR-001</td>
                <td colSpan={2}>Jan 1 - 15 2023</td>
              </tr>
              <tr className="font-bold">
                <td className="w-[15rem]">Particulars</td>
                <td className="w-[8rem]">Dr</td>
                <td>Cr</td>
              </tr>
              <tr>
                <td className="w-[15rem]">Salaries & Wages</td>
                <td className="w-[8rem]">0.00</td>
                <td></td>
              </tr>
              <tr>
                <td className="w-[15rem]">13th Month & Bonuses</td>
                <td className="w-[8rem]">9,500.00</td>
                <td></td>
              </tr>
              <tr>
                <td className="w-[15rem]">SSS Er</td>
                <td className="w-[8rem]">0.00</td>
                <td></td>
              </tr>
              <tr>
                <td className="w-[15rem]">PHIC Er</td>
                <td className="w-[8rem]">0.00</td>
                <td></td>
              </tr>
              <tr>
                <td className="w-[15rem]">PGBG ER</td>
                <td className="w-[8rem]">0.00</td>
                <td></td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">SSS Payable</td>
                <td className="w-[8rem]"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">PHIC Payable</td>
                <td className="w-[8rem]"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">PGBG Payable</td>
                <td className="w-[8rem]"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">Wtax Payable</td>
                <td className="w-[8rem]"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">PGBG MP2 Payable</td>
                <td className="w-[8rem]"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">Others</td>
                <td className="w-[8rem]"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td className="w-[15rem] pl-8">Total Net Pay</td>
                <td className="w-[8rem]"></td>
                <td>9,500.00</td>
              </tr>
              <tr className="font-bold bg-gray-200 hover:bg-gray-200 ">
                <td className="w-[15rem] pl-8"></td>
                <td>9,500.00</td>
                <td>9,500.00</td>
              </tr>
              <tr className="font-bold bg-gray-200 hover:bg-gray-200 ">
                <td className="w-[15rem] pl-8"></td>
                <td>0.00</td>
                <td>0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/payroll/${id}`}
          msg={"Are you sure you want to delete this payroll"}
          item={`${dataItem.payroll_id}`}
        />
      )}
    </>
  );
};

export default PayrollViewList;
