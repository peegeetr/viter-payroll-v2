<?php
class TaxYearly
{
    public $tax_yearly_aid;
    public $tax_monthly_active;
    public $tax_monthly_range_from;
    public $tax_monthly_range_to;
    public $tax_monthly_less_amount;
    public $tax_monthly_rate;
    public $tax_monthly_additional_amount;
    public $tax_monthly_created;
    public $tax_monthly_datetime;

    public $connection;
    public $lastInsertedId;
    public $tbltaxYearly;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tbltaxYearly = "prv2_tax_yearly";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tbltaxYearly} ";
            $sql .= "( tax_monthly_range_from, ";
            $sql .= "tax_monthly_range_to, ";
            $sql .= "tax_monthly_less_amount, ";
            $sql .= "tax_monthly_rate, ";
            $sql .= "tax_monthly_additional_amount, ";
            $sql .= "tax_monthly_active, ";
            $sql .= "tax_monthly_created, ";
            $sql .= "tax_monthly_datetime ) values ( ";
            $sql .= ":tax_monthly_range_from, ";
            $sql .= ":tax_monthly_range_to, ";
            $sql .= ":tax_monthly_less_amount, ";
            $sql .= ":tax_monthly_rate, ";
            $sql .= ":tax_monthly_additional_amount, ";
            $sql .= ":tax_monthly_active, ";
            $sql .= ":tax_monthly_created, ";
            $sql .= ":tax_monthly_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_monthly_active" => $this->tax_monthly_active,
                "tax_monthly_range_from" => $this->tax_monthly_range_from,
                "tax_monthly_range_to" => $this->tax_monthly_range_to,
                "tax_monthly_less_amount" => $this->tax_monthly_less_amount,
                "tax_monthly_rate" => $this->tax_monthly_rate,
                "tax_monthly_additional_amount" => $this->tax_monthly_additional_amount,
                "tax_monthly_created" => $this->tax_monthly_created,
                "tax_monthly_datetime" => $this->tax_monthly_datetime,
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
            $sql .= "order by tax_monthly_active desc, ";
            // $sql .= "tax_monthly_range_from asc ";
            $sql .= "CAST(tax_monthly_range_from AS DECIMAL(20,2)) asc ";
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
            $sql .= "tax_monthly_range_from = :tax_monthly_range_from, ";
            $sql .= "tax_monthly_range_to = :tax_monthly_range_to, ";
            $sql .= "tax_monthly_less_amount = :tax_monthly_less_amount, ";
            $sql .= "tax_monthly_rate = :tax_monthly_rate, ";
            $sql .= "tax_monthly_additional_amount = :tax_monthly_additional_amount, ";
            $sql .= "tax_monthly_datetime = :tax_monthly_datetime ";
            $sql .= "where tax_yearly_aid  = :tax_yearly_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_monthly_range_from" => $this->tax_monthly_range_from,
                "tax_monthly_range_to" => $this->tax_monthly_range_to,
                "tax_monthly_less_amount" => $this->tax_monthly_less_amount,
                "tax_monthly_rate" => $this->tax_monthly_rate,
                "tax_monthly_additional_amount" => $this->tax_monthly_additional_amount,
                "tax_monthly_datetime" => $this->tax_monthly_datetime,
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
            $sql = "select tax_monthly_range_from from {$this->tbltaxYearly} ";
            $sql .= "where tax_monthly_range_from = :tax_monthly_range_from ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_monthly_range_from" => "{$this->tax_monthly_range_from}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkRangeTo()
    {
        try {
            $sql = "select tax_monthly_range_to from {$this->tbltaxYearly} ";
            $sql .= "where tax_monthly_range_to = :tax_monthly_range_to ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tax_monthly_range_to" => "{$this->tax_monthly_range_to}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
