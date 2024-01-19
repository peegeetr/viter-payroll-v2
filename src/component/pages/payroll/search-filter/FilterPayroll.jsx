import React from "react";
import { Form, Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import { InputSelect } from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import {
  getMonth,
  getYear,
} from "../../reports/w-tax/yearly-tax/functions-wtax";
import { setIsSearch } from "../../../../store/StoreAction";

const FilterPayroll = ({
  setFilter,
  setSubmit,
  isSubmit,
  setMonth,
  setYear,
  month,
  year,
  isFilter,
  search,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);

  // if clear the filter
  const handleClear = () => {
    setSubmit(!isSubmit);
    setFilter(false);
    setMonth("0");
    setYear("0");
  };

  // if use filter
  const handleMonthFilter = async (e) => {
    dispatch(setIsSearch(false));
    setSubmit(!isSubmit);
    setFilter(true);
    setMonth(e.target.value);
    search.current.value = "";
  };
  // if use filter
  const handleYearFilter = async (e) => {
    dispatch(setIsSearch(false));
    setSubmit(!isSubmit);
    setFilter(true);
    setYear(e.target.value);
    search.current.value = "";
  };
  return (
    <>
      <div className="relative overflow-x-auto z-0 print:hidden">
        <form action="" className="sm:flex gap-5 items-center mb-4 ">
          <div className="relative mt-1">
            <label>Month</label>
            <select
              name="filter-by"
              className="sm:w-[10rem]"
              onChange={(e) => handleMonthFilter(e)}
              value={month}
            >
              <option value="0" hidden>
                All
              </option>
              {getMonth()?.map((yItem, key) => {
                return (
                  <option key={key} value={yItem.month_aid}>
                    {`${yItem.month_name}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="relative mt-5 sm:mt-1">
            <label>Year</label>
            <select
              name="filter-by"
              className="sm:w-[10rem]"
              onChange={(e) => handleYearFilter(e)}
              value={year}
            >
              <option value="0" hidden>
                All
              </option>
              {getYear()?.map((yItem, key) => {
                return (
                  <option key={key} value={yItem.year}>
                    {`${yItem.year}`}
                  </option>
                );
              })}
            </select>
          </div>
          {isFilter && (
            <button
              type="reset"
              className="underline text-red-700 ml-2 sm:mt-0 mt-2"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default FilterPayroll;
