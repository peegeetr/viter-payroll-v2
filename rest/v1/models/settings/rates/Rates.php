<?php
class Rates
{
    public $rates_aid;
    public $rates_active;
    public $rates_name;
    public $rates_paytype_id;
    public $rates_payitems_id;
    public $rates_created;
    public $rates_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblRates;
    public $tblPayType;
    public $tblPayItem;
    
    

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblRates = "prv2_settings_rates";
        $this->tblPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblRates} ";
            $sql .= "( rates_active, ";
            $sql .= "rates_name, ";
            $sql .= "rates_paytype_id, ";
          
            $sql .= "rates_payitems_id, ";
            $sql .= "rates_created, ";
            $sql .= "rates_datetime ) values ( ";
            $sql .= ":rates_active, ";
            $sql .= ":rates_name, ";
            $sql .= ":rates_paytype_id, ";
            $sql .= ":rates_payitems_id, ";
            $sql .= ":rates_created, ";
            $sql .= ":rates_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "rates_active" => $this->rates_active,
                "rates_name" => $this->rates_name,
                "rates_paytype_id" => $this->rates_paytype_id,
                "rates_payitems_id" => $this->rates_payitems_id,
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
            $sql = "select rates.rates_aid, rates.rates_name, ";
            $sql .= "rates.rates_paytype_id, rates.rates_payitems_id, ";
            $sql .= "payitem.payitem_aid, paytype.paytype_aid,  ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblRates} as rates, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where rates.rates_paytype_id = paytype.paytype_aid ";
            $sql .= "and rates.rates_payitems_id = payitem.payitem_aid ";
            $sql .= "order by rates.rates_name desc ";
            
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function update() {    
        try {
            $sql = "update {$this->tblRates} set ";
            $sql .= "rates_name = :rates_name, ";
            $sql .= "rates_paytype_id = :rates_paytype_id, ";
            $sql .= "rates_payitems_id = :rates_payitems_id, ";
            $sql .= "rates_datetime = :rates_datetime ";
            $sql .= "where rates_aid  = :rates_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "rates_name" => $this->rates_name,
                "rates_paytype_id" => $this->rates_paytype_id,
                "rates_payitems_id" => $this->rates_payitems_id,
                "rates_datetime" => $this->rates_datetime,
                "rates_aid" => $this->rates_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblRates} ";
            $sql .= "where rates_aid  = :rates_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "rates_aid" => $this->rates_aid,
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
                $sql = "select rates.rates_aid, rates.rates_name, ";
                $sql .= "payitem.payitem_name, paytype.paytype_name ";
                $sql .= "from {$this->tblRates} as rates, ";
                $sql .= "{$this->tblPayType} as paytype, ";
                $sql .= "{$this->tblPayItem} as payitem ";
                $sql .= "where rates.rates_aid = :rates_aid ";
                $sql .= "and rates.rates_paytype_id = paytype.paytype_aid ";
                $sql .= "and rates.rates_payitem_id = payitem.payitem_aid ";
                $sql .= "order by rates.rates_name desc, ";
        
                $query = $this->connection->prepare($sql);
                $query->execute([
                    "rates_aid" => $this->rates_aid,
                ]);
            } catch (PDOException $ex) {
                $query = false;
            }
            return $query;
        }

}
