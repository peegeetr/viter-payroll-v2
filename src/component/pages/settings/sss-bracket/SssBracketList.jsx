import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsConfirm } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useFetchDataLoadMore from "../../../custom-hooks/useFetchDataLoadMore.jsx";
import Loadmore from "../../../partials/Loadmore.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import NoData from "../../../partials/NoData.jsx";
import SearchBar from "../../../partials/SearchBar.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import ModalSssBracket from "./ModalSssBracket.jsx";
const SssBracketList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const search = React.useRef(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
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
    `/v1/rates/${start}/${perPage}`,
    "/v1/rates",
    perPage,
    search
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    //setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsConfirm(true));
    //setId(item.user_system_aid);
    //setData(item);
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
        url={`/v1/user-systems/search/`}
      />
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[230px]">Range From</th>
              <th className="w-[230px]">Range To</th>
              <th>ER</th>
              <th>EE </th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((item, key) => {
                counter++;
                return (
                  <tr key={key}>
                    <td>{counter}.</td>
                    <td>
                      {item.user_system_lname}, {item.user_system_fname}
                    </td>
                    <td>x</td>
                    <td>x</td>
                    <td>x</td>
                    <td>vvvv</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
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
                  {loading && <TableSpinner />}
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
      {store.isAdd && <ModalSssBracket />}

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/user-systems/active/${id}`}
          msg={"Are you sure you want to remove this data"}
          //   item={`"${dataItem.user_system_email}"`}
          item={""}
        />
      )}
    </>
  );
};

export default SssBracketList;
