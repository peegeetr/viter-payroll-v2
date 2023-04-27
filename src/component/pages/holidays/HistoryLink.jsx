import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import Navigation from "../../partials/Navigation";
import HolidayExemptionLink from "./exemptions/HolidayExemptionLink";
import HolidayListLink from "./list/HolidayListLink";

const HistoryLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="holidays" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Holiday Details</h4>
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <HolidayListLink />
          </li>
          <li className="py-2">
            <HolidayExemptionLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default HistoryLink;
