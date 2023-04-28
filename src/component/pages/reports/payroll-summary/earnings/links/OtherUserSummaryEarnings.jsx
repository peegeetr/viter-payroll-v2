import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import SummaryEarnings from "../SummaryEarnings";

const OtherUserSummaryEarnings = () => {
  const { store } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  if (fbsPayroll.isDev === true || store.credentials.data.role_is_admin !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <SummaryEarnings />
    </>
  );
};

export default OtherUserSummaryEarnings;
