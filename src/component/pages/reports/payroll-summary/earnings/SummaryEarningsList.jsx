import React from "react";
import { Form, Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText } from "../../../../helpers/FormInputs";
import {
  getUserType,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import * as Yup from "yup";
import ServerError from "../../../../partials/ServerError";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import fetchApi from "../../../../helpers/fetchApi";

const SummaryEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [loading, setLoading] = React.useState(false);

  const initVal = {
    payStart_date: "",
    payEnd_date: "",
  };

  const yupSchema = Yup.object({
    payStart_date: Yup.string().required("Required"),
    payEnd_date: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          consoleLog(values);
          setLoading(true);
          const result = await fetchApi(
            devApiUrl +
              `/v1/leaves/filter/${values.employee_id}/${values.leave_id}/${values.start_date}/${values.return_date}/${leaveName}/${values.role_is_contributor}`
          );
          consoleLog("result", result);
          if (typeof result === "undefined") {
            consoleLog("undefined");
            setLoading(false);
            dispatch(setError(true));
            dispatch(setMessage("API / Network Error"));
            return;
          }
          if (!result.data) {
            consoleLog("No Data");
            dispatch(setError(true));
            dispatch(setMessage("No Data"));
            setLoading(false);
            return;
          }
          if (result.data) {
            consoleLog("result", result.data);
            setResult(result.data);
            setLoading(false);
          }
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] py-10 items-center">
                <div className="relative">
                  <InputText
                    label="Start Pay Date"
                    name="payStart_date"
                    type="text"
                    disabled={loading}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "date")}
                  />
                </div>

                <div className="relative">
                  <InputText
                    label="End Pay Date"
                    name="payEnd_date"
                    type="text"
                    disabled={loading}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "date")}
                  />
                </div>

                <button
                  className="btn-modal-submit relative"
                  type="submit "
                  disabled={loading || !props.dirty}
                >
                  {loading && <ButtonSpinner />}
                  <MdFilterAlt className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <div className="relative text-center">
        <div className="overflow-x-auto z-0 ">
          <table>
            <thead>
              <tr className="border-none">
                <th className="text-center" rowSpan="2">
                  #
                </th>
                <th className="min-w-[10rem]" rowSpan="2">
                  Name
                </th>
                <th className="table-border" rowSpan="2">
                  Department
                </th>
                <th className="table-border " rowSpan="2">
                  Monthly
                  <br />
                  Basic pay
                </th>
                <th className="table-border min-w-[8rem]" rowSpan="2">
                  Additional pay
                </th>
                <th className="table-border min-w-[5rem]" rowSpan="2">
                  Total Pay
                </th>
                <th className="table-border " rowSpan="2">
                  Regular
                  <br />
                  Work Hours
                </th>
                <th className="table-border" rowSpan="2">
                  Rate
                </th>
                <th className="table-border " rowSpan="2">
                  Total
                  <br />
                  Reg Wage
                </th>
                <th className="table-border-center " colSpan="3">
                  Leave
                </th>
                <th className="table-border-center " colSpan="3">
                  Overtime
                </th>
                <th className="table-border-center " colSpan="3">
                  Holiday
                </th>
                <th className="table-border-center " colSpan="3">
                  Night Differential
                </th>
                <th className="min-w-[5rem]" rowSpan="2">
                  Gross Pay
                </th>
              </tr>
              <tr className="">
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="text-center py-[0.7rem]">1.</td>

                <td>cyrene, lumabas</td>
                <td>IT</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
                <td>{numberWithCommas(100000000000)}</td>
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

export default SummaryEarningsList;
