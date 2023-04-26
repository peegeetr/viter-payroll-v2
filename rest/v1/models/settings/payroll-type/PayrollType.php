<?php
class PayrollType
{
    public $payroll_type_aid;
    public $payroll_type_active;
    public $payroll_type_name;

    public $payroll_type_created;
    public $payroll_type_datetime;

    public $connection;
    public $lastInsertedId;
    public $payroll_type_start;
    public $payroll_type_search;
    public $tblPayrollType;
    public $tblPayroll;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayrollType = "prv2_settings_payroll_type";
        $this->tblPayroll = "prv2_payroll";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblPayrollType} ";
            $sql .= "( payroll_type_active, ";
            $sql .= "payroll_type_name, ";
            $sql .= "payroll_type_created, ";
            $sql .= "payroll_type_datetime ) values ( ";
            $sql .= ":payroll_type_active, ";
            $sql .= ":payroll_type_name, ";
            $sql .= ":payroll_type_created, ";
            $sql .= ":payroll_type_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_type_active" => $this->payroll_type_active,
                "payroll_type_name" => $this->payroll_type_name,
                "payroll_type_created" => $this->payroll_type_created,
                "payroll_type_datetime" => $this->payroll_type_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblPayrollType} ";
            $sql .= "order by payroll_type_active desc ";

            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblPayrollType} set ";
            $sql .= "payroll_type_name = :payroll_type_name, ";
            $sql .= "payroll_type_datetime = :payroll_type_datetime ";
            $sql .= "where payroll_type_aid = :payroll_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_type_name" => $this->payroll_type_name,
                "payroll_type_datetime" => $this->payroll_type_datetime,
                "payroll_type_aid" => $this->payroll_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblPayrollType} ";
            $sql .= "where payroll_type_aid = :payroll_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_type_aid" => $this->payroll_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function CheckName()
    {
        try {
            $sql = "select payroll_type_name from {$this->tblPayrollType} ";
            $sql .= "where payroll_type_name = :payroll_type_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_type_name" => "{$this->payroll_type_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function active()
    {
        try {
            $sql = "update {$this->tblPayrollType} set ";
            $sql .= "payroll_type_active = :payroll_type_active, ";
            $sql .= "payroll_type_datetime = :payroll_type_datetime ";
            $sql .= "where payroll_type_aid = :payroll_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_type_active" => $this->payroll_type_active,
                "payroll_type_datetime" => $this->payroll_type_datetime,
                "payroll_type_aid" => $this->payroll_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkPayrollTypeAssociationToPayroll()
    {
        try {
            $sql = "select payroll_category_type from {$this->tblPayroll} ";
            $sql .= "where payroll_category_type = :payroll_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_type_aid" => "{$this->payroll_type_aid}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
