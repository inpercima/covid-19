<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once $coreService->requireConfig();
require_once '../service/data.service.php';

$dataService = new DataService();
$dataService->collect();
?>
