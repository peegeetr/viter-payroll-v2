<?php
class SystemMode
{
    public $settings_system_mode_aid;
    public $settings_system_mode_is_on;
    public $settings_system_mode_name;
    public $settings_system_mode_created;
    public $settings_system_mode_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblSystemMode;



    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSystemMode = "prv2_settings_system_mode";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSystemMode} ";
            $sql .= "( settings_system_mode_is_on, ";
            $sql .= "settings_system_mode_name, ";
            $sql .= "settings_system_mode_created, ";
            $sql .= "settings_system_mode_datetime ) values ( ";
            $sql .= ":settings_system_mode_is_on, ";
            $sql .= ":settings_system_mode_name, ";
            $sql .= ":settings_system_mode_created, ";
            $sql .= ":settings_system_mode_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_system_mode_is_on" => $this->settings_system_mode_is_on,
                "settings_system_mode_name" => $this->settings_system_mode_name,
                "settings_system_mode_created" => $this->settings_system_mode_created,
                "settings_system_mode_datetime" => $this->settings_system_mode_datetime,
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
            $sql = "select settings_system_mode_aid, ";
            $sql .= "settings_system_mode_name, ";
            $sql .= "settings_system_mode_is_maintenance, ";
            $sql .= "settings_system_mode_is_test_mode, ";
            $sql .= "settings_system_mode_is_on ";
            $sql .= "from {$this->tblSystemMode} ";
            $sql .= "order by settings_system_mode_name asc ";

            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSystemMode} set ";
            $sql .= "settings_system_mode_name = :settings_system_mode_name, ";
            $sql .= "settings_system_mode_datetime = :settings_system_mode_datetime ";
            $sql .= "where settings_system_mode_aid  = :settings_system_mode_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_system_mode_name" => $this->settings_system_mode_name,
                "settings_system_mode_datetime" => $this->settings_system_mode_datetime,
                "settings_system_mode_aid" => $this->settings_system_mode_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSystemMode} ";
            $sql .= "where settings_system_mode_aid = :settings_system_mode_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_system_mode_aid" => $this->settings_system_mode_aid,
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
            $sql = "select settings_system_mode_aid, ";
            $sql .= "settings_system_mode_name, ";
            $sql .= "settings_system_mode_is_on ";
            $sql .= "from {$this->tblSystemMode} ";
            $sql .= "where settings_system_mode_aid = :settings_system_mode_aid ";
            $sql .= "order by settings_system_mode_name asc, ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_system_mode_aid" => $this->settings_system_mode_aid,
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
            $sql = "update {$this->tblSystemMode} set ";
            $sql .= "settings_system_mode_is_on = :settings_system_mode_is_on, ";
            $sql .= "settings_system_mode_datetime = :settings_system_mode_datetime ";
            $sql .= "where settings_system_mode_aid = :settings_system_mode_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "settings_system_mode_is_on" => $this->settings_system_mode_is_on,
                "settings_system_mode_datetime" => $this->settings_system_mode_datetime,
                "settings_system_mode_aid" => $this->settings_system_mode_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function readMaintenanceOn()
    {
        try {
            $sql = "select settings_system_mode_is_on as maintenance ";
            $sql .= "from {$this->tblSystemMode} ";
            $sql .= "where settings_system_mode_is_maintenance = '1' ";
            $sql .= "and settings_system_mode_is_on = '1' ";
            $sql .= "order by settings_system_mode_name asc ";

            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
