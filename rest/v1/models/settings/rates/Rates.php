<?php
class Rates
{
    public $rates_aid;
    public $rates_active;
    public $rates_night_differential;
    public $rates_overtime;
    public $rates_special_holiday;
    public $rates_regular_holiday;
    public $rates_rest_day;
    public $rates_created;
    public $rates_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblRates;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblRates = "prv2_settings_rates";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblRates} ";
            $sql .= "( rates_active, ";
            $sql .= "rates_night_differential, ";
            $sql .= "rates_overtime, ";
            $sql .= "rates_special_holiday, ";
            $sql .= "rates_regular_holiday, ";
            $sql .= "rates_rest_day, ";
            $sql .= "rates_created, ";
            $sql .= "rates_datetime ) values ( ";
            $sql .= ":rates_active, ";
            $sql .= ":rates_night_differential, ";
            $sql .= ":rates_overtime, ";
            $sql .= ":rates_special_holiday, ";
            $sql .= ":rates_regular_holiday, ";
            $sql .= ":rates_rest_day, ";
            $sql .= ":rates_created, ";
            $sql .= ":rates_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "rates_active" => $this->rates_active,
                "rates_night_differential" => $this->rates_night_differential,
                "rates_overtime" => $this->rates_overtime,
                "rates_special_holiday" => $this->rates_special_holiday,
                "rates_regular_holiday" => $this->rates_regular_holiday,
                "rates_rest_day" => $this->rates_rest_day,
                "rates_created" => $this->rates_created,
                "rates_datetime" => $this->rates_datetime,
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
            $sql .= "from {$this->tblRates} ";
            $sql .= "order by rates_active desc ";
            
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update() {    
        try {
            $sql = "update {$this->tblRates} set ";
            $sql .= "rates_night_differential = :rates_night_differential, ";
            $sql .= "rates_overtime = :rates_overtime, ";
            $sql .= "rates_special_holiday = :rates_special_holiday, ";
            $sql .= "rates_regular_holiday = :rates_regular_holiday, ";
            $sql .= "rates_rest_day = :rates_rest_day, ";
            $sql .= "rates_datetime = :rates_datetime ";
            $sql .= "where rates_aid  = :rates_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "rates_night_differential" => $this->rates_night_differential,
                "rates_overtime" => $this->rates_overtime,
                "rates_special_holiday" => $this->rates_special_holiday,
                "rates_regular_holiday" => $this->rates_regular_holiday,
                "rates_rest_day" => $this->rates_rest_day,
                "rates_datetime" => $this->rates_datetime,
                "rates_aid" => $this->rates_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

}
