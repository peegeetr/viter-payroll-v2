<?php
class PayrollList
{
    public $payroll_list_aid;
    public $payroll_list_is_paid;
    public $payroll_list_employee_name;
    public $payroll_list_employee_email;
    public $payroll_list_employee_id;
    public $payroll_list_employee_salary;
    public $payroll_list_payroll_id;
    public $payroll_list_gross;
    public $payroll_list_deduction;
    public $payroll_list_net_pay;
    public $payroll_list_basic_pay;
    public $payroll_list_overtime_pay;
    public $payroll_list_overtime_hrs;
    public $payroll_list_leave_pay;
    public $payroll_list_leave_hrs;
    public $payroll_list_holiday;
    public $payroll_list_holiday_hrs;
    public $payroll_list_inlfation_adjustment;
    public $payroll_list_adjustment_pay;
    public $payroll_list_night_shift_differential;
    public $payroll_list_nd_hrs;
    public $payroll_list_hazard_pay;
    public $payroll_list_absences;
    public $payroll_list_absences_hrs;
    public $payroll_list_absences_rate;
    public $payroll_list_deminimis;
    public $payroll_list_13th_month;
    public $payroll_list_bonus;
    public $payroll_list_employee_referral_bonus;
    public $payroll_list_bereavement;
    public $payroll_list_separation_pay;
    public $payroll_list_other_allowances;
    public $payroll_list_total_benefits;
    public $payroll_list_sss_er;
    public $payroll_list_philhealth_er;
    public $payroll_list_pagibig_er;
    public $payroll_list_hmo_er;
    public $payroll_list_sss_ee;
    public $payroll_list_philhealth_ee;
    public $payroll_list_pagibig_ee;
    public $payroll_list_hmo_ee;
    public $payroll_list_sss_loan;
    public $payroll_list_pagibig_loan;
    public $payroll_list_pagibig_mp2;
    public $payroll_list_fwc_tithes;
    public $payroll_list_fca_tuition;
    public $payroll_list_other_deduction;
    public $payroll_list_madatory_ee;
    public $payroll_list_tax;
    public $payroll_list_undertime;
    public $payroll_list_datetime;
    // earnings and deduction
    public $payroll_type_id;
    public $num_pay;
    public $paytype_id;
    public $payitem_id;
    public $amount;
    public $details;
    public $frequency;
    public $is_installment;
    public $number_of_installment;
    public $start_pay_date;
    public $end_pay_date;
    public $hris_date;
    public $earnings_rate;
    public $earnings_hrs;
    public $installment_extra;
    public $created;

    public $deduction_details;
    public $deduction_paytype_id;
    public $deduction_payitem_id;
    public $deduction_amount;

    public $employee_installment_aid;
    public $employee_installment_status;
    public $employee_installment_number_of_payrun;


    public $connection;
    public $payrollList_search;
    public $payrollList_start;
    public $payrollList_total;
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

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblPayrollList} ";
            $sql .= "order by payroll_list_employee_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // search  
    public function search()
    {
        try {
            $sql = "select payroll_list_payroll_id, ";
            $sql .= "payroll_list_employee_name, ";
            $sql .= "payroll_list_employee_id, ";
            $sql .= "payroll_list_gross, ";
            $sql .= "payroll_list_deduction, ";
            $sql .= "payroll_list_net_pay, ";
            $sql .= "payroll_list_is_paid, ";
            $sql .= "payroll_list_aid ";
            $sql .= "from {$this->tblPayrollList} ";
            $sql .= "where payroll_list_employee_name like :search ";
            $sql .= "order by payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->payrollList_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblPayrollList} ";
            $sql .= "order by payroll_list_employee_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->payrollList_start - 1,
                "total" => $this->payrollList_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read by id
    public function readById()
    {
        try {
            $sql = "select *, sum(payrollList.payroll_list_gross) as salWages ";
            // $sql = "select payrollList.payroll_list_payroll_id, ";
            // $sql .= "payrollList.payroll_list_aid, ";
            // $sql .= "payrollList.payroll_list_is_paid, ";
            // $sql .= "payrollList.payroll_list_gross, ";
            // $sql .= "payrollList.payroll_list_deduction, ";
            // $sql .= "payrollList.payroll_list_net_pay, ";
            // $sql .= "payrollList.payroll_list_employee_name, ";
            // $sql .= "payrollList.payroll_list_employee_salary, ";
            // $sql .= "payrollList.payroll_list_night_diff_per_day, ";
            // $sql .= "payrollList.payroll_list_employee_work_on_holiday, ";
            // $sql .= "payrollList.payroll_list_pagibig_additional, ";
            // $sql .= "payrollList.payroll_list_employee_id, ";
            // $sql .= "payroll.payroll_category_type, ";
            // $sql .= "payroll.payroll_id, ";
            // $sql .= "payroll.payroll_start_date, ";
            // $sql .= "payroll.payroll_end_date, ";
            // $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readByIdLimit()
    {
        try {
            $sql = "select *, sum(payrollList.payroll_list_gross) as salWages ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->payrollList_start - 1,
                "total" => $this->payrollList_total,
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search  
    public function searchById()
    {
        try {
            $sql = "select *, sum(payrollList.payroll_list_gross) as salWages ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "and payroll_list_employee_name like :search ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->payrollList_search}%",
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by payslip by id
    public function readPayslipById()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_aid = :payroll_list_aid ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_aid" => $this->payroll_list_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by payslip by id and employee id in HRIS
    public function readHrisPayslipByEmpId()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_aid = :payroll_list_aid ";
            $sql .= "and payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_aid" => $this->payroll_list_aid,
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by payslip by id
    public function readAllReportSummary($salaryCategoryId)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "order by payroll.payroll_pay_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $salaryCategoryId,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readReportSummaryLimit($salaryCategoryId)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "order by payroll.payroll_pay_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $salaryCategoryId,
                "start" => $this->payrollList_start - 1,
                "total" => $this->payrollList_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by payslip by id
    public function readSummaryBenefitsByEmpId()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_start_date = :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date = :payroll_end_date ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblPayrollList} set ";
            $sql .= "payroll_list_deduction = :payroll_list_deduction, ";
            $sql .= "payroll_list_gross = :payroll_list_gross, ";
            $sql .= "payroll_list_net_pay = :payroll_list_net_pay, ";
            $sql .= "payroll_list_basic_pay = :payroll_list_basic_pay, ";
            $sql .= "payroll_list_overtime_pay = :payroll_list_overtime_pay, ";
            $sql .= "payroll_list_overtime_hrs = :payroll_list_overtime_hrs, ";
            $sql .= "payroll_list_leave_pay = :payroll_list_leave_pay, ";
            $sql .= "payroll_list_leave_hrs = :payroll_list_leave_hrs, ";
            $sql .= "payroll_list_holiday = :payroll_list_holiday, ";
            $sql .= "payroll_list_holiday_hrs = :payroll_list_holiday_hrs, ";
            $sql .= "payroll_list_inlfation_adjustment = :payroll_list_inlfation_adjustment, ";
            $sql .= "payroll_list_adjustment_pay = :payroll_list_adjustment_pay, ";
            $sql .= "payroll_list_night_shift_differential = :payroll_list_night_shift_differential, ";
            $sql .= "payroll_list_nd_hrs = :payroll_list_nd_hrs, ";
            $sql .= "payroll_list_hazard_pay = :payroll_list_hazard_pay, ";
            $sql .= "payroll_list_absences = :payroll_list_absences, ";
            $sql .= "payroll_list_absences_hrs = :payroll_list_absences_hrs, ";
            $sql .= "payroll_list_13th_month = :payroll_list_13th_month, ";
            $sql .= "payroll_list_bonus = :payroll_list_bonus, ";
            $sql .= "payroll_list_employee_referral_bonus = :payroll_list_employee_referral_bonus, ";
            $sql .= "payroll_list_bereavement = :payroll_list_bereavement, ";
            $sql .= "payroll_list_separation_pay = :payroll_list_separation_pay, ";
            $sql .= "payroll_list_other_allowances = :payroll_list_other_allowances, ";
            $sql .= "payroll_list_total_benefits = :payroll_list_total_benefits, ";
            $sql .= "payroll_list_sss_er = :payroll_list_sss_er, ";
            $sql .= "payroll_list_philhealth_er = :payroll_list_philhealth_er, ";
            $sql .= "payroll_list_pagibig_er = :payroll_list_pagibig_er, ";
            $sql .= "payroll_list_hmo_er = :payroll_list_hmo_er, ";
            $sql .= "payroll_list_sss_ee = :payroll_list_sss_ee, ";
            $sql .= "payroll_list_philhealth_ee = :payroll_list_philhealth_ee, ";
            $sql .= "payroll_list_pagibig_ee = :payroll_list_pagibig_ee, ";
            $sql .= "payroll_list_hmo_ee = :payroll_list_hmo_ee, ";
            $sql .= "payroll_list_sss_loan = :payroll_list_sss_loan, ";
            $sql .= "payroll_list_pagibig_loan = :payroll_list_pagibig_loan, ";
            $sql .= "payroll_list_pagibig_mp2 = :payroll_list_pagibig_mp2, ";
            $sql .= "payroll_list_fwc_tithes = :payroll_list_fwc_tithes, ";
            $sql .= "payroll_list_fca_tuition = :payroll_list_fca_tuition, ";
            $sql .= "payroll_list_other_deduction = :payroll_list_other_deduction, ";
            $sql .= "payroll_list_madatory_ee = :payroll_list_madatory_ee, ";
            $sql .= "payroll_list_tax = :payroll_list_tax, ";
            $sql .= "payroll_list_undertime = :payroll_list_undertime, ";
            $sql .= "payroll_list_datetime = :payroll_list_datetime ";
            $sql .= "where payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll_list_employee_id = :payroll_list_employee_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_list_deduction" => $this->payroll_list_deduction,
                "payroll_list_gross" => $this->payroll_list_gross,
                "payroll_list_net_pay" => $this->payroll_list_net_pay,
                "payroll_list_basic_pay" => $this->payroll_list_basic_pay,
                "payroll_list_overtime_pay" => $this->payroll_list_overtime_pay,
                "payroll_list_overtime_hrs" => $this->payroll_list_overtime_hrs,
                "payroll_list_leave_pay" => $this->payroll_list_leave_pay,
                "payroll_list_leave_hrs" => $this->payroll_list_leave_hrs,
                "payroll_list_holiday" => $this->payroll_list_holiday,
                "payroll_list_holiday_hrs" => $this->payroll_list_holiday_hrs,
                "payroll_list_inlfation_adjustment" => $this->payroll_list_inlfation_adjustment,
                "payroll_list_adjustment_pay" => $this->payroll_list_adjustment_pay,
                "payroll_list_night_shift_differential" => $this->payroll_list_night_shift_differential,
                "payroll_list_nd_hrs" => $this->payroll_list_nd_hrs,
                "payroll_list_hazard_pay" => $this->payroll_list_hazard_pay,
                "payroll_list_absences" => $this->payroll_list_absences,
                "payroll_list_absences_hrs" => $this->payroll_list_absences_hrs,
                "payroll_list_13th_month" => $this->payroll_list_13th_month,
                "payroll_list_bonus" => $this->payroll_list_bonus,
                "payroll_list_employee_referral_bonus" => $this->payroll_list_employee_referral_bonus,
                "payroll_list_bereavement" => $this->payroll_list_bereavement,
                "payroll_list_separation_pay" => $this->payroll_list_separation_pay,
                "payroll_list_other_allowances" => $this->payroll_list_other_allowances,
                "payroll_list_total_benefits" => $this->payroll_list_total_benefits,
                "payroll_list_sss_er" => $this->payroll_list_sss_er,
                "payroll_list_philhealth_er" => $this->payroll_list_philhealth_er,
                "payroll_list_pagibig_er" => $this->payroll_list_pagibig_er,
                "payroll_list_hmo_er" => $this->payroll_list_hmo_er,
                "payroll_list_sss_ee" => $this->payroll_list_sss_ee,
                "payroll_list_philhealth_ee" => $this->payroll_list_philhealth_ee,
                "payroll_list_pagibig_ee" => $this->payroll_list_pagibig_ee,
                "payroll_list_hmo_ee" => $this->payroll_list_hmo_ee,
                "payroll_list_sss_loan" => $this->payroll_list_sss_loan,
                "payroll_list_pagibig_loan" => $this->payroll_list_pagibig_loan,
                "payroll_list_pagibig_mp2" => $this->payroll_list_pagibig_mp2,
                "payroll_list_fwc_tithes" => $this->payroll_list_fwc_tithes,
                "payroll_list_fca_tuition" => $this->payroll_list_fca_tuition,
                "payroll_list_other_deduction" => $this->payroll_list_other_deduction,
                "payroll_list_madatory_ee" => $this->payroll_list_madatory_ee,
                "payroll_list_tax" => $this->payroll_list_tax,
                "payroll_list_undertime" => $this->payroll_list_undertime,
                "payroll_list_datetime" => $this->payroll_list_datetime,
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create earnings
    public function createEarnings()
    {
        try {
            $sql = "insert into {$this->tblEarnings} ";
            $sql .= "( earnings_employee, ";
            $sql .= "earnings_payroll_id, ";
            $sql .= "earnings_payroll_type_id, ";
            $sql .= "earnings_is_paid, ";
            $sql .= "earnings_num_pay, ";
            $sql .= "earnings_employee_id, ";
            $sql .= "earnings_paytype_id, ";
            $sql .= "earnings_payitem_id, ";
            $sql .= "earnings_amount, ";
            $sql .= "earnings_details, ";
            $sql .= "earnings_frequency, ";
            $sql .= "earnings_is_installment, ";
            $sql .= "earnings_number_of_installment, ";
            $sql .= "earnings_start_pay_date, ";
            $sql .= "earnings_end_pay_date, ";
            $sql .= "earnings_hris_date, ";
            $sql .= "earnings_rate, ";
            $sql .= "earnings_hrs, ";
            $sql .= "earnings_installment_extra, ";
            $sql .= "earnings_created, ";
            $sql .= "earnings_datetime ) values ( ";
            $sql .= ":earnings_employee, ";
            $sql .= ":earnings_payroll_id, ";
            $sql .= ":earnings_payroll_type_id, ";
            $sql .= ":earnings_is_paid, ";
            $sql .= ":earnings_num_pay, ";
            $sql .= ":earnings_employee_id, ";
            $sql .= ":earnings_paytype_id, ";
            $sql .= ":earnings_payitem_id, ";
            $sql .= ":earnings_amount, ";
            $sql .= ":earnings_details, ";
            $sql .= ":earnings_frequency, ";
            $sql .= ":earnings_is_installment, ";
            $sql .= ":earnings_number_of_installment, ";
            $sql .= ":earnings_start_pay_date, ";
            $sql .= ":earnings_end_pay_date, ";
            $sql .= ":earnings_hris_date, ";
            $sql .= ":earnings_rate, ";
            $sql .= ":earnings_hrs, ";
            $sql .= ":earnings_installment_extra, ";
            $sql .= ":earnings_created, ";
            $sql .= ":earnings_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee" => $this->payroll_list_employee_name,
                "earnings_payroll_id" => $this->payroll_list_payroll_id,
                "earnings_payroll_type_id" => $this->payroll_type_id,
                "earnings_is_paid" => $this->num_pay,
                "earnings_num_pay" => $this->num_pay,
                "earnings_employee_id" => $this->payroll_list_employee_id,
                "earnings_paytype_id" => $this->paytype_id,
                "earnings_payitem_id" => $this->payitem_id,
                "earnings_amount" => $this->amount,
                "earnings_details" => $this->details,
                "earnings_frequency" => $this->frequency,
                "earnings_is_installment" => $this->is_installment,
                "earnings_number_of_installment" => $this->number_of_installment,
                "earnings_start_pay_date" => $this->start_pay_date,
                "earnings_end_pay_date" => $this->end_pay_date,
                "earnings_hris_date" => $this->hris_date,
                "earnings_rate" => $this->earnings_rate,
                "earnings_hrs" => $this->earnings_hrs,
                "earnings_installment_extra" => $this->installment_extra,
                "earnings_created" => $this->created,
                "earnings_datetime" => $this->payroll_list_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update payroll to paid
    public function isPaidPayroll()
    {
        try {
            $sql = "update {$this->tblPayroll} set ";
            $sql .= "payroll_is_paid = :payroll_is_paid, ";
            $sql .= "payroll_datetime = :payroll_datetime ";
            $sql .= "where payroll_id = :payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_is_paid" => $this->payroll_list_is_paid,
                "payroll_datetime" => $this->payroll_list_datetime,
                "payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update payroll to payroll list to paid
    public function isPaidPayrollList()
    {
        try {
            $sql = "update {$this->tblPayrollList} set ";
            $sql .= "payroll_list_is_paid = :payroll_list_is_paid, ";
            $sql .= "payroll_list_datetime = :payroll_list_datetime ";
            $sql .= "where payroll_list_payroll_id = :payroll_list_payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_is_paid" => $this->payroll_list_is_paid,
                "payroll_list_datetime" => $this->payroll_list_datetime,
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Deduction
    public function updateIsPaidDeduction()
    {
        try {
            $sql = "update {$this->tblDeductions} set ";
            $sql .= "deduction_num_pay = :deduction_num_pay, ";
            $sql .= "deduction_is_paid = :deduction_is_paid, ";
            $sql .= "deduction_datetime = :deduction_datetime ";
            $sql .= "where deduction_employee_id = :deduction_employee_id ";
            $sql .= "and deduction_payitem_id = :deduction_payitem_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_employee_id" => $this->payroll_list_employee_id,
                "deduction_payitem_id" => $this->payitem_id,
                "deduction_num_pay" => $this->num_pay,
                "deduction_is_paid" => $this->payroll_list_is_paid,
                "deduction_datetime" => $this->payroll_list_datetime,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Earnings  
    public function updateIsPaidEarnings()
    {
        try {
            $sql = "update {$this->tblEarnings} set ";
            $sql .= "earnings_num_pay = :earnings_num_pay, ";
            $sql .= "earnings_is_paid = :earnings_is_paid, ";
            $sql .= "earnings_datetime = :earnings_datetime ";
            $sql .= "where earnings_employee_id = :earnings_employee_id ";
            $sql .= "and earnings_payitem_id = :earnings_payitem_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee_id" => $this->payroll_list_employee_id,
                "earnings_payitem_id" => $this->payitem_id,
                "earnings_num_pay" => $this->num_pay,
                "earnings_is_paid" => $this->payroll_list_is_paid,
                "earnings_datetime" => $this->payroll_list_datetime,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Amount
    public function updateAmount()
    {
        try {
            $sql = "update {$this->tblPayrollList} set ";
            $sql .= "payroll_list_sss_er = :payroll_list_sss_er, ";
            $sql .= "payroll_list_sss_ee = :payroll_list_sss_ee, ";
            $sql .= "payroll_list_pagibig_er = :payroll_list_pagibig_er, ";
            $sql .= "payroll_list_pagibig_ee = :payroll_list_pagibig_ee, ";
            $sql .= "payroll_list_philhealth_er = :payroll_list_philhealth_er, ";
            $sql .= "payroll_list_philhealth_ee = :payroll_list_philhealth_ee, ";
            $sql .= "payroll_list_madatory_ee = :payroll_list_madatory_ee, ";
            $sql .= "payroll_list_sss_loan = :payroll_list_sss_loan, ";
            $sql .= "payroll_list_pagibig_loan = :payroll_list_pagibig_loan, ";
            $sql .= "payroll_list_pagibig_mp2 = :payroll_list_pagibig_mp2, ";
            $sql .= "payroll_list_fca_tuition = :payroll_list_fca_tuition, ";
            $sql .= "payroll_list_fwc_tithes = :payroll_list_fwc_tithes, ";
            $sql .= "payroll_list_other_deduction = :payroll_list_other_deduction, ";
            $sql .= "payroll_list_tax = :payroll_list_tax, ";
            $sql .= "payroll_list_basic_pay = :payroll_list_basic_pay, ";
            $sql .= "payroll_list_gross = :payroll_list_gross, ";
            $sql .= "payroll_list_deduction = :payroll_list_deduction, ";
            $sql .= "payroll_list_net_pay = :payroll_list_net_pay, ";
            $sql .= "payroll_list_datetime = :payroll_list_datetime ";
            $sql .= "where payroll_list_aid = :payroll_list_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_sss_er" => $this->payroll_list_sss_er,
                "payroll_list_sss_ee" => $this->payroll_list_sss_ee,
                "payroll_list_pagibig_er" => $this->payroll_list_pagibig_er,
                "payroll_list_pagibig_ee" => $this->payroll_list_pagibig_ee,
                "payroll_list_philhealth_er" => $this->payroll_list_philhealth_er,
                "payroll_list_philhealth_ee" => $this->payroll_list_philhealth_ee,
                "payroll_list_madatory_ee" => $this->payroll_list_madatory_ee,
                "payroll_list_sss_loan" => $this->payroll_list_sss_loan,
                "payroll_list_pagibig_loan" => $this->payroll_list_pagibig_loan,
                "payroll_list_pagibig_mp2" => $this->payroll_list_pagibig_mp2,
                "payroll_list_fca_tuition" => $this->payroll_list_fca_tuition,
                "payroll_list_fwc_tithes" => $this->payroll_list_fwc_tithes,
                "payroll_list_other_deduction" => $this->payroll_list_other_deduction,
                "payroll_list_tax" => $this->payroll_list_tax,
                "payroll_list_basic_pay" => $this->payroll_list_basic_pay,
                "payroll_list_gross" => $this->payroll_list_gross,
                "payroll_list_deduction" => $this->payroll_list_deduction,
                "payroll_list_net_pay" => $this->payroll_list_net_pay,
                "payroll_list_datetime" => $this->payroll_list_datetime,
                "payroll_list_aid" => $this->payroll_list_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // create Deduction
    public function createDeductions()
    {
        try {
            $sql = "insert into {$this->tblDeductions} ";
            $sql .= "( deduction_employee, ";
            $sql .= "deduction_payroll_id, ";
            $sql .= "deduction_payroll_type_id, ";
            $sql .= "deduction_num_pay, ";
            $sql .= "deduction_is_paid, ";
            $sql .= "deduction_employee_id, ";
            $sql .= "deduction_paytype_id, ";
            $sql .= "deduction_payitem_id, ";
            $sql .= "deduction_amount, ";
            $sql .= "deduction_details, ";
            $sql .= "deduction_frequency, ";
            $sql .= "deduction_is_installment, ";
            $sql .= "deduction_installment_extra, ";
            $sql .= "deduction_number_of_installment, ";
            $sql .= "deduction_start_pay_date, ";
            $sql .= "deduction_end_pay_date, ";
            $sql .= "deduction_created, ";
            $sql .= "deduction_datetime ) values ( ";
            $sql .= ":deduction_employee, ";
            $sql .= ":deduction_payroll_id, ";
            $sql .= ":deduction_payroll_type_id, ";
            $sql .= ":deduction_num_pay, ";
            $sql .= ":deduction_is_paid, ";
            $sql .= ":deduction_employee_id, ";
            $sql .= ":deduction_paytype_id, ";
            $sql .= ":deduction_payitem_id, ";
            $sql .= ":deduction_amount, ";
            $sql .= ":deduction_details, ";
            $sql .= ":deduction_frequency, ";
            $sql .= ":deduction_is_installment, ";
            $sql .= ":deduction_installment_extra, ";
            $sql .= ":deduction_number_of_installment, ";
            $sql .= ":deduction_start_pay_date, ";
            $sql .= ":deduction_end_pay_date, ";
            $sql .= ":deduction_created, ";
            $sql .= ":deduction_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_employee" => $this->payroll_list_employee_name,
                "deduction_payroll_id" => $this->payroll_list_payroll_id,
                "deduction_payroll_type_id" => $this->payroll_type_id,
                "deduction_is_paid" => $this->num_pay,
                "deduction_num_pay" => $this->num_pay,
                "deduction_employee_id" => $this->payroll_list_employee_id,
                "deduction_paytype_id" => $this->deduction_paytype_id,
                "deduction_payitem_id" => $this->deduction_payitem_id,
                "deduction_amount" => $this->deduction_amount,
                "deduction_details" => $this->deduction_details,
                "deduction_frequency" => $this->frequency,
                "deduction_is_installment" => $this->is_installment,
                "deduction_installment_extra" => $this->installment_extra,
                "deduction_number_of_installment" => $this->number_of_installment,
                "deduction_start_pay_date" => $this->start_pay_date,
                "deduction_end_pay_date" => $this->end_pay_date,
                "deduction_created" => $this->created,
                "deduction_datetime" => $this->payroll_list_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }





    // read earnings exist
    public function checkEarningsExist()
    {
        try {
            $sql = "select * from {$this->tblEarnings} ";
            $sql .= "where earnings_employee_id = :earnings_employee_id ";
            $sql .= "and earnings_payitem_id = :earnings_payitem_id ";
            $sql .= "and earnings_payroll_id = :earnings_payroll_id ";
            $sql .= "and earnings_hris_date = :earnings_hris_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee_id" => "{$this->payroll_list_employee_id}",
                "earnings_payitem_id" => "{$this->payitem_id}",
                "earnings_payroll_id" => "{$this->payroll_list_payroll_id}",
                "earnings_hris_date" => "{$this->hris_date}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }



    // delete Earnings
    public function deleteEarnings()
    {
        try {
            $sql = "delete from {$this->tblEarnings} ";
            $sql .= "where earnings_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and earnings_payitem_id = :payitem_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
                "payitem_id" => $this->payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete Deductions
    public function deleteDeductions()
    {
        try {
            $sql = "delete from {$this->tblDeductions} ";
            $sql .= "where deduction_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and deduction_payitem_id = :payitem_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
                "payitem_id" => $this->payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete Deductions by employee id
    public function deleteNotInstallmentDeductionsByEmpId()
    {
        try {
            $sql = "delete from {$this->tblDeductions} ";
            $sql .= "where deduction_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and deduction_payitem_id = :payitem_id ";
            $sql .= "and deduction_employee_id = :deduction_employee_id ";
            $sql .= "and deduction_is_installment != '2' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
                "payitem_id" => $this->deduction_payitem_id,
                "deduction_employee_id" => $this->payroll_list_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete Deductions
    public function deleteNotInstallmentDeductions()
    {
        try {
            $sql = "delete from {$this->tblDeductions} ";
            $sql .= "where deduction_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and deduction_payitem_id = :payitem_id ";
            $sql .= "and deduction_is_installment != '2' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
                "payitem_id" => $this->deduction_payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete Earnings not installment
    public function deleteNotInstallmentEarnings()
    {
        try {
            $sql = "delete from {$this->tblEarnings} ";
            $sql .= "where earnings_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and earnings_payitem_id = :payitem_id ";
            $sql .= "and earnings_is_installment != '2' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
                "payitem_id" => $this->payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete Earnings not installment by employee id
    public function deleteNotInstallmentEarningsByEmpId()
    {
        try {
            $sql = "delete from {$this->tblEarnings} ";
            $sql .= "where earnings_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and earnings_payitem_id = :payitem_id ";
            $sql .= "and earnings_employee_id = :earnings_employee_id ";
            $sql .= "and earnings_is_installment != '2' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
                "earnings_employee_id" => $this->payroll_list_employee_id,
                "payitem_id" => $this->payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // Report default value Benefits 
    public function readReportBenefitsBenefits()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "SUM(payrollList.payroll_list_sss_ee) as sss_ee, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_ee) as pagibig_ee, ";
            $sql .= "SUM(payrollList.payroll_list_philhealth_ee) as philhealth_ee, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_loan) as pagibig_loan, ";
            $sql .= "SUM(payrollList.payroll_list_sss_loan) as sss_loan, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_mp2) as pagibig_mp2, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Report Benefits Filter
    public function readReportBenefitsByDate()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "SUM(payrollList.payroll_list_sss_ee) as sss_ee, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_ee) as pagibig_ee, ";
            $sql .= "SUM(payrollList.payroll_list_philhealth_ee) as philhealth_ee, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_loan) as pagibig_loan, ";
            $sql .= "SUM(payrollList.payroll_list_sss_loan) as sss_loan, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_mp2) as pagibig_mp2, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // Report Benefits by employee id Filter
    public function readReportBenefitsByEmpId()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "SUM(payrollList.payroll_list_sss_ee) as sss_ee, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_ee) as pagibig_ee, ";
            $sql .= "SUM(payrollList.payroll_list_philhealth_ee) as philhealth_ee, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_loan) as pagibig_loan, ";
            $sql .= "SUM(payrollList.payroll_list_sss_loan) as sss_loan, ";
            $sql .= "SUM(payrollList.payroll_list_pagibig_mp2) as pagibig_mp2, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Monthly WTAX filter all employee by date
    // REPORT Monthly WTAX filter all employee by date
    public function readReportMonthlyWtaxAllEmployeeByDate()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "sum(payrollList.payroll_list_gross) as gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as month13, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as benefits, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and MONTHNAME(payroll.payroll_pay_date) = :month_name ";
            $sql .= "and YEAR(payroll.payroll_pay_date) = :year ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_pay_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month_name" => $this->date_from,
                "year" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Summary WTAX filter 
    // REPORT Summary WTAX filter
    public function readReportSummaryWtax()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "sum(payrollList.payroll_list_gross) as gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as month13, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as benefits, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and MONTH(payroll.payroll_pay_date) = :month ";
            $sql .= "and YEAR(payroll.payroll_pay_date) = :year ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->date_from,
                "year" => $this->current_year,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Monthly WTAX filter by employee id by date 
    // REPORT Monthly WTAX filter by employee id by date
    public function readReportMonthlyWtaxByEmployeeIdByEmpId()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "sum(payrollList.payroll_list_gross) as gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as month13, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as benefits, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and MONTHNAME(payroll.payroll_pay_date) = :month ";
            $sql .= "and YEAR(payroll.payroll_pay_date) = :year ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "month" => $this->date_from,
                "year" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Yearly WTAX filter all employee by date
    // REPORT Yearly WTAX filter all employee by date
    public function readReportYearlyWtaxAllEmployeeByDate()
    {
        try {
            $sql = "select ";
            $sql .= "sum(payrollList.payroll_list_gross) as gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as month13, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as benefits, ";
            $sql .= "payrollList.payroll_list_tax, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "sum(payrollList.payroll_list_tax) as totalTax, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and YEAR(payroll.payroll_pay_date) = :payroll_pay_date ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_pay_date" => $this->date_from,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Yearly WTAX filter by employee id by date
    // REPORT Yearly WTAX filter by employee id by date
    public function readReportYearlyWtaxByEmployeeIdByEmpId()
    {
        try {
            $sql = "select ";
            $sql .= "sum(payrollList.payroll_list_gross) as gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as month13, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as benefits, ";
            $sql .= "payrollList.payroll_list_tax, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "sum(payrollList.payroll_list_tax) as totalTax, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and YEAR(payroll.payroll_pay_date) = :payroll_pay_date ";
            $sql .= "group by YEAR(payroll.payroll_pay_date) ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_pay_date" => $this->date_from,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Employee Payrun filter all employee by date
    // REPORT Employee Payrun filter all employee by date
    public function readEmployeePayrunAllEmployeeByDate()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_start_date = :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date = :payroll_end_date ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
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
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_start_date = :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date = :payroll_end_date ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by payslip by id
    public function readAllPayrollListCompute13thMonth($year, $payroll_category_type)
    {
        try {
            $sql = "select ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as total_benefits, ";
            $sql .= "sum(payrollList.payroll_list_gross) as total_gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_net_pay) as total_net, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_employee_salary, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where YEAR(payroll.payroll_pay_date) = :year ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "group by payrollList.payroll_list_employee_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $year,
                "payroll_category_type" => $payroll_category_type,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by payslip by id
    public function readCategoryBonusIsEmpty($categoryBunosId)
    {
        try {
            $sql = "select payroll.payroll_category_type ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblEarnings} as earnings ";
            $sql .= "where payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and earnings.earnings_payroll_type_id = :earnings_payroll_type_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and earnings.earnings_payroll_id = payroll.payroll_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $categoryBunosId,
                "earnings_payroll_type_id" => $categoryBunosId,
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // HRIS read all payslip by employee id
    public function readPayslipEmpId()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "category.payroll_type_name, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblPayrollType} as category ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payrollList.payroll_list_is_paid = 1 ";
            $sql .= "and category.payroll_type_aid = payroll.payroll_category_type ";
            $sql .= "order by payroll.payroll_start_date desc, ";
            $sql .= "payrollList.payroll_list_payroll_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // HRIS read all payslip by employee id limit
    public function readPayslipEmpIdLimit()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "category.payroll_type_name, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblPayrollType} as category ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payrollList.payroll_list_is_paid = 1 ";
            $sql .= "and category.payroll_type_aid = payroll.payroll_category_type ";
            $sql .= "order by payroll.payroll_start_date desc, ";
            $sql .= "payrollList.payroll_list_payroll_id desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "start" => $this->payrollList_start - 1,
                "total" => $this->payrollList_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //HRIS Filter Read all payroll type by employee id
    public function readHrisPayslipFilterAllPayrollTypeByEmpId()
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "category.payroll_type_name, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblPayrollType} as category ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payrollList.payroll_list_is_paid = 1 ";
            $sql .= "and category.payroll_type_aid = payroll.payroll_category_type ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "order by payrollList.payroll_list_payroll_id desc, ";
            $sql .= "payroll.payroll_end_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //HRIS Filter Read Salary id by employee id
    public function readHrisPayslipFilterSalaryIdByEmpId($payrollType)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "category.payroll_type_name, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblPayrollType} as category ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll.payroll_start_date = :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date = :payroll_end_date ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payrollList.payroll_list_is_paid = 1 ";
            $sql .= "and category.payroll_type_aid = payroll.payroll_category_type ";
            $sql .= "order by payrollList.payroll_list_payroll_id desc, ";
            $sql .= "payroll.payroll_end_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_category_type" => $payrollType,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //HRIS Filter Read 13th month id by employee id
    public function readHrisPayslipFilter13thMothIdByEmpId($payrollType)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "category.payroll_type_name, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblPayrollType} as category ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and YEAR(payroll.payroll_pay_date) between ";
            $sql .= ":year_from and :year_to ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payrollList.payroll_list_is_paid = 1 ";
            $sql .= "and category.payroll_type_aid = payroll.payroll_category_type ";
            $sql .= "order by payrollList.payroll_list_payroll_id desc, ";
            $sql .= "payroll.payroll_end_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_category_type" => $payrollType,
                "year_from" => $this->date_from,
                "year_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //HRIS Filter Read Bonus id by employee id
    public function readHrisPayslipFilterBonusIdByEmpId($payrollType)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "category.payroll_type_name, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll, ";
            $sql .= "{$this->tblPayrollType} as category ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payrollList.payroll_list_is_paid = 1 ";
            $sql .= "and category.payroll_type_aid = payroll.payroll_category_type ";
            $sql .= "order by payrollList.payroll_list_payroll_id desc, ";
            $sql .= "payroll.payroll_end_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_category_type" => $payrollType,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all basic pay
    public function readReportFilterBasicPay()
    {
        try {
            $sql = "select sum(payrollList.payroll_list_basic_pay) as totalBasicSalary, ";
            $sql .= "payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "count(payrollList.payroll_list_employee_id) as empCount ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "group by payrollList.payroll_list_payroll_id ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // Report Read all basic pay
    public function readByReportBasicPay()
    {
        try {
            $sql = "select ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_basic_pay, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Report Read all limit basic pay
    public function readByReportBasicPayLimit()
    {
        try {
            $sql = "select ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_basic_pay, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->payrollList_start - 1,
                "total" => $this->payrollList_total,
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Delete all don't have bonus in payroll list
    public function deleteDontHaveBonusPayrollList()
    {
        try {
            $sql = "delete ";
            $sql .= "from {$this->tblPayrollList} ";
            $sql .= "where payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll_list_bonus = '' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => "{$this->payroll_list_payroll_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update Payroll Total Amount
    public function updatePayrollTotalAmount($payrollTotalAmount)
    {
        try {
            $sql = "update {$this->tblPayroll} set ";
            $sql .= "payroll_total_amount = :payroll_total_amount, ";
            $sql .= "payroll_datetime = :payroll_datetime ";
            $sql .= "where payroll_id = :payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_total_amount" => $payrollTotalAmount,
                "payroll_datetime" => $this->payroll_list_datetime,
                "payroll_id" => $this->payroll_list_payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readAllSalaryCategory($payroll_category_type)
    {
        try {
            $sql = "select payroll.payroll_id, ";
            $sql .= "payroll.payroll_pay_date, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payrollList.payroll_list_employee_id ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "order by payrollList.payroll_list_employee_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $payroll_category_type,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // REPORT Monthly WTAX gross filter all employee by date
    // REPORT Monthly WTAX gross filter all employee by date
    public function readReportMonthlyWtaxGrossAllEmployeeByYear()
    {
        try {
            $sql = "select ";
            $sql .= "sum(payrollList.payroll_list_gross) as gross, ";
            $sql .= "sum(payrollList.payroll_list_sss_ee) as sss, ";
            $sql .= "sum(payrollList.payroll_list_philhealth_ee) as phic, ";
            $sql .= "sum(payrollList.payroll_list_pagibig_ee) as pag, ";
            $sql .= "sum(payrollList.payroll_list_deminimis) as deminimis, ";
            $sql .= "sum(payrollList.payroll_list_13th_month) as month13, ";
            $sql .= "sum(payrollList.payroll_list_bonus) as bonus, ";
            $sql .= "sum(payrollList.payroll_list_total_benefits) as benefits, ";
            $sql .= "payrollList.payroll_list_tax, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "sum(payrollList.payroll_list_tax) as totalTax, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and YEAR(payroll.payroll_pay_date) = :payroll_pay_date ";
            $sql .= "group by payrollList.payroll_list_employee_id, ";
            $sql .= "MONTH(payroll.payroll_pay_date) ";
            $sql .= "order by payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_pay_date" => $this->date_from,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // filter Report Summary All Employee By Date
    public function readReportSummaryAllEmployeeByDate($salaryCategoryId)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "order by payroll.payroll_pay_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $salaryCategoryId,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // filter Report Summary By Employee And By Date
    public function readReportSummaryByEmployeeAndByDate($salaryCategoryId)
    {
        try {
            $sql = "select payrollList.*, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_employee_id = :payroll_list_employee_id ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "order by payroll.payroll_pay_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $salaryCategoryId,
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function updateDeductionInstallemnt()
    {
        try {
            $sql = "update {$this->tblEmployeeInstallmet} set ";
            $sql .= "employee_installment_status = :employee_installment_status ";
            $sql .= "where employee_installment_aid = :employee_installment_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_status" => $this->employee_installment_status,
                "employee_installment_aid" => $this->employee_installment_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function updateDeductionInstallmentNumberOfPayrun()
    {
        try {
            $sql = "update {$this->tblEmployeeInstallmet} set ";
            $sql .= "employee_installment_number_of_payrun = :employee_installment_number_of_payrun ";
            $sql .= "where employee_installment_aid = :employee_installment_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_number_of_payrun" => $this->employee_installment_number_of_payrun,
                "employee_installment_aid" => $this->employee_installment_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // filter Report Summary All Employee By Date
    public function readReportBankTemplate()
    {
        try {
            $sql = "select payrollList.payroll_list_aid, ";
            $sql .= "payrollList.payroll_list_payroll_id, ";
            $sql .= "payrollList.payroll_list_employee_account_number, ";
            $sql .= "payrollList.payroll_list_net_pay, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
            $sql .= "payroll.payroll_category_type, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and payroll.payroll_start_date >= :payroll_start_date ";
            $sql .= "and payroll.payroll_end_date <= :payroll_end_date ";
            $sql .= "order by payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_start_date" => $this->date_from,
                "payroll_end_date" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
