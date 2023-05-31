<?php
class SssBracket
{
    public $sss_bracket_aid;
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
    public $sss_bracket_start;
    public $sss_bracket_search;
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
            $sql .= "order by sss_bracket_active desc, ";
            $sql .= "CAST(sss_bracket_range_from AS DECIMAL(20,2)) asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSssBracket} set ";
            $sql .= "sss_bracket_range_from = :sss_bracket_range_from, ";
            $sql .= "sss_bracket_range_to = :sss_bracket_range_to, ";
            $sql .= "sss_bracket_er = :sss_bracket_er, ";
            $sql .= "sss_bracket_ee = :sss_bracket_ee, ";
            $sql .= "sss_bracket_total = :sss_bracket_total, ";
            $sql .= "sss_bracket_datetime = :sss_bracket_datetime ";
            $sql .= "where sss_bracket_aid  = :sss_bracket_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sss_bracket_range_from" => $this->sss_bracket_range_from,
                "sss_bracket_range_to" => $this->sss_bracket_range_to,
                "sss_bracket_er" => $this->sss_bracket_er,
                "sss_bracket_ee" => $this->sss_bracket_ee,
                "sss_bracket_total" => $this->sss_bracket_total,
                "sss_bracket_datetime" => $this->sss_bracket_datetime,
                "sss_bracket_aid" => $this->sss_bracket_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSssBracket} ";
            $sql .= "where sss_bracket_aid  = :sss_bracket_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sss_bracket_aid" => $this->sss_bracket_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * from {$this->tblSssBracket} ";
            $sql .= "where sss_bracket_range_from like :search ";
            $sql .= "order by sss_bracket_active desc, ";
            $sql .= "CAST(sss_bracket_range_from AS DECIMAL(20,2)) asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->sss_bracket_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblSssBracket} ";
            $sql .= "order by sss_bracket_active desc, ";
            $sql .= "CAST(sss_bracket_range_from AS DECIMAL(20,2)) asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->sss_bracket_start - 1,
                "total" => $this->sss_bracket_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkRangeFrom()
    {
        try {
            $sql = "select sss_bracket_range_from from {$this->tblSssBracket} ";
            $sql .= "where sss_bracket_range_from = :sss_bracket_range_from ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sss_bracket_range_from" => "{$this->sss_bracket_range_from}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkRangeTo()
    {
        try {
            $sql = "select sss_bracket_range_to from {$this->tblSssBracket} ";
            $sql .= "where sss_bracket_range_to = :sss_bracket_range_to ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sss_bracket_range_to" => "{$this->sss_bracket_range_to}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
