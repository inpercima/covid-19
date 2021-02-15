<?php
require_once 'mysql.service.php';

class DataService {

  /**
   * constructor
   */
  public function __construct() {}

  public function load() {
    $mysqlService = new MysqlService();
    $pdo = $mysqlService->connect();
    $prefix = CONFIG::DB_PREFIX;

    $stmt = $pdo->query("SELECT * FROM `{$prefix}data`");
    return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC), JSON_NUMERIC_CHECK);
  }

  public function collect() {
    $offset = 0;
    $data = [];
    do {
      $content = $this->request('', $offset);
      foreach ($content->features as $key => $value) {
        // on server the value is interpreted as float b/c of the length of 13 chars as timestamp
        $date = strval($value->attributes->Meldedatum);
        $count = $value->attributes->AnzahlFall;
        $data[$date] = array_key_exists($date, $data) ? $data[$date] + $count : $count;
      }
      $offset += 2000;
    } while (count($content->features) == 2000);
    $this->save($data);
    return json_encode(true);
  }

  private function save($data) {
    $mysqlService = new MysqlService();
    $pdo = $mysqlService->connect();
    $prefix = CONFIG::DB_PREFIX;

    $pdo->query("DELETE FROM `{$prefix}data`");
    foreach ($data as $key => $value) {
      $stmt = $pdo->prepare("INSERT INTO `{$prefix}data` (`date`, `count`) VALUES (:date, :count)");
      $stmt->bindParam(':date', $key);
      $stmt->bindParam(':count', $value);
      $stmt->execute();
    }
  }

  private function request($region, $offset) {
    $params = array(
      'f' => 'json',
      'where' => "(Meldedatum > timestamp '2020-01-25 22:59:59' AND NeuerFall IN(0, 1)) {$region}",
      'outFields' => 'AnzahlFall,Meldedatum',
      'orderByFields' => 'Meldedatum asc',
      'resultType' => 'standard',
      'resultRecordCount' => '2000',
      'resultOffset' => $offset
    );
    $url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/RKI_COVID19/FeatureServer/0/query?' . http_build_query($params);
    return json_decode(file_get_contents($url));
  }
}
?>
