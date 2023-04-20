<?php
class Payroll
{
    public $payroll_aid;
    public $payroll_id;
    public $payroll_is_paid;
    public $payroll_start_date;
    public $payroll_end_date;
    public $payroll_pay_date;
    public $payroll_category_type;
    public $payroll_created;
    public $payroll_datetime;

    public $payroll_list_aid;
    public $payroll_list_employee_name;
    public $payroll_list_employee_email;
    public $payroll_list_employee_id;
    public $payroll_list_employee_salary;
    public $payroll_list_night_diff_per_day;
    public $payroll_list_deminimis;
    public $payroll_list_employee_work_on_holiday;
    public $payroll_list_pagibig_additional;
    public $payroll_list_employee_department;

    public $connection;
    public $lastInsertedId;
    public $payroll_start;
    public $payroll_total;
    public $payroll_search;
    public $tblPayroll;
    public $tblPayrollList;
    public $tblEarnings;
    public $tblDeductions;
    public $tblPayrollType;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayroll = "prv2_payroll";
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblEarnings = "prv2_earnings";
        $this->tblDeductions = "prv2_deduction";
        $this->tblPayrollType = "prv2_settings_payroll_type";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPayroll} ";
            $sql .= "( payroll_id, ";
            $sql .= "payroll_is_paid, ";
            $sql .= "payroll_start_date, ";
            $sql .= "payroll_end_date, ";
            $sql .= "payroll_pay_date, ";
            $sql .= "payroll_category_type, ";
            $sql .= "payroll_created, ";
            $sql .= "payroll_datetime ) values ( ";
            $sql .= ":payroll_id, ";
            $sql .= ":payroll_is_paid, ";
            $sql .= ":payroll_start_date, ";
            $sql .= ":payroll_end_date, ";
            $sql .= ":payroll_pay_date, ";
            $sql .= ":payroll_category_type, ";
            $sql .= ":payroll_created, ";
            $sql .= ":payroll_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_id" => $this->payroll_id,
                "payroll_is_paid" => $this->payroll_is_paid,
                "payroll_start_date" => $this->payroll_start_date,
                "payroll_end_date" => $this->payroll_end_date,
                "payroll_pay_date" => $this->payroll_pay_date,
                "payroll_category_type" => $this->payroll_category_type,
                "payroll_created" => $this->payroll_created,
                "payroll_datetime" => $this->payroll_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create
    public function createPayrollList()
    {
        try {
            $sql = "insert into {$this->tblPayrollList} ";
            $sql .= "( payroll_list_payroll_id, ";
            $sql .= "payroll_list_employee_name, ";
            $sql .= "payroll_list_employee_email, ";
            $sql .= "payroll_list_is_paid, ";
            $sql .= "payroll_list_employee_id, ";
            $sql .= "payroll_list_employee_salary, ";
            $sql .= "payroll_list_night_diff_per_day, ";
            $sql .= "payroll_list_deminimis, ";
            $sql .= "payroll_list_employee_work_on_holiday, ";
            $sql .= "payroll_list_pagibig_additional, ";
            $sql .= "payroll_list_employee_department, ";
            $sql .= "payroll_list_created, ";
            $sql .= "payroll_list_datetime ) values ( ";
            $sql .= ":payroll_list_payroll_id, ";
            $sql .= ":payroll_list_employee_name, ";
            $sql .= ":payroll_list_employee_email, ";
            $sql .= ":payroll_list_is_paid, ";
            $sql .= ":payroll_list_employee_id, ";
            $sql .= ":payroll_list_employee_salary, ";
            $sql .= ":payroll_list_night_diff_per_day, ";
            $sql .= ":payroll_list_deminimis, ";
            $sql .= ":payroll_list_employee_work_on_holiday, ";
            $sql .= ":payroll_list_pagibig_additional, ";
            $sql .= ":payroll_list_employee_department, ";
            $sql .= ":payroll_list_created, ";
            $sql .= ":payroll_list_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_id,
                "payroll_list_is_paid" => $this->payroll_is_paid,
                "payroll_list_employee_name" => $this->payroll_list_employee_name,
                "payroll_list_employee_email" => $this->payroll_list_employee_email,
                "payroll_list_employee_id" => $this->payroll_list_employee_id,
                "payroll_list_employee_salary" => $this->payroll_list_employee_salary,
                "payroll_list_night_diff_per_day" => $this->payroll_list_night_diff_per_day,
                "payroll_list_deminimis" => $this->payroll_list_deminimis,
                "payroll_list_employee_work_on_holiday" => $this->payroll_list_employee_work_on_holiday,
                "payroll_list_employee_department" => $this->payroll_list_employee_department,
                "payroll_list_pagibig_additional" => $this->payroll_list_pagibig_additional,
                "payroll_list_created" => $this->payroll_created,
                "payroll_list_datetime" => $this->payroll_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select *, ";
            $sql .= "COUNT(prlist.payroll_list_employee_id) as count, ";
            $sql .= "sum(prlist.payroll_list_net_pay) as totalNet ";
            $sql .= "from {$this->tblPayroll} as pr, ";
            $sql .= "{$this->tblPayrollList} as prlist, ";
            $sql .= "{$this->tblPayrollType} as prtype ";
            $sql .= "where ";
            $sql .= "pr.payroll_category_type = prtype.payroll_type_aid ";
            $sql .= "and pr.payroll_id = prlist.payroll_list_payroll_id ";
            $sql .= "GROUP BY prlist.payroll_list_payroll_id ";
            $sql .= "order by pr.payroll_is_paid, ";
            $sql .= "pr.payroll_id desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readLimit()
    {
        try {
            $sql = "select *, ";
            $sql .= "COUNT(prlist.payroll_list_employee_id) as count, ";
            $sql .= "sum(prlist.payroll_list_net_pay) as totalNet ";
            $sql .= "from {$this->tblPayroll} as pr, ";
            $sql .= "{$this->tblPayrollList} as prlist, ";
            $sql .= "{$this->tblPayrollType} as prtype ";
            $sql .= "where ";
            $sql .= "pr.payroll_category_type = prtype.payroll_type_aid ";
            $sql .= "and pr.payroll_id = prlist.payroll_list_payroll_id ";
            $sql .= "GROUP BY prlist.payroll_list_payroll_id ";
            $sql .= "order by pr.payroll_is_paid, ";
            $sql .= "pr.payroll_id desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->payroll_start - 1,
                "total" => $this->payroll_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select *, ";
            $sql .= "COUNT(prlist.payroll_list_employee_id) as count, ";
            $sql .= "sum(prlist.payroll_list_net_pay) as totalNet ";
            $sql .= "from {$this->tblPayroll} as pr, ";
            $sql .= "{$this->tblPayrollList} as prlist, ";
            $sql .= "{$this->tblPayrollType} as prtype ";
            $sql .= "where ";
            $sql .= "pr.payroll_category_type = prtype.payroll_type_aid ";
            $sql .= "and pr.payroll_id = prlist.payroll_list_payroll_id ";
            $sql .= "and pr.payroll_id like :search ";
            $sql .= "GROUP BY prlist.payroll_list_payroll_id ";
            $sql .= "order by pr.payroll_is_paid, ";
            $sql .= "pr.payroll_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->payroll_search}%",
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

    // read date and type id
    public function readIsDateExist()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblPayroll} ";
            $sql .= "where payroll_category_type = :payroll_category_type ";
            $sql .= "and payroll_start_date = :payroll_start_date ";
            $sql .= "and payroll_end_date = :payroll_end_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_category_type" => $this->payroll_category_type,
                "payroll_start_date" => $this->payroll_start_date,
                "payroll_end_date" => $this->payroll_end_date,
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
            $sql = "update {$this->tblPayroll} set ";
            $sql .= "payroll_start_date = :payroll_start_date, ";
            $sql .= "payroll_end_date = :payroll_end_date, ";
            $sql .= "payroll_pay_date = :payroll_pay_date, ";
            $sql .= "payroll_category_type = :payroll_category_type, ";
            $sql .= "payroll_datetime = :payroll_datetime ";
            $sql .= "where payroll_aid = :payroll_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_start_date" => $this->payroll_start_date,
                "payroll_end_date" => $this->payroll_end_date,
                "payroll_pay_date" => $this->payroll_pay_date,
                "payroll_category_type" => $this->payroll_category_type,
                "payroll_datetime" => $this->payroll_datetime,
                "payroll_aid" => $this->payroll_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblPayroll} set ";
            $sql .= "payroll_is_paid = :payroll_is_paid, ";
            $sql .= "payroll_datetime = :payroll_datetime ";
            $sql .= "where payroll_aid = :payroll_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_is_paid" => $this->payroll_is_paid,
                "payroll_datetime" => $this->payroll_datetime,
                "payroll_aid" => $this->payroll_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete payroll
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblPayroll} ";
            $sql .= "where payroll_aid = :payroll_aid ";
            $sql .= "and payroll_id = :payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_aid" => $this->payroll_aid,
                "payroll_id" => $this->payroll_id,
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
            $sql .= "where earnings_payroll_id = :payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_id" => $this->payroll_id,
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
            $sql .= "where deduction_payroll_id = :payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_id" => $this->payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete payroll list
    public function deletePayrollList()
    {
        try {
            $sql = "delete from {$this->tblPayrollList} ";
            $sql .= "where payroll_list_payroll_id = :payroll_list_payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_list_payroll_id" => $this->payroll_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkEarningType()
    {
        try {
            $sql = "select * from {$this->tblPayroll} ";
            $sql .= "where payroll_is_paid = :payroll_is_paid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_is_paid" => "{$this->payroll_is_paid}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by draft
    public function readByDraft()
    {
        try {
            $sql = "select payroll_id, ";
            $sql .= "payroll_category_type, ";
            $sql .= "payroll_start_date, ";
            $sql .= "payroll_end_date ";
            $sql .= "from {$this->tblPayroll} ";
            $sql .= "where payroll_is_paid = 0 ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
