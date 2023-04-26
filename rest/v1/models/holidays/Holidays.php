<?php
class Holidays
{
    public $holidays_aid;
    public $holidays_name;
    public $holidays_date;
    public $holidays_type;
    public $holidays_rate;
    public $holidays_observed;
    public $holidays_is_active;
    public $holidays_created;
    public $holidays_datetime;

    public $connection;
    public $lastInsertedId;
    public $holidays_start;
    public $holidays_total;
    public $holidays_search;
    public $tblHolidays;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblHolidays = "prv2_holidays";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblHolidays} ";
            $sql .= "( holidays_name, ";
            $sql .= "holidays_date, ";
            $sql .= "holidays_type, ";
            $sql .= "holidays_rate, ";
            $sql .= "holidays_observed, ";
            $sql .= "holidays_is_active, ";
            $sql .= "holidays_created, ";
            $sql .= "holidays_datetime ) values ( ";
            $sql .= ":holidays_name, ";
            $sql .= ":holidays_date, ";
            $sql .= ":holidays_type, ";
            $sql .= ":holidays_rate, ";
            $sql .= ":holidays_observed, ";
            $sql .= ":holidays_is_active, ";
            $sql .= ":holidays_created, ";
            $sql .= ":holidays_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holidays_name" => $this->holidays_name,
                "holidays_date" => $this->holidays_date,
                "holidays_type" => $this->holidays_type,
                "holidays_rate" => $this->holidays_rate,
                "holidays_observed" => $this->holidays_observed,
                "holidays_is_active" => $this->holidays_is_active,
                "holidays_created" => $this->holidays_created,
                "holidays_datetime" => $this->holidays_datetime,
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
            $sql .= "from {$this->tblHolidays} ";
            $sql .= "order by holidays_is_active desc, ";
            $sql .= "holidays_name asc ";

            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblHolidays} ";
            $sql .= "order by holidays_is_active desc, ";
            $sql .= "holidays_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->holidays_start - 1,
                "total" => $this->holidays_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * from {$this->tblHolidays} ";
            $sql .= "where (holidays_name like :holidays_name ";
            $sql .= "or MONTHNAME(holidays_date) like :holidays_date) ";
            $sql .= "order by holidays_is_active desc, ";
            $sql .= "holidays_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holidays_name" => "{$this->holidays_search}%",
                "holidays_date" => "{$this->holidays_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblHolidays} set ";
            $sql .= "holidays_name = :holidays_name, ";
            $sql .= "holidays_date = :holidays_date, ";
            $sql .= "holidays_type = :holidays_type, ";
            $sql .= "holidays_rate = :holidays_rate, ";
            $sql .= "holidays_observed = :holidays_observed, ";
            $sql .= "holidays_is_active = :holidays_is_active, ";
            $sql .= "holidays_datetime = :holidays_datetime ";
            $sql .= "where holidays_aid  = :holidays_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holidays_name" => $this->holidays_name,
                "holidays_date" => $this->holidays_date,
                "holidays_type" => $this->holidays_type,
                "holidays_rate" => $this->holidays_rate,
                "holidays_observed" => $this->holidays_observed,
                "holidays_is_active" => $this->holidays_is_active,
                "holidays_datetime" => $this->holidays_datetime,
                "holidays_aid" => $this->holidays_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblHolidays} ";
            $sql .= "where holidays_aid  = :holidays_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holidays_aid" => $this->holidays_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkHolidayName()
    {
        try {
            $sql = "select holidays_name from {$this->tblHolidays} ";
            $sql .= "where holidays_name = :holidays_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holidays_name" => "{$this->holidays_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkHolidayDate()
    {
        try {
            $sql = "select holidays_date from {$this->tblHolidays} ";
            $sql .= "where holidays_date = :holidays_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holidays_date" => "{$this->holidays_date}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
