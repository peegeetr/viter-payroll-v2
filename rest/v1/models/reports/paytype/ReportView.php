<?php
class ReportView
{
    public $deduction_aid;
    public $deduction_is_paid;
    public $deduction_payroll_id;
    public $deduction_payitem_id;
    public $earnings_payroll_id;
    public $earnings_payitem_id;

    public $connection;
    public $lastInsertedId;
    public $report_start;
    public $report_total;
    public $date_from;
    public $date_to;
    public $tblDeductions;
    public $tblEarnings;
    public $tblPayType;
    public $tblPayItem;
    public $tblPayrollList;
    public $tblPayroll;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDeductions = "prv2_deduction";
        $this->tblEarnings = "prv2_earnings";
        $this->tblPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblPayroll = "prv2_payroll";
    }

    // REPORT Read all Deduction Paytype
    // REPORT Read all Deduction Paytype
    public function readReportDeductionPaytypeById()
    {
        try {
            $sql = "select deduction.deduction_amount, ";
            $sql .= "deduction.deduction_payroll_id as payrollid, ";
            $sql .= "deduction.deduction_employee, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "deduction.deduction_created, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date ";
            $sql .= "from {$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where deduction.deduction_payitem_id = :deduction_payitem_id ";
            $sql .= "and paytype.paytype_aid = deduction.deduction_paytype_id ";
            $sql .= "and payitem.payitem_aid = deduction.deduction_payitem_id ";
            $sql .= "and deduction.deduction_is_installment != '2' ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and DATE(deduction.deduction_start_pay_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "order by deduction.deduction_payroll_id asc, ";
            $sql .= "deduction.deduction_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
                "deduction_payitem_id" => $this->deduction_payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // REPORT Read limit Deduction Paytype
    // REPORT Read limit Deduction Paytype
    public function readReportDeductionPaytypeByIdLimit()
    {
        try {
            $sql = "select deduction.deduction_amount, ";
            $sql .= "deduction.deduction_payroll_id as payrollid, ";
            $sql .= "deduction.deduction_employee, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "deduction.deduction_created, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date ";
            $sql .= "from {$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where deduction.deduction_payitem_id = :deduction_payitem_id ";
            $sql .= "and paytype.paytype_aid = deduction.deduction_paytype_id ";
            $sql .= "and payitem.payitem_aid = deduction.deduction_payitem_id ";
            $sql .= "and deduction.deduction_is_installment != '2' ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and DATE(deduction.deduction_start_pay_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "order by deduction.deduction_payroll_id asc, ";
            $sql .= "deduction.deduction_employee asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
                "deduction_payitem_id" => $this->deduction_payitem_id,
                "start" => $this->report_start - 1,
                "total" => $this->report_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Read all Earnings Paytype
    // REPORT Read all Earnings Paytype
    public function readReportEarningsPaytypeById()
    {
        try {
            $sql = "select earnings.earnings_amount, ";
            $sql .= "earnings.earnings_payroll_id as payrollid, ";
            $sql .= "earnings.earnings_rate, ";
            $sql .= "earnings.earnings_employee, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "earnings.earnings_created, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date ";
            $sql .= "from {$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_payitem_id = :earnings_payitem_id ";
            $sql .= "and paytype.paytype_aid = earnings.earnings_paytype_id ";
            $sql .= "and payitem.payitem_aid = earnings.earnings_payitem_id ";
            $sql .= "and earnings.earnings_is_installment != '2' ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and DATE(earnings.earnings_start_pay_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "order by earnings.earnings_payroll_id asc, ";
            $sql .= "earnings.earnings_employee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
                "earnings_payitem_id" => $this->earnings_payitem_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT Read limit Earnings Paytype
    // REPORT Read limit Earnings Paytype
    public function readReportEarningsPaytypeByIdLimit()
    {
        try {
            $sql = "select earnings.earnings_amount, ";
            $sql .= "earnings.earnings_payroll_id as payrollid, ";
            $sql .= "earnings.earnings_rate, ";
            $sql .= "earnings.earnings_employee, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "earnings.earnings_created, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date ";
            $sql .= "from {$this->tblPayType} as paytype, ";
            $sql .= "{$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where earnings.earnings_payitem_id = :earnings_payitem_id ";
            $sql .= "and paytype.paytype_aid = earnings.earnings_paytype_id ";
            $sql .= "and payitem.payitem_aid = earnings.earnings_payitem_id ";
            $sql .= "and earnings.earnings_is_installment != '2' ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and DATE(earnings.earnings_start_pay_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "order by earnings.earnings_payroll_id asc, ";
            $sql .= "earnings.earnings_employee asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
                "earnings_payitem_id" => $this->earnings_payitem_id,
                "start" => $this->report_start - 1,
                "total" => $this->report_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Report Read all basic pay
    public function readByReportBasicPay()
    {
        try {
            $sql = "select ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_basic_pay, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "and DATE(payroll.payroll_start_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "order by payroll.payroll_id asc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Report Read all limit basic pay
    public function readByReportBasicPayLimit()
    {
        try {
            $sql = "select ";
            $sql .= "payrollList.payroll_list_employee_name, ";
            $sql .= "payrollList.payroll_list_basic_pay, ";
            $sql .= "payroll.payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "payroll.payroll_pay_date ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payroll.payroll_id = payrollList.payroll_list_payroll_id ";
            $sql .= "and DATE(payroll.payroll_start_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "order by payroll.payroll_id asc, ";
            $sql .= "payrollList.payroll_list_employee_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->report_start - 1,
                "total" => $this->report_total,
                "date_from" => $this->date_from,
                "date_to" => $this->date_to,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
