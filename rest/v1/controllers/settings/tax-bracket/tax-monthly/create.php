<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$taxMonthly = new TaxMonthly($conn);
// get should not be present
if (array_key_exists("taxMonthlyid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data
$taxMonthly->tax_monthly_range_from = checkIndex($data, "tax_monthly_range_from");
$taxMonthly->tax_monthly_range_to = checkIndex($data, "tax_monthly_range_to");
$taxMonthly->tax_monthly_less_amount = checkIndex($data, "tax_monthly_less_amount");
$taxMonthly->tax_monthly_rate = checkIndex($data, "tax_monthly_rate");
$taxMonthly->tax_monthly_additional_amount = checkIndex($data, "tax_monthly_additional_amount");
$taxMonthly->tax_monthly_active = 1;
$taxMonthly->tax_monthly_created = date("Y-m-d");
$taxMonthly->tax_monthly_datetime = date("Y-m-d H:i:s");
// check name
// isNameExist($taxMonthly, $taxMonthly->taxMonthly_name);
$query = checkCreate($taxMonthly);
$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["Tax Monthly ID"] = $taxMonthly->lastInsertedId;
$returnData["success"] = true;
return $returnData;
