<?php
class SemiMonthly
{
    public $semi_monthly_aid;
    public $semi_monthly_active;
    public $semi_monthly_range_from;
    public $semi_monthly_range_to;
    public $semi_monthly_less_amount;
    public $semi_monthly_rate;
    public $semi_monthly_additional_amount;
    public $semi_monthly_created;
    public $semi_monthly_datetime;

    public $connection;
    public $lastInsertedId;
    // public $department_start;
    // public $department_total;
    // public $department_search;
    public $tblSemiMonthly;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSemiMonthly = "payrollv2_settings_semi_monthly";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSemiMonthly} ";
            $sql .= "( semi_monthly_range_from, ";
            $sql .= "semi_monthly_range_to, ";
            $sql .= "semi_monthly_less_amount, ";
            $sql .= "semi_monthly_rate, ";
            $sql .= "semi_monthly_additional_amount, ";
            $sql .= "semi_monthly_active, ";
            $sql .= "semi_monthly_created, ";
            $sql .= "semi_monthly_datetime ) values ( ";
            $sql .= ":semi_monthly_range_from, ";
            $sql .= ":semi_monthly_range_to, ";
            $sql .= ":semi_monthly_less_amount, ";
            $sql .= ":semi_monthly_rate, ";
            $sql .= ":semi_monthly_additional_amount, ";
            $sql .= ":semi_monthly_active, ";
            $sql .= ":semi_monthly_created, ";
            $sql .= ":semi_monthly_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "semi_monthly_active" => $this->semi_monthly_active,
                "semi_monthly_range_from" => $this->semi_monthly_range_from,
                "semi_monthly_range_to" => $this->semi_monthly_range_to,
                "semi_monthly_less_amount" => $this->semi_monthly_less_amount,
                "semi_monthly_rate" => $this->semi_monthly_rate,
                "semi_monthly_additional_amount" => $this->semi_monthly_additional_amount,
                "semi_monthly_created" => $this->semi_monthly_created,
                "semi_monthly_datetime" => $this->semi_monthly_datetime,
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
            $sql = "select *  ";
            $sql .= "from {$this->tblSemiMonthly} ";
            $sql .= "order by semi_monthly_active desc, ";
            $sql .= "semi_monthly_range_from asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   
    public function update()
    {
        try {
            $sql = "update {$this->tblSemiMonthly} set ";
            $sql .= "semi_monthly_range_from = :semi_monthly_range_from, ";
            $sql .= "semi_monthly_range_to = :semi_monthly_range_to, ";
            $sql .= "semi_monthly_less_amount = :semi_monthly_less_amount, ";
            $sql .= "semi_monthly_rate = :semi_monthly_rate, ";
            $sql .= "semi_monthly_additional_amount = :semi_monthly_additional_amount, ";
            $sql .= "semi_monthly_datetime = :semi_monthly_datetime ";
            $sql .= "where semi_monthly_aid  = :semi_monthly_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "semi_monthly_range_from" => $this->semi_monthly_range_from,
                "semi_monthly_range_to" => $this->semi_monthly_range_to,
                "semi_monthly_less_amount" => $this->semi_monthly_less_amount,
                "semi_monthly_rate" => $this->semi_monthly_rate,
                "semi_monthly_additional_amount" => $this->semi_monthly_additional_amount,
                "semi_monthly_datetime" => $this->semi_monthly_datetime,
                "semi_monthly_aid" => $this->semi_monthly_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSemiMonthly} ";
            $sql .= "where semi_monthly_aid  = :semi_monthly_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "semi_monthly_aid" => $this->semi_monthly_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


}
