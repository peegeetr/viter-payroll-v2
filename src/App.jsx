import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  devNavUrl,
  UrlAdmin,
  UrlSystem,
} from "./component/helpers/functions-general";
import Employee from "./component/pages/employee/Employee";
import EmployeeLink from "./component/pages/employee/EmployeeLink";
import Holidays from "./component/pages/holidays/Holidays";
import PayItem from "./component/pages/pay-type/pay-item/PayItem";
import PayTypeLink from "./component/pages/pay-type/PayTypePage";
import Pagibig from "./component/pages/settings/pagibig/Pagibig.jsx";
import Philhealth from "./component/pages/settings/philhealth/philhealth.jsx";
import SettingsLink from "./component/pages/settings/SettingsLink";
import SssBracket from "./component/pages/settings/sss-bracket/SssBracket.jsx";
import TaxMonthly from "./component/pages/settings/tax-bracket/tax-monthly/TaxMonthly.jsx";
import TaxSemi from "./component/pages/settings/tax-bracket/tax-semi/TaxSemi.jsx";
import TaxBracket from "./component/pages/settings/tax-bracket/TaxBracket.jsx";
import OtherUser from "./component/pages/settings/users/other/OtherUser";
import Role from "./component/pages/settings/users/role/Role";
import SystemUser from "./component/pages/settings/users/system/SystemUser";
import UserPage from "./component/pages/settings/users/UserPage";
import PageNotFound from "./component/partials/PageNotFound";

import SystemLogin from "./component/pages/access/login/SystemLogin";
import DeductionsPage from "./component/pages/deductions/DeductionsPage";
import FilterDeductions from "./component/pages/deductions/filter/FilterDeductions";
import ManageDeduction from "./component/pages/deductions/manage-list/ManageDeduction";
import EarningsPage from "./component/pages/earnings/EarningsPage";
import FilterEarnings from "./component/pages/earnings/filter/FilterEarnings";
import ManageEarnings from "./component/pages/earnings/manage-list/ManageEarnings";
import JobDetails from "./component/pages/employee/job-details/JobDetails";
import SalaryHistory from "./component/pages/employee/salary-history/SalaryHistory";
import PayrollView from "./component/pages/payroll/list/PayrollView";
import Payroll from "./component/pages/payroll/Payroll";
import Payslip from "./component/pages/payroll/payslip/Payslip";
import ReportsLink from "./component/pages/reports/ReportsLink";
import PayrollType from "./component/pages/settings/payroll-type/PayrollType.jsx";
import Rates from "./component/pages/settings/rates/Rates";
import { StoreProvider } from "./store/StoreContext";
import OtherLogin from "./component/pages/access/login/OtherLogin";
import ProtectedRoute from "./component/pages/access/ProtectedRoute";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path={`*`} element={<PageNotFound />} />
            <Route path={`/${devNavUrl}`} element={<OtherLogin />} />

            <Route path={`${devNavUrl}/login`} element={<OtherLogin />} />

            <Route
              path={`${devNavUrl}/${UrlSystem}/login`}
              element={<SystemLogin />}
            />
            {/* Payroll Page */}
            <Route
              path={`${devNavUrl}/payroll`}
              element={
                <ProtectedRoute>
                  <Payroll />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/list`}
              element={
                <ProtectedRoute>
                  <PayrollView />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/list/payslip`}
              element={
                <ProtectedRoute>
                  <Payslip />
                </ProtectedRoute>
              }
            />

            {/* Employee Page */}
            <Route
              path={`${devNavUrl}/employee`}
              element={
                <ProtectedRoute>
                  <Employee />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/employee/details`}
              element={
                <ProtectedRoute>
                  <EmployeeLink />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/job`}
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/salary-history`}
              element={
                <ProtectedRoute>
                  <SalaryHistory />
                </ProtectedRoute>
              }
            />

            {/* Earnings Page */}
            <Route
              path={`${devNavUrl}/earnings`}
              element={
                <ProtectedRoute>
                  <EarningsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/earnings/manage`}
              element={
                <ProtectedRoute>
                  <ManageEarnings />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/earnings/filter`}
              element={
                <ProtectedRoute>
                  <FilterEarnings />
                </ProtectedRoute>
              }
            />

            {/* Deductions Page */}
            <Route
              path={`${devNavUrl}/deductions`}
              element={
                <ProtectedRoute>
                  <DeductionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/deductions/manage`}
              element={
                <ProtectedRoute>
                  <ManageDeduction />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/deductions/filter`}
              element={
                <ProtectedRoute>
                  <FilterDeductions />
                </ProtectedRoute>
              }
            />

            {/* Pay Type Page */}
            <Route
              path={`${devNavUrl}/pay-type`}
              element={
                <ProtectedRoute>
                  <PayTypeLink />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/pay-type/pay-item`}
              element={
                <ProtectedRoute>
                  <PayItem />
                </ProtectedRoute>
              }
            />

            {/* Holidays Page */}
            <Route
              path={`${devNavUrl}/holidays`}
              element={
                <ProtectedRoute>
                  <Holidays />
                </ProtectedRoute>
              }
            />

            {/* Reports Page */}
            <Route
              path={`${devNavUrl}/reports`}
              element={
                <ProtectedRoute>
                  <ReportsLink />
                </ProtectedRoute>
              }
            />

            {/* Settings Page */}
            <Route
              path={`${devNavUrl}/settings`}
              element={
                <ProtectedRoute>
                  <SettingsLink />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/settings/users`}
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/settings/users/system`}
              element={
                <ProtectedRoute>
                  <SystemUser />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/settings/users/other`}
              element={
                <ProtectedRoute>
                  <OtherUser />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${devNavUrl}/settings/users/role`}
              element={
                <ProtectedRoute>
                  <Role />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket`}
              element={
                <ProtectedRoute>
                  <TaxBracket />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/monthly`}
              element={
                <ProtectedRoute>
                  <TaxMonthly />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/semi-monthly`}
              element={
                <ProtectedRoute>
                  <TaxSemi />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/pagibig`}
              element={
                <ProtectedRoute>
                  <Pagibig />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/philhealth`}
              element={
                <ProtectedRoute>
                  <Philhealth />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/sss-bracket`}
              element={
                <ProtectedRoute>
                  <SssBracket />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/rates`}
              element={
                <ProtectedRoute>
                  <Rates />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${devNavUrl}/settings/payroll-type`}
              element={
                <ProtectedRoute>
                  <PayrollType />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
