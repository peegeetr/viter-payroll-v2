<?php
class PayrollView
{
    public $payroll_list_aid;
    public $payroll_list_employee_name;
    public $payroll_list_employee_id;
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
    public $payroll_list_employee_referral_bunos;
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
    public $payroll_list_datetime;

    public $payroll_aid;

    public $connection;
    public $payrollView_search;
    public $payrollView_start;
    public $payrollView_total;
    public $lastInsertedId;
    public $tblPayrollList;
    public $tblPayroll;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblPayroll = "prv2_payroll";
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
            $sql = "select * from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payroll.payroll_aid = :payroll_aid ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "order by payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_aid" => $this->payroll_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payroll.payroll_aid = :payroll_aid ";
            $sql .= "and payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "order by payroll_list_employee_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->payrollView_start - 1,
                "total" => $this->payrollView_total,
                "payroll_aid" => $this->payroll_aid,
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
            $sql = "select * from {$this->tblPayrollList} ";
            $sql .= "where payroll_list_employee_name like :search ";
            $sql .= "order by payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->payrollView_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
