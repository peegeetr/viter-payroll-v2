<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$taxYearly = new TaxYearly($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("taxyearlyid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $taxYearly->tax_yearly_aid = $_GET['taxyearlyid'];
    $taxYearly->tax_yearly_from = checkIndex($data, "tax_yearly_from");
    $taxYearly->tax_yearly_to = checkIndex($data, "tax_yearly_to");
    $taxYearly->tax_yearly_fixed_tax = checkIndex($data, "tax_yearly_fixed_tax");
    $taxYearly->tax_yearly_rate = checkIndex($data, "tax_yearly_rate");
    $taxYearly->tax_yearly_datetime = date("Y-m-d H:i:s");

    $tax_yearly_from_old = strtolower($data["tax_yearly_from_old"]);
    $tax_yearly_to_old = strtolower($data["tax_yearly_to_old"]);

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($taxYearly->tax_yearly_aid);

    // check name

    compareRangeFrom($taxYearly, $tax_yearly_from_old, $taxYearly->tax_yearly_from);
    compareRangeTo($taxYearly, $tax_yearly_to_old, $taxYearly->tax_yearly_to);

    // update
    $query = checkUpdate($taxYearly);

    returnSuccess($taxYearly, "Tax Yearly", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
