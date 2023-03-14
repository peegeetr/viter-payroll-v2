<?php
class PayrollList
{
    public $payroll_list_aid;
    public $payroll_list_is_paid;
    public $payroll_list_employee_name;
    public $payroll_list_employee_id;
    public $payroll_list_employee_salary;
    public $payroll_list_payroll_id;
    public $payroll_list_gross;
    public $payroll_list_deduction;
    public $payroll_list_net_pay;
    public $payroll_list_basic_pay;
    public $payroll_list_overtime_pay;
    public $payroll_list_overtime_hrs;
    public $payroll_list_overtime_rate;
    public $payroll_list_leave_pay;
    public $payroll_list_leave_hrs;
    public $payroll_list_leave_rate;
    public $payroll_list_holiday;
    public $payroll_list_holiday_hrs;
    public $payroll_list_holiday_rate;
    public $payroll_list_inlfation_adjustment;
    public $payroll_list_adjustment_pay;
    public $payroll_list_night_shift_differential;
    public $payroll_list_nd_hrs;
    public $payroll_list_nd_rate;
    public $payroll_list_hazard_pay;
    public $payroll_list_absences;
    public $payroll_list_deminimis;
    public $payroll_list_13th_month;
    public $payroll_list_bonus;
    public $payroll_list_employee_referral_bonus;
    public $payroll_list_bereavement;
    public $payroll_list_separation_pay;
    public $payroll_list_other_allowances;
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
    public $payroll_list_tax;
    public $payroll_list_undertime;
    public $payroll_list_datetime;

    // earnings  
    public $earnings_payroll_type_id;
    public $earnings_paytype_id;
    public $earnings_payitem_id;
    public $earnings_amount;
    public $earnings_details;
    public $earnings_frequency;
    public $earnings_is_installment;
    public $earnings_number_of_installment;
    public $earnings_start_pay_date;
    public $earnings_end_pay_date;
    public $earnings_hris_date;
    public $earnings_created;

    // earnings  

    public $connection;
    public $payrollList_search;
    public $payrollList_start;
    public $payrollList_total;
    public $lastInsertedId;
    public $tblPayrollList;
    public $tblPayroll;
    public $tblEarnings;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblPayroll = "prv2_payroll";
        $this->tblEarnings = "prv2_earnings";
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

    // read by id
    public function readById()
    {
        try {
            $sql = "select payrollList.payroll_list_payroll_id, ";
            $sql .= "payrollList.payroll_list_aid, ";
            $sql .= "payrollList.payroll_list_is_paid, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_employee_salary, ";
            $sql .= "payrollList.payroll_list_night_diff_per_day, ";
            $sql .= "payrollList.payroll_list_employee_work_on_holiday, ";
            $sql .= "payrollList.payroll_list_pagibig_additional, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
            $sql .= "payroll.payroll_category_type, ";
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

    public function readLimit()
    {
        try {
            $sql = "select payrollList.payroll_list_payroll_id, ";
            $sql .= "payrollList.payroll_list_aid, ";
            $sql .= "payrollList.payroll_list_is_paid, ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_employee_salary, ";
            $sql .= "payrollList.payroll_list_night_diff_per_day, ";
            $sql .= "payrollList.payroll_list_employee_id, ";
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

    // search  
    public function search()
    {
        try {
            $sql = "select payroll_list_payroll_id, ";
            $sql .= "payroll_list_employee_name, ";
            $sql .= "payroll_list_employee_id, ";
            $sql .= "payroll_list_is_paid, ";
            $sql .= "payroll_list_aid ";
            $sql .= "from {$this->tblPayrollList} ";
            $sql .= "where payroll_list_payroll_id = :payroll_list_payroll_id ";
            $sql .= "and payroll_list_employee_name like :search ";
            $sql .= "order by payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->payrollList_search}%",
                "payroll_list_payroll_id" => $this->payroll_list_payroll_id,
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
            $sql .= "payroll_list_overtime_rate = :payroll_list_overtime_rate, ";
            $sql .= "payroll_list_leave_pay = :payroll_list_leave_pay, ";
            $sql .= "payroll_list_leave_hrs = :payroll_list_leave_hrs, ";
            $sql .= "payroll_list_leave_rate = :payroll_list_leave_rate, ";
            $sql .= "payroll_list_holiday = :payroll_list_holiday, ";
            $sql .= "payroll_list_holiday_hrs = :payroll_list_holiday_hrs, ";
            $sql .= "payroll_list_holiday_rate = :payroll_list_holiday_rate, ";
            $sql .= "payroll_list_inlfation_adjustment = :payroll_list_inlfation_adjustment, ";
            $sql .= "payroll_list_adjustment_pay = :payroll_list_adjustment_pay, ";
            $sql .= "payroll_list_night_shift_differential = :payroll_list_night_shift_differential, ";
            $sql .= "payroll_list_nd_hrs = :payroll_list_nd_hrs, ";
            $sql .= "payroll_list_nd_rate = :payroll_list_nd_rate, ";
            $sql .= "payroll_list_hazard_pay = :payroll_list_hazard_pay, ";
            $sql .= "payroll_list_absences = :payroll_list_absences, ";
            $sql .= "payroll_list_deminimis = :payroll_list_deminimis, ";
            $sql .= "payroll_list_13th_month = :payroll_list_13th_month, ";
            $sql .= "payroll_list_bonus = :payroll_list_bonus, ";
            $sql .= "payroll_list_employee_referral_bonus = :payroll_list_employee_referral_bonus, ";
            $sql .= "payroll_list_bereavement = :payroll_list_bereavement, ";
            $sql .= "payroll_list_separation_pay = :payroll_list_separation_pay, ";
            $sql .= "payroll_list_other_allowances = :payroll_list_other_allowances, ";
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
                "payroll_list_overtime_rate" => $this->payroll_list_overtime_rate,
                "payroll_list_leave_pay" => $this->payroll_list_leave_pay,
                "payroll_list_leave_hrs" => $this->payroll_list_leave_hrs,
                "payroll_list_leave_rate" => $this->payroll_list_leave_rate,
                "payroll_list_holiday" => $this->payroll_list_holiday,
                "payroll_list_holiday_hrs" => $this->payroll_list_holiday_hrs,
                "payroll_list_holiday_rate" => $this->payroll_list_holiday_rate,
                "payroll_list_inlfation_adjustment" => $this->payroll_list_inlfation_adjustment,
                "payroll_list_adjustment_pay" => $this->payroll_list_adjustment_pay,
                "payroll_list_night_shift_differential" => $this->payroll_list_night_shift_differential,
                "payroll_list_nd_hrs" => $this->payroll_list_nd_hrs,
                "payroll_list_nd_rate" => $this->payroll_list_nd_rate,
                "payroll_list_hazard_pay" => $this->payroll_list_hazard_pay,
                "payroll_list_absences" => $this->payroll_list_absences,
                "payroll_list_deminimis" => $this->payroll_list_deminimis,
                "payroll_list_13th_month" => $this->payroll_list_13th_month,
                "payroll_list_bonus" => $this->payroll_list_bonus,
                "payroll_list_employee_referral_bonus" => $this->payroll_list_employee_referral_bonus,
                "payroll_list_bereavement" => $this->payroll_list_bereavement,
                "payroll_list_separation_pay" => $this->payroll_list_separation_pay,
                "payroll_list_other_allowances" => $this->payroll_list_other_allowances,
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
            $sql .= "earnings_employee_id, ";
            $sql .= "earnings_paytype_id, ";
            $sql .= "earnings_payitem_id, ";
            $sql .= "earnings_is_paid, ";
            $sql .= "earnings_amount, ";
            $sql .= "earnings_details, ";
            $sql .= "earnings_frequency, ";
            $sql .= "earnings_is_installment, ";
            $sql .= "earnings_number_of_installment, ";
            $sql .= "earnings_start_pay_date, ";
            $sql .= "earnings_end_pay_date, ";
            $sql .= "earnings_hris_date, ";
            $sql .= "earnings_created, ";
            $sql .= "earnings_datetime ) values ( ";
            $sql .= ":earnings_employee, ";
            $sql .= ":earnings_payroll_id, ";
            $sql .= ":earnings_payroll_type_id, ";
            $sql .= ":earnings_employee_id, ";
            $sql .= ":earnings_paytype_id, ";
            $sql .= ":earnings_payitem_id, ";
            $sql .= ":earnings_is_paid, ";
            $sql .= ":earnings_amount, ";
            $sql .= ":earnings_details, ";
            $sql .= ":earnings_frequency, ";
            $sql .= ":earnings_is_installment, ";
            $sql .= ":earnings_number_of_installment, ";
            $sql .= ":earnings_start_pay_date, ";
            $sql .= ":earnings_end_pay_date, ";
            $sql .= ":earnings_hris_date, ";
            $sql .= ":earnings_created, ";
            $sql .= ":earnings_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee" => $this->payroll_list_employee_name,
                "earnings_payroll_id" => $this->payroll_list_payroll_id,
                "earnings_payroll_type_id" => $this->earnings_payroll_type_id,
                "earnings_employee_id" => $this->payroll_list_employee_id,
                "earnings_paytype_id" => $this->earnings_paytype_id,
                "earnings_payitem_id" => $this->earnings_payitem_id,
                "earnings_amount" => $this->earnings_amount,
                "earnings_details" => $this->earnings_details,
                "earnings_frequency" => $this->earnings_frequency,
                "earnings_is_installment" => $this->earnings_is_installment,
                "earnings_number_of_installment" => $this->earnings_number_of_installment,
                "earnings_start_pay_date" => $this->earnings_start_pay_date,
                "earnings_end_pay_date" => $this->earnings_end_pay_date,
                "earnings_hris_date" => $this->earnings_hris_date,
                "earnings_created" => $this->earnings_created,
                "earnings_datetime" => $this->payroll_list_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
