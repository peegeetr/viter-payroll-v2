import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";
import SummaryType from "../SummaryType";

const OtherUserSummaryType = () => {
  const { store } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  if (fbsPayroll.isDev === true || store.credentials.data.role_is_admin !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <SummaryType />
    </>
  );
};

export default OtherUserSummaryType;
