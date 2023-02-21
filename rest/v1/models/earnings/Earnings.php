<?php
class Earnings
{
    public $earnings_aid;
    public $earnings_is_paid;
    public $earnings_num_pay;
    public $earnings_payroll_id;
    public $earnings_payroll_type_id;
    public $earnings_employee;
    public $earnings_employee_id;
    public $earnings_paytype_id;
    public $earnings_payitem_id;
    public $earnings_amount;
    public $earnings_details;
    public $earnings_frequency;
    public $earnings_is_installment;
    public $earnings_number_of_installment;
    public $earnings_start_pay_date;
    public $earnings_end_pay_date;
    public $earnings_created;
    public $earnings_datetime;

    public $connection;
    public $lastInsertedId;
    public $earnings_start;
    public $earnings_total;
    public $earnings_search;
    public $tblEarnings;
    public $tblPayType;
    public $tblPayItem;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEarnings = "prv2_earnings";
        $this->tblPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
    }

    // create
    public function create()
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
            $sql .= ":earnings_created, ";
            $sql .= ":earnings_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee" => $this->earnings_employee,
                "earnings_payroll_id" => $this->earnings_payroll_id,
                "earnings_payroll_type_id" => $this->earnings_payroll_type_id,
                "earnings_employee_id" => $this->earnings_employee_id,
                "earnings_paytype_id" => $this->earnings_paytype_id,
                "earnings_payitem_id" => $this->earnings_payitem_id,
                "earnings_is_paid" => $this->earnings_is_paid,
                "earnings_amount" => $this->earnings_amount,
                "earnings_details" => $this->earnings_details,
                "earnings_frequency" => $this->earnings_frequency,
                "earnings_is_installment" => $this->earnings_is_installment,
                "earnings_number_of_installment" => $this->earnings_number_of_installment,
                "earnings_start_pay_date" => $this->earnings_start_pay_date,
                "earnings_end_pay_date" => $this->earnings_end_pay_date,
                "earnings_created" => $this->earnings_created,
                "earnings_datetime" => $this->earnings_datetime,
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
            $sql = "select earnings.earnings_aid, ";
            $sql .= "earnings.earnings_is_paid, ";
            $sql .= "earnings.earnings_num_pay, ";
            $sql .= "earnings.earnings_employee, ";
            $sql .= "earnings.earnings_amount, ";
            $sql .= "earnings.earnings_details, ";
            $sql .= "earnings.earnings_frequency, ";
            $sql .= "earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "earnings.earnings_payitem_id, ";
            $sql .= "earnings.earnings_paytype_id, ";
            $sql .= "earnings.earnings_details, ";
            $sql .= "earnings.earnings_payroll_id, ";
            $sql .= "earnings.earnings_payroll_type_id, ";
            $sql .= "earnings.earnings_is_installment, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_is_hris, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "order by ";
            $sql .= "earnings.earnings_is_paid asc, ";
            $sql .= "DATE(earnings.earnings_start_pay_date) desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select earnings.earnings_aid, ";
            $sql .= "earnings.earnings_is_paid, ";
            $sql .= "earnings.earnings_num_pay, ";
            $sql .= "earnings.earnings_employee, ";
            $sql .= "earnings.earnings_amount, ";
            $sql .= "earnings.earnings_details, ";
            $sql .= "earnings.earnings_frequency, ";
            $sql .= "earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "earnings.earnings_payitem_id, ";
            $sql .= "earnings.earnings_paytype_id, ";
            $sql .= "earnings.earnings_payroll_id, ";
            $sql .= "earnings.earnings_payroll_type_id, ";
            $sql .= "earnings.earnings_is_installment, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_is_hris, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "order by ";
            $sql .= "earnings.earnings_is_paid asc, ";
            $sql .= "DATE(earnings.earnings_start_pay_date) desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->earnings_start - 1,
                "total" => $this->earnings_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select earnings.earnings_aid, ";
            $sql .= "earnings.earnings_is_paid, ";
            $sql .= "earnings.earnings_num_pay, ";
            $sql .= "earnings.earnings_employee, ";
            $sql .= "earnings.earnings_amount, ";
            $sql .= "earnings.earnings_details, ";
            $sql .= "earnings.earnings_frequency, ";
            $sql .= "earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "earnings.earnings_payitem_id, ";
            $sql .= "earnings.earnings_paytype_id, ";
            $sql .= "earnings.earnings_payroll_id, ";
            $sql .= "earnings.earnings_payroll_type_id, ";
            $sql .= "earnings.earnings_is_installment, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_is_hris, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "and earnings.earnings_employee like :search ";
            $sql .= "order by ";
            $sql .= "earnings.earnings_is_paid asc, ";
            $sql .= "DATE(earnings.earnings_start_pay_date) desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->earnings_search}%",
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
            $sql = "select earnings.earnings_aid, ";
            $sql .= "earnings.earnings_is_paid, ";
            $sql .= "earnings.earnings_num_pay, ";
            $sql .= "earnings.earnings_employee, ";
            $sql .= "earnings.earnings_amount, ";
            $sql .= "earnings.earnings_details, ";
            $sql .= "earnings.earnings_frequency, ";
            $sql .= "earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_aid = :earnings_aid ";
            $sql .= "and earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "order by earnings.earnings_is_paid desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_aid" => $this->earnings_aid,
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
            $sql = "update {$this->tblEarnings} set ";
            $sql .= "earnings_paytype_id = :earnings_paytype_id, ";
            $sql .= "earnings_payitem_id = :earnings_payitem_id, ";
            $sql .= "earnings_amount = :earnings_amount, ";
            $sql .= "earnings_frequency = :earnings_frequency, ";
            $sql .= "earnings_number_of_installment = :earnings_number_of_installment, ";
            $sql .= "earnings_start_pay_date = :earnings_start_pay_date, ";
            $sql .= "earnings_end_pay_date = :earnings_end_pay_date, ";
            $sql .= "earnings_datetime = :earnings_datetime ";
            $sql .= "where earnings_aid = :earnings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_paytype_id" => $this->earnings_paytype_id,
                "earnings_payitem_id" => $this->earnings_payitem_id,
                "earnings_amount" => $this->earnings_amount,
                "earnings_frequency" => $this->earnings_frequency,
                "earnings_number_of_installment" => $this->earnings_number_of_installment,
                "earnings_start_pay_date" => $this->earnings_start_pay_date,
                "earnings_end_pay_date" => $this->earnings_end_pay_date,
                "earnings_datetime" => $this->earnings_datetime,
                "earnings_aid" => $this->earnings_aid,
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
            $sql = "select * from {$this->tblEarnings} ";
            $sql .= "where earnings_employee_id = :earnings_employee_id ";
            $sql .= "and earnings_payitem_id = :earnings_payitem_id ";
            $sql .= "and earnings_payroll_id = :earnings_payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee_id" => "{$this->earnings_employee_id}",
                "earnings_payitem_id" => "{$this->earnings_payitem_id}",
                "earnings_payroll_id" => "{$this->earnings_payroll_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // DATA import from HRIS
    public function checkHRISImportExist()
    {
        try {
            $sql = "select * from {$this->tblEarnings} ";
            $sql .= "where earnings_details = :earnings_details ";
            $sql .= "and earnings_employee_id = :earnings_employee_id ";
            $sql .= "and earnings_payitem_id = :earnings_payitem_id ";
            $sql .= "and earnings_payroll_id = :earnings_payroll_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee_id" => "{$this->earnings_employee_id}",
                "earnings_payitem_id" => "{$this->earnings_payitem_id}",
                "earnings_payroll_id" => "{$this->earnings_payroll_id}",
                "earnings_details" => "{$this->earnings_details}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read pr id in earinings
    public function checkValidateId()
    {
        try {
            $sql = "select earnings_payroll_id ";
            $sql .= "from {$this->tblEarnings} ";
            $sql .= "where earnings_payroll_id = :earnings_payroll_id ";
            $sql .= "order by earnings_payroll_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_payroll_id" => "{$this->earnings_payroll_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read payroll id in earinings
    public function checkEarningsPayrollId()
    {
        try {
            $sql = "select earnings_payroll_id, ";
            $sql .= "earnings_payroll_type_id, ";
            $sql .= "earnings_employee_id, ";
            $sql .= "earnings_aid, ";
            $sql .= "earnings_payitem_id, ";
            $sql .= "earnings_amount ";
            $sql .= "from {$this->tblEarnings} ";
            $sql .= "where earnings_payroll_id = :earnings_payroll_id ";
            // $sql .= "and earnings_number_of_installment != 0 ";
            $sql .= "order by earnings_payroll_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_payroll_id" => "{$this->earnings_payroll_id}",
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
            $sql = "delete from {$this->tblEarnings} ";
            $sql .= "where earnings_aid = :earnings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_aid" => $this->earnings_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
