import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import SummaryTypeView from "../SummaryTypeView";

const SystemUserSummaryTypeView = () => {
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
      <SummaryTypeView />
    </>
  );
};

export default SystemUserSummaryTypeView;
