import React from "react";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general.jsx";
import { FaEdit } from "react-icons/fa";
import ModalUpdatePhilhealth from "./ModalUpdatePhilhealth.jsx";
import { setIsAdd } from "../../../../store/StoreAction.jsx";

const PhilhealthForm = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItems] = React.useState(null);
  const [percentage, setPercentage] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);

  // use if not loadmore button undertime
  const { data: philhealth } = useQueryData(
    `${devApiUrl}/v1/philhealth`, // endpoint
    "get", // method
    "philhealth" // key
  );

  React.useEffect(() => {
    if (philhealth?.count > 0) {
      setPercentage(philhealth.data[0].philhealth_percentage);
      setMin(philhealth.data[0].philhealth_min);
      setMax(philhealth.data[0].philhealth_max);
    }
  }, [philhealth]);

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
            onClick={() => handleEdit(philhealth)}
          >
            <FaEdit />
          </button>
        </div>
        <div className="text-left grid grid-cols-[7rem_1fr] mb-5 xs:pl-5 pl-2">
          <p className="font-semibold">Percentage :</p>
          <p className="pl-2">{numberWithCommas(percentage)}%</p>
          <p className="font-semibold">Minimum :</p>
          <p className="pl-2">{numberWithCommas(min)}</p>
          <p className="font-semibold">Maximum :</p>
          <p className="pl-2">{numberWithCommas(max)}</p>
        </div>
      </div>
      {store.isAdd && <ModalUpdatePhilhealth item={item} />}
    </>
  );
};

export default PhilhealthForm;
