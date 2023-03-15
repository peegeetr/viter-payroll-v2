import React from "react";
import { Form, Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import {
  getPayPeriod,
  numberWithCommas,
} from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const WTaxList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
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
      <div className="relative overflow-x-auto z-0 w-full lg:w-[35rem] ">
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

        <table>
          <tbody>
            <tr className="bg-gray-200 hover:bg-gray-200 text-primary">
              <td>Total Amount of Compensation</td>
              <td className="w-[8rem]">0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Less Non Taxable Compensation</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">13th Month & Other Benefits</td>
              <td className="w-[8rem]">9,500.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">Deminimis</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">Employee Share (SSS, PHIC, PGBG)</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem]  ">Total Non Taxable Compensation</td>
              <td>9,500.00</td>
              <td>9,500.00</td>
            </tr>
            <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem] ">Tax Withheld</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WTaxList;
