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
            $sql .= "pagibig_created, ";
            $sql .= "pagibig_datetime ) values ( ";
            $sql .= ":pagibig_ee_amount, ";
            $sql .= ":pagibig_er_amount, ";
            $sql .= ":pagibig_created, ";
            $sql .= ":pagibig_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "pagibig_er_amount" => $this->pagibig_er_amount,
                "pagibig_ee_amount" => $this->pagibig_ee_amount,
                "pagibig_created" => $this->pagibig_created,
                "pagibig_datetime" => $this->pagibig_datetime,
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
            $sql = "select pagibig_er_amount, pagibig_ee_amount, ";
            $sql .= "pagibig_aid ";
            $sql .= "from {$this->tblPagibig} ";
            $sql .= "order by pagibig_aid desc ";
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
            $sql .= "pagibig_ee_amount = :pagibig_ee_amount, ";
            $sql .= "pagibig_datetime = :pagibig_datetime ";
            $sql .= "where pagibig_aid  = :pagibig_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "pagibig_er_amount" => $this->pagibig_er_amount,
                "pagibig_ee_amount" => $this->pagibig_ee_amount,
                "pagibig_datetime" => $this->pagibig_datetime,
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
            $sql .= "where pagibig_aid = :pagibig_aid ";
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
            $sql = "select pagibig_er_amount, pagibig_ee_amount, ";
            $sql .= "pagibig_aid ";
            $sql .= "from {$this->tblPagibig} ";
            $sql .= "where pagibig_aid = :pagibig_aid ";
            $sql .= "order by pagibig_aid desc, ";

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
