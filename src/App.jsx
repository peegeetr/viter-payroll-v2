import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  devNavUrl,
  UrlAdmin,
  UrlSystem,
} from "./component/helpers/functions-general";
import Employee from "./component/pages/employee/Employee";
import EmployeeLink from "./component/pages/employee/EmployeeLink";
import Holidays from "./component/pages/holidays/list/Holidays";
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
import ProtectedRouteOther from "./component/pages/access/ProtectedRouteOther";
import ProtectedRouteSystem from "./component/pages/access/ProtectedRouteSystem";
import CreateOtherPassword from "./component/pages/access/create-password/CreateOtherPassword";
import CreateSystemPassword from "./component/pages/access/create-password/CreateSystemPassword";
import CreatePasswordSuccess from "./component/pages/access/create-password/CreatePasswordSuccess";
import ForgotPassword from "./component/pages/access/forgot-password/ForgotPassword";
import ForgotPasswordVerification from "./component/pages/access/forgot-password/ForgotPasswordVerification";
import ForgotPasswordSystem from "./component/pages/access/forgot-password/ForgotPasswordSystem";
import PayrollSummaryPage from "./component/pages/reports/payroll-summary/PayrollSummaryPage";
import WTax from "./component/pages/reports/w-tax/monthly-tax/WTaxMonthly";
import SummaryEarnings from "./component/pages/reports/payroll-summary/earnings/SummaryEarnings";
import SummaryDeductions from "./component/pages/reports/payroll-summary/deductions/SummaryDeductions";
import SummaryType from "./component/pages/reports/paytype/SummaryType";
import SummaryTypeView from "./component/pages/reports/paytype/view/SummaryTypeView";
import PayBenefits from "./component/pages/reports/paybenefits/PayBenefits";
import PayrollDetails from "./component/pages/employee/payroll-details/PayrollDetails";
import PayrunSummary from "./component/pages/reports/payrun-summary/PayrunSummary";
import WTaxPage from "./component/pages/reports/w-tax/WTaxPage";
import WTaxMonthly from "./component/pages/reports/w-tax/monthly-tax/WTaxMonthly";
import WTaxYearly from "./component/pages/reports/w-tax/yearly-tax/WTaxYearly";
import Payslip13thMonth from "./component/pages/payroll/payslip-13th-month/Payslip13thMonth";
import PayslipBonus from "./component/pages/payroll/payslip-bonus/PayslipBonus";
import TaxYearly from "./component/pages/settings/tax-bracket/tax-yearly/TaxYearly";
import SummaryTypeViewBasicPay from "./component/pages/reports/paytype/view/SummaryTypeViewBasicPay";
import EmployeeSalaryHistory from "./component/pages/reports/employee-salary-history/EmployeeSalaryHistory";
import HistoryLink from "./component/pages/holidays/HistoryLink";
import HolidayExemption from "./component/pages/holidays/exemptions/HolidayExemption";
import ConfirmChangeEmailOtherUser from "./component/pages/access/confirm-change-email/ConfirmChangeEmailOtherUser";
import ConfirmChangeEmailSystemUser from "./component/pages/access/confirm-change-email/ConfirmChangeEmailSystemUser";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path={`*`} element={<PageNotFound />} />
            <Route
              path={`${devNavUrl}/create-password-success`}
              element={<CreatePasswordSuccess />}
            />
            <Route
              path={`${devNavUrl}/reset-password-success`}
              element={<ForgotPasswordVerification />}
            />

            {/* OTHER LOGIN */}
            {/* OTHER LOGIN */}
            {/* OTHER LOGIN */}

            <Route path={`/${devNavUrl}`} element={<OtherLogin />} />
            <Route
              path={`${devNavUrl}/confirm-email-changes`}
              element={<ConfirmChangeEmailOtherUser />}
            />
            <Route path={`${devNavUrl}/login`} element={<OtherLogin />} />
            <Route
              path={`${devNavUrl}/create-password`}
              element={<CreateOtherPassword />}
            />
            <Route
              path={`${devNavUrl}/forgot-password`}
              element={<ForgotPassword />}
            />

            {/* SYSTEM LOGIN */}
            {/* SYSTEM LOGIN */}
            {/* SYSTEM LOGIN */}
            <Route
              path={`${devNavUrl}/system/confirm-email-changes`}
              element={<ConfirmChangeEmailSystemUser />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/login`}
              element={<SystemLogin />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/create-password`}
              element={<CreateSystemPassword />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/forgot-password`}
              element={<ForgotPasswordSystem />}
            />
            {/* Payroll Page ADMIN*/}
            <Route
              path={`${devNavUrl}/payroll`}
              element={
                <ProtectedRouteOther>
                  <Payroll />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/payroll/list`}
              element={
                <ProtectedRouteOther>
                  <PayrollView />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/payroll/list/payslip`}
              element={
                <ProtectedRouteOther>
                  <Payslip />
                </ProtectedRouteOther>
              }
            />

            {/* Employee Page ADMIN*/}
            <Route
              path={`${devNavUrl}/employee`}
              element={
                <ProtectedRouteOther>
                  <Employee />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/employee/details`}
              element={
                <ProtectedRouteOther>
                  <EmployeeLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/job`}
              element={
                <ProtectedRouteOther>
                  <JobDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/payroll`}
              element={
                <ProtectedRouteOther>
                  <PayrollDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/salary-history`}
              element={
                <ProtectedRouteOther>
                  <SalaryHistory />
                </ProtectedRouteOther>
              }
            />

            {/* Earnings Page ADMIN*/}
            {/* <Route
              path={`${devNavUrl}/earnings`}
              element={
                <ProtectedRouteOther>
                  <EarningsPage />
                </ProtectedRouteOther>
              }
            /> */}
            <Route
              path={`${devNavUrl}/earnings`}
              element={
                <ProtectedRouteOther>
                  <ManageEarnings />
                </ProtectedRouteOther>
              }
            />
            {/* <Route
              path={`${devNavUrl}/earnings/manage`}
              element={
                <ProtectedRouteOther>
                  <ManageEarnings />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/earnings/filter`}
              element={
                <ProtectedRouteOther>
                  <FilterEarnings />
                </ProtectedRouteOther>
              }
            /> */}

            {/* Deductions Page */}
            {/* <Route
              path={`${devNavUrl}/deductions`}
              element={
                <ProtectedRouteOther>
                  <DeductionsPage />
                </ProtectedRouteOther>
              }
            /> */}
            <Route
              path={`${devNavUrl}/deductions`}
              element={
                <ProtectedRouteOther>
                  <ManageDeduction />
                </ProtectedRouteOther>
              }
            />
            {/* <Route
              path={`${devNavUrl}/deductions/manage`}
              element={
                <ProtectedRouteOther>
                  <ManageDeduction />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/deductions/filter`}
              element={
                <ProtectedRouteOther>
                  <FilterDeductions />
                </ProtectedRouteOther>
              }
            /> */}

            {/* Pay Type Page */}
            <Route
              path={`${devNavUrl}/pay-type`}
              element={
                <ProtectedRouteOther>
                  <PayTypeLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/pay-type/pay-item`}
              element={
                <ProtectedRouteOther>
                  <PayItem />
                </ProtectedRouteOther>
              }
            />

            {/* Holidays Page */}
            <Route
              path={`${devNavUrl}/holiday-details`}
              element={
                <ProtectedRouteOther>
                  <HistoryLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/holiday-details/holidays-list`}
              element={
                <ProtectedRouteOther>
                  <Holidays />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/holiday-details/holiday-exemptions`}
              element={
                <ProtectedRouteOther>
                  <HolidayExemption />
                </ProtectedRouteOther>
              }
            />

            {/* Reports Page */}
            <Route
              path={`${devNavUrl}/reports`}
              element={
                <ProtectedRouteOther>
                  <ReportsLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/summary`}
              element={
                <ProtectedRouteOther>
                  <PayrollSummaryPage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/summary/earnings`}
              element={
                <ProtectedRouteOther>
                  <SummaryEarnings />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/summary/deductions`}
              element={
                <ProtectedRouteOther>
                  <SummaryDeductions />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/reports/employee-payrun`}
              element={
                <ProtectedRouteOther>
                  <PayrunSummary />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/wtax`}
              element={
                <ProtectedRouteOther>
                  <WTaxPage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/wtax/monthly`}
              element={
                <ProtectedRouteOther>
                  <WTaxMonthly />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/wtax/yearly`}
              element={
                <ProtectedRouteOther>
                  <WTaxYearly />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/benefits`}
              element={
                <ProtectedRouteOther>
                  <PayBenefits />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/paytype`}
              element={
                <ProtectedRouteOther>
                  <SummaryType />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/paytype/view`}
              element={
                <ProtectedRouteOther>
                  <SummaryTypeView />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/paytype/basic-pay`}
              element={
                <ProtectedRouteOther>
                  <SummaryTypeViewBasicPay />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/salary-history`}
              element={
                <ProtectedRouteOther>
                  <EmployeeSalaryHistory />
                </ProtectedRouteOther>
              }
            />

            {/* Settings Page */}
            <Route
              path={`${devNavUrl}/settings`}
              element={
                <ProtectedRouteOther>
                  <SettingsLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/settings/users`}
              element={
                <ProtectedRouteOther>
                  <UserPage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/settings/users/other`}
              element={
                <ProtectedRouteOther>
                  <OtherUser />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket`}
              element={
                <ProtectedRouteOther>
                  <TaxBracket />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/monthly`}
              element={
                <ProtectedRouteOther>
                  <TaxMonthly />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/semi-monthly`}
              element={
                <ProtectedRouteOther>
                  <TaxSemi />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/yearly`}
              element={
                <ProtectedRouteOther>
                  <TaxYearly />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/pagibig`}
              element={
                <ProtectedRouteOther>
                  <Pagibig />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/philhealth`}
              element={
                <ProtectedRouteOther>
                  <Philhealth />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/sss-bracket`}
              element={
                <ProtectedRouteOther>
                  <SssBracket />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/rates`}
              element={
                <ProtectedRouteOther>
                  <Rates />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/payroll-type`}
              element={
                <ProtectedRouteOther>
                  <PayrollType />
                </ProtectedRouteOther>
              }
            />

            {/* SYSTEM PAGE */}
            {/* SYSTEM PAGE */}
            {/* SYSTEM PAGE */}
            {/* SYSTEM PAGE */}
            {/* SYSTEM PAGE */}
            {/* Payroll Page ADMIN*/}
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll`}
              element={
                <ProtectedRouteSystem>
                  <Payroll />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list`}
              element={
                <ProtectedRouteSystem>
                  <PayrollView />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list/payslip`}
              element={
                <ProtectedRouteSystem>
                  <Payslip />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list/payslip-13th-Month`}
              element={
                <ProtectedRouteSystem>
                  <Payslip13thMonth />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list/payslip-bonus`}
              element={
                <ProtectedRouteSystem>
                  <PayslipBonus />
                </ProtectedRouteSystem>
              }
            />

            {/* Employee Page ADMIN*/}
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee`}
              element={
                <ProtectedRouteSystem>
                  <Employee />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details`}
              element={
                <ProtectedRouteSystem>
                  <EmployeeLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details/job`}
              element={
                <ProtectedRouteSystem>
                  <JobDetails />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details/payroll`}
              element={
                <ProtectedRouteSystem>
                  <PayrollDetails />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details/salary-history`}
              element={
                <ProtectedRouteSystem>
                  <SalaryHistory />
                </ProtectedRouteSystem>
              }
            />

            {/* Earnings Page ADMIN*/}
            {/* <Route
              path={`${devNavUrl}/${UrlSystem}/earnings`}
              element={
                <ProtectedRouteSystem>
                  <EarningsPage />
                </ProtectedRouteSystem>
              } 
            />*/}
            <Route
              path={`${devNavUrl}/${UrlSystem}/earnings`}
              element={
                <ProtectedRouteSystem>
                  <ManageEarnings />
                </ProtectedRouteSystem>
              }
            />
            {/* <Route
              path={`${devNavUrl}/${UrlSystem}/earnings/manage`}
              element={
                <ProtectedRouteSystem>
                  <ManageEarnings />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/earnings/filter`}
              element={
                <ProtectedRouteSystem>
                  <FilterEarnings />
                </ProtectedRouteSystem>
              }
            /> */}

            {/* Deductions Page */}
            {/* <Route
              path={`${devNavUrl}/${UrlSystem}/deductions`}
              element={
                <ProtectedRouteSystem>
                  <DeductionsPage />
                </ProtectedRouteSystem>
              }
            /> */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/deductions`}
              element={
                <ProtectedRouteSystem>
                  <ManageDeduction />
                </ProtectedRouteSystem>
              }
            />
            {/* <Route
              path={`${devNavUrl}/${UrlSystem}/deductions/manage`}
              element={
                <ProtectedRouteSystem>
                  <ManageDeduction />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/deductions/filter`}
              element={
                <ProtectedRouteSystem>
                  <FilterDeductions />
                </ProtectedRouteSystem>
              }
            /> */}

            {/* Pay Type Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/pay-type`}
              element={
                <ProtectedRouteSystem>
                  <PayTypeLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/pay-type/pay-item`}
              element={
                <ProtectedRouteSystem>
                  <PayItem />
                </ProtectedRouteSystem>
              }
            />

            {/* Holidays Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/holiday-details`}
              element={
                <ProtectedRouteSystem>
                  <HistoryLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/holiday-details/holidays-list`}
              element={
                <ProtectedRouteSystem>
                  <Holidays />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/holiday-details/holiday-exemptions`}
              element={
                <ProtectedRouteSystem>
                  <HolidayExemption />
                </ProtectedRouteSystem>
              }
            />

            {/* Reports Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports`}
              element={
                <ProtectedRouteSystem>
                  <ReportsLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/summary`}
              element={
                <ProtectedRouteSystem>
                  <PayrollSummaryPage />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/summary/earnings`}
              element={
                <ProtectedRouteSystem>
                  <SummaryEarnings />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/summary/deductions`}
              element={
                <ProtectedRouteSystem>
                  <SummaryDeductions />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/employee-payrun`}
              element={
                <ProtectedRouteSystem>
                  <PayrunSummary />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/wtax`}
              element={
                <ProtectedRouteSystem>
                  <WTaxPage />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/wtax/monthly`}
              element={
                <ProtectedRouteSystem>
                  <WTaxMonthly />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/wtax/yearly`}
              element={
                <ProtectedRouteSystem>
                  <WTaxYearly />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/benefits`}
              element={
                <ProtectedRouteSystem>
                  <PayBenefits />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/paytype`}
              element={
                <ProtectedRouteSystem>
                  <SummaryType />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/paytype/view`}
              element={
                <ProtectedRouteSystem>
                  <SummaryTypeView />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/salary-history`}
              element={
                <ProtectedRouteSystem>
                  <EmployeeSalaryHistory />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/paytype/basic-pay`}
              element={
                <ProtectedRouteSystem>
                  <SummaryTypeViewBasicPay />
                </ProtectedRouteSystem>
              }
            />

            {/* Settings Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings`}
              element={
                <ProtectedRouteSystem>
                  <SettingsLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users`}
              element={
                <ProtectedRouteSystem>
                  <UserPage />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/system`}
              element={
                <ProtectedRouteSystem>
                  <SystemUser />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/other`}
              element={
                <ProtectedRouteSystem>
                  <OtherUser />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/role`}
              element={
                <ProtectedRouteSystem>
                  <Role />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket`}
              element={
                <ProtectedRouteSystem>
                  <TaxBracket />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket/monthly`}
              element={
                <ProtectedRouteSystem>
                  <TaxMonthly />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket/semi-monthly`}
              element={
                <ProtectedRouteSystem>
                  <TaxSemi />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket/yearly`}
              element={
                <ProtectedRouteSystem>
                  <TaxYearly />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/pagibig`}
              element={
                <ProtectedRouteSystem>
                  <Pagibig />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/philhealth`}
              element={
                <ProtectedRouteSystem>
                  <Philhealth />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/sss-bracket`}
              element={
                <ProtectedRouteSystem>
                  <SssBracket />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/rates`}
              element={
                <ProtectedRouteSystem>
                  <Rates />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/payroll-type`}
              element={
                <ProtectedRouteSystem>
                  <PayrollType />
                </ProtectedRouteSystem>
              }
            />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
