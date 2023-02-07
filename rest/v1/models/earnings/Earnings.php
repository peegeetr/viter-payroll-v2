<?php
class Earnings
{
    public $earnings_aid;
    public $earnings_is_active;
    public $earnings_payroll_id;
    public $earnings_employee;
    public $earnings_employee_id;
    public $earnings_paytype_id;
    public $earnings_payitem_id;
    public $earnings_amount;
    public $earnings_frequency;
    public $earnings_is_installment;
    public $earnings_number_of_installment;
    public $earnings_start_pay_date;
    public $earnings_end_pay_date;
    public $earnings_created;
    public $earnings_datetime;

    public $connection;
    public $lastInsertedId;
    public $earnings_start;
    public $earnings_total;
    public $earnings_search;
    public $tblEarnings;
    public $tblPayType;
    public $tblPayItem;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEarnings = "prv2_earnings";
        $this->tblPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblEarnings} ";
            $sql .= "( earnings_employee, ";
            $sql .= "earnings_payroll_id, ";
            $sql .= "earnings_employee_id, ";
            $sql .= "earnings_paytype_id, ";
            $sql .= "earnings_payitem_id, ";
            $sql .= "earnings_is_active, ";
            $sql .= "earnings_amount, ";
            $sql .= "earnings_frequency, ";
            $sql .= "earnings_is_installment, ";
            $sql .= "earnings_number_of_installment, ";
            $sql .= "earnings_start_pay_date, ";
            $sql .= "earnings_end_pay_date, ";
            $sql .= "earnings_created, ";
            $sql .= "earnings_datetime ) values ( ";
            $sql .= ":earnings_employee, ";
            $sql .= ":earnings_payroll_id, ";
            $sql .= ":earnings_employee_id, ";
            $sql .= ":earnings_paytype_id, ";
            $sql .= ":earnings_payitem_id, ";
            $sql .= ":earnings_is_active, ";
            $sql .= ":earnings_amount, ";
            $sql .= ":earnings_frequency, ";
            $sql .= ":earnings_is_installment, ";
            $sql .= ":earnings_number_of_installment, ";
            $sql .= ":earnings_start_pay_date, ";
            $sql .= ":earnings_end_pay_date, ";
            $sql .= ":earnings_created, ";
            $sql .= ":earnings_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_employee" => $this->earnings_employee,
                "earnings_payroll_id" => $this->earnings_payroll_id,
                "earnings_employee_id" => $this->earnings_employee_id,
                "earnings_paytype_id" => $this->earnings_paytype_id,
                "earnings_payitem_id" => $this->earnings_payitem_id,
                "earnings_is_active" => $this->earnings_is_active,
                "earnings_amount" => $this->earnings_amount,
                "earnings_frequency" => $this->earnings_frequency,
                "earnings_is_installment" => $this->earnings_is_installment,
                "earnings_number_of_installment" => $this->earnings_number_of_installment,
                "earnings_start_pay_date" => $this->earnings_start_pay_date,
                "earnings_end_pay_date" => $this->earnings_end_pay_date,
                "earnings_created" => $this->earnings_created,
                "earnings_datetime" => $this->earnings_datetime,
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
            $sql = "select earnings.earnings_aid, earnings.earnings_is_active, ";
            $sql .= "earnings.earnings_employee, earnings.earnings_amount, ";
            $sql .= "earnings.earnings_frequency, earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, earnings.earnings_end_pay_date, ";
            $sql .= "earnings.earnings_payitem_id, earnings.earnings_paytype_id, ";
            $sql .= "payitem.payitem_aid, paytype.paytype_aid, earnings.earnings_payroll_id, ";
            $sql .= "payitem.payitem_is_hris, earnings.earnings_is_installment, ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "order by earnings.earnings_is_active desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select earnings.earnings_aid, earnings.earnings_is_active, ";
            $sql .= "earnings.earnings_employee, earnings.earnings_amount, ";
            $sql .= "earnings.earnings_frequency, earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, earnings.earnings_end_pay_date, ";
            $sql .= "earnings.earnings_payitem_id, earnings.earnings_paytype_id, ";
            $sql .= "payitem.payitem_aid, paytype.paytype_aid, earnings.earnings_payroll_id, ";
            $sql .= "payitem.payitem_is_hris, earnings.earnings_is_installment, ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "order by earnings.earnings_is_active desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->earnings_start - 1,
                "total" => $this->earnings_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select earnings.earnings_aid, earnings.earnings_is_active, ";
            $sql .= "earnings.earnings_employee, earnings.earnings_amount, ";
            $sql .= "earnings.earnings_frequency, earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, earnings.earnings_end_pay_date, ";
            $sql .= "earnings.earnings_payitem_id, earnings.earnings_paytype_id, ";
            $sql .= "payitem.payitem_aid, paytype.paytype_aid, earnings.earnings_payroll_id, ";
            $sql .= "payitem.payitem_is_hris, earnings.earnings_is_installment, ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "and earnings.earnings_employee like :search ";
            $sql .= "order by earnings.earnings_is_active desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->earnings_search}%",
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
            $sql = "select earnings.earnings_aid, earnings.earnings_is_active, ";
            $sql .= "earnings.earnings_employee, earnings.earnings_amount, ";
            $sql .= "earnings.earnings_frequency, earnings.earnings_number_of_installment, ";
            $sql .= "earnings.earnings_start_pay_date, earnings.earnings_end_pay_date, ";
            $sql .= "payitem.payitem_name, paytype.paytype_name ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_aid = :earnings_aid ";
            $sql .= "and earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "order by earnings.earnings_is_active desc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_aid" => $this->earnings_aid,
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
            $sql = "update {$this->tblEarnings} set ";
            $sql .= "earnings_paytype_id = :earnings_paytype_id, ";
            $sql .= "earnings_payitem_id = :earnings_payitem_id, ";
            $sql .= "earnings_amount = :earnings_amount, ";
            $sql .= "earnings_frequency = :earnings_frequency, ";
            $sql .= "earnings_number_of_installment = :earnings_number_of_installment, ";
            $sql .= "earnings_start_pay_date = :earnings_start_pay_date, ";
            $sql .= "earnings_end_pay_date = :earnings_end_pay_date, ";
            $sql .= "earnings_datetime = :earnings_datetime ";
            $sql .= "where earnings_aid = :earnings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_paytype_id" => $this->earnings_paytype_id,
                "earnings_payitem_id" => $this->earnings_payitem_id,
                "earnings_amount" => $this->earnings_amount,
                "earnings_frequency" => $this->earnings_frequency,
                "earnings_number_of_installment" => $this->earnings_number_of_installment,
                "earnings_start_pay_date" => $this->earnings_start_pay_date,
                "earnings_end_pay_date" => $this->earnings_end_pay_date,
                "earnings_datetime" => $this->earnings_datetime,
                "earnings_aid" => $this->earnings_aid,
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
            $sql = "update {$this->tblEarnings} set ";
            $sql .= "earnings_is_active = :earnings_is_active, ";
            $sql .= "earnings_datetime = :earnings_datetime ";
            $sql .= "where earnings_aid = :earnings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_is_active" => $this->earnings_is_active,
                "earnings_datetime" => $this->earnings_datetime,
                "earnings_aid" => $this->earnings_aid,
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
            $sql = "delete from {$this->tblEarnings} ";
            $sql .= "where earnings_aid = :earnings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "earnings_aid" => $this->earnings_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
