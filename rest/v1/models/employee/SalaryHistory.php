<?php
class SalaryHistory
{
    public $salary_history_aid;
    public $salary_history_employee_id;
    public $salary_history_salary_amount;
    public $salary_history_date;
    public $salary_history_created;
    public $salary_history_datetime;

    public $connection;
    public $email;
    public $lastInsertedId;
    public $employee_start;
    public $employee_total;
    public $employee_search;
    public $tblSalaryHistory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSalaryHistory = "prv2_salary_history";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSalaryHistory} ";
            $sql .= "( salary_history_employee_id, ";
            $sql .= "salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_created, ";
            $sql .= "salary_history_datetime ) values ( ";
            $sql .= ":salary_history_employee_id, ";
            $sql .= ":salary_history_salary_amount, ";
            $sql .= ":salary_history_date, ";
            $sql .= ":salary_history_created, ";
            $sql .= ":salary_history_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_employee_id" => $this->salary_history_employee_id,
                "salary_history_salary_amount" => $this->salary_history_salary_amount,
                "salary_history_date" => $this->salary_history_date,
                "salary_history_created" => $this->salary_history_created,
                "salary_history_datetime" => $this->salary_history_datetime,
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
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "order by salary_history_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAllLimit()
    {
        try {
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "order by salary_history_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->employee_start - 1,
                "total" => $this->employee_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSalaryHistory} set ";
            $sql .= "salary_history_employee_id = :salary_history_employee_id, ";
            $sql .= "salary_history_salary_amount = :salary_history_salary_amount, ";
            $sql .= "salary_history_date = :salary_history_date, ";
            $sql .= "salary_history_datetime = :salary_history_datetime ";
            $sql .= "where salary_history_aid = :salary_history_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_employee_id" => $this->salary_history_employee_id,
                "salary_history_salary_amount" => $this->salary_history_salary_amount,
                "salary_history_date" => $this->salary_history_date,
                "salary_history_datetime" => $this->salary_history_datetime,
                "salary_history_aid" => $this->salary_history_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function search()
    {
        try {
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "where (salary_history_date like :salary_history_date ";
            $sql .= "or salary_history_salary_amount like :salary_history_salary_amount) ";
            $sql .= "order by salary_history_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_date" => "{$this->employee_search}%",
                "salary_history_salary_amount" => "{$this->employee_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "where salary_history_aid = :salary_history_aid ";
            $sql .= "order by salary_history_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_aid" => $this->salary_history_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readByEmployeeId()
    {
        try {
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "where salary_history_employee_id = :salary_history_employee_id ";
            $sql .= "order by salary_history_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_employee_id" => $this->salary_history_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSalaryHistory} ";
            $sql .= "where salary_history_aid = :salary_history_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_aid" => $this->salary_history_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkDateExist()
    {
        try {
            $sql = "select salary_history_date from {$this->tblSalaryHistory} ";
            $sql .= "where salary_history_date = :salary_history_date ";
            $sql .= "and salary_history_employee_id = :salary_history_employee_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_date" => "{$this->salary_history_date}",
                "salary_history_employee_id" => "{$this->salary_history_employee_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // Read report salary history by employee id
    public function readReportSalaryHistoryByEmployeeId()
    {
        try {
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "COUNT(salary_history_employee_id) as count, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "where salary_history_employee_id = :salary_history_employee_id ";
            $sql .= "group by salary_history_employee_id ";
            $sql .= "order by salary_history_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "salary_history_employee_id" => $this->salary_history_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Read report salary history all employee 
    public function readReportSalaryHistoryAllEmployee()
    {
        try {
            $sql = "select salary_history_salary_amount, ";
            $sql .= "salary_history_date, ";
            $sql .= "salary_history_aid, ";
            $sql .= "COUNT(salary_history_employee_id) as count, ";
            $sql .= "salary_history_employee_id ";
            $sql .= "from {$this->tblSalaryHistory} ";
            $sql .= "group by salary_history_employee_id ";
            $sql .= "order by salary_history_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
