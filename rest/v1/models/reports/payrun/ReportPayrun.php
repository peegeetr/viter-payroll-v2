<?php
class ReportPayrun
{
    public $payroll_list_aid;
    public $payroll_list_employee_id;

    public $connection;
    public $date_from;
    public $date_to;
    public $current_year;
    public $lastInsertedId;

    public $tblPayrollList;
    public $tblPayroll;
    public $tblEarnings;
    public $tblDeductions;
    public $tblPayrollType;
    public $tblEmployeeInstallmet;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblPayroll = "prv2_payroll";
        $this->tblEarnings = "prv2_earnings";
        $this->tblDeductions = "prv2_deduction";
        $this->tblPayrollType = "prv2_settings_payroll_type";
        $this->tblEmployeeInstallmet = "prv2_employee_installment";
    }

    // REPORT Employee Payrun filter all employee by date
    // REPORT Employee Payrun filter all employee by date
    public function readEmployeePayrunAllEmployeeByDate()
    {
        try {
            $sql = "select payrollList.payroll_list_employee_salary, ";
            $sql .= "sum(payrollList.payroll_list_basic_pay) as basic_pay, ";
            $sql .= "sum(payrollList.payroll_list_holiday_hrs) as holiday_hrs, ";
            $sql .= "sum(payrollList.payroll_list_leave_hrs) as leave_hrs, ";
            $sql .= "sum(payrollList.payroll_list_overtime_pay) as overtime_pay, ";
            $sql .= "sum(payrollList.payroll_list_holiday) as holiday, ";
            $sql .= "sum(payrollList.payroll_list_night_shift_differential) as night_shift_differential, ";
            $sql .= "sum(payrollList.payroll_list_leave_pay) as leave_pay, ";
            $sql .= "sum(payrollList.payroll_list_absences) as absences, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as total_benefits, ";
            $sql .= "sum(payrollList.payroll_list_employee_referral_bonus) as employee_referral_bonus, ";
            $sql .= "sum(payrollList.payroll_list_bereavement) as bereavement, ";
            $sql .= "sum(payrollList.payroll_list_separation_pay) as separation_pay, ";
            $sql .= "sum(payrollList.payroll_list_other_allowances) as other_allowances, ";
            $sql .= "sum(payrollList.payroll_list_sss_er) as sss_er, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_er) as pagibig_er, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_er) as philhealth_er, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss_ee, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pagibig_ee, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as philhealth_ee, ";
            $sql .= "sum(payrollList.payroll_list_sss_loan) as sss_loan, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_loan) as pagibig_loan, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_mp2) as pagibig_mp2, ";
            $sql .= "sum(payrollList.payroll_list_fca_tuition) as fca_tuition, ";
            $sql .= "sum(payrollList.payroll_list_fwc_tithes) as fwc_tithes, ";
            $sql .= "sum(payrollList.payroll_list_other_deduction) as other_deduction, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as pay13th_month, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_tax) as tax, ";
            $sql .= "sum(payrollList.payroll_list_deduction) as deduction, ";
            $sql .= "sum(payrollList.payroll_list_net_pay) as net_pay, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            // $sql .= "and DATE(payroll.payroll_start_date) >= :date_from ";
            // $sql .= "and DATE(payroll.payroll_end_date) <= :date_to ";
            $sql .= "and DATE(payroll.payroll_start_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "GROUP BY payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Employee Payrun filter by employee id by date
    // REPORT Employee Payrun filter by employee id by date
    public function readEmployeePayrunByEmployeeIdByEmpId()
    {
        try {
            $sql = "select payrollList.payroll_list_employee_salary, ";
            $sql .= "sum(payrollList.payroll_list_basic_pay) as basic_pay, ";
            $sql .= "sum(payrollList.payroll_list_holiday_hrs) as holiday_hrs, ";
            $sql .= "sum(payrollList.payroll_list_leave_hrs) as leave_hrs, ";
            $sql .= "sum(payrollList.payroll_list_overtime_pay) as overtime_pay, ";
            $sql .= "sum(payrollList.payroll_list_holiday) as holiday, ";
            $sql .= "sum(payrollList.payroll_list_night_shift_differential) as night_shift_differential, ";
            $sql .= "sum(payrollList.payroll_list_leave_pay) as leave_pay, ";
            $sql .= "sum(payrollList.payroll_list_absences) as absences, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as total_benefits, ";
            $sql .= "sum(payrollList.payroll_list_employee_referral_bonus) as employee_referral_bonus, ";
            $sql .= "sum(payrollList.payroll_list_bereavement) as bereavement, ";
            $sql .= "sum(payrollList.payroll_list_separation_pay) as separation_pay, ";
            $sql .= "sum(payrollList.payroll_list_other_allowances) as other_allowances, ";
            $sql .= "sum(payrollList.payroll_list_sss_er) as sss_er, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_er) as pagibig_er, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_er) as philhealth_er, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss_ee, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pagibig_ee, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as philhealth_ee, ";
            $sql .= "sum(payrollList.payroll_list_sss_loan) as sss_loan, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_loan) as pagibig_loan, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_mp2) as pagibig_mp2, ";
            $sql .= "sum(payrollList.payroll_list_fca_tuition) as fca_tuition, ";
            $sql .= "sum(payrollList.payroll_list_fwc_tithes) as fwc_tithes, ";
            $sql .= "sum(payrollList.payroll_list_other_deduction) as other_deduction, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as pay13th_month, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_tax) as tax, ";
            $sql .= "sum(payrollList.payroll_list_deduction) as deduction, ";
            $sql .= "sum(payrollList.payroll_list_net_pay) as net_pay, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            // $sql .= "and DATE(payroll.payroll_start_date) >= :date_from ";
            // $sql .= "and DATE(payroll.payroll_end_date) <= :date_to ";
            $sql .= "and DATE(payroll.payroll_start_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "GROUP BY payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
