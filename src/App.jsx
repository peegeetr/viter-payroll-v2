import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UrlSystem, devNavUrl } from "./component/helpers/functions-general";
import UserPage from "./component/pages/settings/users/UserPage";
import OtherUser from "./component/pages/settings/users/other/OtherUser";
import Role from "./component/pages/settings/users/role/Role";
import SystemUser from "./component/pages/settings/users/system/SystemUser";
import PageNotFound from "./component/partials/PageNotFound";

import ProtectedRouteOther from "./component/pages/access/ProtectedRouteOther";
import ProtectedRouteSystem from "./component/pages/access/ProtectedRouteSystem";
import ConfirmChangeEmailOtherUser from "./component/pages/access/confirm-change-email/ConfirmChangeEmailOtherUser";
import ConfirmChangeEmailSystemUser from "./component/pages/access/confirm-change-email/ConfirmChangeEmailSystemUser";
import CreateOtherPassword from "./component/pages/access/create-password/CreateOtherPassword";
import CreatePasswordSuccess from "./component/pages/access/create-password/CreatePasswordSuccess";
import CreateSystemPassword from "./component/pages/access/create-password/CreateSystemPassword";
import ForgotPassword from "./component/pages/access/forgot-password/ForgotPassword";
import ForgotPasswordSystem from "./component/pages/access/forgot-password/ForgotPasswordSystem";
import ForgotPasswordVerification from "./component/pages/access/forgot-password/ForgotPasswordVerification";
import OtherLogin from "./component/pages/access/login/OtherLogin";
import SystemLogin from "./component/pages/access/login/SystemLogin";
import OtherUserManageDeduction from "./component/pages/deductions/links/OtherUserManageDeduction";
import SystemUserManageDeduction from "./component/pages/deductions/links/SystemUserManageDeduction";
import OtherUserManageEarnings from "./component/pages/earnings/links/OtherUserManageEarnings";
import SystemUserManageEarnings from "./component/pages/earnings/links/SystemUserManageEarnings";
import OtherUserJobDetails from "./component/pages/employee/job-details/links/OtherUserJobDetails";
import SystemUserJobDetails from "./component/pages/employee/job-details/links/SystemUserJobDetails";
import OtherUserEmployeeList from "./component/pages/employee/links-employee-list/OtherUserEmployeeList";
import SystemUserEmployeeList from "./component/pages/employee/links-employee-list/SystemUserEmployeeList";
import OtherUserEmployee from "./component/pages/employee/links/OtherUserEmployee";
import SystemUserEmployee from "./component/pages/employee/links/SystemUserEmployee";
import OtherUserPayrollDetails from "./component/pages/employee/payroll-details/links/OtherUserPayrollDetails";
import SystemUserPayrollDetails from "./component/pages/employee/payroll-details/links/SystemUserPayrollDetails";
import OtherUserSalaryHistory from "./component/pages/employee/salary-history/links/OtherUserSalaryHistory";
import SystemUserSalaryHistory from "./component/pages/employee/salary-history/links/SystemUserSalaryHistory";
import OtherUserHolidayExemption from "./component/pages/holidays/exemptions/links/OtherUserHolidayExemption";
import SystemUserHolidayExemption from "./component/pages/holidays/exemptions/links/SystemUserHolidayExemption";
import OtherUserHistoryLink from "./component/pages/holidays/links/OtherUserHistoryLink";
import SystemUserHistoryLink from "./component/pages/holidays/links/SystemUserHistoryLink";
import OtherUserHolidayList from "./component/pages/holidays/list/links/OtherUserHolidayList";
import SystemUserHolidayList from "./component/pages/holidays/list/links/SystemUserHolidayList";
import OtherUserPayType from "./component/pages/pay-type/links/OtherUserPayType";
import SystemUserPayType from "./component/pages/pay-type/links/SystemUserPayType";
import OtherUserPayItem from "./component/pages/pay-type/pay-item/links/OtherUserPayItem";
import SystemUserPayItem from "./component/pages/pay-type/pay-item/links/SystemUserPayItem";
import OtherUserPayrollList from "./component/pages/payroll/links/OtherUserPayrollList";
import SystemUserPayrollList from "./component/pages/payroll/links/SystemUserPayrollList";
import OtherUserPayrollView from "./component/pages/payroll/list/links/OtherUserPayrollView";
import SystemUserPayrollView from "./component/pages/payroll/list/links/SystemUserPayrollView";
import OtherUserPayslip13thMonth from "./component/pages/payroll/payslip-13th-month/links/OtherUserPayslip13thMonth";
import SystemUserPayslip13thMonth from "./component/pages/payroll/payslip-13th-month/links/SystemUserPayslip13thMonth";
import OtherUserPayslipBonus from "./component/pages/payroll/payslip-bonus/links/OtherUserPayslipBonus";
import SystemUserPayslipBonus from "./component/pages/payroll/payslip-bonus/links/SystemUserPayslipBonus";
import OtherUserPayslipSalary from "./component/pages/payroll/payslip/links/OtherUserPayslipSalary";
import SystemUserPayslipSalary from "./component/pages/payroll/payslip/links/SystemUserPayslipSalary";
import OtherUserEmployeeSalaryHistory from "./component/pages/reports/employee-salary-history/links/OtherUserEmployeeSalaryHistory";
import SystemUserEmployeeSalaryHistory from "./component/pages/reports/employee-salary-history/links/SystemUserEmployeeSalaryHistory";
import OtherUserReportsLink from "./component/pages/reports/links/OtherUserReportsLink";
import SystemUserReportsLink from "./component/pages/reports/links/SystemUserReportsLink";
import OtherUserPayBenefits from "./component/pages/reports/paybenefits/links/OtherUserPayBenefits";
import SystemUserPayBenefits from "./component/pages/reports/paybenefits/links/SystemUserPayBenefits";
import OtherUserSummaryDeductions from "./component/pages/reports/payroll-summary/deductions/links/OtherUserSummaryDeductions";
import SystemUserSummaryDeductions from "./component/pages/reports/payroll-summary/deductions/links/SystemUserSummaryDeductions";
import OtherUserSummaryEarnings from "./component/pages/reports/payroll-summary/earnings/links/OtherUserSummaryEarnings";
import SystemUserSummaryEarnings from "./component/pages/reports/payroll-summary/earnings/links/SystemUserSummaryEarnings";
import OtherUserPayrollSummaryPage from "./component/pages/reports/payroll-summary/links/OtherUserPayrollSummaryPage";
import SystemUserPayrollSummaryPage from "./component/pages/reports/payroll-summary/links/SystemUserPayrollSummaryPage";
import OtherUserPayrunSummary from "./component/pages/reports/payrun-summary/links/OtherUserPayrunSummary";
import SystemUserPayrunSummary from "./component/pages/reports/payrun-summary/links/SystemUserPayrunSummary";
import OtherUserSummaryType from "./component/pages/reports/paytype/links/OtherUserSummaryType";
import SystemUserSummaryType from "./component/pages/reports/paytype/links/SystemUserSummaryType";
import SummaryTypeViewBasicPay from "./component/pages/reports/paytype/view/SummaryTypeViewBasicPay";
import OtherUserSummaryTypeView from "./component/pages/reports/paytype/view/links/OtherUserSummaryTypeView";
import SystemUserSummaryTypeView from "./component/pages/reports/paytype/view/links/SystemUserSummaryTypeView";
import OtherUserWTaxPage from "./component/pages/reports/w-tax/links/OtherUserWTaxPage";
import SystemUserWTaxPage from "./component/pages/reports/w-tax/links/SystemUserWTaxPage";
import OtherUserWTaxMonthly from "./component/pages/reports/w-tax/monthly-tax/links/OtherUserWTaxMonthly";
import SystemUserWTaxMonthly from "./component/pages/reports/w-tax/monthly-tax/links/SystemUserWTaxMonthly";
import OtherUserWTaxYearly from "./component/pages/reports/w-tax/yearly-tax/links/OtherUserWTaxYearly";
import SystemUserWTaxYearly from "./component/pages/reports/w-tax/yearly-tax/links/SystemUserWTaxYearly";
import OtherUserRates from "./component/pages/settings/Rates/links/OtherUserPayrollType";
import SystemUserRates from "./component/pages/settings/Rates/links/SystemUserPayrollType";
import OtherUserSettingsLink from "./component/pages/settings/links/OtherUserSettingsLink";
import SystemUserSettingsLink from "./component/pages/settings/links/SystemUserSettingsLink";
import OtherUserPagibig from "./component/pages/settings/pagibig/links/OtherUserPagibig";
import SystemUserPagibig from "./component/pages/settings/pagibig/links/SystemUserPagibig";
import OtherUserPayrollType from "./component/pages/settings/payroll-type/links/OtherUserPayrollType";
import SystemUserPayrollType from "./component/pages/settings/payroll-type/links/SystemUserPayrollType";
import OtherUserPhilhealth from "./component/pages/settings/philhealth/links/OtherUserPayrollType";
import SystemUserPhilhealth from "./component/pages/settings/philhealth/links/SystemUserPayrollType";
import OtherUserSssBracket from "./component/pages/settings/sss-bracket/links/OtherUserSssBracket";
import SystemUserSssBracket from "./component/pages/settings/sss-bracket/links/SystemUserSssBracket";
import OtherUserTaxBracket from "./component/pages/settings/tax-bracket/links/OtherUserTaxBracket";
import SystemUserTaxBracket from "./component/pages/settings/tax-bracket/links/SystemUserTaxBracket";
import OtherUserTaxMonthly from "./component/pages/settings/tax-bracket/tax-monthly/links/OtherUserTaxMonthly";
import SystemUserTaxMonthly from "./component/pages/settings/tax-bracket/tax-monthly/links/SystemUserTaxMonthly";
import OtherUserTaxSemi from "./component/pages/settings/tax-bracket/tax-semi/links/OtherUserTaxSemi";
import SystemUserTaxSemi from "./component/pages/settings/tax-bracket/tax-semi/links/SystemUserTaxSemi";
import OtherUserTaxYearly from "./component/pages/settings/tax-bracket/tax-yearly/links/OtherUserTaxYearly";
import SystemUserTaxYearly from "./component/pages/settings/tax-bracket/tax-yearly/links/SystemUserTaxYearly";
import { StoreProvider } from "./store/StoreContext";
import SystemUserOtherUser from "./component/pages/settings/users/other/links/SystemUserOtherUser";
import OtherUserOtherUser from "./component/pages/settings/users/other/links/OtherUserOtherUser";
import SystemUserSummaryTypeViewBasicPay from "./component/pages/reports/paytype/view/links-salary/SystemUserSummaryTypeViewBasicPay";
import OtherUserSummaryTypeViewBasicPay from "./component/pages/reports/paytype/view/links-salary/OtherUserSummaryTypeViewBasicPay";

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
                  <OtherUserPayrollList />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/payroll/list`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayrollView />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/payroll/list/payslip`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayslipSalary />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/payroll/list/payslip-13th-Month`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayslip13thMonth />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/payroll/list/payslip-bonus`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayslipBonus />
                </ProtectedRouteOther>
              }
            />

            {/* Employee Page ADMIN*/}
            <Route
              path={`${devNavUrl}/employee`}
              element={
                <ProtectedRouteOther>
                  <OtherUserEmployee />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/employee/details`}
              element={
                <ProtectedRouteOther>
                  <OtherUserEmployeeList />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/job`}
              element={
                <ProtectedRouteOther>
                  <OtherUserJobDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/payroll`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayrollDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/employee/details/salary-history`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSalaryHistory />
                </ProtectedRouteOther>
              }
            />

            {/* Earnings Page ADMIN*/}
            <Route
              path={`${devNavUrl}/earnings`}
              element={
                <ProtectedRouteOther>
                  <OtherUserManageEarnings />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/deductions`}
              element={
                <ProtectedRouteOther>
                  <OtherUserManageDeduction />
                </ProtectedRouteOther>
              }
            />

            {/* Pay Type Page */}
            <Route
              path={`${devNavUrl}/pay-type`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayType />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/pay-type/pay-item`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayItem />
                </ProtectedRouteOther>
              }
            />

            {/* Holidays Page */}
            <Route
              path={`${devNavUrl}/holiday-details`}
              element={
                <ProtectedRouteOther>
                  <OtherUserHistoryLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/holiday-details/holidays-list`}
              element={
                <ProtectedRouteOther>
                  <OtherUserHolidayList />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/holiday-details/holiday-exemptions`}
              element={
                <ProtectedRouteOther>
                  <OtherUserHolidayExemption />
                </ProtectedRouteOther>
              }
            />

            {/* Reports Page */}
            <Route
              path={`${devNavUrl}/reports`}
              element={
                <ProtectedRouteOther>
                  <OtherUserReportsLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/summary`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayrollSummaryPage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/summary/earnings`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSummaryEarnings />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/summary/deductions`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSummaryDeductions />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/reports/employee-payrun`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayrunSummary />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/wtax`}
              element={
                <ProtectedRouteOther>
                  <OtherUserWTaxPage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/wtax/monthly`}
              element={
                <ProtectedRouteOther>
                  <OtherUserWTaxMonthly />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/wtax/yearly`}
              element={
                <ProtectedRouteOther>
                  <OtherUserWTaxYearly />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/benefits`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayBenefits />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/paytype`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSummaryType />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/paytype/view`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSummaryTypeView />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/paytype/basic-pay`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSummaryTypeViewBasicPay />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/reports/salary-history`}
              element={
                <ProtectedRouteOther>
                  <OtherUserEmployeeSalaryHistory />
                </ProtectedRouteOther>
              }
            />

            {/* Settings Page */}
            <Route
              path={`${devNavUrl}/settings`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSettingsLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/settings/other`}
              element={
                <ProtectedRouteOther>
                  <OtherUserOtherUser />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket`}
              element={
                <ProtectedRouteOther>
                  <OtherUserTaxBracket />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/monthly`}
              element={
                <ProtectedRouteOther>
                  <OtherUserTaxMonthly />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/semi-monthly`}
              element={
                <ProtectedRouteOther>
                  <OtherUserTaxSemi />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/tax-bracket/yearly`}
              element={
                <ProtectedRouteOther>
                  <OtherUserTaxYearly />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/pagibig`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPagibig />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/philhealth`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPhilhealth />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/sss-bracket`}
              element={
                <ProtectedRouteOther>
                  <OtherUserSssBracket />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/rates`}
              element={
                <ProtectedRouteOther>
                  <OtherUserRates />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/settings/payroll-type`}
              element={
                <ProtectedRouteOther>
                  <OtherUserPayrollType />
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
                  <SystemUserPayrollList />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayrollView />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list/payslip`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayslipSalary />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list/payslip-13th-Month`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayslip13thMonth />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/payroll/list/payslip-bonus`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayslipBonus />
                </ProtectedRouteSystem>
              }
            />

            {/* Employee Page ADMIN*/}
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserEmployee />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserEmployeeList />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details/job`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserJobDetails />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details/payroll`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayrollDetails />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/employee/details/salary-history`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSalaryHistory />
                </ProtectedRouteSystem>
              }
            />

            {/* Earnings Page ADMIN*/}
            <Route
              path={`${devNavUrl}/${UrlSystem}/earnings`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserManageEarnings />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/deductions`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserManageDeduction />
                </ProtectedRouteSystem>
              }
            />
            {/* Pay Type Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/pay-type`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayType />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/pay-type/pay-item`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayItem />
                </ProtectedRouteSystem>
              }
            />

            {/* Holidays Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/holiday-details`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserHistoryLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/holiday-details/holidays-list`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserHolidayList />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/holiday-details/holiday-exemptions`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserHolidayExemption />
                </ProtectedRouteSystem>
              }
            />

            {/* Reports Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserReportsLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/summary`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayrollSummaryPage />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/summary/earnings`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSummaryEarnings />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/summary/deductions`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSummaryDeductions />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/employee-payrun`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayrunSummary />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/wtax`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserWTaxPage />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/wtax/monthly`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserWTaxMonthly />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/wtax/yearly`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserWTaxYearly />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/benefits`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayBenefits />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/paytype`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSummaryType />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/paytype/view`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSummaryTypeView />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/salary-history`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserEmployeeSalaryHistory />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/reports/paytype/basic-pay`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSummaryTypeViewBasicPay />
                </ProtectedRouteSystem>
              }
            />

            {/* Settings Page */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSettingsLink />
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
                  <SystemUserOtherUser />
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
                  <SystemUserTaxBracket />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket/monthly`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserTaxMonthly />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket/semi-monthly`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserTaxSemi />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/tax-bracket/yearly`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserTaxYearly />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/pagibig`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPagibig />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/philhealth`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPhilhealth />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/sss-bracket`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserSssBracket />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/rates`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserRates />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/payroll-type`}
              element={
                <ProtectedRouteSystem>
                  <SystemUserPayrollType />
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
