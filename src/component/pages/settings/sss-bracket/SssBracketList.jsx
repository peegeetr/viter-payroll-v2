import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useFetchDataLoadMore from "../../../custom-hooks/useFetchDataLoadMore.jsx";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general.jsx";
import Loadmore from "../../../partials/Loadmore.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore.jsx";
import NoData from "../../../partials/NoData.jsx";
import SearchBar from "../../../partials/SearchBar.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import ModalSssBracket from "./ModalSssBracket.jsx";
const SssBracketList = ({ setItemEdit, setItemNum }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const search = React.useRef(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [dataItem, setData] = React.useState(null);

  const perPage = 25;
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
    `${devApiUrl}/v1/sss-bracket/limit/${start}/${perPage}`,
    `${devApiUrl}/v1/sss-bracket`,
    perPage,
    search
  );

  const handleEdit = (item, counter) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
    setItemNum(counter);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.sss_bracket_aid);
    setData(item);
    setDel(true);
    console.log(item);
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
        url={`${devApiUrl}/v1/sss-bracket/search/`}
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
                    <td>{key + 1}.</td>
                    <td>
                      {numberWithCommas(
                        Number(item.sss_bracket_range_from).toFixed(2)
                      )}
                    </td>
                    <td>
                      {numberWithCommas(
                        Number(item.sss_bracket_range_to).toFixed(2)
                      )}
                    </td>
                    <td>
                      {numberWithCommas(Number(item.sss_bracket_er).toFixed(2))}
                    </td>
                    <td>
                      {numberWithCommas(Number(item.sss_bracket_ee).toFixed(2))}
                    </td>
                    <td>
                      {numberWithCommas(
                        Number(item.sss_bracket_total).toFixed(2)
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item, key + 1)}
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/sss-bracket/${id}`}
          msg={"Are you sure you want to remove this data"}
          item={`${dataItem.sss_bracket_range_from} - ${dataItem.sss_bracket_range_to}`}
        />
      )}
    </>
  );
};

export default SssBracketList;
