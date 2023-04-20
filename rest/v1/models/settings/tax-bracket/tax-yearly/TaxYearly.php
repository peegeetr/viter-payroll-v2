<?php
class TaxYearly
{
    public $tax_yearly_aid;
    public $tax_yearly_active;
    public $tax_yearly_from;
    public $tax_yearly_to;
    public $tax_yearly_fixed_tax;
    public $tax_yearly_rate;
    public $tax_yearly_created;
    public $tax_yearly_datetime;

    public $connection;
    public $lastInsertedId;
    public $tbltaxYearly;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tbltaxYearly = "prv2_settings_tax_yearly";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tbltaxYearly} ";
            $sql .= "( tax_yearly_from, ";
            $sql .= "tax_yearly_to, ";
            $sql .= "tax_yearly_fixed_tax, ";
            $sql .= "tax_yearly_rate, ";
            $sql .= "tax_yearly_active, ";
            $sql .= "tax_yearly_created, ";
            $sql .= "tax_yearly_datetime ) values ( ";
            $sql .= ":tax_yearly_from, ";
            $sql .= ":tax_yearly_to, ";
            $sql .= ":tax_yearly_fixed_tax, ";
            $sql .= ":tax_yearly_rate, ";
            $sql .= ":tax_yearly_active, ";
            $sql .= ":tax_yearly_created, ";
            $sql .= ":tax_yearly_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_yearly_active" => $this->tax_yearly_active,
                "tax_yearly_from" => $this->tax_yearly_from,
                "tax_yearly_to" => $this->tax_yearly_to,
                "tax_yearly_fixed_tax" => $this->tax_yearly_fixed_tax,
                "tax_yearly_rate" => $this->tax_yearly_rate,
                "tax_yearly_created" => $this->tax_yearly_created,
                "tax_yearly_datetime" => $this->tax_yearly_datetime,
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
            $sql .= "from {$this->tbltaxYearly} ";
            $sql .= "order by tax_yearly_active desc, ";
            // $sql .= "tax_yearly_from asc ";
            $sql .= "CAST(tax_yearly_from AS DECIMAL(20,2)) asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tbltaxYearly} set ";
            $sql .= "tax_yearly_from = :tax_yearly_from, ";
            $sql .= "tax_yearly_to = :tax_yearly_to, ";
            $sql .= "tax_yearly_fixed_tax = :tax_yearly_fixed_tax, ";
            $sql .= "tax_yearly_rate = :tax_yearly_rate, ";
            $sql .= "tax_yearly_datetime = :tax_yearly_datetime ";
            $sql .= "where tax_yearly_aid  = :tax_yearly_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_yearly_from" => $this->tax_yearly_from,
                "tax_yearly_to" => $this->tax_yearly_to,
                "tax_yearly_fixed_tax" => $this->tax_yearly_fixed_tax,
                "tax_yearly_rate" => $this->tax_yearly_rate,
                "tax_yearly_datetime" => $this->tax_yearly_datetime,
                "tax_yearly_aid" => $this->tax_yearly_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }



    public function delete()
    {
        try {
            $sql = "delete from {$this->tbltaxYearly} ";
            $sql .= "where tax_yearly_aid  = :tax_yearly_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_yearly_aid" => $this->tax_yearly_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkRangeFrom()
    {
        try {
            $sql = "select tax_yearly_from from {$this->tbltaxYearly} ";
            $sql .= "where tax_yearly_from = :tax_yearly_from ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_yearly_from" => "{$this->tax_yearly_from}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkRangeTo()
    {
        try {
            $sql = "select tax_yearly_to from {$this->tbltaxYearly} ";
            $sql .= "where tax_yearly_to = :tax_yearly_to ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_yearly_to" => "{$this->tax_yearly_to}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
