import React from "react";
import { FaEdit } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general.jsx";
import ModalUpdatePagibig from "./ModalUpdatePagibig.jsx";

const PagibigForm = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItems] = React.useState(null);
  const [erAmount, setErAmount] = React.useState(0);
  const [eeAmount, setEeAmount] = React.useState(0);

  // use if not loadmore button undertime
  const { data: pagibig } = useQueryData(
    `${devApiUrl}/v1/pagibig`, // endpoint
    "get", // method
    "pagibig" // key
  );

  React.useEffect(() => {
    if (pagibig?.count > 0) {
      setEeAmount(pagibig.data[0].pagibig_ee_amount);
      setErAmount(pagibig.data[0].pagibig_er_amount);
    }
  }, [pagibig]);

  const handleEdit = (item) => {
    const data = item?.count > 0 ? item.data[0] : 0;
    setItems(data);
    dispatch(setIsAdd(true));
  };
  return (
    <>
      <div className="relative w-full max-w-[650px] ">
        <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
          <h4>Update Amount</h4>
          <button
            type="button"
            className="tooltip-action-table"
            data-tooltip="Edit"
            onClick={() => handleEdit(pagibig)}
          >
            <FaEdit />
          </button>
        </div>
        <p className="font-semibold mb-5 xs:pl-5 pl-2">
          EE Amount :
          <span className="font-light pl-2">{numberWithCommas(eeAmount)}</span>
        </p>
        <p className="font-semibold xs:pl-5 pl-2">
          ER Amount :
          <span className="font-light pl-2">{numberWithCommas(erAmount)}</span>
        </p>
      </div>
      {store.isAdd && <ModalUpdatePagibig item={item} />}
    </>
  );
};

export default PagibigForm;
