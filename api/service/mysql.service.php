<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once $coreService->requireConfig();

class MysqlService {

  /**
   * constructor
   */
  function __construct() {}

  /**
   * connect with the database
   */
  function connect() {
    try {
      $pdo = new PDO('mysql:host='.CONFIG::DB_HOST.';dbname='.CONFIG::DB_NAME.';charset=utf8', CONFIG::DB_USER, CONFIG::DB_PASS);
    } catch (PDOException $e) {
      echo 'Error: ' . $e->getMessage();
      exit();
    }
    return $pdo;
  }

  function select($fields, $table, $append = '') {
    $pdo = $this->connect();
    $stmt = $pdo->query($this->buildQuery($fields, $table, $append));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  function prepareSelect($fields, $table, $append = '') {
    $pdo = $this->connect();
    return $pdo->prepare($this->buildQuery($fields, $table, $append));
  }

  function buildQuery($fields, $table, $append) {
    $prefix = CONFIG::DB_PREFIX;
    $append = $append === '' ? $append : ' ' . $append;
    return "SELECT {$fields} FROM `{$prefix}{$table}`{$append}";
  }
}
?>
