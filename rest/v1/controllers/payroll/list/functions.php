<?php

// create eaning from run payroll 
function checkCreateEarnings($object)
{
    $query = $object->createEarnings();
    checkQuery($query, "There's a problem processing your request. (create earnings)");
    return $query;
}

// create deductions from run payroll 
function checkCreateDeductions($object)
{
    $query = $object->createDeductions();
    checkQuery($query, "There's a problem processing your request. (create Deduction)");
    return $query;
}

// Update Payroll to paid
function checkUpdateIsPaidPayroll($object)
{
    $query = $object->isPaidPayroll();
    checkQuery($query, "There's a problem processing your request. (update payroll to paid)");
    return $query;
}

// Update Payroll List to paid
function checkUpdateIsPaidPayrollList($object)
{
    $query = $object->isPaidPayrollList();
    checkQuery($query, "There's a problem processing your request. (update payroll list to paid)");
    return $query;
}

// Update earning to paid
function checkUpdateIsPaidEarnings($object)
{
    $query = $object->updateIsPaidEarnings();
    checkQuery($query, "There's a problem processing your request. (update earning to paid)");
    return $query;
}

// Update deduction to paid
function checkUpdateIsPaidDeduction($object)
{
    $query = $object->updateIsPaidDeduction();
    checkQuery($query, "There's a problem processing your request. (update deduction to paid)");
    return $query;
}

// delete not installment earnings 
function checkDeleteNotInstallmentEarnings($object)
{
    $query = $object->deleteNotInstallmentEarnings();
    checkQuery($query, "There's a problem processing your request. (delete not installment earnings)");
    return $query;
}

// delete not installment earnings by id
function checkDeleteNotInstallmentEarningsByEmpId($object)
{
    $query = $object->deleteNotInstallmentEarningsByEmpId();
    checkQuery($query, "There's a problem processing your request. (delete not installment earnings by emp id)");
    return $query;
}

// delete earnings 
function checkDeleteEarnings($object)
{
    $query = $object->deleteEarnings();
    checkQuery($query, "There's a problem processing your request. (delete earnings)");
    return $query;
}

// delete not installment deductions 
function checkDeleteNotInstallmentDeductions($object)
{
    $query = $object->deleteNotInstallmentDeductions();
    checkQuery($query, "There's a problem processing your request. (delete not installment deductions)");
    return $query;
}

// delete not installment deductions by employee id
function checkDeleteNotInstallmentDeductionsByEmpId($object)
{
    $query = $object->deleteNotInstallmentDeductionsByEmpId();
    checkQuery($query, "There's a problem processing your request. (delete not installment deductions by emp id)");
    return $query;
}

// delete deductions 
function checkDeleteDeductions($object)
{
    $query = $object->deleteDeductions();
    checkQuery($query, "There's a problem processing your request. (delete deductions)");
    return $query;
}

// Read all Basic pay
function checkReadReportFilterBasicPay($object)
{
    $query = $object->readReportFilterBasicPay();
    checkQuery($query, "Empty records.(Read all basic pay)");
    return $query;
}

// Read all
function checkReadAllReportSummary($object, $salaryCategoryId)
{
    $query = $object->readAllReportSummary($salaryCategoryId);
    checkQuery($query, "Empty records.(Read all report summary)");
    return $query;
}

// Read limit
function checkReadReportSummaryLimit($object, $salaryCategoryId)
{
    $query = $object->readReportSummaryLimit($salaryCategoryId);
    checkQuery($query, "Empty records.(Read all limit report summary Limit)");
    return $query;
}

// filter by employee id and date
function checkReadSummaryBenefitsByEmpId($object)
{
    $query = $object->readSummaryBenefitsByEmpId();
    checkQuery($query, "Empty records. (payroll list limit by employee id and date)");
    return $query;
}

// HRIS Read by emp id
function checkReadPayslipEmpId($object)
{
    $query = $object->readPayslipEmpId();
    checkQuery($query, "Empty records (Read payslip by employee id).");
    return $query;
}
// HRIS Read limit by emp id 
function checkReadPayslipEmpIdLimit($object)
{
    $query = $object->readPayslipEmpIdLimit();
    checkQuery($query, "Empty records (Read limit payslip by employee id).");
    return $query;
}

// Report Benefits Filter
function checkReadReportBenefitsByDate($object)
{
    $query = $object->readReportBenefitsByDate();
    checkQuery($query, "Empty records. (read report benefits by date)");
    return $query;
}

// Report Benefits by employee id Filter
function checkReadReportBenefitsByEmpId($object)
{
    $query = $object->readReportBenefitsByEmpId();
    checkQuery($query, "Empty records. (read report benefits by employee id and date)");
    return $query;
}

// Report Benefits by employee id Filter
function checkReadReportBenefitsBenefits($object)
{
    $query = $object->readReportBenefitsBenefits();
    checkQuery($query, "Empty records. (read default report benefits)");
    return $query;
}


// REPORT Monthly WTAX filter all employee by date
function checkReadReportMonthlyWtaxAllEmployeeByDate($object)
{
    $query = $object->readReportMonthlyWtaxAllEmployeeByDate();
    checkQuery($query, "Empty records. (Read report wtax all employee by date)");
    return $query;
}

// REPORT Monthly WTAX filter by employee id by date
function checkReadReportMonthlyWtaxByEmployeeIdByEmpId($object)
{
    $query = $object->readReportMonthlyWtaxByEmployeeIdByEmpId();
    checkQuery($query, "Empty records. (Read report wtax limit by employee id and date)");
    return $query;
}

// REPORT Yearly WTAX filter all employee by date
function checkReadReportYearlyWtaxAllEmployeeByDate($object)
{
    $query = $object->readReportYearlyWtaxAllEmployeeByDate();
    checkQuery($query, "Empty records. (Read report wtax all employee by date)");
    return $query;
}

// REPORT Yearly WTAX filter by employee id by date
function checkReadReportYearlyWtaxByEmployeeIdByEmpId($object)
{
    $query = $object->readReportYearlyWtaxByEmployeeIdByEmpId();
    checkQuery($query, "Empty records. (Read report wtax limit by employee id and date)");
    return $query;
}

// REPORT Employee payrun filter all employee by date
function checkReadEmployeePayrunAllEmployeeByDate($object)
{
    $query = $object->readEmployeePayrunAllEmployeeByDate();
    checkQuery($query, "Empty records. (Read report Employee Payrun all employee by date)");
    return $query;
}

// REPORT Employee payrun filter by employee id by date
function checkReadEmployeePayrunByEmployeeIdByEmpId($object)
{
    $query = $object->readEmployeePayrunByEmployeeIdByEmpId();
    checkQuery($query, "Empty records. (Read report Employee Payrun limit by employee id and date)");
    return $query;
}

// Read all payroll list in a year for 13th month
function checkReadAllPayrollListCompute13thMonth($object, $year, $payroll_category_type)
{
    $query = $object->readAllPayrollListCompute13thMonth($year, $payroll_category_type);
    checkQuery($query, "Empty records. (Read all payroll list in a year for 13th month)");
    return $query;
}

// Update 
function checkUpdate13thMonth($object)
{
    $query = $object->update13thMonth();
    checkQuery($query, "There's a problem processing your request. (update payroll list 13th month)");
    return $query;
}


//HRIS Read all payroll type by employee id
function checkReadHrisPayslipFilterAllPayrollTypeByEmpId($object)
{
    $query = $object->readHrisPayslipFilterAllPayrollTypeByEmpId();
    checkQuery($query, "Empty records.(Read all payroll Type by employee Id and date range)");
    return $query;
}

//HRIS Filter Read Salary id by employee id
function checkReadHrisPayslipFilterSalaryIdByEmpId($object, $payrollType)
{
    $query = $object->readHrisPayslipFilterSalaryIdByEmpId($payrollType);
    checkQuery($query, "Empty records.(Read all salary by employee Id and date range)");
    return $query;
}

//HRIS Filter Read 13th month id by employee id
function checkReadHrisPayslipFilter13thMothIdByEmpId($object, $payrollType)
{
    $query = $object->readHrisPayslipFilter13thMothIdByEmpId($payrollType);
    checkQuery($query, "Empty records.(Read all 13th month id by employee Id and date range)");
    return $query;
}

//HRIS Filter Read Bonus id by employee id
function checkReadHrisPayslipFilterBonusIdByEmpId($object, $payrollType)
{
    $query = $object->readHrisPayslipFilterBonusIdByEmpId($payrollType);
    checkQuery($query, "Empty records.(Read all Bonus Id by employee Id and date range)");
    return $query;
}


// Report Read all basic pay
function checkReadByReportBasicPay($object)
{
    $query = $object->readByReportBasicPay();
    checkQuery($query, "Empty records.(Read all report basic pay page)");
    return $query;
}

// Report Read all limit basic pay
function checkReadByReportBasicPayLimit($object)
{
    $query = $object->readByReportBasicPayLimit();
    checkQuery($query, "Empty records.(Read all limit report basic pay page)");
    return $query;
}

// Delete all don't have bonus in payroll list
function checkDeleteDontHaveBonusPayrollList($object)
{
    $query = $object->deleteDontHaveBonusPayrollList();
    checkQuery($query, "There's a problem processing your request. (delete all don't have bonus in payroll list)");
    return $query;
}

// Read limit
function checkReadByIdLimit($object)
{
    $query = $object->readByIdLimit();
    checkQuery($query, "Empty records. (limit by payroll id)");
    return $query;
}


// Read search
function checkSearchById($object)
{
    $query = $object->searchById();
    checkQuery($query, "Empty records. (search)");
    return $query;
}

// Update Payroll Total Amount
function checkUpdatePayrollTotalAmount($object, $payrollTotalAmount)
{
    $query = $object->updatePayrollTotalAmount($payrollTotalAmount);
    checkQuery($query, "There's a problem processing your request. (update payroll to paid)");
    return $query;
}

// Read limit
function checkReadAllSalaryCategory($object, $payroll_category_type)
{
    $query = $object->readAllSalaryCategory($payroll_category_type);
    checkQuery($query, "Empty records. (read by all Salary Category)");
    return $query;
}
// REPORT Monthly Gross WTAX filter all employee by date
function checkReadReportMonthlyWtaxGrossAllEmployeeByYear($object)
{
    $query = $object->readReportMonthlyWtaxGrossAllEmployeeByYear();
    checkQuery($query, "Empty records. (Read report wtax monthly gross all employee by date)");
    return $query;
}

// filter Report Summary All Employee By Date
function checkReadReportSummaryAllEmployeeByDate($object, $salaryCategoryId)
{
    $query = $object->readReportSummaryAllEmployeeByDate($salaryCategoryId);
    checkQuery($query, "Empty records. (report summary all employee by date)");
    return $query;
}

// filter Report Summary By Employee And By Date
function checkReadReportSummaryByEmployeeAndByDate($object, $salaryCategoryId)
{
    $query = $object->readReportSummaryByEmployeeAndByDate($salaryCategoryId);
    checkQuery($query, "Empty records. (report summary all employee by date)");
    return $query;
}

// Update Payroll to paid
function checkUpdateDeductionInstallemnt($object)
{
    $query = $object->updateDeductionInstallemnt();
    checkQuery($query, "There's a problem processing your request. (update deduction installment to completed)");
    return $query;
}
