<?php
class Payroll
{
    public $payroll_aid;
    public $payroll_id;
    public $payroll_is_paid;
    public $payroll_start_date;
    public $payroll_end_date;
    public $payroll_pay_date;
    public $payroll_earning_type;
    public $payroll_created;
    public $payroll_datetime;

    public $connection;
    public $lastInsertedId;
    public $payroll_start;
    public $payroll_total;
    public $payroll_search;
    public $tblPayroll;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayroll = "prv2_payroll";
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
            $sql .= "payroll_earning_type, ";
            $sql .= "payroll_created, ";
            $sql .= "payroll_datetime ) values ( ";
            $sql .= ":payroll_id, ";
            $sql .= ":payroll_is_paid, ";
            $sql .= ":payroll_start_date, ";
            $sql .= ":payroll_end_date, ";
            $sql .= ":payroll_pay_date, ";
            $sql .= ":payroll_earning_type, ";
            $sql .= ":payroll_created, ";
            $sql .= ":payroll_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_id" => $this->payroll_id,
                "payroll_is_paid" => $this->payroll_is_paid,
                "payroll_start_date" => $this->payroll_start_date,
                "payroll_end_date" => $this->payroll_end_date,
                "payroll_pay_date" => $this->payroll_pay_date,
                "payroll_earning_type" => $this->payroll_earning_type,
                "payroll_created" => $this->payroll_created,
                "payroll_datetime" => $this->payroll_datetime,
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
            $sql = "select * from {$this->tblPayroll} ";
            $sql .= "order by payroll_is_paid desc, ";
            $sql .= "payroll_id asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblPayroll} ";
            $sql .= "order by payroll_is_paid desc, ";
            $sql .= "payroll_id asc ";
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
            $sql = "select * from {$this->tblPayroll} ";
            $sql .= "where payroll_id like :search ";
            $sql .= "order by payroll_is_paid desc ";
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
            $sql = "select * from {$this->tblPayroll} ";
            $sql .= "where payroll_aid = :payroll_aid  ";
            $sql .= "order by payroll_is_paid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_aid " => $this->payroll_aid,
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
            $sql .= "payroll_earning_type = :payroll_earning_type, ";
            $sql .= "payroll_datetime = :payroll_datetime ";
            $sql .= "where payroll_aid = :payroll_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_start_date" => $this->payroll_start_date,
                "payroll_end_date" => $this->payroll_end_date,
                "payroll_pay_date" => $this->payroll_pay_date,
                "payroll_earning_type" => $this->payroll_earning_type,
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

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblPayroll} ";
            $sql .= "where payroll_aid = :payroll_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_aid" => $this->payroll_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
