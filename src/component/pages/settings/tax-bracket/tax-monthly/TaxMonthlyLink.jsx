import { BsCalendar2MonthFill } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "../../../../helpers/functions-general";

const TaxMonthlyLink = () => {
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/tax-bracket/monthly`}
        className="w-full py-4"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <BsCalendar2MonthFill />
          </span>
          <span className="text-base font-bold">Monthly</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/tax-bracket/monthly`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default TaxMonthlyLink;