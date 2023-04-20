<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$taxYearly = new TaxYearly($conn);
// get should not be present
if (array_key_exists("taxyearlyid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$taxYearly->tax_yearly_from = checkIndex($data, "tax_yearly_from");
$taxYearly->tax_yearly_to = checkIndex($data, "tax_yearly_to");
$taxYearly->tax_yearly_fixed_tax = checkIndex($data, "tax_yearly_fixed_tax");
$taxYearly->tax_yearly_rate = checkIndex($data, "tax_yearly_rate");
$taxYearly->tax_yearly_active = 1;
$taxYearly->tax_yearly_created = date("Y-m-d H:i:s");
$taxYearly->tax_yearly_datetime = date("Y-m-d H:i:s");
// check name
isRangeFromExist($taxYearly, $taxYearly->tax_yearly_from);
isRangeToExist($taxYearly, $taxYearly->tax_yearly_to);

$query = checkCreate($taxYearly);
returnSuccess($taxYearly, "Tax Monthly", $query);
