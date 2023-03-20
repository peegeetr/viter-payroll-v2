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
    public $payroll_list_leave_pay;
    public $payroll_list_holiday;
    public $payroll_list_inlfation_adjustment;
    public $payroll_list_adjustment_pay;
    public $payroll_list_night_shift_differential;
    public $payroll_list_hazard_pay;
    public $payroll_list_absences;
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
    public $holidays_rate;
    public $created;

    public $deduction_details;
    public $deduction_paytype_id;
    public $deduction_payitem_id;
    public $deduction_amount;


    public $connection;
    public $payrollList_search;
    public $payrollList_start;
    public $payrollList_total;
    public $date_from;
    public $date_to;
    public $lastInsertedId;
    public $tblPayrollList;
    public $tblPayroll;
    public $tblEarnings;
    public $tblDeductions;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblPayroll = "prv2_payroll";
        $this->tblEarnings = "prv2_earnings";
        $this->tblDeductions = "prv2_deduction";
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

    public function readLimit()
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
            // $sql .= "payrollList.payroll_list_employee_id, ";
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
            $sql .= "payroll_list_gross, ";
            $sql .= "payroll_list_deduction, ";
            $sql .= "payroll_list_net_pay, ";
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

    // read by payslip by id
    public function readAllSummary()
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
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readSummaryLimit()
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
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
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

    // read by payslip by id
    public function readSummaryByDate()
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

    // public function readSummaryByDate()
    // {
    //     try {
    //         $sql = "select * from {$this->tblPayrollList} ";
    //         $sql .= "where DATE(payroll_list_created) between ";
    //         $sql .= ":date_from and :date_to ";
    //         $sql .= "order by payroll_list_payroll_id desc, ";
    //         $sql .= "payroll_list_employee_name asc ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "date_from" => $this->date_from,
    //             "date_to" => $this->date_to,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }


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
            $sql .= "payroll_list_leave_pay = :payroll_list_leave_pay, ";
            $sql .= "payroll_list_holiday = :payroll_list_holiday, ";
            $sql .= "payroll_list_inlfation_adjustment = :payroll_list_inlfation_adjustment, ";
            $sql .= "payroll_list_adjustment_pay = :payroll_list_adjustment_pay, ";
            $sql .= "payroll_list_night_shift_differential = :payroll_list_night_shift_differential, ";
            $sql .= "payroll_list_hazard_pay = :payroll_list_hazard_pay, ";
            $sql .= "payroll_list_absences = :payroll_list_absences, ";
            $sql .= "payroll_list_deminimis = :payroll_list_deminimis, ";
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
                "payroll_list_leave_pay" => $this->payroll_list_leave_pay,
                "payroll_list_holiday" => $this->payroll_list_holiday,
                "payroll_list_inlfation_adjustment" => $this->payroll_list_inlfation_adjustment,
                "payroll_list_adjustment_pay" => $this->payroll_list_adjustment_pay,
                "payroll_list_night_shift_differential" => $this->payroll_list_night_shift_differential,
                "payroll_list_hazard_pay" => $this->payroll_list_hazard_pay,
                "payroll_list_absences" => $this->payroll_list_absences,
                "payroll_list_deminimis" => $this->payroll_list_deminimis,
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
            $sql .= "earnings_holidays_rate, ";
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
            $sql .= ":earnings_holidays_rate, ";
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
                "earnings_holidays_rate" => $this->holidays_rate,
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
}
