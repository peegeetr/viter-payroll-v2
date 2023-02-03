<?php
class UserSystem
{
    public $user_system_aid;
    public $user_system_is_active;
    public $user_system_fname;
    public $user_system_lname;
    public $user_system_email;
    public $user_system_role_id;
    public $user_system_key;
    public $user_system_password;
    public $user_system_created;
    public $user_system_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_system_start;
    public $user_system_total;
    public $user_system_search;
    public $tblUserSystem;
    public $tblRole;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserSystem = "hrisv2_settings_user_system";
        $this->tblRole = "hrisv2_settings_role";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserSystem} ";
            $sql .= "( user_system_fname, ";
            $sql .= "user_system_lname, ";
            $sql .= "user_system_is_active, ";
            $sql .= "user_system_email, ";
            $sql .= "user_system_role_id, ";
            $sql .= "user_system_key, ";
            $sql .= "user_system_created, ";
            $sql .= "user_system_datetime ) values ( ";
            $sql .= ":user_system_fname, ";
            $sql .= ":user_system_lname, ";
            $sql .= ":user_system_is_active, ";
            $sql .= ":user_system_email, ";
            $sql .= ":user_system_role_id, ";
            $sql .= ":user_system_key, ";
            $sql .= ":user_system_created, ";
            $sql .= ":user_system_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_fname" => $this->user_system_fname,
                "user_system_lname" => $this->user_system_lname,
                "user_system_is_active" => $this->user_system_is_active,
                "user_system_email" => $this->user_system_email,
                "user_system_role_id" => $this->user_system_role_id,
                "user_system_key" => $this->user_system_key,
                "user_system_created" => $this->user_system_created,
                "user_system_datetime" => $this->user_system_datetime,
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
            $sql = "select user.user_system_fname, ";
            $sql .= "user.user_system_lname, ";
            $sql .= "user.user_system_is_active, ";
            $sql .= "user.user_system_email, ";
            $sql .= "user.user_system_role_id, ";
            $sql .= "role.role_aid, ";
            $sql .= "role.role_name, ";
            $sql .= "user.user_system_aid ";
            $sql .= "from {$this->tblUserSystem} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.user_system_role_id = role.role_aid ";
            $sql .= "order by user.user_system_is_active desc, ";
            $sql .= "user.user_system_fname asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select user.user_system_fname, ";
            $sql .= "user.user_system_lname, ";
            $sql .= "user.user_system_is_active, ";
            $sql .= "user.user_system_email, ";
            $sql .= "user.user_system_role_id, ";
            $sql .= "role.role_aid, ";
            $sql .= "role.role_name, ";
            $sql .= "user.user_system_aid ";
            $sql .= "from {$this->tblUserSystem} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.user_system_role_id = role.role_aid ";
            $sql .= "order by user.user_system_is_active desc, ";
            $sql .= "user.user_system_fname asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_system_start - 1,
                "total" => $this->user_system_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function search()
    {
        try {
            $sql = "select * from {$this->tblUserSystem} as user, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where user.user_system_role_id = role.role_aid ";
            $sql .= "and ( user.user_system_fname like :user_system_fname ";
            $sql .= "or user.user_system_lname like :user_system_lname ";
            $sql .= ") ";
            $sql .= "order by user.user_system_is_active desc, ";
            $sql .= "user.user_system_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_fname" => "{$this->user_system_search}%",
                "user_system_lname" => "{$this->user_system_search}%",
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
            $sql = "select * from {$this->tblUserSystem} ";
            $sql .= "where user_system_aid = :user_system_aid ";
            $sql .= "order by user_system_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_aid" => $this->user_system_aid,
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
            $sql = "update {$this->tblUserSystem} set ";
            $sql .= "user_system_fname = :user_system_fname, ";
            $sql .= "user_system_lname = :user_system_lname, ";
            $sql .= "user_system_email = :user_system_email, ";
            $sql .= "user_system_datetime = :user_system_datetime ";
            $sql .= "where user_system_aid  = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_fname" => $this->user_system_fname,
                "user_system_lname" => $this->user_system_lname,
                "user_system_email" => $this->user_system_email,
                "user_system_datetime" => $this->user_system_datetime,
                "user_system_aid" => $this->user_system_aid,
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
            $sql = "update {$this->tblUserSystem} set ";
            $sql .= "user_system_is_active = :user_system_is_active, ";
            $sql .= "user_system_datetime = :user_system_datetime ";
            $sql .= "where user_system_aid = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_is_active" => $this->user_system_is_active,
                "user_system_datetime" => $this->user_system_datetime,
                "user_system_aid" => $this->user_system_aid,
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
            $sql = "delete from {$this->tblUserSystem} ";
            $sql .= "where user_system_aid = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_aid" => $this->user_system_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // validator

    // email
    public function checkEmail()
    {
        try {
            $sql = "select user_system_email from {$this->tblUserSystem} ";
            $sql .= "where user_system_email = :user_system_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_email" => "{$this->user_system_email}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
