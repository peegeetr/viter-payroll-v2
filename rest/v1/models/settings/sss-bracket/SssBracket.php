<?php
class SssBracket
{
    public $sss_bracket_aid ;
    public $sss_bracket_active;
    public $sss_bracket_range_from;
    public $sss_bracket_range_to;
    public $sss_bracket_er;
    public $sss_bracket_ee;
    public $sss_bracket_total;
    public $sss_bracket_created;
    public $sss_bracket_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblSssBracket;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSssBracket = "prv2_settings_sss_bracket";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSssBracket} ";
            $sql .= "( sss_bracket_active, ";
            $sql .= "sss_bracket_range_from, ";
            $sql .= "sss_bracket_range_to, ";
            $sql .= "sss_bracket_er, ";
            $sql .= "sss_bracket_ee, ";
            $sql .= "sss_bracket_total, ";
            $sql .= "sss_bracket_created, ";
            $sql .= "sss_bracket_datetime ) values ( ";
            $sql .= ":sss_bracket_active, ";
            $sql .= ":sss_bracket_range_from, ";
            $sql .= ":sss_bracket_range_to, ";
            $sql .= ":sss_bracket_er, ";
            $sql .= ":sss_bracket_ee, ";
            $sql .= ":sss_bracket_total, ";
            $sql .= ":sss_bracket_created, ";
            $sql .= ":sss_bracket_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sss_bracket_active" => $this->sss_bracket_active,
                "sss_bracket_range_from" => $this->sss_bracket_range_from,
                "sss_bracket_range_to" => $this->sss_bracket_range_to,
                "sss_bracket_er" => $this->sss_bracket_er,
                "sss_bracket_ee" => $this->sss_bracket_ee,
                "sss_bracket_total" => $this->sss_bracket_total,
                "sss_bracket_created" => $this->sss_bracket_created,
                "sss_bracket_datetime" => $this->sss_bracket_datetime,
                
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
            $sql .= "from {$this->tblSssBracket} ";
            $sql .= "order by rates_active desc ";
            
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update() {    
        try {
            $sql = "update {$this->tblSssBracket} set ";
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
