<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once $coreService->requireConfig();
require_once '../service/data.service.php';

$coreService->setHeader();

$dataService = new DataService();
switch ($_SERVER['REQUEST_METHOD']) {
  default:
  case 'GET':
    echo $dataService->load();
    breask;
}
?>
