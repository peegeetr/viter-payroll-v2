import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "./component/helpers/functions-general";
import Employee from "./component/pages/employee/Employee";
import EmployeeLink from "./component/pages/employee/EmployeeLink";
import Holidays from "./component/pages/holidays/Holidays";
import PayItem from "./component/pages/pay-type/pay-item/PayItem";
import PayTypeLink from "./component/pages/pay-type/PayTypePage";
import PayrollLink from "./component/pages/payroll/PayrollLink";
import Pagibig from "./component/pages/settings/pagibig/Pagibig.jsx";
import Philhealth from "./component/pages/settings/philhealth/philhealth.jsx";
import Rates from "./component/pages/settings/rates/Rates.jsx";
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

import DeductionsPage from "./component/pages/deductions/DeductionsPage";
import FilterDeductions from "./component/pages/deductions/filter/FilterDeductions";
import ManageDeduction from "./component/pages/deductions/manage-list/ManageDeduction";
import EarningsPage from "./component/pages/earnings/EarningsPage";
import FilterEarnings from "./component/pages/earnings/filter/FilterEarnings";
import ManageEarnings from "./component/pages/earnings/manage-list/ManageEarnings";
import JobDetails from "./component/pages/employee/job-details/JobDetails";
import SalaryHistory from "./component/pages/employee/salary-history/SalaryHistory";
import ReportsLink from "./component/pages/reports/ReportsLink";
import { StoreProvider } from "./store/StoreContext";
import Payroll from "./component/pages/payroll/Payroll";
import PayrollView from "./component/pages/payroll/view/PayrollView";
import Payslip from "./component/pages/payroll/payslip/Payslip";

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

            {/* Payroll Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/payroll`}
              element={<Payroll />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/payroll/employee`}
              element={<PayrollView />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/payroll/employee/payslip`}
              element={<Payslip />}
            />

            {/* Employee Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/employee`}
              element={<Employee />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/employee/details`}
              element={<EmployeeLink />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/employee/details/job`}
              element={<JobDetails />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/employee/details/salary-history`}
              element={<SalaryHistory />}
            />

            {/* Earnings Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/earnings`}
              element={<EarningsPage />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/earnings/manage`}
              element={<ManageEarnings />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/earnings/filter`}
              element={<FilterEarnings />}
            />

            {/* Deductions Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/deductions`}
              element={<DeductionsPage />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/deductions/manage`}
              element={<ManageDeduction />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/deductions/filter`}
              element={<FilterDeductions />}
            />

            {/* Pay Type Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/pay-type`}
              element={<PayTypeLink />}
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
              element={<PayItem />}
            />

            {/* Holidays Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/holidays`}
              element={<Holidays />}
            />

            {/* Reports Page */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/reports`}
              element={<ReportsLink />}
            />

            {/* Settings Page */}
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

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/tax-bracket`}
              element={<TaxBracket />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/tax-bracket/monthly`}
              element={<TaxMonthly />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/tax-bracket/semi-monthly`}
              element={<TaxSemi />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/pagibig`}
              element={<Pagibig />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/philhealth`}
              element={<Philhealth />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/sss-bracket`}
              element={<SssBracket />}
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/rates`}
              element={<Rates />}
            />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
