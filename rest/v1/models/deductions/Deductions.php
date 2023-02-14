<?php
class Deductions
{
    public $deduction_aid;
    public $deduction_is_paid;
    public $deduction_payroll_id;
    public $deduction_employee;
    public $deduction_employee_id;
    public $deduction_paytype_id;
    public $deduction_payitem_id;
    public $deduction_amount;
    public $deduction_frequency;
    public $deduction_is_installment;
    public $deduction_number_of_installment;
    public $deduction_start_pay_date;
    public $deduction_end_pay_date;
    public $deduction_created;
    public $deduction_datetime;

    public $connection;
    public $lastInsertedId;
    public $deduction_start;
    public $deduction_total;
    public $deduction_search;
    public $tblDeductions;
    public $tblPayType;
    public $tblPayItem;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDeductions = "prv2_deduction";
        $this->tblPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblDeductions} ";
            $sql .= "( deduction_employee, ";
            $sql .= "deduction_payroll_id, ";
            $sql .= "deduction_employee_id, ";
            $sql .= "deduction_paytype_id, ";
            $sql .= "deduction_payitem_id, ";
            $sql .= "deduction_is_paid, ";
            $sql .= "deduction_amount, ";
            $sql .= "deduction_frequency, ";
            $sql .= "deduction_is_installment, ";
            $sql .= "deduction_number_of_installment, ";
            $sql .= "deduction_start_pay_date, ";
            $sql .= "deduction_end_pay_date, ";
            $sql .= "deduction_created, ";
            $sql .= "deduction_datetime ) values ( ";
            $sql .= ":deduction_employee, ";
            $sql .= ":deduction_payroll_id, ";
            $sql .= ":deduction_employee_id, ";
            $sql .= ":deduction_paytype_id, ";
            $sql .= ":deduction_payitem_id, ";
            $sql .= ":deduction_is_paid, ";
            $sql .= ":deduction_amount, ";
            $sql .= ":deduction_frequency, ";
            $sql .= ":deduction_is_installment, ";
            $sql .= ":deduction_number_of_installment, ";
            $sql .= ":deduction_start_pay_date, ";
            $sql .= ":deduction_end_pay_date, ";
            $sql .= ":deduction_created, ";
            $sql .= ":deduction_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_employee" => $this->deduction_employee,
                "deduction_payroll_id" => $this->deduction_payroll_id,
                "deduction_employee_id" => $this->deduction_employee_id,
                "deduction_paytype_id" => $this->deduction_paytype_id,
                "deduction_payitem_id" => $this->deduction_payitem_id,
                "deduction_is_paid" => $this->deduction_is_paid,
                "deduction_amount" => $this->deduction_amount,
                "deduction_frequency" => $this->deduction_frequency,
                "deduction_is_installment" => $this->deduction_is_installment,
                "deduction_number_of_installment" => $this->deduction_number_of_installment,
                "deduction_start_pay_date" => $this->deduction_start_pay_date,
                "deduction_end_pay_date" => $this->deduction_end_pay_date,
                "deduction_created" => $this->deduction_created,
                "deduction_datetime" => $this->deduction_datetime,
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
            $sql = "select deduction.deduction_aid, ";
            $sql .= "deduction.deduction_is_paid, ";
            $sql .= "deduction.deduction_employee, ";
            $sql .= "deduction.deduction_amount, ";
            $sql .= "deduction.deduction_frequency, ";
            $sql .= "deduction.deduction_number_of_installment, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "deduction.deduction_payitem_id, ";
            $sql .= "deduction.deduction_paytype_id, ";
            $sql .= "deduction.deduction_payroll_id, ";
            $sql .= "deduction.deduction_is_installment, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where deduction.deduction_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_payitem_id = payitem.payitem_aid ";
            $sql .= "order by deduction.deduction_payroll_id desc, ";
            $sql .= "DATE(deduction.deduction_end_pay_date) desc, ";
            $sql .= "deduction.deduction_employee asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select deduction.deduction_aid, ";
            $sql .= "deduction.deduction_is_paid, ";
            $sql .= "deduction.deduction_employee, ";
            $sql .= "deduction.deduction_amount, ";
            $sql .= "deduction.deduction_frequency, ";
            $sql .= "deduction.deduction_number_of_installment, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "deduction.deduction_payitem_id, ";
            $sql .= "deduction.deduction_paytype_id, ";
            $sql .= "deduction.deduction_payroll_id, ";
            $sql .= "deduction.deduction_is_installment, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where deduction.deduction_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_payitem_id = payitem.payitem_aid ";
            $sql .= "order by deduction.deduction_payroll_id desc, ";
            $sql .= "DATE(deduction.deduction_end_pay_date) desc, ";
            $sql .= "deduction.deduction_employee asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->deduction_start - 1,
                "total" => $this->deduction_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select deduction.deduction_aid, ";
            $sql .= "deduction.deduction_is_paid, ";
            $sql .= "deduction.deduction_employee, ";
            $sql .= "deduction.deduction_amount, ";
            $sql .= "deduction.deduction_frequency, ";
            $sql .= "deduction.deduction_number_of_installment, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "deduction.deduction_payitem_id, ";
            $sql .= "deduction.deduction_paytype_id, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "deduction.deduction_payroll_id, ";
            $sql .= "payitem.payitem_is_hris, ";
            $sql .= "deduction.deduction_is_installment, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where deduction.deduction_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_payitem_id = payitem.payitem_aid ";
            $sql .= "and deduction.deduction_employee like :search ";
            $sql .= "order by deduction.deduction_is_paid desc, ";
            $sql .= "deduction.deduction_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->deduction_search}%",
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
            $sql = "select deduction.deduction_aid, ";
            $sql .= "deduction.deduction_is_paid, ";
            $sql .= "deduction.deduction_employee,";
            $sql .= "deduction.deduction_amount, ";
            $sql .= "deduction.deduction_number_of_installment, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "deduction.deduction_frequency,  ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where deduction.deduction_aid = :deduction_aid ";
            $sql .= "and deduction.deduction_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_payitem_id = payitem.payitem_aid ";
            $sql .= "order by deduction.deduction_is_paid desc, ";
            $sql .= "deduction.deduction_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_aid" => $this->deduction_aid,
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
            $sql = "update {$this->tblDeductions} set ";
            $sql .= "deduction_paytype_id = :deduction_paytype_id, ";
            $sql .= "deduction_payitem_id = :deduction_payitem_id, ";
            $sql .= "deduction_amount = :deduction_amount, ";
            $sql .= "deduction_frequency = :deduction_frequency, ";
            $sql .= "deduction_number_of_installment = :deduction_number_of_installment, ";
            $sql .= "deduction_start_pay_date = :deduction_start_pay_date, ";
            $sql .= "deduction_end_pay_date = :deduction_end_pay_date, ";
            $sql .= "deduction_datetime = :deduction_datetime ";
            $sql .= "where deduction_aid = :deduction_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_paytype_id" => $this->deduction_paytype_id,
                "deduction_payitem_id" => $this->deduction_payitem_id,
                "deduction_amount" => $this->deduction_amount,
                "deduction_frequency" => $this->deduction_frequency,
                "deduction_number_of_installment" => $this->deduction_number_of_installment,
                "deduction_start_pay_date" => $this->deduction_start_pay_date,
                "deduction_end_pay_date" => $this->deduction_end_pay_date,
                "deduction_datetime" => $this->deduction_datetime,
                "deduction_aid" => $this->deduction_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // name
    public function checkName()
    {
        try {
            $sql = "select * from {$this->tblDeductions} ";
            $sql .= "where deduction_employee_id = :deduction_employee_id ";
            $sql .= "and deduction_payitem_id = :deduction_payitem_id ";
            $sql .= "and deduction_payroll_id = :deduction_payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_employee_id" => "{$this->deduction_employee_id}",
                "deduction_payitem_id" => "{$this->deduction_payitem_id}",
                "deduction_payroll_id" => "{$this->deduction_payroll_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read pr id  in deduction
    public function checkValidateId()
    {
        try {
            $sql = "select deduction_payroll_id ";
            $sql .= "from {$this->tblDeductions} ";
            $sql .= "where deduction_payroll_id = :deduction_payroll_id ";
            $sql .= "order by deduction_payroll_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_payroll_id" => "{$this->deduction_payroll_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblDeductions} ";
            $sql .= "where deduction_aid = :deduction_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "deduction_aid" => $this->deduction_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
