<?php
class PayItem
{
    public $payitem_aid;
    public $payitem_is_active;
    public $payitem_paytype_id;
    public $payitem_is_hris;
    public $payitem_name;
    public $payitem_created;
    public $payitem_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblPayItem;
    public $tblPayType;
    public $tblEarnings;
    public $tblRates;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayItem = "prv2_payitem";
        $this->tblPayType = "prv2_paytype";
        $this->tblEarnings = "prv2_earnings";
        $this->tblRates = "prv2_settings_rates";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPayItem} ";
            $sql .= "( payitem_name, ";
            $sql .= "payitem_paytype_id, ";
            $sql .= "payitem_is_hris, ";
            $sql .= "payitem_is_active, ";
            $sql .= "payitem_created, ";
            $sql .= "payitem_datetime ) values ( ";
            $sql .= ":payitem_name, ";
            $sql .= ":payitem_paytype_id, ";
            $sql .= ":payitem_is_hris, ";
            $sql .= ":payitem_is_active, ";
            $sql .= ":payitem_created, ";
            $sql .= ":payitem_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_name" => $this->payitem_name,
                "payitem_paytype_id" => $this->payitem_paytype_id,
                "payitem_is_hris" => $this->payitem_is_hris,
                "payitem_is_active" => $this->payitem_is_active,
                "payitem_created" => $this->payitem_created,
                "payitem_datetime" => $this->payitem_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblPayItem} ";
            $sql .= "where payitem_is_active = 1 ";
            $sql .= "order by payitem_is_active desc, ";
            $sql .= "payitem_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readById()
    {
        try {
            $sql = "select type.paytype_name, item.payitem_name, ";
            $sql .= "type.paytype_aid, ";
            $sql .= "type.paytype_category, ";
            $sql .= "item.payitem_is_hris, ";
            $sql .= "item.payitem_is_active, item.payitem_aid from ";
            $sql .= "{$this->tblPayType} as type, ";
            $sql .= "{$this->tblPayItem} as item ";
            $sql .= "where item.payitem_aid = :payitem_aid ";
            $sql .= "and item.payitem_paytype_id = type.paytype_aid ";
            $sql .= "order by item.payitem_is_active desc, item.payitem_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_aid" => $this->payitem_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblPayItem} set ";
            $sql .= "payitem_name = :payitem_name, ";
            $sql .= "payitem_is_hris = :payitem_is_hris, ";
            $sql .= "payitem_datetime = :payitem_datetime ";
            $sql .= "where payitem_aid  = :payitem_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_name" => $this->payitem_name,
                "payitem_is_hris" => $this->payitem_is_hris,
                "payitem_datetime" => $this->payitem_datetime,
                "payitem_aid" => $this->payitem_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblPayItem} set ";
            $sql .= "payitem_is_active = :payitem_is_active, ";
            $sql .= "payitem_datetime = :payitem_datetime ";
            $sql .= "where payitem_aid = :payitem_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_is_active" => $this->payitem_is_active,
                "payitem_datetime" => $this->payitem_datetime,
                "payitem_aid" => $this->payitem_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblPayItem} ";
            $sql .= "where payitem_aid = :payitem_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_aid" => $this->payitem_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select payitem_name from {$this->tblPayItem} ";
            $sql .= "where payitem_name = :payitem_name ";
            $sql .= "and payitem_paytype_id = :payitem_paytype_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_name" => "{$this->payitem_name}",
                "payitem_paytype_id" => "{$this->payitem_paytype_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // validation before deleting
    public function checkEarningsAssociatedToPayItem()
    {
        try {
            $sql = "select * from {$this->tblPayItem} as payitem, ";
            $sql .= "{$this->tblEarnings} as earnings ";
            $sql .= "where payitem.payitem_aid = :payitem_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_aid" => "{$this->payitem_aid}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // validation before deleting
    public function checkRateAssociatedToPayItem()
    {
        try {
            $sql = "select * from {$this->tblPayItem} as payitem, ";
            $sql .= "{$this->tblRates} as rates ";
            $sql .= "where payitem.payitem_aid = :payitem_aid ";
            $sql .= "and rates.rates_payitems_id = payitem.payitem_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "payitem_aid" => "{$this->payitem_aid}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
