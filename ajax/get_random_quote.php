<?php

require_once('../../../init.php');

$mysql = Mysql::getInstance();

$query = "
    SELECT * FROM `quote_of_the_day`
    ORDER BY RAND()
    LIMIT 1
";

$quote = $mysql->query($query)->fetchArray();

echo json_encode($quote);