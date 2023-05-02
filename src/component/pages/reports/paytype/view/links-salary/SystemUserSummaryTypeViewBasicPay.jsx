import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import SummaryTypeViewBasicPay from "../SummaryTypeViewBasicPay";

const SystemUserSummaryTypeViewBasicPay = () => {
  const { store } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));
  if (
    fbsPayroll.isDev === false ||
    store.credentials.data.role_is_developer !== 1
  ) {
    return <PageNotFound />;
  }
  return (
    <>
      <SummaryTypeViewBasicPay />
    </>
  );
};

export default SystemUserSummaryTypeViewBasicPay;
