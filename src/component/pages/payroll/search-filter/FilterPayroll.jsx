import React from "react";
import { setIsSearch } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  getMonth,
  getYear,
} from "../../reports/w-tax/yearly-tax/functions-wtax";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
  payrollCategorySalaryId,
} from "../../../helpers/functions-payroll-category-id";

const FilterPayroll = ({
  setFilter,
  setSubmit,
  isSubmit,
  setType,
  setMonth,
  setYear,
  type,
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
    setType("0");
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
  // if use filter
  const handleYearType = async (e) => {
    dispatch(setIsSearch(false));
    setSubmit(!isSubmit);
    setFilter(true);
    setType(e.target.value);
    search.current.value = "";
  };
  return (
    <>
      <div className="relative overflow-x-auto z-0 print:hidden">
        <form action="" className="sm:flex gap-3 mb-4 justify-items-end">
          <div className="relative mt-2">
            <label>Type</label>
            <select
              name="filter-by"
              className="sm:w-[10rem]"
              onChange={(e) => handleYearType(e)}
              value={type}
            >
              <option value="0" hidden>
                All
              </option>
              <option value={payrollCategorySalaryId}>Salary</option>
              <option value={payrollCategory13thMonthId}>13th Month</option>
              <option value={payrollCategoryBonusId}>Bonus</option>
            </select>
          </div>
          <div className="relative mt-5 sm:mt-2">
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
          <div className="relative mt-5 sm:mt-2">
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
              className="underline text-red-700 sm:mt-7 mt-2"
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
