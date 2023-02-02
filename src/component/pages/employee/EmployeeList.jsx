import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setIsConfirm, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useFetchDataLoadMore from "../../custom-hooks/useFetchDataLoadMore";
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general";
import Loadmore from "../../partials/Loadmore";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const EmployeeList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
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
    `/v1/employees/limit/${start}/${perPage}`,
    "/v1/employees",
    perPage,
    search
  );

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.employee_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.employee_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.employee_aid);
    setData(item);
    setDel(true);
  };

  return (
    <>
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        handleChange={handleChange}
        loading={loading}
        result={result}
        store={store}
        url={`/v1/employees/search/`}
      />

      <div className="relative text-center overflow-x-auto z-0">
        {loading && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="w-12"></th>
              <th className="w-52">Full Name</th>
              <th className="w-28">Emp. No.</th>
              <th className="w-80">Work Email</th>
              <th className="w-32">Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((item, key) => {
                counter++;
                return (
                  <tr key={key}>
                    <td className="text-center">{counter}.</td>
                    <td>
                      {item.employee_photo > 0 ? (
                        <img
                          src="https://hris.frontlinebusiness.com.ph/img/abrigo.jpg"
                          alt="employee photo"
                          className="rounded-full h-8 w-8 object-cover object-center mx-auto"
                        />
                      ) : (
                        <span className="text-3xl text-gray-400">
                          <FaUserCircle />
                        </span>
                      )}
                    </td>
                    <td>
                      {`${item.employee_lname}, ${item.employee_fname}`}{" "}
                      <span className="inline-block text-[0] first-letter:text-sm">
                        {item.employee_mname}
                      </span>
                    </td>
                    <td>123456</td>
                    <td>{item.employee_email}</td>
                    <td>{item.employee_mobile_number}</td>
                    <td>
                      {item.employee_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {item.employee_is_active === 1 ? (
                          <>
                            <Link
                              to={`${devNavUrl}/${UrlAdmin}/employees/details?employeeid=${item.employee_aid}`}
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Edit"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(item)}
                            >
                              <FaHistory />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
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
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/employees/active/${id}`}
          msg={"Are you sure you want to archive this employee"}
          item={`"${dataItem.employee_lname}, ${dataItem.employee_fname}"`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/employees/${id}`}
          mysqlApiRestore={`/v1/employees/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this employee"
              : "Are you sure you want to restore this employee"
          }
          item={`"${dataItem.employee_lname}, ${dataItem.employee_fname}"`}
        />
      )}
    </>
  );
};

export default EmployeeList;
