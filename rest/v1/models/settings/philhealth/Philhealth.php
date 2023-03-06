<?php
class Philhealth
{
    public $philhealth_aid;
    public $philhealth_percentage;
    public $philhealth_min;
    public $philhealth_max;
    public $philhealth_created;
    public $philhealth_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblPagibig;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPagibig = "prv2_settings_philhealth";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblPagibig} ";
            $sql .= "( philhealth_percentage, ";
            $sql .= "philhealth_min, ";
            $sql .= "philhealth_max, ";
            $sql .= "philhealth_created, ";
            $sql .= "philhealth_datetime ) values ( ";
            $sql .= ":philhealth_percentage, ";
            $sql .= ":philhealth_min, ";
            $sql .= ":philhealth_max, ";
            $sql .= ":philhealth_created, ";
            $sql .= ":philhealth_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "philhealth_percentage" => $this->philhealth_percentage,
                "philhealth_min" => $this->philhealth_min,
                "philhealth_max" => $this->philhealth_max,
                "philhealth_created" => $this->philhealth_created,
                "philhealth_datetime" => $this->philhealth_datetime,
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
            $sql = "select philhealth_aid, ";
            $sql .= "philhealth_percentage, ";
            $sql .= "philhealth_min, ";
            $sql .= "philhealth_max ";
            $sql .= "from {$this->tblPagibig} ";
            $sql .= "order by philhealth_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tblPagibig} set ";
            $sql .= "philhealth_percentage = :philhealth_percentage, ";
            $sql .= "philhealth_min = :philhealth_min, ";
            $sql .= "philhealth_max = :philhealth_max, ";
            $sql .= "philhealth_datetime = :philhealth_datetime ";
            $sql .= "where philhealth_aid  = :philhealth_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "philhealth_percentage" => $this->philhealth_percentage,
                "philhealth_min" => $this->philhealth_min,
                "philhealth_max" => $this->philhealth_max,
                "philhealth_datetime" => $this->philhealth_datetime,
                "philhealth_aid" => $this->philhealth_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblPagibig} ";
            $sql .= "where philhealth_aid = :philhealth_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "philhealth_aid" => $this->philhealth_aid,
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
            $sql = "select philhealth_aid, ";
            $sql .= "philhealth_percentage, ";
            $sql .= "philhealth_min, ";
            $sql .= "philhealth_max ";
            $sql .= "from {$this->tblPagibig} ";
            $sql .= "where philhealth_aid = :philhealth_aid ";
            $sql .= "order by philhealth_aid desc, ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "philhealth_aid" => $this->philhealth_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
