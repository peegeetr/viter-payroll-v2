<?php
class Pagibig
{
    public $pagibig_aid;
    public $pagibig_er_amount;
    public $pagibig_ee_amount;
    public $pagibig_created;
    public $pagibig_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblPagibig;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPagibig = "prv2_settings_pagibig";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblPagibig} ";
            $sql .= "( pagibig_ee_amount, ";
            $sql .= "pagibig_er_amount, ";
            $sql .= "rates_created, ";
            $sql .= "rates_datetime ) values ( ";
            $sql .= ":pagibig_ee_amount, ";
            $sql .= ":pagibig_er_amount, ";
            $sql .= ":rates_created, ";
            $sql .= ":rates_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "rates_active" => $this->rates_active,
                "pagibig_er_amount" => $this->pagibig_er_amount,
                "rates_paytype_id" => $this->rates_paytype_id,
                "rates_percent" => $this->rates_percent,
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
            $sql = "select rates.pagibig_aid, rates.pagibig_er_amount, ";
            $sql .= "rates.rates_paytype_id, rates.rates_payitems_id, ";
            $sql .= "payitem.payitem_aid, paytype.paytype_aid,  ";
            $sql .= "rates.rates_percent,  ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblPagibig} as rates, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where rates.rates_paytype_id = paytype.paytype_aid ";
            $sql .= "and rates.rates_payitems_id = payitem.payitem_aid ";
            $sql .= "order by rates.pagibig_er_amount desc ";

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
            $sql .= "pagibig_er_amount = :pagibig_er_amount, ";
            $sql .= "rates_paytype_id = :rates_paytype_id, ";
            $sql .= "rates_percent = :rates_percent, ";
            $sql .= "rates_payitems_id = :rates_payitems_id, ";
            $sql .= "rates_datetime = :rates_datetime ";
            $sql .= "where pagibig_aid  = :pagibig_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "pagibig_er_amount" => $this->pagibig_er_amount,
                "rates_paytype_id" => $this->rates_paytype_id,
                "rates_percent" => $this->rates_percent,
                "rates_payitems_id" => $this->rates_payitems_id,
                "rates_datetime" => $this->rates_datetime,
                "pagibig_aid" => $this->pagibig_aid,
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
            $sql .= "where pagibig_aid  = :pagibig_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "pagibig_aid" => $this->pagibig_aid,
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
            $sql = "select rates.pagibig_aid, rates.pagibig_er_amount, ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblPagibig} as rates, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where rates.pagibig_aid = :pagibig_aid ";
            $sql .= "and rates.rates_paytype_id = paytype.paytype_aid ";
            $sql .= "and rates.rates_payitem_id = payitem.payitem_aid ";
            $sql .= "order by rates.pagibig_er_amount desc, ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "pagibig_aid" => $this->pagibig_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
