<?php
class ReportPayType
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
    public $tblReportPayType;
    public $tblPayItem;
    public $tblEarnings;
    public $tblDeductions;
    public $tblPayrollList;
    public $tblPayroll;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReportPayType = "prv2_paytype";
        $this->tblPayItem = "prv2_payitem";
        $this->tblEarnings = "prv2_earnings";
        $this->tblDeductions = "prv2_deduction";
        $this->tblPayrollList = "prv2_payroll_list";
        $this->tblPayroll = "prv2_payroll";
    }

    // report filter specific type id by date earnings
    public function readReportEarningsPaytypeIdByDate()
    {
        try {
            $sql = "select payitem.payitem_aid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "earnings.earnings_payroll_id as payrollid, ";
            $sql .= "earnings.earnings_employee_id, ";
            $sql .= "sum(earnings.earnings_amount) as amount, ";
            $sql .= "earnings.earnings_start_pay_date, ";
            $sql .= "earnings.earnings_end_pay_date, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "COUNT(earnings.earnings_payitem_id) as count ";
            $sql .= "from {$this->tblEarnings} as earnings, ";
            $sql .= "{$this->tblReportPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where paytype.paytype_aid = :paytype_aid ";
            $sql .= "and earnings.earnings_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_payitem_id = payitem.payitem_aid ";
            $sql .= "and earnings.earnings_paytype_id = payitem.payitem_paytype_id ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and earnings.earnings_is_installment != '2' ";
            // $sql .= "and earnings.earnings_start_pay_date = :date_from ";
            // $sql .= "and earnings.earnings_end_pay_date = :date_to ";
            $sql .= "and DATE(earnings.earnings_start_pay_date) between ";
            $sql .= ":date_from and :date_to ";
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
            $sql .= "deduction.deduction_payroll_id as payrollid, ";
            $sql .= "payitem.payitem_name, ";
            $sql .= "sum(deduction.deduction_amount) as amount, ";
            $sql .= "deduction.deduction_start_pay_date, ";
            $sql .= "deduction.deduction_end_pay_date, ";
            $sql .= "paytype.paytype_category, ";
            $sql .= "paytype.paytype_aid, ";
            $sql .= "paytype.paytype_name, ";
            $sql .= "COUNT(deduction.deduction_payitem_id) as count ";
            $sql .= "from {$this->tblDeductions} as deduction, ";
            $sql .= "{$this->tblReportPayType} as paytype, ";
            $sql .= "{$this->tblPayItem} as payitem ";
            $sql .= "where paytype.paytype_aid = :paytype_aid ";
            $sql .= "and deduction.deduction_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_payitem_id = payitem.payitem_aid ";
            $sql .= "and deduction.deduction_paytype_id = payitem.payitem_paytype_id ";
            $sql .= "and payitem.payitem_paytype_id = paytype.paytype_aid ";
            $sql .= "and deduction.deduction_is_installment != '2' ";
            // $sql .= "and deduction.deduction_start_pay_date = :date_from ";
            // $sql .= "and deduction.deduction_end_pay_date = :date_to ";
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

    // read all basic pay
    public function readReportFilterBasicPay()
    {
        try {
            $sql = "select sum(payrollList.payroll_list_basic_pay) as totalBasicSalary, ";
            $sql .= "payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_start_date, ";
            $sql .= "payroll.payroll_end_date, ";
            $sql .= "count(payrollList.payroll_list_employee_id) as count ";
            $sql .= "from {$this->tblPayrollList} as payrollList, ";
            $sql .= "{$this->tblPayroll} as payroll ";
            $sql .= "where payrollList.payroll_list_payroll_id = payroll.payroll_id ";
            $sql .= "and DATE(payroll.payroll_start_date) between ";
            $sql .= ":date_from and :date_to ";
            $sql .= "group by payrollList.payroll_list_aid != '' ";
            $sql .= "order by payrollList.payroll_list_payroll_id, ";
            $sql .= "payroll.payroll_end_date desc, ";
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
}
