import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";
import { InputSelect, InputText } from "../../../helpers/FormInputs";

const FilterEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(true);
  };

  const initVal = {
    sample: "",
    sample: "",
    sample: "",
    sample: "",
  };

  const yupSchema = Yup.object({
    sample: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          fetchData(
            setLoading,
            item ? `/v1/paytype/${item.paytype_aid}` : "/v1/paytype",
            values, // form data values
            null, // result set data
            item ? "Succesfully updated." : "Succesfully added.", // success msg
            "", // additional error msg if needed
            dispatch, // context api action
            store, // context api state
            true, // boolean to show success modal
            false, // boolean to show load more functionality button
            null, // navigate default value
            item ? "put" : "post"
          );
          dispatch(setStartIndex(0));
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <div className="relative placeholder" data-label="Pay Item">
                  <InputSelect
                    name="sample"
                    //  disabled={!loading}
                    onFocus={(e) =>
                      e.target.parentElement.classList.add("focused")
                    }
                  >
                    <optgroup label="Pay Item">
                      <option value="" disabled hidden></option>
                      <option value="all">All</option>
                      <option value="sample">Lumabas, Cyrene M.</option>
                    </optgroup>
                  </InputSelect>
                </div>
                <div className="relative">
                  <InputText
                    placeholder="Start Date"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="sample"
                    // disabled={loading}
                  />
                </div>
                <div className="relative">
                  <InputText
                    placeholder="End Date"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="sample"
                    // disabled={loading}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[12rem]">Employeee</th>
              <th className="min-w-[7rem]">Pay Type</th>
              <th className="min-w-[7rem]">Pay Item</th>
              <th className="min-w-[7rem]">Amount</th>
              <th className="min-w-[7rem]">Frequency</th>
              <th className="min-w-[10rem]">No. of Installment</th>
              <th className="min-w-[10rem]">Start Date</th>
              <th className="min-w-[10rem]">End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>Lumabas, Cyrene M.</td>
              <td>Wages</td>
              <td>Overtime Pay</td>
              <td>00.00</td>
              <td>monthly</td>
              <td>1</td>
              <td>Mon Jan 30, 2023</td>
              <td>Mon Jan 30, 2023</td>
              <td>{1 === 1 ? <StatusActive /> : <StatusInactive />}</td>
            </tr>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                <ServerError />
              </td>
            </tr>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                {/*{loading && <TableSpinner />}*/}
                <NoData />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/user-systems/active/${id}`}
          msg={"Are you sure you want to archive this user"}
          item={`"${dataItem.user_system_email}"`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/user-systems/${id}`}
          mysqlApiRestore={`/v1/user-systems/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this user"
              : "Are you sure you want to restore this user"
          }
          item={`"${dataItem.user_system_email}"`}
        />
      )}
    </>
  );
};

export default FilterEarningsList;
