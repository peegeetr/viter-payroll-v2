import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "./component/helpers/functions-general";
import Earnings from "./component/pages/earnings/Earnings";
import PayTypeLink from "./component/pages/pay-type/PayTypePage";
import PayrollLink from "./component/pages/payroll/PayrollLink";
import SettingsLink from "./component/pages/settings/SettingsLink";
import OtherUser from "./component/pages/settings/users/other/OtherUser";
import Role from "./component/pages/settings/users/role/Role";
import SystemUser from "./component/pages/settings/users/system/SystemUser";
import UserPage from "./component/pages/settings/users/UserPage";
import PageNotFound from "./component/partials/PageNotFound";

import { StoreProvider } from "./store/StoreContext";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path={`*`} element={<PageNotFound />} />
            <Route path={`/${devNavUrl}`} element={<div>Payroll </div>} />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/payroll`}
              element={<PayrollLink />}
            />

            {/* Earnings Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/earnings`}
              element={<Earnings />}
            />

            {/* Earnings Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/pay-type`}
              element={<PayTypeLink />}
            />
            {/* Settings Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings`}
              element={<SettingsLink />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/users`}
              element={<UserPage />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/users/system`}
              element={<SystemUser />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/users/other`}
              element={<OtherUser />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/users/role`}
              element={<Role />}
            />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
