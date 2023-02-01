import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "./component/helpers/functions-general";
import Deduction from "./component/pages/deductions/Deduction";
import Earnings from "./component/pages/earnings/Earnings";
import EmployeeLink from "./component/pages/employee/EmployeeLink";
import Employee from "./component/pages/employee/Employee";
import HolidaysLink from "./component/pages/holidays/HolidaysLink";
import PayItem from "./component/pages/pay-type/pay-item/PayItem";
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
            <Route path={`/${devNavUrl}`} element={<div>Payroll</div>} />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/payroll`}
              element={<PayrollLink />}
            />

            {/* Earnings Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/earnings`}
              element={<Earnings />}
            />

            {/* Deductions Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/deductions`}
              element={<Deduction />}
            />

            {/* Employee Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/employee`}
              element={<Employee />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/employee/details`}
              element={<EmployeeLink />}
            />

            {/* Holidays Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/holidays`}
              element={<HolidaysLink />}
            />

            {/* Pay Type Link */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/pay-type`}
              element={<PayTypeLink />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
              element={<PayItem />}
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
