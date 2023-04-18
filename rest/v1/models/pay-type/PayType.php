<?php
class PayType
{
    public $paytype_aid;
    public $paytype_is_active;
    public $paytype_category;
    public $paytype_name;
    public $paytype_description;
    public $paytype_created;
    public $paytype_datetime;

    public $connection;
    public $lastInsertedId;
    public $paytype_start;
    public $paytype_total;
    public $date_from;
    public $date_to;
    public $tblPayType;
    public $tblPayItem;
    public $tblEarnings;
    public $tblDeductions;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
        $this->tblEarnings = "prv2_earnings";
        $this->tblDeductions = "prv2_deduction";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPayType} ";
            $sql .= "( paytype_name, ";
            $sql .= "paytype_category, ";
            $sql .= "paytype_description, ";
            $sql .= "paytype_is_active, ";
            $sql .= "paytype_created, ";
            $sql .= "paytype_datetime ) values ( ";
            $sql .= ":paytype_name, ";
            $sql .= ":paytype_category, ";
            $sql .= ":paytype_description, ";
            $sql .= ":paytype_is_active, ";
            $sql .= ":paytype_created, ";
            $sql .= ":paytype_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_name" => $this->paytype_name,
                "paytype_category" => $this->paytype_category,
                "paytype_description" => $this->paytype_description,
                "paytype_is_active" => $this->paytype_is_active,
                "paytype_created" => $this->paytype_created,
                "paytype_datetime" => $this->paytype_datetime,
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
            $sql = "select * from {$this->tblPayType} ";
            $sql .= "order by paytype_is_active desc, ";
            $sql .= "paytype_category desc, paytype_name asc ";
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
            $sql .= "where type.paytype_aid = :paytype_aid ";
            $sql .= "and item.payitem_paytype_id = type.paytype_aid ";
            $sql .= "order by item.payitem_is_active desc, item.payitem_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_aid" => $this->paytype_aid,
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
            $sql = "update {$this->tblPayType} set ";
            $sql .= "paytype_name = :paytype_name, ";
            $sql .= "paytype_category = :paytype_category, ";
            $sql .= "paytype_description = :paytype_description, ";
            $sql .= "paytype_datetime = :paytype_datetime ";
            $sql .= "where paytype_aid  = :paytype_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_name" => $this->paytype_name,
                "paytype_category" => $this->paytype_category,
                "paytype_description" => $this->paytype_description,
                "paytype_datetime" => $this->paytype_datetime,
                "paytype_aid" => $this->paytype_aid,
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
            $sql = "update {$this->tblPayType} set ";
            $sql .= "paytype_is_active = :paytype_is_active, ";
            $sql .= "paytype_datetime = :paytype_datetime ";
            $sql .= "where paytype_aid = :paytype_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_is_active" => $this->paytype_is_active,
                "paytype_datetime" => $this->paytype_datetime,
                "paytype_aid" => $this->paytype_aid,
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
            $sql = "delete from {$this->tblPayType} ";
            $sql .= "where paytype_aid = :paytype_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_aid" => $this->paytype_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // add column to database table
    public function addColumn($column_name)
    {
        try {
            $sql = "alter table {$this->tblPayType} ";
            $sql .= "add column paytype_is_{$column_name} boolean ";
            $sql .= "NOT NULL ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateColumnValue($column_name)
    {
        try {
            $sql = "update {$this->tblPayType} set ";
            $sql .= "paytype_is_{$column_name} = :paytype_column_name, ";
            $sql .= "paytype_datetime = :paytype_datetime ";
            $sql .= "where paytype_name = :paytype_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_column_name" => $this->paytype_is_active,
                "paytype_datetime" => $this->paytype_datetime,
                "paytype_name" => $this->paytype_name,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update column name to database table
    public function updateColumnName($column_name, $column_name_old)
    {
        try {
            $sql = "alter table {$this->tblPayType} change ";
            $sql .= "paytype_is_{$column_name_old} ";
            $sql .= "paytype_is_{$column_name} boolean ";
            $sql .= "NOT NULL ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // drop column name to database table
    public function dropColumnName($column_name)
    {
        try {
            $sql = "alter table {$this->tblPayType} ";
            $sql .= "drop column paytype_is_{$column_name} ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // validator

    // name
    public function checkName()
    {
        try {
            $sql = "select paytype_name from {$this->tblPayType} ";
            $sql .= "where paytype_name = :paytype_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_name" => "{$this->paytype_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function checkAssociation()
    {
        try {
            $sql = "select type.paytype_name, item.payitem_name, ";
            $sql .= "item.payitem_is_active, item.payitem_aid from ";
            $sql .= "{$this->tblPayType} as type, ";
            $sql .= "{$this->tblPayItem} as item ";
            $sql .= "where type.paytype_aid = :paytype_aid ";
            $sql .= "and item.payitem_paytype_id = type.paytype_aid ";
            $sql .= "order by item.payitem_is_active desc, item.payitem_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_aid" => $this->paytype_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all paytype in report
    public function readAllPayType()
    {
        try {
            $sql = "select payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "order by paytype.paytype_name, ";
            $sql .= "payitem.payitem_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all limit paytype in report
    public function readAllPayTypeLimit()
    {
        try {
            $sql = "select payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name ";
            $sql .= "from {$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "order by paytype.paytype_name, ";
            $sql .= "payitem.payitem_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->paytype_start - 1,
                "total" => $this->paytype_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // report filter specifc type id by date earnings
    public function readReportEarningsPaytypeIdByDate()
    {
        try {
            $sql = "select payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "earnings.earnings_payroll_id, ";
            $sql .= "sum(earnings.earnings_amount) as amount, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "COUNT(earnings.earnings_payitem_id) as count ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where paytype.paytype_aid = :paytype_aid ";
            $sql .= "and earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "and earnings.earnings_paytype_id = payitem.payitem_paytype_id ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_is_installment != '2' ";
            $sql .= "and earnings.earnings_start_pay_date = :date_from ";
            $sql .= "and earnings.earnings_end_pay_date = :date_to ";
            $sql .= "GROUP BY earnings.earnings_payitem_id ";
            $sql .= "order by DATE(earnings.earnings_start_pay_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_aid" => $this->paytype_aid,
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // report filter specific type id by date deduction
    public function readReportDeductionPaytypeIdByDate()
    {
        try {
            $sql = "select payitem.payitem_aid, ";
            $sql .= "deduction.deduction_payroll_id, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "sum(deduction.deduction_amount) as amount, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "COUNT(deduction.deduction_payitem_id) as count ";
            $sql .= "from {$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where paytype.paytype_aid = :paytype_aid ";
            $sql .= "and deduction.deduction_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_payitem_id = payitem.payitem_aid ";
            $sql .= "and deduction.deduction_paytype_id = payitem.payitem_paytype_id ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_is_installment != '2' ";
            $sql .= "and DATE(deduction.deduction_start_pay_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "GROUP BY deduction.deduction_payitem_id ";
            $sql .= "order by DATE(deduction.deduction_start_pay_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "paytype_aid" => $this->paytype_aid,
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
