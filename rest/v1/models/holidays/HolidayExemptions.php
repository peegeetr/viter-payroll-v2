<?php
class HolidayExemptions
{
    public $holiday_exemption_aid;
    public $holiday_exemption_eid;
    public $holiday_exemption_pr_id;
    public $holiday_exemption_holiday_date;
    public $holiday_exemption_is_observe;
    public $holiday_exemption_created;
    public $holiday_exemption_datetime;

    public $connection;
    public $lastInsertedId;
    public $holiday_exemption_start;
    public $holiday_exemption_total;
    public $holiday_exemption_search;
    public $tblHolidayExemption;
    public $tblHolidays;
    public $tblPayroll;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblHolidayExemption = "prv2_holiday_exemption";
        $this->tblHolidays = "prv2_holidays";
        $this->tblPayroll = "prv2_payroll";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblHolidayExemption} ";
            $sql .= "( holiday_exemption_eid, ";
            $sql .= "holiday_exemption_pr_id, ";
            $sql .= "holiday_exemption_holiday_date, ";
            $sql .= "holiday_exemption_is_observe, ";
            $sql .= "holiday_exemption_created, ";
            $sql .= "holiday_exemption_datetime ) values ( ";
            $sql .= ":holiday_exemption_eid, ";
            $sql .= ":holiday_exemption_pr_id, ";
            $sql .= ":holiday_exemption_holiday_date, ";
            $sql .= ":holiday_exemption_is_observe, ";
            $sql .= ":holiday_exemption_created, ";
            $sql .= ":holiday_exemption_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holiday_exemption_eid" => $this->holiday_exemption_eid,
                "holiday_exemption_pr_id" => $this->holiday_exemption_pr_id,
                "holiday_exemption_holiday_date" => $this->holiday_exemption_holiday_date,
                "holiday_exemption_is_observe" => $this->holiday_exemption_is_observe,
                "holiday_exemption_created" => $this->holiday_exemption_created,
                "holiday_exemption_datetime" => $this->holiday_exemption_datetime,
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
            $sql = "select holiday_exemption_aid, ";
            $sql .= "holiday_exemption_pr_id, ";
            $sql .= "holiday_exemption_eid, ";
            $sql .= "holiday_exemption_holiday_date, ";
            $sql .= "holiday_exemption_is_observe ";
            $sql .= "from {$this->tblHolidayExemption} ";
            $sql .= "order by holiday_exemption_holiday_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select holiday_exemption_aid, ";
            $sql .= "holiday_exemption_pr_id, ";
            $sql .= "holiday_exemption_eid, ";
            $sql .= "holiday_exemption_holiday_date, ";
            $sql .= "holiday_exemption_is_observe ";
            $sql .= "from {$this->tblHolidayExemption} ";
            $sql .= "order by holiday_exemption_holiday_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->holiday_exemption_start - 1,
                "total" => $this->holiday_exemption_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select holiday_exemption_aid, ";
            $sql .= "holiday_exemption_pr_id, ";
            $sql .= "holiday_exemption_eid, ";
            $sql .= "holiday_exemption_holiday_date, ";
            $sql .= "holiday_exemption_is_observe ";
            $sql .= "from {$this->tblHolidayExemption} ";
            $sql .= "where (MONTHNAME(holiday_exemption_holiday_date) like :monthName ";
            $sql .= "or holiday_exemption_holiday_date like :holiday_exemption_holiday_date ";
            $sql .= "or holiday_exemption_pr_id like :holiday_exemption_pr_id) ";
            $sql .= "order by holiday_exemption_holiday_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "monthName" => "{$this->holiday_exemption_search}%",
                "holiday_exemption_holiday_date" => "{$this->holiday_exemption_search}%",
                "holiday_exemption_pr_id" => "{$this->holiday_exemption_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tblHolidayExemption} set ";
            $sql .= "holiday_exemption_eid = :holiday_exemption_eid, ";
            $sql .= "holiday_exemption_holiday_date = :holiday_exemption_holiday_date, ";
            $sql .= "holiday_exemption_is_observe = :holiday_exemption_is_observe, ";
            $sql .= "holiday_exemption_datetime = :holiday_exemption_datetime ";
            $sql .= "where holiday_exemption_aid  = :holiday_exemption_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holiday_exemption_eid" => $this->holiday_exemption_eid,
                "holiday_exemption_holiday_date" => $this->holiday_exemption_holiday_date,
                "holiday_exemption_is_observe" => $this->holiday_exemption_is_observe,
                "holiday_exemption_datetime" => $this->holiday_exemption_datetime,
                "holiday_exemption_aid" => $this->holiday_exemption_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblHolidayExemption} ";
            $sql .= "where holiday_exemption_aid = :holiday_exemption_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holiday_exemption_aid" => $this->holiday_exemption_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkHolidayExemptionsEmployee()
    {
        try {
            $sql = "select holiday_exemption_eid ";
            $sql .= "from {$this->tblHolidayExemption} ";
            $sql .= "where holiday_exemption_eid = :holiday_exemption_eid ";
            $sql .= "and holiday_exemption_holiday_date = :holiday_exemption_holiday_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "holiday_exemption_eid" => "{$this->holiday_exemption_eid}",
                "holiday_exemption_holiday_date" => "{$this->holiday_exemption_holiday_date}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function checkAssociation()
    {
        try {
            $sql = "select payroll_id ";
            $sql .= "from ";
            $sql .= "{$this->tblPayroll} ";
            $sql .= "where payroll_id = :payroll_id ";
            $sql .= "and payroll_is_paid = '1' ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payroll_id" => $this->holiday_exemption_pr_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
