import React from "react";
import { setIsConfirm, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ModalConfirmRq from "../../../partials/modals/ModalConfirmRq";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const SystemModeList = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  // const { rate, rateLoading } = useLoadRates(`${devApiUrl}/v1/rates`, "get");
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: systemMode,
  } = useQueryData(
    `${devApiUrl}/v1/system-mode`, // endpoint
    "get", // method
    "systemMode" // key
  );

  // const is_open = false;

  console.log(systemMode);

  const handleTurnOn = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.settings_system_mode_aid);
    setData(item);
    setDel(null);
  };

  const handleTurnOff = (item) => {
    dispatch(setIsRestore(true));
    setId(item.settings_system_mode_aid);
    setData(item);
    setDel(null);
  };
  let counter = 0;

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="max-w-[7rem] pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || systemMode?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {systemMode?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}</td>
                  <td className="capitalize">
                    {item.settings_system_mode_name}
                  </td>

                  <td className="pr-4 ">
                    <div className="flex justify-end ">
                      <div
                        className="hover:bg-white btn-action-table tooltip-action-table relative min-w-[40px] w-[40px] h-[20px] cursor-pointer ease-linear duration-[0.4s] rounded-full"
                        data-tooltip={
                          item.settings_system_mode_is_on === 0
                            ? "Turn On"
                            : "Turn Off"
                        }
                        onClick={() =>
                          item.settings_system_mode_is_on === 0
                            ? handleTurnOff(item)
                            : handleTurnOn(item)
                        }
                      >
                        <span
                          className={
                            item.settings_system_mode_is_on === 0
                              ? "absolute top-0 bottom-0 right-0 left-[13.8px] cursor-pointer w-[25px] h-[19.5px] border border-solid border-primary rounded-full ease-linear duration-[0.4s] bg-primary opacity-[0.5]"
                              : "absolute top-0 bottom-0 right-0 left-0 cursor-pointer w-[25px] h-[19.1px] border border-solid border-primary rounded-full ease-linear duration-[0.4s] bg-primary"
                          }
                        ></span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirmRq
          id={id}
          isDel={isDel}
          mysqlApiArchive={`${devApiUrl}/v1/system-mode/active/${id}`}
          msg={"Are you sure you want to turn off"}
          item={`${dataItem.settings_system_mode_name}`}
          arrKey="systemMode"
        />
      )}
      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiRestore={`${devApiUrl}/v1/system-mode/active/${id}`}
          msg={"Are you sure you want to turn on"}
          item={`${dataItem.settings_system_mode_name}`}
          arrKey="systemMode"
        />
      )}
    </>
  );
};

export default SystemModeList;
