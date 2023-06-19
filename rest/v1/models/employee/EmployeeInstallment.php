<?php
class EmployeeInstallment
{
    public $employee_installment_aid;
    public $employee_installment_employee_id;
    public $employee_installment_paytype_id;
    public $employee_installment_amount;
    public $employee_installment_number_of_months;
    public $employee_installment_number_of_payrun;
    public $employee_installment_actual_pay_date;
    public $employee_installment_start_date;
    public $employee_installment_end_date;
    public $employee_installment_status;
    public $employee_installment_details;
    public $employee_installment_created;
    public $employee_installment_datetime;


    public $connection;
    public $lastInsertedId;
    public $employee_mp2_start;
    public $employee_mp2_total;
    public $employee_mp2_search;
    public $tblEmployeeInstallmet;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEmployeeInstallmet = "prv2_employee_installment";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblEmployeeInstallmet} ";
            $sql .= "( employee_installment_employee_id, ";
            $sql .= "employee_installment_paytype_id, ";
            $sql .= "employee_installment_amount, ";
            $sql .= "employee_installment_number_of_months, ";
            $sql .= "employee_installment_number_of_payrun, ";
            $sql .= "employee_installment_actual_pay_date, ";
            $sql .= "employee_installment_start_date, ";
            $sql .= "employee_installment_end_date, ";
            $sql .= "employee_installment_status, ";
            $sql .= "employee_installment_details, ";
            $sql .= "employee_installment_created, ";
            $sql .= "employee_installment_datetime ) values ( ";
            $sql .= ":employee_installment_employee_id, ";
            $sql .= ":employee_installment_paytype_id, ";
            $sql .= ":employee_installment_amount, ";
            $sql .= ":employee_installment_number_of_months, ";
            $sql .= ":employee_installment_number_of_payrun, ";
            $sql .= ":employee_installment_actual_pay_date, ";
            $sql .= ":employee_installment_start_date, ";
            $sql .= ":employee_installment_end_date, ";
            $sql .= ":employee_installment_status, ";
            $sql .= ":employee_installment_details, ";
            $sql .= ":employee_installment_created, ";
            $sql .= ":employee_installment_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_employee_id" => $this->employee_installment_employee_id,
                "employee_installment_paytype_id" => $this->employee_installment_paytype_id,
                "employee_installment_amount" => $this->employee_installment_amount,
                "employee_installment_number_of_months" => $this->employee_installment_number_of_months,
                "employee_installment_number_of_payrun" => $this->employee_installment_number_of_payrun,
                "employee_installment_actual_pay_date" => $this->employee_installment_actual_pay_date,
                "employee_installment_start_date" => $this->employee_installment_start_date,
                "employee_installment_end_date" => $this->employee_installment_end_date,
                "employee_installment_status" => $this->employee_installment_status,
                "employee_installment_details" => $this->employee_installment_details,
                "employee_installment_created" => $this->employee_installment_created,
                "employee_installment_datetime" => $this->employee_installment_datetime,
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
            $sql = "select * from {$this->tblEmployeeInstallmet} ";
            $sql .= "order by employee_installment_start_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblEmployeeInstallmet} ";
            $sql .= "order by employee_installment_start_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->employee_mp2_start - 1,
                "total" => $this->employee_mp2_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readAllInstallmentPending()
    {
        try {
            $sql = "select employee_installment_aid, ";
            $sql .= "employee_installment_paytype_id, ";
            $sql .= "employee_installment_employee_id, ";
            $sql .= "employee_installment_amount, ";
            $sql .= "employee_installment_number_of_months, ";
            $sql .= "employee_installment_number_of_payrun, ";
            $sql .= "employee_installment_actual_pay_date, ";
            $sql .= "employee_installment_start_date, ";
            $sql .= "employee_installment_end_date, ";
            $sql .= "employee_installment_details, ";
            $sql .= "employee_installment_status ";
            $sql .= "from {$this->tblEmployeeInstallmet} ";
            $sql .= "where employee_installment_status = '0' ";
            $sql .= "order by employee_installment_start_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function readInstallmentByEmployeeId()
    {
        try {
            $sql = "select employee_installment_aid, ";
            $sql .= "employee_installment_paytype_id, ";
            $sql .= "employee_installment_employee_id, ";
            $sql .= "employee_installment_amount, ";
            $sql .= "employee_installment_number_of_months, ";
            $sql .= "employee_installment_number_of_payrun, ";
            $sql .= "employee_installment_actual_pay_date, ";
            $sql .= "employee_installment_start_date, ";
            $sql .= "employee_installment_end_date, ";
            $sql .= "employee_installment_details, ";
            $sql .= "employee_installment_status ";
            $sql .= "from {$this->tblEmployeeInstallmet} ";
            $sql .= "where employee_installment_paytype_id = :employee_installment_paytype_id ";
            $sql .= "and employee_installment_status = '0' ";
            $sql .= "and employee_installment_employee_id = :employee_installment_employee_id ";
            $sql .= "order by employee_installment_aid desc ";
            $sql .= "limit 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_paytype_id" => $this->employee_installment_paytype_id,
                "employee_installment_employee_id" => $this->employee_installment_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAllInstallmentByEmployeeId()
    {
        try {
            $sql = "select employee_installment_aid, ";
            $sql .= "employee_installment_paytype_id, ";
            $sql .= "employee_installment_employee_id, ";
            $sql .= "employee_installment_amount, ";
            $sql .= "employee_installment_number_of_months, ";
            $sql .= "employee_installment_number_of_payrun, ";
            $sql .= "employee_installment_actual_pay_date, ";
            $sql .= "employee_installment_start_date, ";
            $sql .= "employee_installment_end_date, ";
            $sql .= "employee_installment_details, ";
            $sql .= "employee_installment_status ";
            $sql .= "from {$this->tblEmployeeInstallmet} ";
            $sql .= "where employee_installment_paytype_id = :employee_installment_paytype_id ";
            $sql .= "and employee_installment_employee_id = :employee_installment_employee_id ";
            $sql .= "order by employee_installment_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_paytype_id" => $this->employee_installment_paytype_id,
                "employee_installment_employee_id" => $this->employee_installment_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * from {$this->tblEmployeeInstallmet} ";
            $sql .= "where MONTHNAME(employee_installment_start_date) like :search ";
            $sql .= "order by employee_installment_start_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->employee_mp2_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblEmployeeInstallmet} set ";
            $sql .= "employee_installment_actual_pay_date = :employee_installment_actual_pay_date, ";
            $sql .= "employee_installment_start_date = :employee_installment_start_date, ";
            $sql .= "employee_installment_end_date = :employee_installment_end_date, ";
            $sql .= "employee_installment_amount = :employee_installment_amount, ";
            $sql .= "employee_installment_number_of_months = :employee_installment_number_of_months, ";
            $sql .= "employee_installment_status = :employee_installment_status, ";
            $sql .= "employee_installment_details = :employee_installment_details, ";
            $sql .= "employee_installment_datetime = :employee_installment_datetime ";
            $sql .= "where employee_installment_aid = :employee_installment_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_actual_pay_date" => $this->employee_installment_actual_pay_date,
                "employee_installment_start_date" => $this->employee_installment_start_date,
                "employee_installment_end_date" => $this->employee_installment_end_date,
                "employee_installment_number_of_months" => $this->employee_installment_number_of_months,
                "employee_installment_amount" => $this->employee_installment_amount,
                "employee_installment_status" => $this->employee_installment_status,
                "employee_installment_details" => $this->employee_installment_details,
                "employee_installment_datetime" => $this->employee_installment_datetime,
                "employee_installment_aid" => $this->employee_installment_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function updateStatus()
    {
        try {
            $sql = "update {$this->tblEmployeeInstallmet} set ";
            $sql .= "employee_installment_status = :employee_installment_status, ";
            $sql .= "employee_installment_datetime = :employee_installment_datetime ";
            $sql .= "where employee_installment_aid = :employee_installment_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_status" => $this->employee_installment_status,
                "employee_installment_datetime" => $this->employee_installment_datetime,
                "employee_installment_aid" => $this->employee_installment_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblEmployeeInstallmet} ";
            $sql .= "where employee_installment_aid = :employee_installment_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_installment_aid" => $this->employee_installment_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
